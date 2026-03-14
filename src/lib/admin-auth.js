import { supabase, isSupabaseEnabled } from "@/lib/supabaseClient"

function isBrowser() {
  return typeof window !== "undefined"
}

function hasAdminAccess(user) {
  return Boolean(user)
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
      error: "Usuário autenticado sem permissão",
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
  return "Qualquer usuário autenticado no Supabase"
}
