// src/app/privacy/page.tsx

import React from 'react'
import type { Metadata } from 'next'
import { Card } from '@/src/components/card'
import type { MenuProps } from '@/src/types/common'
import { getMenuList } from '../../apis/common_api'
import { Footer } from '@/src/sections/project/footer'
import { defaultOgImage, siteUrlPrefix } from '../../../constrains'
import Navigation from '@/src/components/Navigation'

export default async function Page() {

  let navigation: MenuProps[]

  try {
    navigation = await getMenuList()
  } catch (error) {
    console.error('Error fetching menu list:', error)
    navigation = []
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900">

      <header>
        <Navigation navigation={navigation}/>
      </header>

      <main
        className="flex-grow px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32 lg:pb-32">
        <div className="mx-auto lg:mx-0">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
            PRIVACY POLICY FOR NGUYEN HONG THE DEVELOPER WEBSITE
          </h1>
        </div>
        <Card>
          <article className="p-4 relative flex flex-col gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-24 md:p-16">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              1. INFORMATION WE COLLECT
            </h2>
            <p className="text-base font-bold text-zinc-200">
              We collect personal data that you provide when using the website{' '}
              <span className="text-cyan-600">
                [Nguyen Hong The Developer](https://nguyenhongthe.dev/)
              </span>
              , including but not limited to name, email address, and any shared information.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              2. HOW WE USE YOUR INFORMATION
            </h2>
            <p className="text-base font-bold text-zinc-200">
              Your data is used to improve user experience, provide website functionality, and respond to your
              inquiries.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              3. DATA SHARING
            </h2>
            <p className="text-base font-bold text-zinc-200">
              We do not share your personal data with third parties, except when required by law or to ensure the
              security of the website.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              4. DATA SECURITY
            </h2>
            <p className="text-base font-bold text-zinc-200">
              We implement security measures to protect your data, but cannot guarantee complete security against
              unauthorized access.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              5. YOUR RIGHTS
            </h2>
            <p className="text-base font-bold text-zinc-200">
              You have the right to request access to, update, or delete your personal data by contacting us
              at{' '}
              <a
                className="text-cyan-600"
                href="https://nguyenhongthe.dev/contact/"
                title="Contact"
              >
                Contact
              </a>
              .
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              6. CHANGES TO PRIVACY POLICY
            </h2>
            <p className="text-base font-bold text-zinc-200">
              This Privacy Policy may be updated. Any changes will be posted here, and continued use of the
              website indicates acceptance of the updated terms.
            </p>
          </article>
        </Card>
      </main>

      <footer className="relative bottom-0 z-50">
        <Footer/>
      </footer>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'PRIVACY POLICY FOR NGUYEN HONG THE DEVELOPER WEBSITE'
  const desc = 'Your data is used to improve user experience, provide website functionality, and respond to your inquiries.'

  return {
    metadataBase: new URL(siteUrlPrefix),
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      url: siteUrlPrefix + '/privacy/',
      type: 'website',
      images: [defaultOgImage]
    },
    alternates: {
      canonical: siteUrlPrefix + '/privacy/',
    },
    twitter: {
      site: '@realTheNguyen',
      title: title,
      description: desc,
      card: 'summary_large_image',
      images: [defaultOgImage]
    },
  }
}
