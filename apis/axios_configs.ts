import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { refreshTokenKeyName, tokenKeyName } from '@/constrains'
import * as process from 'process'

export const baseAPIURL = process.env.NEXT_PUBLIC_DJANGO_BASE_API_URL
export const axiosInstance = axios.create({
  baseURL: baseAPIURL,
  withCredentials: false
})

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response, // Trả về response nếu không có lỗi
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig
    const refreshToken = Cookies.get(refreshTokenKeyName)

    // Kiểm tra lỗi do token hết hạn và tránh lặp vô hạn
    if (error.response?.status === 401 && !originalRequest._retry) {
      // nếu không có refresh token thì không thể làm mới token, nên không cần chạy tiếp phần code bên dưới
      if (!refreshToken) {
        return
      }

      try {
        // Gửi yêu cầu để làm mới token, phải dùng instance mới với cấu hình khác để tránh lặp vô hạn
        const response = await axios.post('/api/token/refresh/', {
          refresh: refreshToken
        }, {
          baseURL: baseAPIURL,
          withCredentials: false
        })
        const newAccessToken = response.data.access

        // Lưu access token mới vào cookie
        // eslint-disable-next-line
        Cookies.set(tokenKeyName, newAccessToken, {expires: 30})

        // Cập nhật access token trong header của request gốc
        axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        } else {
          originalRequest.headers = {
            // trường hợp này gần như không xảy ra, nhưng nếu có thì cần phải tạo mới headers
            Authorization: `Bearer ${newAccessToken}`,
            'Content-Type': 'application/json'
          }
        }

        originalRequest._retry = true // Đánh dấu đã thử làm mới token

        // Gửi lại request gốc với access token mới
        return await axiosInstance(originalRequest)
      } catch (err) {
        // Xử lý nếu không thể làm mới token (ví dụ: đăng xuất người dùng)
        if (err.response.data.code === 'token_not_valid' && err.response.data.detail === 'Token is invalid or expired') {
          Cookies.remove(tokenKeyName)
          Cookies.remove(refreshTokenKeyName)
        }
      }
    }
  }
)
