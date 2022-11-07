import { rplEventBus } from '@dpc-sdp/ripple-ui-core'

export function useRippleEvent(namespace: string, events: string[]) {
  const emit = defineEmits(events)
  // register global events under component namespace
  events.forEach((event) => {
    rplEventBus.register(`${namespace}/${event}`)
  })

  const emitRplEvent = (event, payload) => {
    emit(event, payload)
    rplEventBus.emit(`${namespace}/${event}`, payload)
  }

  return {
    emitRplEvent
  }
}

export default useRippleEvent
