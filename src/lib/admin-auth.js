import { supabase, isSupabaseEnabled } from "@/lib/supabaseClient"

const DEFAULT_ADMIN_EMAIL = "admin@verticecp.com"

function isBrowser() {
  return typeof window !== "undefined"
}

function getAllowedAdminEmails() {
  const raw = import.meta.env.VITE_ADMIN_ALLOWED_EMAILS || DEFAULT_ADMIN_EMAIL
  return String(raw)
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

function hasAdminAccess(user) {
  if (!user) return false

  const role = user.app_metadata?.role || user.user_metadata?.role
  if (role === "admin") {
    return true
  }

  const email = user.email?.toLowerCase()
  return !!email && getAllowedAdminEmails().includes(email)
}

export async function isAdminAuthenticated() {
  if (!isBrowser()) return false

  if (!isSupabaseEnabled || !supabase) {
    return false
  }

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    return false
  }

  return hasAdminAccess(data.user)
}

export async function loginAdmin({ email, password }) {
  if (!isSupabaseEnabled || !supabase) {
    return {
      ok: false,
      error: "Supabase não configurado para autenticação",
    }
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error || !data?.user) {
    return {
      ok: false,
      error: error?.message || "Falha no login",
    }
  }

  if (!hasAdminAccess(data.user)) {
    await supabase.auth.signOut()
    return {
      ok: false,
      error: "Usuário autenticado sem permissão de administrador",
    }
  }

  return { ok: true, error: null }
}

export async function logoutAdmin() {
  if (!isBrowser()) return

  if (!isSupabaseEnabled || !supabase) {
    return
  }

  await supabase.auth.signOut()
}

export function getAdminHintEmail() {
  return getAllowedAdminEmails()[0] || DEFAULT_ADMIN_EMAIL
}
