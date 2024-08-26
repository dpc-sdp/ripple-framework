import { useRuntimeConfig, useNuxtData, useFetch, useTideError } from '#imports'

const getThirdPartyScript = (captchaType: string) => {
  switch (captchaType) {
    case 'recaptcha':
      return {
        src: 'https://www.google.com/recaptcha/api.js?render=explicit',
        tagPosition: 'head',
        async: false,
        defer: true
      }
    case 'turnstile':
      return {
        src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
        tagPosition: 'head',
        async: false,
        defer: false
      }
    default:
      return null
  }
}

const initialiseCaptcha = (formId, captchaConfig, _window) => {
  const captchaElementId = `rpl-captcha-element__${formId}`

  switch (captchaConfig.type) {
    case 'recaptcha':
      if (_window) {
        return _window.grecaptcha.render(captchaElementId, {
          sitekey: captchaConfig.siteKey,
          theme: 'light'
        })
      }
      break
    case 'turnstile':
      if (_window) {
        return _window.turnstile.ready(function () {
          window.turnstile.render(`#${captchaElementId}`, {
            sitekey: captchaConfig.siteKey,
            callback: function (token) {
              console.log(`Challenge Success ${token}`)
            }
          })
        })
      }
      break
    default:
      return null
  }
}

export const useCaptchaWidget = async (formId, captchaConfig): Promise<any> => {
  console.log('asdlknaslkdasd', captchaConfig)
  if (!captchaConfig?.enabled) {
    return null
  }

  useHead({
    script: [getThirdPartyScript(captchaConfig.type)]
  })

  onMounted(() => {
    initialiseCaptcha(formId, captchaConfig, window)
  })
}

export default useCaptchaWidget
