import { supabase, isSupabaseEnabled } from "@/lib/supabaseClient"

const API_BASE_URL = import.meta.env.VITE_BASE44_APP_BASE_URL || import.meta.env.VITE_API_URL || ""
const SUPABASE_STORAGE_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || "site-assets"

const TABLE_MAP = {
  Edital: "editais",
  Mensagem: "mensagens",
  SiteConfig: "site_configs",
}

class EntityStore {
  constructor(name) {
    this.name = name
    this.tableName = TABLE_MAP[name]
  }

  async runSupabaseQuery(buildQuery) {
    if (!isSupabaseEnabled || !supabase || !this.tableName) {
      return null
    }

    const query = buildQuery(supabase.from(this.tableName))
    const { data, error } = await query

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  async list(sort, limit) {
    if (!isSupabaseEnabled || !supabase) {
      throw new Error("Supabase não configurado para leitura de dados")
    }

    const data = await this.runSupabaseQuery((query) => {
      let builder = query.select("*")
      if (sort && typeof sort === "string") {
        const field = sort.startsWith("-") ? sort.slice(1) : sort
        const ascending = !sort.startsWith("-")
        builder = builder.order(field, { ascending })
      }
      if (typeof limit === "number") {
        builder = builder.limit(limit)
      }
      return builder
    })

    return data ?? []
  }

  async filter(criteria, sort, limit) {
    if (!isSupabaseEnabled || !supabase) {
      throw new Error("Supabase não configurado para leitura de dados")
    }

    const data = await this.runSupabaseQuery((query) => {
      let builder = query.select("*")
      if (criteria && typeof criteria === "object") {
        for (const [key, value] of Object.entries(criteria)) {
          if (value !== undefined && value !== null && value !== "") {
            builder = builder.eq(key, value)
          }
        }
      }
      if (sort && typeof sort === "string") {
        const field = sort.startsWith("-") ? sort.slice(1) : sort
        const ascending = !sort.startsWith("-")
        builder = builder.order(field, { ascending })
      }
      if (typeof limit === "number") {
        builder = builder.limit(limit)
      }
      return builder
    })

    return data ?? []
  }

  async create(data) {
    if (!isSupabaseEnabled || !supabase) {
      throw new Error("Supabase não configurado para escrita de dados")
    }

    const result = await this.runSupabaseQuery((query) => query.insert(data).select("*").single())
    return result
  }

  async update(id, data) {
    if (!isSupabaseEnabled || !supabase) {
      throw new Error("Supabase não configurado para escrita de dados")
    }

    const result = await this.runSupabaseQuery((query) => query.update(data).eq("id", id).select("*").single())
    return result || { id, ...data }
  }

  async delete(id) {
    if (!isSupabaseEnabled || !supabase) {
      throw new Error("Supabase não configurado para escrita de dados")
    }

    await this.runSupabaseQuery((query) => query.delete().eq("id", id))

    return { id, success: true }
  }
}

class Base44Client {
  constructor() {
    this.baseUrl = API_BASE_URL
    this.entities = {
      Edital: new EntityStore("Edital"),
      Mensagem: new EntityStore("Mensagem"),
      SiteConfig: new EntityStore("SiteConfig"),
    }
    this.integrations = {
      Core: {
        UploadFile: async ({ file }) => {
          if (!file) {
            return { file_url: "" }
          }

          if (!isSupabaseEnabled || !supabase) {
            throw new Error("Supabase não configurado para upload")
          }

          const extension = file.name.includes(".")
            ? file.name.split(".").pop()?.toLowerCase()
            : "bin"
          const safeExt = extension || "bin"
          const filePath = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`

          const { error: uploadError } = await supabase.storage
            .from(SUPABASE_STORAGE_BUCKET)
            .upload(filePath, file, { upsert: false })

          if (uploadError) {
            throw new Error(`Erro no upload (Supabase Storage): ${uploadError.message}`)
          }

          const { data } = supabase.storage
            .from(SUPABASE_STORAGE_BUCKET)
            .getPublicUrl(filePath)

          return { file_url: data?.publicUrl || "" }
        },
        SendEmail: async () => ({ success: true }),
      },
    }
    this.auth = {
      me: async () => null,
      logout: () => {},
      redirectToLogin: () => {},
    }
    this.appLogs = {
      logUserInApp: async () => {},
    }
  }

  async request(endpoint, options = {}) {
    if (!this.baseUrl) {
      return null
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }

  get(endpoint) {
    return this.request(endpoint, { method: "GET" })
  }

  post(endpoint, data) {
    return this.request(endpoint, { method: "POST", body: JSON.stringify(data) })
  }

  put(endpoint, data) {
    return this.request(endpoint, { method: "PUT", body: JSON.stringify(data) })
  }

  delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" })
  }
}

export const base44 = new Base44Client()

export default base44
