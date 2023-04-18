import jsonapiParse from 'jsonapi-parse'
import TideApiBase from './tide-api-base.js'
import defaultMapping from './lib/default-mapping.js'
import type {
  RplTideModuleConfig,
  IRplTideModuleMapping,
  IRplTideDynamicComponentMapping
} from './../../types'
import { ApplicationError, NotFoundError } from '../errors/errors.js'
import { ILogger } from '../logger/logger'

export default class TidePageApi extends TideApiBase {
  contentTypes: {
    [key: string]: IRplTideModuleMapping
  }
  dynamicComponents: {
    [key: string]: IRplTideDynamicComponentMapping
  }
  site: string
  sectionId: string
  path: string

  constructor(tide: RplTideModuleConfig, logger: ILogger) {
    super(tide, logger)
    this.site = tide.site
    this.sectionId = ''
    this.path = ''
    this.contentTypes = {}
    this.dynamicComponents = {}
    this.logLabel = 'TidePage'
  }

  setContentType(key, value) {
    if (!this.contentTypes[key]) {
      this.contentTypes[key] = value
    }
  }

  setDynamicComponent(key, cmp: IRplTideDynamicComponentMapping) {
    if (this.dynamicComponents.hasOwnProperty(key)) {
      this.logger.debug(`Replacing ${key} component which has already been set`)
    }
    this.dynamicComponents[key] = cmp
  }

  getDynamicComponent(k: string) {
    return this.dynamicComponents[k]
  }

  async getDynamicPageComponents(pageData, componentFieldPath) {
    const componentFields = pageData[componentFieldPath]
    const mappedComponents: Record<string, any>[] = []

    if (componentFields && Array.isArray(componentFields)) {
      for (let i = 0; i < componentFields.length; i++) {
        const cmpData = componentFields[i]

        const componentConfig = this.getDynamicComponent(cmpData.type)
        if (!componentConfig) {
          this.logger.error(`Component ${cmpData.type} mapping not found`)
          continue
        }
        const componentMapping = componentConfig.mapping
        if (componentMapping.constructor.name === 'AsyncFunction') {
          const data = await componentMapping.apply(this, [
            cmpData,
            pageData,
            this
          ])
          mappedComponents.push({
            uuid: cmpData.uuid || cmpData.id,
            ...data
          })
        } else if (typeof componentMapping === 'function') {
          const data = componentMapping.apply(this, [cmpData, pageData])
          mappedComponents.push({
            uuid: cmpData.uuid || cmpData.id,
            ...data
          })
        }
      }

      return mappedComponents
    }
  }

  async getRouteByPath(path: string, site: string = this.site) {
    this.path = path

    const routeUrl = `/route?site=${site}&path=${path}`
    return this.get(routeUrl)
      .then((response) => response?.data?.attributes)
      .catch((error) => {
        throw new NotFoundError(
          `Route for site "${site}" and path "${path}" not found`,
          {
            cause: error
          }
        )
      })
  }

  async getPageByPath(
    path: string,
    siteQuery: string | undefined,
    config = {}
  ) {
    const site = siteQuery || this.site

    if (this.isShareLink(path)) {
      return this.getPageByShareLink(path, site)
    }
    // if (this.isPreviewLink(path)) {
    //   return this.getPageFromPreviewLink(path, config)
    // }

    const route = await this.getRouteByPath(path, site)
    if (route && !route.error) {
      if (route.hasOwnProperty('redirect_type')) {
        return {
          type: 'redirect',
          ...route
        }
      }
      const includes = this.getResourceIncludes(route)
      const params = {
        site,
        ...config
      }
      if (includes !== '') {
        params['include'] = includes
      }
      return this.getPageByRouteData(route, { params })
    }
  }

  async getPageByShareLink(path: string, site: string) {
    const response = await this.get(path).then((res) => {
      return res?.data ? jsonapiParse.parse(res).data || res.data : null
    })

    if (!response) {
      throw new ApplicationError('No data returned for share link')
    }

    const routeData = {
      entity_type: 'node',
      uuid: response.shared_node.id,
      bundle: response.shared_node.type.replace('node--', '')
    }

    const params: any = {
      site,
      include: this.getResourceIncludes(routeData)
    }

    if (response?.vid) {
      params.resourceVersion = `id:${response.vid}`
    }

    return await this.getPageByRouteData(routeData, {
      headers: { 'X-Share-Link-Token': response.id },
      params
    })
  }

  // async getPageFromPreviewLink(path, config = { params: {} }): Promise<any> {
  //   const { 2: contentType, 3: uuid, 4: revisionId } = path.split('/')
  //   const routeData = {
  //     entity_type: 'node',
  //     bundle: contentType,
  //     uuid: uuid
  //   }
  //   const resourceVersion =
  //     revisionId === 'latest' ? 'rel:working-copy' : `id:${revisionId}`

  //   if (config.headers['x-oauth2-authorization']) {
  //     try {
  //       const pageData = await this.getPageByRouteData(routeData, {
  //         headers: {
  //           'x-oauth2-authorization': config.headers['x-oauth2-authorization']
  //         },
  //         params: {
  //           ...config.params,
  //           site: 4,
  //           resourceVersion,
  //           include: this.getResourceIncludes(routeData.bundle)
  //         }
  //       })
  //       return Promise.resolve(pageData)
  //     } catch (error) {
  //       return Promise.reject(
  //         this.handleError(
  //           { message: 'Unauthorized', error },
  //           (error.response && error.response.status) || 401
  //         )
  //       )
  //     }
  //   }
  //   return Promise.reject(this.handleError({ message: 'Unauthorized' }, 401))
  // }

  getResourceIncludes(route) {
    const includes = [...this.getContentTypeField('includes', route)]

    // Get all the needed includes for this dynamic components that can appear in this content type
    const dynamicComponentIncludes = Object.values(
      this.dynamicComponents
    ).reduce((result, component: IRplTideDynamicComponentMapping): string[] => {
      if (component.contentTypes?.includes(route.bundle)) {
        return [...result, ...component.includes]
      }
      return result
    }, [] as string[])

    includes.push(...dynamicComponentIncludes)

    if (
      defaultMapping &&
      Array.isArray(includes) &&
      Array.isArray(defaultMapping.includes) &&
      defaultMapping.includes.length > 0
    ) {
      includes.push(...defaultMapping.includes)
    }
    return includes ? includes.toString() : ''
  }

  isShareLink(route) {
    if (typeof route !== 'string') {
      return false
    }
    return route.indexOf('/share_link/') === 0
  }

  isPreviewLink(route) {
    if (typeof route !== 'string') {
      return false
    }
    return route.indexOf('/preview/') === 0
  }

  async getPageByRouteData(route, config) {
    if (route && route.entity_type && route.bundle && route.uuid) {
      // The route response has a 'section' attribute, which is the site id used to
      // determine which menu appears in the 'site section navigation'
      // We capture it here so that it can be used in the mapping functions
      this.sectionId = route.section

      const nodeUrl = `/${route.entity_type}/${route.bundle}/${route.uuid}`
      return await this.get(nodeUrl, config).then((response) => {
        if (response.data) {
          const data = jsonapiParse.parse(response).data || response.data
          return this.getTidePage(data, route)
        }
        return response
      })
    }
    throw new Error('Invalid route')
  }

  async getTidePage(resource, route) {
    if (this.debug) {
      defaultMapping.mapping['_source'] = (src) => src
    }
    const contentTypeMapping = this.getContentTypeField('mapping', route)
    if (!contentTypeMapping) {
      throw new ApplicationError(
        `Unable to resolve content type - ${route.bundle}`
      )
    }
    return this.getMappedData(
      { ...defaultMapping.mapping, ...contentTypeMapping },
      resource
    )
  }

  async getContentList(type: string, options: any = {}) {
    const params = {
      site: this.site,
      ...options
    }
    if (options?.include) {
      params.include = options.include.toString()
    }

    try {
      const response = await this.get(`/node/${type}`, {
        params
      })
      if (response) {
        return jsonapiParse.parse(response).data
      }
    } catch (error: any) {
      throw new ApplicationError(`Error fetching content list for ${type}`, {
        cause: error
      })
    }
  }

  async getEntityList(
    entityType,
    bundle,
    filtering,
    includes,
    pagination,
    sorting,
    { allPages = true } = {}
  ) {
    const params: Record<string, any> = {
      site: this.site
    }
    // docs: https://www.drupal.org/docs/8/modules/json-api/filtering
    if (filtering) {
      params.filter = filtering
    }
    // docs: https://www.drupal.org/docs/8/modules/json-api/includes
    if (includes) {
      params.include = includes.toString()
    }
    // docs: https://www.drupal.org/docs/8/modules/json-api/pagination
    if (pagination) {
      params.page = pagination
    }
    // docs: https://www.drupal.org/docs/8/modules/json-api/sorting
    if (sorting) {
      params.sort = sorting
    }
    try {
      // Give more time for list response, normally it's slow
      const response = await this.get(`${entityType}/${bundle}`, { params })

      if (allPages) {
        const allPagesData = await this.getAllPaginatedData(response)
        if (allPagesData instanceof Error) {
          throw allPagesData
        }
        return allPagesData
      } else {
        return jsonapiParse.parse(response).data
      }
    } catch (error) {
      throw new ApplicationError(
        `Failed to get a entity list from Tide API for "${entityType}:${bundle}"`,
        { cause: error }
      )
    }
  }

  /**
   * Used for get paginated response data
   * @param {*} response
   * @param {*} parse
   * @param {*} headersConfig
   * @returns {Object} a response data with all JSON:API pages or an instance of Error
   */
  async getAllPaginatedData(response, parse = true, headersConfig = {}) {
    let data = parse ? jsonapiParse.parse(response).data : response.data

    while (response.links && response.links.next) {
      const resource = this.jsonApiLinkToResource(response.links.next)

      this.logger.debug(`Tide get next page: ${resource}`)

      // Use getByURL directly here because resource url contains all query params.
      try {
        response = await this.get(resource, {
          headers: headersConfig,
          site: this.site
        })
        const nextData = parse
          ? jsonapiParse.parse(response).data
          : response.data
        data = data.concat(nextData)
      } catch (error) {
        throw new ApplicationError('Failed to get next page data', {
          cause: error
        })
      }
    }
    return data
  }

  // Extract api resource url from a full url from API response
  // e.g 'http://exmaple.com/api/v1/node/page?site=4...' => 'node/page?site=4...'
  jsonApiLinkToResource(jsonApiLink, apiPrefix = '/api/v1') {
    if (typeof jsonApiLink !== 'string') {
      jsonApiLink = jsonApiLink.href
    }
    const url = jsonApiLink.match(`${apiPrefix}(.*)`)
    if (Array.isArray(url) && url[1]) {
      return url[1]
    } else {
      throw new Error(`Tide API give a unexpected next url: ${jsonApiLink}`)
    }
  }

  getResourceType(type) {
    return type.replace('node--', '')
  }

  getContentTypeField(key: string, route) {
    let contentType =
      this.contentTypes[route.bundle] || this.contentTypes[route.entity_type]

    // Check for "submodules", i.e. modules that are packaged together
    // for example embedded video and audio are packaged under "media"
    if (contentType && Array.isArray(contentType)) {
      contentType = contentType.find((type) => type?.key === route.bundle)
    }

    return contentType && contentType.hasOwnProperty(key) && contentType?.[key]
  }

  async getTaxonomy(taxonomyName: string) {
    const params = {
      site: this.site
    }
    try {
      const response = await this.get(`/taxonomy_term/${taxonomyName}`, {
        params
      })
      if (response) {
        const resource = jsonapiParse.parse(response).data
        return resource
      }
    } catch (error: any) {
      throw new ApplicationError('Error fetching taxonomy', { cause: error })
    }
  }
}
