import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { locales, type Locale, localeMetadata } from "../../i18n/config"
import "../globals.css"
import ClientLayout from "../layout_client"

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

/**
 * Generate static params for all locales
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: "home" })
  const metadata = localeMetadata[locale as Locale]

  return {
    title: "4eye",
    description: t("intro.body"),
    icons: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/favicon/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon/favicon-16x16.png",
      },
      {
        rel: "mask-icon",
        url: "/favicon/safari-pinned-tab.svg",
        color: "#ffffff",
      },
      {
        rel: "icon",
        url: "/favicon/favicon.ico",
        sizes: "any",
      },
    ],
    openGraph: {
      title: "4eye",
      type: "website",
      description: t("intro.body"),
      url: "https://www.expanseedu.com",
      siteName: "4eye",
      locale: metadata?.hrefLang,
      images: [
        "https://storage.googleapis.com/expanse-public-assets/openGraph/ogImageSimple.jpg",
      ],
    },
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [localeMetadata[l].hrefLang, `/${l}`])
      ),
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  // Get messages for the locale
  const messages = await getMessages()
  const metadata = localeMetadata[locale as Locale]

  return (
    <html lang={locale} dir={metadata?.direction || "ltr"}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
