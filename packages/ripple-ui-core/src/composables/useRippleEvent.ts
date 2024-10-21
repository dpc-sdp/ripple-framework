import { inject } from 'vue'
import rplEventBus from './../lib/eventbus'
import useEventContext from '../composables/useEventContext'

export type rplEventPayload = {
  id?: string
  action?: string
  text?: string
  label?: string
  value?: any
  index?: number
  type?: string
  section?: string
  theme?: string[]
  options?: string | string[]
  elementType?: string
  contextId?: string
  contextName?: string
  [key: string]: unknown
}

export type rplEventOptions = {
  global?: boolean
}

export function useRippleEvent(namespace: string, emit?: any) {
  const $rplEvent: typeof rplEventBus | undefined = inject('$rplEvent')
  const { context } = useEventContext()

  const emitRplEvent = (
    event: string,
    payload: rplEventPayload = {},
    options: rplEventOptions = {}
  ) => {
      payload = { ...(context?.value || {}), ...payload }
    if (emit) {
      emit(event, payload)
    }
    if (options?.global) {
      $rplEvent?.emit(`${namespace}/${event}`, payload)
    }
  }

  const withOptions = (props: any, using: string[]) => {
    return Object.keys(props).filter((key) => using.includes(key) && props[key])
  }

  return { emitRplEvent, withOptions }
}
