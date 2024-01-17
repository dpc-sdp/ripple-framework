import commander from 'commander'
import getLocalities from './getLocalities'

export default function rplMockCommand() {
  const rplMockCommand = new commander.Command('localities')

  rplMockCommand
    .description(`Downloads locality data from VicMap Arc GIS`)
    .argument('[savePath]', 'The path to save the file', 'localities.json')
    .action((savePath) => {
      getLocalities(savePath)
    })
  return rplMockCommand
}
