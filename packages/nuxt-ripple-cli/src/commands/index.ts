#!/usr/bin/env node
import commander from 'commander'
import rplMockCommand from './mock'
import rplInitCommand from './init'
import rplAddCommand from './add'
import rplFaviconCommand from './favicon'
import rplGeoDataCommand from './geodata'

const program = new commander.Command('ripple')

const rippleCli = program
  .name('Ripple CLI')
  .description('CLI Tools for scaffolding Ripple SDP sites and modules')
  .version('0.0.1')

rippleCli.addCommand(rplMockCommand())
rippleCli.addCommand(rplInitCommand())
rippleCli.addCommand(rplAddCommand())
rippleCli.addCommand(rplFaviconCommand())
rippleCli.addCommand(rplGeoDataCommand())
rippleCli.showHelpAfterError()
// TODO Add update command for existing sites

program.parse(process.argv)
