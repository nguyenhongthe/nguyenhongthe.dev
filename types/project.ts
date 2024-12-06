// types/project.ts
// Định nghĩa kiểu dữ liệu cho dự án

export type ProjectListingProps = {
  name: string
  slug: string
  featured: boolean
  excerptSafe: string
  publishedAt: string
  fullUrl: string
  numViews: string
}

export type ProjectFeaturedProps = {
  name: string
  slug: string
  featured: boolean
  excerptSafe: string
  publishedAt: string
  fullUrl: string
  numViews: string
}

export type ProjectDetailProps = {
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
  fullUrl: string
}
