export default defineAppConfig({
  ripple: {
    search: {
      filterUpdateHooks: {
        singleFieldSelect: (
          id,
          value,
          searchDriver,
          field,
          filterType = 'any'
        ) => {
          searchDriver.addFilter(field, value, filterType)
        }
      }
    }
  }
})
