// app/tos/page.tsx

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
    <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900">
      <header>
        <Navigation navigation={navigation} />
      </header>
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32 lg:pb-24">
        <div className="mx-auto lg:mx-0">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
            TERMS OF USE FOR NGUYEN HONG THE DEVELOPER WEBSITE
          </h1>
        </div>
        <Card>
          <article className="p-4 relative flex flex-col gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-24 md:p-16">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              1. ACCEPTANCE OF TERMS OF USE
            </h2>
            <p className="text-base font-bold text-zinc-200">
              By accessing and using the website "
              <span className="text-cyan-600">
                [Nguyen Hong The Developer](https://nguyenhongthe.dev/)
              </span>
              ", you agree to comply with the following terms and conditions
              ("Terms").
            </p>
            <p className="text-base font-bold text-zinc-200">
              If you do not agree to these Terms, please refrain from using
              Nguyen Hong The Developer.
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              2. CONTENT AND SHARING
            </h2>
            <p className="text-base font-bold text-zinc-200">
              Nguyen Hong The Developer provides information about Nguyen Hong
              The's personal development projects, including articles,
              tutorials, source code, and other materials.
            </p>
            <p className="text-base font-bold text-zinc-200">
              All content provided on Nguyen Hong The Developer is personal in
              nature and based on Nguyen Hong The's knowledge and experience.
            </p>
            <p className="text-base font-bold text-zinc-200">
              We do not take responsibility for the accuracy, completeness, or
              suitability of this content.
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              3. INTELLECTUAL PROPERTY RIGHTS
            </h2>
            <p className="text-base font-bold text-zinc-200">
              All intellectual property rights related to the content on Nguyen
              Hong The Developer belong to the original owner of that content.
            </p>
            <p className="text-base font-bold text-zinc-200">
              Any copying, reuse, or use of trademarks, trade symbols, or
              content on Nguyen Hong The Developer without written consent from
              the owner constitutes a serious infringement of intellectual
              property rights.
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              4. PRIVACY NOTICE
            </h2>
            <p className="text-base font-bold text-zinc-200">
              We are committed to protecting your personal information as
              outlined in our{' '}
              <a
                className="text-cyan-600"
                title="Privacy Policy"
                href="https://nguyenhongthe.dev/privacy/"
              >
                Privacy Policy
              </a>
              .
            </p>
            <p className="text-base font-bold text-zinc-200">
              However, sharing personal information and other data on Nguyen
              Hong The Developer is at your discretion and may lead to the
              disclosure of your personal information, for which you are solely
              responsible.
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              5. PERSONAL USE
            </h2>
            <p className="text-base font-bold text-zinc-200">
              <span className="text-cyan-600">You are allowed</span> to access
              and use Nguyen Hong The Developer for your personal purposes.
            </p>
            <p className="text-base font-bold text-zinc-200">
              <span className="text-cyan-600">You are not allowed</span> to use
              Nguyen Hong The Developer or its content for commercial purposes,
              distribution, or reproduction without our written consent.
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              6. SHARED INFORMATION
            </h2>
            <p className="text-base font-bold text-zinc-200">
              When you share any content or information on Nguyen Hong The
              Developer, you ensure that the content:
            </p>
            <div className="text-base font-bold text-zinc-200">
              <ul className="custom-ul">
                <li className="custom-li">
                  Is accurate and not misleading or deceptive.
                </li>
                <li className="custom-li">Does not violate current laws.</li>
                <li className="custom-li">
                  Does not harm or disrupt Nguyen Hong The Developer or others.
                </li>
                <li className="custom-li">
                  Is owned by you or you have the right to distribute it.
                </li>
                <li className="custom-li">
                  Does not infringe on the intellectual property rights or
                  privacy of any third party.
                </li>
              </ul>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              7. SERVICE MODIFICATIONS AND TERMINATION
            </h2>
            <p className="text-base font-bold text-zinc-200">
              We reserve the right to modify or terminate the Nguyen Hong The
              Developer Service at any time without prior notice.
            </p>
            <p className="text-base font-bold text-zinc-200">
              We are not liable for any damages arising from changes to or
              termination of the Service.
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              8. CHANGES TO TERMS
            </h2>
            <p className="text-base font-bold text-zinc-200">
              We reserve the right to change these Terms at any time.
            </p>
            <p className="text-base font-bold text-zinc-200">
              Changes will take effect as soon as they are published on Nguyen
              Hong The Developer.
            </p>
            <p className="text-base font-bold text-zinc-200">
              By continuing to use Nguyen Hong The Developer after changes are
              made, you agree to comply with the revised Terms.
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              9. FEES AND CHARGES
            </h2>
            <p className="text-base font-bold text-zinc-200">
              Using Nguyen Hong The Developer is free of charge; however, we
              reserve the right to offer or charge fees for specific services.
            </p>
            <p className="text-base font-bold text-zinc-200">
              In such cases, you will be notified of the applicable fees and
              conditions before using those services.
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              10. APPLICABLE LAW
            </h2>
            <p className="text-base font-bold text-zinc-200">
              These Terms are governed and enforced in accordance with the laws
              of the Socialist Republic of Vietnam.
            </p>
            <p className="text-base font-bold text-zinc-200">
              Any disputes arising from the use of Nguyen Hong The Developer
              will be resolved by competent courts in Vietnam.
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-200">
              11. CONTACT INFORMATION
            </h2>
            <p className="text-base font-bold text-zinc-200">
              If you have any questions or requests regarding these Terms,
              please contact us at here:{' '}
              <a
                className="text-cyan-600"
                title="Contact"
                href="https://nguyenhongthe.dev/contact/"
              >
                Contact
              </a>
              .
            </p>
          </article>
        </Card>
      </div>
      <Footer />
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'TERMS OF USE FOR NGUYEN HONG THE DEVELOPER WEBSITE'
  const desc = 'By accessing and using the website "Nguyen Hong The Developer", you agree to comply with the following terms and conditions ("Terms").'

  return {
    metadataBase: new URL(siteUrlPrefix),
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      url: siteUrlPrefix + '/tos/',
      type: 'website',
      images: [defaultOgImage]
    },
    alternates: {
      canonical: siteUrlPrefix + '/tos/',
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
