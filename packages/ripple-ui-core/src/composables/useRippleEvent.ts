import { inject } from 'vue'
import rplEventBus from './../lib/eventbus'

export type rplEventPayload = {
  action?: string
  label?: string
  category?: string
  value?: unknown
}

export function useRippleEvent(namespace: string, emit) {
  const $rplEvent: typeof rplEventBus | undefined = inject('$rplEvent')
  const emitRplEvent = (event, payload: rplEventPayload) => {
    if (emit) {
      emit(event, payload)
    }
    $rplEvent?.emit(`${namespace}/${event}`, payload)
  }

  return {
    emitRplEvent
  }
}

export default useRippleEvent
