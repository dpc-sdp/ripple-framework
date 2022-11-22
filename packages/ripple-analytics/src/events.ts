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
        const hasAccordion = () => {
          if (payload.type === 'landing_page') {
            return payload.bodyComponents?.some(
              (cmp: any) => cmp.component === 'RplAccordion'
            )
          }
        }
        customMap({
          page_title: payload.title,
          page_type: payload.type,
          has_accordion: hasAccordion()
        })
      }
    }
  }
}
