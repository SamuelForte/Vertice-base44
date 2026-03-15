import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { base44 } from "@/api/base44Client"
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

export default function Layout({ children, currentPage }) {
  const isAdminContext = currentPage === "Admin" || currentPage === "AdminEditais" || currentPage === "AdminLogin"

  const { data: configs = [] } = useQuery({
    queryKey: ["site-config-all"],
    queryFn: () => base44.entities.SiteConfig.list(),
  })

  useEffect(() => {
    const faviconConfig = configs.find((config) => config.chave === "logo_favicon")
    const faviconUrl = faviconConfig?.logo_url

    if (!faviconUrl || typeof document === "undefined") {
      return
    }

    const cacheBustedUrl = `${faviconUrl}${faviconUrl.includes("?") ? "&" : "?"}v=${encodeURIComponent(faviconConfig?.updated_date || Date.now())}`

    const applyFavicon = (rel) => {
      let link = document.querySelector(`link[rel='${rel}']`)
      if (!link) {
        link = document.createElement("link")
        link.setAttribute("rel", rel)
        document.head.appendChild(link)
      }
      link.setAttribute("href", cacheBustedUrl)
      link.setAttribute("type", "image/png")
    }

    applyFavicon("icon")
    applyFavicon("shortcut icon")
  }, [configs])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {!isAdminContext && <Header currentPage={currentPage} />}
      <div className={`flex-1 w-full ${isAdminContext ? "" : "pt-20 lg:pt-24"}`}>
        {children}
      </div>
      {!isAdminContext && <Footer />}
    </div>
  )
}
