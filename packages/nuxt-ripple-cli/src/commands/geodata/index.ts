import commander from 'commander'
import getLocalities from './getLocalities'
import getBudgetData from './getBudgetData'

export default function rplGeoDataCommand() {
  const rplGeoDataCommand = new commander.Command('geodata')

  rplGeoDataCommand
    .description(
      `Downloads geospatial data from VicMap Arc GIS for use in Ripple mapping search`
    )
    .argument('[savePath]', 'The path to save the file', 'localities.json')
    .argument('[script]', 'Script to run', 'localities')
    .option(
      '-w, --where <where>',
      'SQL query to pass to initial query, default is all (1=1)',
      '1=1'
    )
    .option(
      '-o, --offset <number>',
      'Start requesting localities at offset, can use this to resume interupted requests'
    )
    .action((script, savePath, options) => {
      switch (script) {
        case 'localities':
          console.log('fetching locality data...')
          getLocalities(savePath, options.where)
          break
        case 'budget':
          console.log('fetching budget data...')
          getBudgetData(savePath)
          break
      }
    })

  return rplGeoDataCommand
}
