const getGoogleRecaptchaResponse = (_window) => {
  return _window.grecaptcha.getResponse()
}

const getCloudfareTurnstileResponse = (_window) => {
  // TODO
  return ''
}

const getResponse = (captchaType, _window) => {
  // TODO
  switch (captchaType) {
    case 'recaptcha':
      return getGoogleRecaptchaResponse(_window)
    case 'turnstile':
      return getCloudfareTurnstileResponse(_window)
    default:
      return null
  }
}

export const getCaptchaResponse = (captchaConfig, _window) => {
  if (!captchaConfig.enabled) {
    return null
  }

  const response = getResponse(captchaConfig.type, _window)

  if (!response) {
    throw new Error('No captcha response')
  }

  return response
}
