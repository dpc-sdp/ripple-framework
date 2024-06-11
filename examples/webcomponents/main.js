import { registerRplWebComponents } from '@dpc-sdp/ripple-ui-core/webcomponents'
import '@dpc-sdp/ripple-ui-core/style'
import '@dpc-sdp/ripple-ui-core/components/button/RplButton.css'

window.$rplFeatureFlags = {
  disablePrimaryLogo: false,
  disableFooterLogo: true
}
// Loads all ripple components
registerRplWebComponents()

import './components/analytics.js'
import './components/primarynav.js'
import './components/heroheader.js'
import './components/footer.js'
