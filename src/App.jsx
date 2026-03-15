import { useEffect, useState } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { Toaster } from "sonner"
import Layout from "./Layout"
import Home from "./pages/Home"
import Sobre from "./pages/Sobre"
import Editais from "./pages/Editais"
import EditalDetalhes from "./pages/EditalDetalhes"
import Contato from "./pages/Contato"
import Admin from "./pages/Admin"
import AdminLogin from "./pages/AdminLogin"
import PageNotFound from "./lib/PageNotFound"
import { isAdminAuthenticated } from "./lib/admin-auth"

function getCurrentPage(pathname) {
  if (pathname === "/") return "Home"
  if (pathname.startsWith("/sobre")) return "Sobre"
  if (pathname.startsWith("/editais")) return "Editais"
  if (pathname.startsWith("/contato")) return "Contato"
  if (pathname.startsWith("/admin/login")) return "AdminLogin"
  if (pathname.startsWith("/admin/editais")) return "AdminEditais"
  if (pathname.startsWith("/admin")) return "Admin"
  if (pathname.startsWith("/edital")) return "EditalDetalhes"
  return ""
}

function RequireAdmin({ children }) {
  const [status, setStatus] = useState("checking")

  useEffect(() => {
    let mounted = true

    isAdminAuthenticated().then((allowed) => {
      if (!mounted) return
      setStatus(allowed ? "allowed" : "denied")
    })

    return () => {
      mounted = false
    }
  }, [])

  if (status === "checking") {
    return <div className="px-4 py-10 text-center text-sm text-slate-500">Verificando acesso...</div>
  }

  if (status === "denied") {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

function PublicOnly({ children }) {
  const [status, setStatus] = useState("checking")

  useEffect(() => {
    let mounted = true

    isAdminAuthenticated().then((allowed) => {
      if (!mounted) return
      setStatus(allowed ? "admin" : "public")
    })

    return () => {
      mounted = false
    }
  }, [])

  if (status === "checking") {
    return <div className="px-4 py-10 text-center text-sm text-slate-500">Carregando...</div>
  }

  if (status === "admin") {
    return <Navigate to="/admin" replace />
  }

  return children
}

export default function App() {
  const location = useLocation()
  const currentPage = getCurrentPage(location.pathname)

  return (
    <Layout currentPage={currentPage}>
      <Routes>
        <Route
          path="/"
          element={
            <PublicOnly>
              <Home />
            </PublicOnly>
          }
        />
        <Route
          path="/sobre"
          element={
            <PublicOnly>
              <Sobre />
            </PublicOnly>
          }
        />
        <Route
          path="/editais"
          element={
            <PublicOnly>
              <Editais />
            </PublicOnly>
          }
        />
        <Route
          path="/edital"
          element={
            <PublicOnly>
              <EditalDetalhes />
            </PublicOnly>
          }
        />
        <Route
          path="/contato"
          element={
            <PublicOnly>
              <Contato />
            </PublicOnly>
          }
        />
        <Route
          path="/admin/login"
          element={
            <PublicOnly>
              <AdminLogin />
            </PublicOnly>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <Admin />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/editais"
          element={
            <RequireAdmin>
              <Admin />
            </RequireAdmin>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </Layout>
  )
}
