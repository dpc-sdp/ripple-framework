import type { ApiWebForm } from './../types'

export const getCaptchaSettings = (webform: ApiWebForm): CaptchaSettings => {
  return {
    enabled: webform?.third_party_settings?.tide_webform?.enable_captcha === 1,
    type: webform?.third_party_settings?.tide_webform?.captcha_type,
    siteKey:
      webform?.third_party_settings?.tide_webform?.captcha_details?.site_key
  }
}
