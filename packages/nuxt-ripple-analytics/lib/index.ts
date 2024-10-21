import { trackEvent } from './tracker'

export default {
  // UI Core components
  'rpl-accordion/toggleAll': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_accordion_all`,
        element_id: payload?.id,
        element_text: payload?.text,
        name: payload?.name,
        component: 'rpl-accordion',
        platform_event: 'toggleAll',
        ...payload
      })
    }
  },
  'rpl-accordion/toggleItem': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_accordion`,
        element_id: payload?.id,
        element_text: payload?.text,
        name: payload?.name,
        component: 'rpl-accordion',
        platform_event: 'toggleItem',
        ...payload
      })
    }
  },
  'rpl-alert/dismiss': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_alert`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        name: payload?.name,
        component: 'rpl-alert',
        platform_event: 'dismiss',
        ...payload
      })
    }
  },
  'rpl-breadcrumbs/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_breadcrumb`,
        element_id: payload?.id,
        element_text: payload?.text,
        link_url: payload?.value,
        index: payload?.index,
        name: payload?.name,
        component: 'rpl-breadcrumbs',
        platform_event: 'navigate',
        ...payload
      })
    }
  },
  'rpl-campaign-banner/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_banner`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        link_url: payload?.value,
        type: payload?.type,
        name: payload?.name,
        component: 'rpl-campaign-banner',
        component_options: payload?.options,
        platform_event: 'navigate',
        ...payload
      })
    }
  },
  'rpl-card/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_card`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        name: payload?.name,
        index: payload?.index,
        link_url: payload?.value,
        type: payload?.type,
        component: 'rpl-card',
        platform_event: 'navigate',
        ...payload
      })
    }
  },
  'rpl-card-carousel/paginate': () => {
    return (payload: any) => {
      trackEvent({
        event: `paginate_${payload.action}`,
        element_id: payload?.id,
        element_text: payload?.text,
        name: payload?.name,
        index: payload?.index,
        component: 'rpl-card-carousel',
        platform_event: 'paginate',
        ...payload
      })
    }
  },
  'rpl-card-carousel/swipe': () => {
    return (payload: any) => {
      trackEvent({
        event: `swipe_${payload.action}`,
        element_id: payload?.id,
        name: payload?.name,
        index: payload?.index,
        component: 'rpl-card-carousel',
        platform_event: 'swipe',
        ...payload
      })
    }
  },
  'rpl-chip/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_chip`,
        element_id: payload?.id,
        element_text: payload?.text,
        name: payload?.name,
        index: payload?.index,
        link_url: payload?.value,
        component: 'rpl-chip',
        platform_event: 'navigate',
        ...payload
      })
    }
  },
  'rpl-contact-us/itemClick': () => {
    return (payload: any) => {
      const { host } = new URL(payload?.value)

      trackEvent({
        event: `${payload.action}_${payload?.type || 'link'}`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        name: payload?.name,
        link_url: payload?.value,
        link_domain: host,
        component: 'rpl-contact-us',
        platform_event: 'itemClick',
        ...payload
      })
    }
  },
  'rpl-data-table/expandRow': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_table_row`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        name: payload?.name,
        index: payload?.index,
        component: 'rpl-data-table',
        platform_event: 'expandRow',
        ...payload
      })
    }
  },
  'rpl-document/download': () => {
    return (payload: any) => {
      trackEvent({
        event: `document_${payload.action}`,
        element_id: payload?.id,
        element_text: payload?.text,
        link_url: payload?.value,
        name: payload?.name,
        component: 'rpl-document',
        platform_event: 'download',
        ...payload
      })
    }
  },
  'rpl-document/print': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_document`,
        element_id: payload?.id,
        element_text: payload?.text,
        link_url: payload?.value,
        name: payload?.name,
        component: 'rpl-document',
        platform_event: 'print',
        ...payload
      })
    }
  },
  'rpl-file/download': () => {
    return (payload: any) => {
      const { $app_origin } = useNuxtApp()
      const { host, pathname } = new URL(payload?.value, $app_origin)

      trackEvent({
        event: `file_${payload.action}`,
        element_id: payload?.id,
        element_text: payload?.text,
        file_name: pathname.split('/').pop(),
        file_extension: payload?.type,
        file_size: payload?.size,
        link_url: payload?.value,
        link_domain: host,
        name: payload?.name,
        component: 'rpl-file',
        platform_event: 'download',
        ...payload
      })
    }
  },
  'rpl-footer/expand': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_footer_nav`,
        element_id: payload?.id,
        element_text: payload?.text,
        index: payload?.index,
        name: payload?.name,
        component: 'rpl-footer',
        platform_event: 'expand',
        ...payload
      })
    }
  },
  'rpl-footer/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_footer`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        index: payload?.index,
        link_url: payload?.value,
        name: payload?.name,
        component: 'rpl-footer',
        platform_event: 'navigate',
        ...payload
      })
    }
  },
  'rpl-header/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_header_${payload?.elementType || 'link'}`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        link_url: payload?.value,
        section: payload?.section,
        theme: payload?.theme,
        type: payload?.type,
        name: payload?.name,
        component: 'rpl-header',
        component_options: payload?.options,
        platform_event: 'navigate',
        ...payload
      })
    }
  },
  'rpl-in-page-navigation/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_in_page_nav`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        link_url: payload?.value,
        name: payload?.name,
        component: 'rpl-in-page-navigation',
        platform_event: 'navigate',
        ...payload
      })
    }
  },
  'rpl-media-embed/viewTranscript': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_transcript`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        type: payload?.type,
        name: payload?.name,
        component: 'rpl-media-embed',
        platform_event: 'viewTranscript',
        ...payload
      })
    }
  },
  'rpl-media-embed/viewFullscreen': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_fullscreen`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        type: payload?.type,
        name: payload?.name,
        component: 'rpl-media-embed',
        platform_event: 'viewFullscreen',
        ...payload
      })
    }
  },
  'rpl-media-embed/viewData': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_data`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        type: payload?.type,
        name: payload?.name,
        component: 'rpl-media-embed',
        platform_event: 'viewData',
        ...payload
      })
    }
  },
  'rpl-media-embed/downloadImage': () => {
    return (payload: any) => {
      const { $app_origin } = useNuxtApp()
      const { pathname, host } = new URL(payload?.value, $app_origin)
      const fileName = pathname.split('/').pop()

      trackEvent({
        event: `file_${payload.action}`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        link_url: payload?.value,
        link_domain: host,
        file_name: fileName,
        file_extension: fileName.split('.').pop(),
        type: payload?.type,
        name: payload?.name,
        component: 'rpl-media-embed',
        platform_event: 'downloadImage',
        ...payload
      })
    }
  },
  'rpl-media-gallery/paginate': () => {
    return (payload: any) => {
      trackEvent({
        event: `paginate_${payload.action}`,
        element_id: payload?.id,
        element_text: payload?.text,
        index: payload?.index,
        label: payload?.label,
        name: payload?.name,
        component: 'rpl-media-gallery',
        platform_event: 'paginate',
        ...payload
      })
    }
  },
  'rpl-media-gallery/swipe': () => {
    return (payload: any) => {
      trackEvent({
        event: `swipe_${payload.action}`,
        element_id: payload?.id,
        index: payload?.index,
        label: payload?.label,
        name: payload?.name,
        component: 'rpl-media-gallery',
        platform_event: 'swipe',
        ...payload
      })
    }
  },
  'rpl-media-gallery/viewFullscreen': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_fullscreen`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        name: payload?.name,
        value: payload?.value,
        index: payload?.index,
        component: 'rpl-media-gallery',
        platform_event: 'viewFullscreen',
        ...payload
      })
    }
  },
  'rpl-page-links/paginate': () => {
    return (payload: any) => {
      trackEvent({
        event: `paginate_${payload.action}`,
        element_id: payload?.id,
        element_text: payload?.text,
        link_url: payload?.value,
        name: payload?.name,
        count: payload?.count,
        index: payload?.index,
        component: 'rpl-page-links',
        platform_event: 'paginate',
        ...payload
      })
    }
  },
  'rpl-primary-nav/quickExit': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_quick_exit`,
        element_id: payload?.id,
        element_text: payload?.text,
        link_url: payload?.value,
        name: payload?.name,
        component: 'rpl-primary-nav',
        platform_event: 'quickExit',
        ...payload
      })
    }
  },
  'rpl-primary-nav/toggleMenu': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_menu`,
        element_id: payload?.id,
        element_text: payload?.text,
        name: payload?.name,
        component: 'rpl-primary-nav',
        platform_event: 'toggleMenu',
        ...payload
      })
    }
  },
  'rpl-primary-nav/toggleMenuItem': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_menu_item`,
        element_id: payload?.id,
        element_text: payload?.text,
        index: payload?.index,
        name: payload?.name,
        component: 'rpl-primary-nav',
        platform_event: 'toggleMenuItem',
        ...payload
      })
    }
  },
  'rpl-primary-nav/clickBackButton': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_menu_back`,
        element_id: payload?.id,
        element_text: payload?.text,
        index: payload?.index,
        name: payload?.name,
        component: 'rpl-primary-nav',
        platform_event: 'clickBackButton',
        ...payload
      })
    }
  },
  'rpl-primary-nav/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_menu_item`,
        element_id: payload?.id,
        element_text: payload?.text,
        index: payload?.index,
        link_url: payload?.value,
        name: payload?.name,
        component: 'rpl-primary-nav',
        platform_event: 'navigate',
        ...payload
      })
    }
  },
  'rpl-primary-nav/toggleSearch': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_search`,
        element_id: payload?.id,
        name: payload?.name,
        component: 'rpl-primary-nav',
        platform_event: 'toggleSearch',
        ...payload
      })
    }
  },
  'rpl-related-links/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_related_link`,
        element_id: payload?.id,
        element_text: payload?.text,
        index: payload?.index,
        name: payload?.name,
        link_url: payload?.value,
        component: 'rpl-related-links',
        platform_event: 'navigate',
        ...payload
      })
    }
  },
  'rpl-search-result/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_search_result`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        name: payload?.name,
        link_url: payload?.value,
        component: 'rpl-search-result',
        platform_event: 'navigate',
        ...payload
      })
    }
  },
  'rpl-search-bar/submit': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.value,
        type: payload?.type,
        name: payload?.name,
        component: 'rpl-search-bar',
        platform_event: 'search',
        ...payload
      })
    }
  },
  'rpl-social-share/openShareWindow': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_social`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        name: payload?.text?.toLowerCase(),
        component: 'rpl-social-share',
        platform_event: 'openShareWindow',
        ...payload
      })
    }
  },
  'rpl-tabs/toggleTab': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_tab`,
        element_id: payload?.id,
        element_text: payload?.text,
        name: payload?.name,
        component: 'rpl-tabs',
        platform_event: 'toggleTab',
        ...payload,
        ...payload
      })
    }
  },
  'rpl-timeline/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_timeline_item`,
        element_id: payload?.id,
        element_text: payload?.text,
        name: payload?.name,
        link_url: payload?.value,
        component: 'rpl-timeline',
        platform_event: 'navigate',
        ...payload
      })
    }
  },
  'rpl-vertical-nav/toggleMenuItem': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_menu_item`,
        element_id: payload?.id,
        element_text: payload?.text,
        name: payload?.name,
        component: 'rpl-vertical-nav',
        platform_event: 'toggleMenuItem',
        ...payload
      })
    }
  },
  'rpl-vertical-nav/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_menu_item`,
        element_id: payload?.id,
        element_text: payload?.text,
        link_url: payload?.value,
        name: payload?.name,
        index: payload?.index,
        component: 'rpl-vertical-nav',
        platform_event: 'navigate',
        ...payload
      })
    }
  },
  'rpl-layout-back-to-top/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_back_to_top`,
        element_text: payload?.text,
        value: payload?.value,
        component: 'rpl-layout-back-to-top',
        platform_event: 'navigate',
        ...payload
      })
    }
  },
  // UI Forms components
  'rpl-form/start': () => {
    return (payload: any) => {
      trackEvent({
        event: `form_start`,
        form_id: payload?.id,
        form_name: payload?.name,
        component: 'rpl-form',
        platform_event: 'start',
        ...payload
      })
    }
  },
  'rpl-form/abandon': () => {
    return (payload: any) => {
      trackEvent({
        event: `form_abandon`,
        form_id: payload?.id,
        form_name: payload?.name,
        component: 'rpl-form',
        platform_event: 'abandon',
        form_data: payload?.value,
        ...payload
      })
    }
  },
  'rpl-form/submit': () => {
    return (payload: any) => {
      trackEvent({
        event: `form_${payload.action}`,
        form_id: payload?.id,
        form_name: payload?.name,
        form_valid: true,
        form_data: payload?.value,
        element_text: payload?.text,
        component: 'rpl-form',
        platform_event: 'submit',
        ...payload
      })
    }
  },
  'rpl-form/invalid': () => {
    return (payload: any) => {
      trackEvent({
        event: `form_${payload.action}`,
        form_id: payload?.id,
        form_name: payload?.name,
        form_valid: false,
        form_data: payload?.value,
        element_text: payload?.text,
        component: 'rpl-form',
        platform_event: 'submit',
        ...payload
      })
    }
  },
  'rpl-form/submitted': () => {
    return (payload: any) => {
      trackEvent({
        event: `form_${payload.action}`,
        form_id: payload?.id,
        form_name: payload?.name,
        form_data: payload?.value,
        element_text: payload?.text,
        component: 'rpl-form',
        platform_event: 'submit',
        ...payload
      })
    }
  },
  'rpl-form-actions/reset': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_reset_form`,
        form_id: payload?.contextId,
        form_name: payload?.contextName,
        element_text: payload?.text,
        component: 'rpl-form-actions',
        platform_event: 'resetForm',
        ...payload
      })
    }
  },
  'rpl-form-date/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_form_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        value: payload?.value,
        type: 'date',
        component: 'rpl-form-date',
        platform_event: 'update',
        ...payload
      })
    }
  },
  'rpl-form-date-range/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_form_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        value: payload?.value,
        type: 'date-range',
        component: 'rpl-form-date-range',
        platform_event: 'update',
        ...payload
      })
    }
  },
  'rpl-form-dropdown/toggleOpen': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_form_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        value: payload?.value,
        type: 'select',
        component: 'rpl-form-dropdown',
        platform_event: 'toggleOpen',
        ...payload
      })
    }
  },
  'rpl-form-dropdown/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_form_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        value: payload?.value,
        type: 'select',
        component: 'rpl-form-dropdown',
        platform_event: 'update',
        ...payload
      })
    }
  },
  'rpl-form-input/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_form_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        type: payload?.type,
        value: payload?.value,
        component: 'rpl-form-input',
        platform_event: 'update',
        ...payload
      })
    }
  },
  'rpl-form-number/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_form_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        type: payload?.type,
        value: payload?.value,
        component: 'rpl-form-number',
        platform_event: 'update',
        ...payload
      })
    }
  },
  'rpl-form-option/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_form_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        type: payload?.type,
        value: payload?.value,
        component: 'rpl-form-option',
        platform_event: 'update',
        ...payload
      })
    }
  },
  'rpl-form-option-buttons/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_form_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        value: payload?.value,
        type: 'radio',
        component: 'rpl-form-option-buttons',
        platform_event: 'update',
        ...payload
      })
    }
  },
  'rpl-form-checkbox-group/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_form_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        value: payload?.value,
        type: 'checkbox',
        component: 'rpl-form-checkbox-group',
        platform_event: 'update',
        ...payload
      })
    }
  },
  'rpl-form-radio-group/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_form_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        value: payload?.value,
        type: 'radio',
        component: 'rpl-form-radio-group',
        platform_event: 'update',
        ...payload
      })
    }
  },
  'rpl-form-textarea/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_form_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        value: payload?.value,
        type: 'textarea',
        component: 'rpl-form-textarea',
        platform_event: 'update',
        ...payload
      })
    }
  },
  // Tide search
  'tide-search/submit': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}`,
        element_id: payload?.id,
        element_text: payload?.text,
        filters: payload?.options,
        label: payload?.label,
        name: payload?.name,
        type: payload?.type,
        form_id: payload?.contextId,
        component: `tide-${payload.section || 'search'}`,
        platform_event: 'search',
        ...payload
      })
    }
  },
  'tide-search/results': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_search_results`,
        element_id: payload?.id,
        label: payload?.label,
        name: payload?.name,
        form_id: payload?.contextId,
        index: payload?.index,
        filters: payload?.options,
        count: payload?.value,
        component: `tide-${payload.section || 'search'}`,
        platform_event: 'search',
        ...payload
      })
    }
  },
  'tide-search/paginate': () => {
    return (payload: any) => {
      trackEvent({
        event: `paginate_${payload.action}`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        name: payload?.name,
        form_id: payload?.contextId,
        index: payload?.index,
        count: payload?.value,
        filters: payload?.options,
        component: `tide-${payload.section || 'search'}`,
        platform_event: 'paginate',
        ...payload
      })
    }
  },
  'tide-search/toggleFilters': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_filters`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        name: payload?.name,
        form_id: payload?.contextId,
        filters: payload?.options,
        component: `tide-${payload.section || 'search'}`,
        platform_event: 'toggleFilters',
        ...payload
      })
    }
  },
  'tide-search/reset': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_filters`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        name: payload?.name,
        count: payload?.value,
        type: payload?.type,
        form_id: payload?.contextId,
        filters: payload?.options,
        component: `tide-${payload.section || 'search'}`,
        platform_event: 'clearQuery',
        ...payload
      })
    }
  },
  'testing/testFire': () => {
    return (payload: any) => {
      trackEvent({
        event: `testfire`,
        ...(payload || {}),
      })
    }
  }
}

export { trackEvent }
