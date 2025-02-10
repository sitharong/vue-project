import type { UserModel } from '@/models/UserModel'
import axios from 'axios'
import { envService } from './EnvironmentService'

class UserService {
  readonly reqClient
  readonly endpoint = envService.env.VITE_APP_API_ENDPOINT
  private canAccess = false

  constructor() {
    this.reqClient = axios.create({
      timeout: 10000,
    })
    console.log('api endpoint', this.endpoint)
  }

  async register(user: UserModel) {
    const res = await this.reqClient.post(`${this.endpoint}/userauth/register`, user)
    return Boolean(res.data)
  }

  async login(user: UserModel) {
    const res = await this.reqClient.post(`${this.endpoint}/userauth/login`, user)
    if (!res.data.success) return false
    const token = res.data.token
    this.reqClient.defaults.headers.common.Authorization = `Bearer ${token}`
    this.canAccess = true
    return true
  }

  async logout() {
    const res = await this.reqClient.post(`${this.endpoint}/userauth/logout`)
    if (!res.data) return false
    this.reqClient.defaults.headers.common.Authorization = undefined
    this.canAccess = false
    return true
  }

  isAuthenticated() {
    return this.canAccess
  }
}

export const userService = new UserService()
