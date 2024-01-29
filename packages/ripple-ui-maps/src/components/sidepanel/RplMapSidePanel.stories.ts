import { ref, provide } from 'vue'
import { RplAccordion } from '@dpc-sdp/ripple-ui-core/vue'
import RplMap from './../map/RplMap.vue'
import RplMapSidePanel from './RplMapSidePanel.vue'
import RplMapSidePanelCard from './RplMapSidePanelCard.vue'
import RplMapProviderMapbox from './../map/providers/RplMapProviderMapbox.vue'
import { truncateText } from './../map/__fixture__/utils.ts'
import featureData from './../map/__fixture__/largeset.json'

export default {
  title: 'Maps/Sidepanel',
  component: RplMapSidePanel,
  tags: ['skip-test'],
  parameters: {
    chromatic: { disableSnapshot: true }
  }
}

const Template = (args) => ({
  components: {
    RplMap,
    RplMapProviderMapbox,
    RplMapSidePanel,
    RplMapSidePanelCard,
    RplAccordion
  },
  setup() {
    const rplMapRef = ref(null)
    const popup = ref({
      isOpen: false,
      position: [0, 0],
      feature: null
    })
    function setRplMapRef(mapInstance) {
      rplMapRef.value = mapInstance
    }
    provide('rplMapInstance', {
      rplMapRef,
      setRplMapRef,
      popup
    })
    const getClusteredFeatures = (itms) => {
      return itms.map((itm, idx) => {
        return {
          id: `${idx}-${itm.title}`,
          title: itm.title,
          content: itm.description
        }
      })
    }
    return {
      truncateText,
      getClusteredFeatures,
      args
    }
  },
  template: `
    <RplMap v-bind="args">
      <template #map-provider>
        <rpl-map-provider-mapbox />
      </template>
      <template #sidebar="{ mapHeight }">
        <RplMapSidePanel :style="'height:' + mapHeight +'px'">
          <p class="rpl-type-p-small rpl-u-margin-b-2 rpl-u-margin-l-1">{{args.cards.length}} items in {{args.searchTerm}}</p>
          <RplMapSidePanelCard v-for="card in args.cards" :key="card.title" :feature="card" :title="card.city">
            <p>{{truncateText(card.description, 50)}}</p>
          </RplMapSidePanelCard>
        </RplMapSidePanel>
      </template>
      <template #popupTitle="{ selectedFeatures }">
        <span v-if="selectedFeatures.length === 1">
          {{ selectedFeatures[0].title}}
        </span>
        <span v-else>
          {{ selectedFeatures.length }} items found in this area
        </span>
      </template>
      <template #popupContent="{ selectedFeatures }">
        <div class="rpl-u-margin-4">
          <p class="rpl-type-p-small" v-if="selectedFeatures.length === 1">
            {{ selectedFeatures[0].description}}
          </p>
          <RplAccordion v-else :items="getClusteredFeatures(selectedFeatures)" :displayToggleAll="false">
          </RplAccordion>
        </div>
      </template>
    </RplMap>
  `
})

export const Mapbox = Template.bind({})
Mapbox.args = {
  id: '123',
  projection: 'EPSG:3857',
  features: featureData,
  popupType: 'popover',
  provider: 'mapbox',
  searchTerm: 'Melbourne',
  cards: featureData.slice(0, 10)
}

Mapbox.storyName = 'Side panel'
