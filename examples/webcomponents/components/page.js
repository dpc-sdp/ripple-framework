if (window.$rplEventBus) {
  const evtKeys = Object.keys(eventListeners)
  if (evtKeys.length > 0) {
    evtKeys.forEach((key) => {
      window.$rplEventBus.on(key, eventListeners[key]())
    })
  }
}
