//@ts-nocheck runtime imports
import {
  defineEventHandler,
  getQuery,
  H3Event,
  getCookie,
  setResponseHeader,
  getHeader
} from 'h3'
import { createHandler, TidePageApi } from '@dpc-sdp/ripple-tide-api'
import { BadRequestError } from '@dpc-sdp/ripple-tide-api/errors'
import { useNitroApp } from '#imports'
import { AuthCookieNames } from '@dpc-sdp/nuxt-ripple-preview/utils'

export const createPageHandler = async (
  event: H3Event,
  tidePageApi: TidePageApi
) => {
  return createHandler(event, 'TidePageHandler', async () => {
    const query = await getQuery(event)

    if (!query.path || Array.isArray(query.path)) {
      throw new BadRequestError('Path is required')
    }

    if (Array.isArray(query.site)) {
      throw new BadRequestError('Duplicate site values')
    }

    const tokenCookie = getCookie(event, AuthCookieNames.ACCESS_TOKEN)
    const accessTokenExpiry = parseFloat(
      getCookie(event, AuthCookieNames.ACCESS_TOKEN_EXPIRY)
    )
    const isTokenExpired = accessTokenExpiry
      ? accessTokenExpiry < Date.now()
      : true

    const headers = {}

    // Only pass the access token if it is not expired, otherwise it will be rejected by the API
    if (tokenCookie && !isTokenExpired) {
      headers['X-OAuth2-Authorization'] = `Bearer ${tokenCookie}`
    }

    const sectionId = getHeader(event, 'x-section-request-id')

    const pageResponse = await tidePageApi.getPageByPath(
      query.path,
      query.site,
      {},
      headers,
      sectionId
    )

    // Need to pass on the section cache tags to the nuxt app
    if (pageResponse.headers && pageResponse.headers['section-cache-tags']) {
      setResponseHeader(
        event,
        'section-cache-tags',
        pageResponse.headers['section-cache-tags']
      )
    }

    return pageResponse.data
  })
}

export default defineEventHandler(async (event: H3Event) => {
  const nitroApp = useNitroApp()
  return createPageHandler(event, nitroApp.tide.pageApi)
})
