import Cookies from 'js-cookie'
import { refreshTokenKeyName, tokenKeyName } from '@/constrains'
import { axiosInstance } from '@/apis/axios_configs'

// hàm fetcher cho SWR
export const fetcher = async (url: string): Promise<any> => {
    try {
        const accessToken = Cookies.get(tokenKeyName)
        const refreshToken = Cookies.get(refreshTokenKeyName)
        if (!accessToken) {
            if (!refreshToken) {
                throw new Error('Không tìm thấy access token. Cần tiến hành đăng nhập lại.')
            }
        }
        const response = await axiosInstance.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data
    } catch (err) {
        throw err.response
    }
}

interface submitDataAPIProps {
    url: string
    data?: any
    contentType?: string
    method?: 'POST' | 'PUT'
}

// gửi API bằng POST
export const submitDataAPI = async (
    {
        url,
        contentType = 'application/json',
        data = null,
        method = 'POST'
    }: submitDataAPIProps): Promise<any> => {
    if (!url) {
        throw new Error('Thiếu thông tin url')
    }
    const accessToken = Cookies.get(tokenKeyName)
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': contentType
    }
    if (method === 'PUT') {
        return await axiosInstance.put(url, data, { headers })
    } else {
        return await axiosInstance.post(url, data, { headers })
    }
}
