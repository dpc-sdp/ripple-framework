import { rplEventBus } from './../lib/eventbus'

export default {
  install: (app) => {
    app.provide('$rplEvent', rplEventBus)
  }
}
