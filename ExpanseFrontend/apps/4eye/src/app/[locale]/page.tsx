import { getTranslations } from "next-intl/server"
import HomeClientView from "./page_client"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "home" })

  return {
    title: t("intro.title"),
  }
}

export default function Home() {
  return <HomeClientView />
}
