import jsonapiParse from 'jsonapi-parse'
import TideApiBase from './tide-api-base.js'
import defaultMapping from './lib/default-mapping.js'
import type { RplTideModuleConfig } from './../../types'
import { ApplicationError, NotFoundError } from '../errors/errors.js'
import { ILogger } from '../logger/logger'
export default class TidePageApi extends TideApiBase {
  contentTypes: any
  site: string
  sectionId: string
  path: string

  constructor(tide: RplTideModuleConfig, logger: ILogger) {
    super(tide, logger)
    this.site = tide.contentApi.site
    this.sectionId = ''
    this.path = ''
    this.contentTypes = {}
    this.logLabel = 'TidePage'
  }

  getContentTypes() {
    return this.contentTypes
  }

  setContentType(key, value) {
    this.contentTypes[key] = value
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
    // if (this.isShareLink(path)) {
    //   return this.getPageFromShareLink(path, config)
    // }
    // if (this.isPreviewLink(path)) {
    //   return this.getPageFromPreviewLink(path, config)
    // }
    const site = siteQuery || this.site
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

  // async getPageFromShareLink(path, config = { params: {} }): Promise<any> {
  //   const shareLinkData = await this.client.get(path).then(response => {
  //     if (response.data) {
  //       return jsonapiParse.parse(response).data || response.data
  //     }
  //     return response
  //   })
  //   if (shareLinkData) {
  //     const sharedNode = shareLinkData.shared_node
  //     const routeData = {
  //       entity_type: 'node',
  //       bundle: sharedNode.type.replace('node--', ''),
  //       uuid: sharedNode.id
  //     }
  //     const pageData = await this.getPageByRouteData(routeData, {
  //       headers: {
  //         'X-Share-Link-Token': shareLinkData.id
  //       },
  //       params: {
  //         ...config.params,
  //         include: this.getResourceIncludes(routeData.bundle)
  //       }
  //     })
  //     return Promise.resolve(pageData)
  //   }
  // }

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
    const includes = this.getContentTypeField('includes', route)
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
