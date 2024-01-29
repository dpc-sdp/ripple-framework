import { ref, provide } from 'vue'
import { RplAccordion } from '@dpc-sdp/ripple-ui-core/vue'
import RplMap from './RplMap.vue'
import RplMapProviderEsri from './providers/RplMapProviderEsri.vue'
import RplMapProviderVicMap from './providers/RplMapProviderVicMap.vue'
import RplMapProviderMapbox from './providers/RplMapProviderMapbox.vue'
import featureData from './__fixture__/largeset.json'

export default {
  title: 'Maps/Core',
  component: RplMap,
  tags: ['skip-test']
}

const Template = (args) => ({
  components: {
    RplMap,
    RplMapProviderEsri,
    RplMapProviderVicMap,
    RplMapProviderMapbox,
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
      getClusteredFeatures,
      args
    }
  },
  template: `
    <RplMap v-bind="args">
      <template #map-provider>
        <rpl-map-provider-esri v-if="args.provider === 'esri'" />
        <rpl-map-provider-vic-map v-if="args.provider === 'vicmap'" />
        <rpl-map-provider-mapbox v-if="args.provider === 'mapbox'" />
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
  provider: 'mapbox'
}

Mapbox.storyName = 'Mapbox'

export const Esri = Template.bind({})
Esri.args = {
  id: '123',
  projection: 'EPSG:3857',
  features: featureData,
  popupType: 'popover',
  provider: 'esri'
}

export const Vicmap = Template.bind({})
Vicmap.args = {
  id: '123',
  provider: 'vicmap',
  projection: 'EPSG:3857',
  popupType: 'popover',
  features: featureData
}
