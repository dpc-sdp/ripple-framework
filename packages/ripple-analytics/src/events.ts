export default {
  'rpl-accordion/toggleAll': ({ event }) => {
    return (payload: any) => {
      event('rpl-accordion/toggleAll', {
        event_category: 'navigation',
        event_label: payload?.label,
        event_action: payload?.action
      })
    }
  },
  'rpl-accordion/toggleItem': ({ event }) => {
    return (payload: any) => {
      event('rpl-accordion/toggleItem', {
        event_category: 'navigation',
        event_label: payload?.label,
        event_action: payload?.action
      })
    }
  },
  'tide-page/navigate': ({ customMap }) => {
    return (payload: any) => {
      if (payload) {
        customMap({
          page_title: payload.title,
          page_type: payload.type
        })
      }
    }
  }
}
