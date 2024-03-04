import commander from 'commander'
import getLocalities from './getLocalities'

export default function rplMockCommand() {
  const rplMockCommand = new commander.Command('localities')

  rplMockCommand
    .description(`Downloads locality data from VicMap Arc GIS`)
    .argument('[savePath]', 'The path to save the file', 'localities.json')
    .option(
      '-w, --where <where>',
      'SQL query to fetch locality data, default is all localities (1=1)',
      '1=1'
    )
    .option(
      '-o, --offset <number>',
      'Start requesting localities at offset, can use this to resume interupted requests'
    )
    .action((savePath, options) => {
      getLocalities(savePath, options.where)
    })

  return rplMockCommand
}
