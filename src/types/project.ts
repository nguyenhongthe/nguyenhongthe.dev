// src/types/project.ts

export interface ProjectListingProps {
  name: string
  slug: string
  featured: boolean
  excerptSafe: string
  projectStatus: string
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
  technology: [
    {
      name: string
      descriptionSafe: string
      slug: string
      icon: string
      order: string
      url: string
      fullUrl: string
    }
  ]
  featuredImage: string
  projectUrl: string
  source: string
  numViews: number
  metaTitle: string
  metaDescription: string
  metaImage: string
  projectStatus: string
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

export interface TechnologyProps {
  name: string
  descriptionSafe: string
  slug: string
  icon: string
  order: string
  url: string
  fullUrl: string
}

export interface TechnologyDetailProps {
  name: string
  descriptionSafe: string
  slug: string
  icon: string
  order: string
  url: string
  fullUrl: string
  metaTitle: string
  metaDescription: string
  openGraph: {
    title: string
    description: string
    images: string[]
    url: string
  }
  projects: ProjectListingProps[]
}
