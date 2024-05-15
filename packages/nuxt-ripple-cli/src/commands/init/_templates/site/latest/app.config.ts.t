---
to: app.config.ts
---
import pkg from './package.json'
import { getDpcPkgs } from '@dpc-sdp/ripple-tide-api/utils'
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  project: {
    name: pkg.name,
    version: pkg.version
  },
  ripple: {
    packages: getDpcPkgs({ ...pkg.dependencies, ...pkg.devDependencies }),
    featureFlags: {
      contentCollectionSearchConnector: 'elasticsearch'
    },
    theme: {}
  }
})
