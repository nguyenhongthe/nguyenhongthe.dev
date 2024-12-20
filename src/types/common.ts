// src/types/common.ts

export interface InfoProps {
  name: string
  introSafe: string
  logo: string
  siteUrl: string
  email: string
  phone: string
  address: string
  metaTitle: string
  metaDescription: string
  metaImage: string
  displayInfo: boolean
  openGraph: {
    title: string
    description: string
    images: string[]
    url: string
  }
}

export interface MenuProps {
  name: string
  url: string
  order: string
}

export interface SocialProps {
    name: string
    url: string
    order: string
    icon: string
}
