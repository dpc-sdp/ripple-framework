import RplMapPopUp from './RplMapPopUp.vue'
import '@dpc-sdp/ripple-ui-core/style/components'

export default {
  title: 'Maps/PopUp',
  component: RplMapPopUp,
  tags: ['skip-test']
}

const Template = (args) => ({
  components: { RplMapPopUp },
  setup() {
    return { args }
  },
  template: `<RplMapPopUp v-bind="args">
    <template #header>
      {{args.title}}
    </template>
    <div>
      {{args.content}}
    </div>
  </RplMapPopUp>`
})

export const SideBar = Template.bind({})
SideBar.args = {
  isOpen: true,
  title: 'Title',
  content: 'Content',
  type: 'sidebar',
  isArea: false
}

SideBar.storyName = 'Sidebar style'

export const Popover = Template.bind({})
Popover.args = {
  type: 'popover',
  isOpen: true,
  title: 'Title',
  content: 'Content goes here.',
  isArea: false
}

Popover.storyName = 'Popover style'
