const verifyGoogleRecaptcha = async (runtimeConfig, captchaResponse) => {
  try {
    const verifyResponse = await $fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        body: `secret=${runtimeConfig.recaptchaSecretKey}&response=${captchaResponse}`,
        headers: { 'Content-type': 'application/x-www-form-urlencoded' }
      }
    )

    if (!verifyResponse?.success) {
      return false
    }

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const verifyCloudfareTurnstile = async (runtimeConfig, captchaResponse) => {
  // TODO
  return false
}

const verify = async (runtimeConfig, captchaType, captchaResponse) => {
  console.log(captchaType)
  switch (captchaType) {
    case 'recaptcha':
      return await verifyGoogleRecaptcha(runtimeConfig, captchaResponse)
    case 'turnstile':
      return await verifyCloudfareTurnstile(runtimeConfig, captchaResponse)
    default:
      return false
  }
}

const verifyCaptcha = async (event) => {
  const config = useRuntimeConfig()
  const captchaResponse = getHeader(event, 'x-captcha-response')

  const webform = await $fetch('/api/tide/webform', {
    baseURL: config.apiUrl || '',
    params: {
      id: 'test_form_jeff'
    }
  })

  if (!webform) {
    throw new Error(
      `Couldn't get webform data, unable to continue because we don't know if a captcha is required`
    )
  }

  const formHasCaptcha = webform?.captchaConfig?.enabled

  if (!formHasCaptcha) {
    return true
  }

  const isValid = await verify(
    config,
    webform?.captchaConfig?.type,
    captchaResponse
  )

  if (!isValid) {
    throw new Error('aslkdnalksdm')
  }
}

export default verifyCaptcha
