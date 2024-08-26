//@ts-nocheck runtime imports
import { defineEventHandler, H3Event } from 'h3'
import { createHandler, logger } from '@dpc-sdp/ripple-tide-api'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const createWebformProxyHandler = async (event: H3Event) => {
  const { public: config } = useRuntimeConfig()

  // if (!(await verifyCaptcha(event))) {
  //   console.log('alskdnl')
  //   sendError(
  //     event,
  //     createError({
  //       statusCode: 400,
  //       statusMessage: 'CAPTCHA validation error'
  //     })
  //   )
  //   return
  // }
  try {
    await verifyCaptcha(event)
  } catch (error) {
    console.error(error)
    sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'CAPTCHA validation error'
      })
    )
    return
  }

  const proxyMiddleware = createProxyMiddleware({
    target: config.tide.baseUrl,
    pathRewrite: {
      '^/api/tide/': '/api/v1/'
    },
    logger: logger,
    changeOrigin: true
  })

  return createHandler(event, 'TideWebformHandler', async () => {
    await new Promise((resolve, reject) => {
      proxyMiddleware(event.node.req, event.node.res, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  })
}

export default defineEventHandler(async (event: H3Event) => {
  return createWebformProxyHandler(event)
})
