import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'
const localDomains = [
    {
        hostname: 'localhost',
    },
    {
        hostname: '127.0.0.1',
    }
]
const prodDomains = [
    {
        hostname: 'static.vnscdn.com',
    },
    {
        hostname: 'media.vnscdn.com',
    },
    {
        hostname: 'cdn.nguyenhongthe.dev',
    },
]

const config: NextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    assetPrefix: isProd ? 'https://cdn.nguyenhongthe.dev' : '',
    images: {
        remotePatterns: isProd ? prodDomains : localDomains,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })
        return config
    }
}

export default config
