import axios, { AxiosInstance } from 'axios'

export default class HttpClient {
  client: AxiosInstance
  constructor(config) {
    if (config.client) {
      this.client = config.client
    } else {
      this.client = axios.create({
        baseURL: config.baseUrl,
        auth: config.auth,
        paramsSerializer: {
          indexes: true
        }
      })
    }

    this._initializeResponseInterceptor()
  }

  _initializeResponseInterceptor() {
    this.client.interceptors.response.use(
      this._handleResponse,
      this._handleError
    )
  }

  _handleResponse({ data }) {
    return data
  }
  _handleError(error) {
    return Promise.reject(error)
  }
}
