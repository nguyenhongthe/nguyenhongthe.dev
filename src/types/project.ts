// src/types/project.ts

export interface ProjectListingProps {
  name: string
  slug: string
  featured: boolean
  excerptSafe: string
  publishedAt: string
  fullUrl: string
  numViews: string
}

export interface ProjectFeaturedProps {
  name: string
  slug: string
  featured: boolean
  excerptSafe: string
  publishedAt: string
  fullUrl: string
  numViews: string
}

export interface ProjectDetailProps {
  code: string
  name: string
  slug: string
  featured: boolean
  descriptionSafe: string
  excerptSafe: string
  contentSafe: string
  startDate: string
  endDate: string
  featuredImage: string
  projectUrl: string
  source: string
  numViews: number
  metaTitle: string
  metaDescription: string
  metaImage: string
  publishedAt: string
  url: string
  fullUrl: string
  openGraph: {
    title: string
    description: string
    images: string[]
    url: string
  }
}
