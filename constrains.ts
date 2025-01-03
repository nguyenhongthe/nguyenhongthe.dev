export const tokenKeyName: string = process.env.NEXT_PUBLIC_JWT_KEY_NAME ?? ''
export const refreshTokenKeyName: string = process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY_NAME ?? ''
export const baseApiUrl: string = process.env.NEXT_PUBLIC_DJANGO_BASE_API_URL ?? ''
export const mediaUrl: string = process.env.NEXT_PUBLIC_DJANGO_MEDIA_URL ?? ''

export const siteName: string = process.env.NEXT_PUBLIC_SITE_NAME ?? ''
export const siteDescription: string = process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? ''
export const siteUrlPrefix: string = process.env.NEXT_PUBLIC_SITE_PREFIX ?? ''

export const defaultOgImage = siteUrlPrefix + '/img/og.png'
