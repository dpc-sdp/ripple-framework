import { rplEventBus } from '@dpc-sdp/ripple-ui-core'
import { default as VueGtag, useGtag } from 'vue-gtag-next'
export default function (nuxtApp) {
  const { event } = useGtag()

  rplEventBus.on('rpl-accordion/toggleAll', () => {
    event('rpl-accordion/toggleAll', {
      event_category: 'bbb',
      event_label: 'ccc'
    })
  })

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: ''
    }
  })
}
