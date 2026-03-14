const pageRoutes = {
  Home: "/",
  Sobre: "/sobre",
  Editais: "/editais",
  Contato: "/contato",
  Admin: "/admin",
  AdminLogin: "/admin/login",
  EditalDetalhes: "/edital",
  AdminEditais: "/admin/editais",
}

export function createPageUrl(page) {
  if (!page) {
    return "/"
  }

  if (page.includes("?")) {
    const [pageName, query] = page.split("?")
    const basePath = pageRoutes[pageName] || `/${pageName.toLowerCase()}`
    return `${basePath}?${query}`
  }

  return pageRoutes[page] || `/${page.toLowerCase()}`
}