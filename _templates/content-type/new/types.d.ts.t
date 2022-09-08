---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/types.d.ts
---

import type { TidePageBase } from '@dpc-sdp/ripple-tide-api/types'

export type Tide<%= h.changeCase.pascalCase(name) %>Component = {
  id: string
  component: string
  props: Record<string, any>
  class?: Record<string, any>
}

export default interface Tide<%= h.changeCase.pascalCase(name) %>Page extends TidePageBase {
  /**
   * @description Dynamic components for the header section
   */
  headerComponents: Tide<%= h.changeCase.pascalCase(name) %>Component[]
  /**
   * @description Dynamic components for the body section
   */
  bodyComponents: Tide<%= h.changeCase.pascalCase(name) %>Component[]
}
