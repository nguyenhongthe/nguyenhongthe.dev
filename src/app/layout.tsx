// /src/app/layout.tsx
import './global.css'
import { Inter } from 'next/font/google'
import LocalFont from 'next/font/local'
import type { Metadata } from 'next'
import {
  defaultOgImage,
  siteDescription,
  siteName,
  siteUrlPrefix,
} from '../../constrains'
import React from "react";

export const metadata: Metadata = {
  title: {
    default: 'Nguyen Hong The Dev',
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  metadataBase: new URL(siteUrlPrefix || ''),
  alternates: {
    canonical: siteUrlPrefix,
    languages: {
      'en-US': '/en',
      'vi-VN': '/vi'
    }
  },
  openGraph: {
    title: 'Nguyen Hong The Dev',
    description: siteDescription,
    url: siteUrlPrefix,
    siteName,
    images: [
      {
        url: defaultOgImage,
        width: 1920,
        height: 1080
      }
    ],
    locale: 'vi-VN',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    title: siteName,
    description: siteDescription,
    card: 'summary_large_image',
    images: [
      {
        url: defaultOgImage,
        width: 1920,
        height: 1080
      }
    ]
  },
  icons: {
    shortcut:
			'https://nguyenhongthe.net/content/images/size/w256h256/2020/05/favicon-1.png'
  }
}
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const calSans = LocalFont({
  src: '../../public/fonts/CalSans-SemiBold.ttf',
  variable: '--font-calsans'
})

const manrope = LocalFont({
  src: '../../public/fonts/Manrope-VariableFont_wght.ttf',
  variable: '--font-manrope'
})

export default function RootLayout({
  children
}: {
	children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={[inter.variable, calSans.variable, manrope.variable].join(' ')}
    >
      <body
        className={`bg-black ${process.env.NODE_ENV === 'development' ? 'debug-screens' : undefined
          }`}
      >
        {children}
      </body>
    </html>
  )
}
