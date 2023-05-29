export default defineAppConfig({
  ripple: {
    search: {
      filterUpdateHooks: {
        grantStatus: (id: string, value: unknown, searchDriver) => {
          const now = new Date()
          if (Array.isArray(value)) {
            value.forEach((val) => {
              switch (val) {
                case 'open':
                  searchDriver.addFilter('field_node_dates_start_value', {
                    name: 'grant_open_start',
                    to: now
                  })
                  searchDriver.addFilter('field_node_dates_end_value', {
                    name: 'grant_open_end',
                    from: now
                  })
                  break
                case 'closed':
                  searchDriver.addFilter('field_node_dates_end_value', {
                    name: 'grant_closed',
                    to: now
                  })
                  break
                case 'ongoing':
                  searchDriver.addFilter('field_node_on_going', true, 'any')
                  break

                default:
                  break
              }
            })
          }
        }
      }
    }
  }
})
