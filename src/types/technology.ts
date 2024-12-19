// src/types/technology.ts

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
}
