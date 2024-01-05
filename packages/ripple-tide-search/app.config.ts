export default defineAppConfig({
  ripple: {
    search: {
      contentTypes: [
        'landing_page',
        'event',
        'grant',
        'news',
        'publication',
        'publication_page'
      ],
      queryFunctions: {
        dependentEncoding: (config, value) => {
          let newValue = null
          const parent = value[`${config.id}-parent`]
          const child = value[`${config.id}-child`]

          if (parent) {
            newValue = parent

            if (child) {
              newValue = `${newValue}:${child.join(',')}`
            }
          }

          return newValue
        },
        dependentDecoding: (config, value) => {
          if (value) {
            const [parent, child = ''] = value.split(':')

            value = {
              [`${config.id}-parent`]: parent
            }

            if (child) {
              value = { ...value, [`${config.id}-child`]: child.split(',') }
            }
          }

          return value
        }
      },
      filterFunctions: {
        dependentValue: (filterConfig, value) => {
          const parent = value?.[`${filterConfig?.id}-parent`]
          const child = value?.[`${filterConfig?.id}-child`]?.filter(Boolean)

          // If we're searching for specific subcategories, let's use those subcategories
          if (child?.length) {
            return {
              terms: {
                [filterConfig?.filter?.field]: child
              }
            }
          }

          // Otherwise we'll search for the selected parent category and all subcategories
          if (parent) {
            const parentID = filterConfig.props.options?.find(
              (i) => i.value === parent
            )?.id

            return {
              terms: {
                [filterConfig?.filter?.field]: filterConfig.props.options
                  ?.filter(
                    (option) =>
                      option.parent === parentID || option.id === parentID
                  )
                  .map((i) => i.value)
              }
            }
          }
        }
      }
    }
  }
})
