import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Lock, Mail, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { loginAdmin, getAdminHintEmail } from "@/lib/admin-auth"

export default function AdminLogin() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    const result = await loginAdmin(formData)
    if (!result.ok) {
      toast.error(result.error || "Credenciais inválidas")
      setLoading(false)
      return
    }

    toast.success("Login realizado com sucesso")
    navigate("/admin/editais", { replace: true })
  }

  return (
    <div className="min-h-[calc(100vh-10rem)] bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Acesso do Administrador</h1>
              <p className="mt-2 text-sm text-slate-600">
                Entre para gerenciar os editais da plataforma.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                    placeholder="admin@verticecp.com"
                    className="h-11 pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
                    placeholder="••••••"
                    className="h-11 pl-9"
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="h-11 w-full bg-slate-900 hover:bg-slate-800">
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 rounded-lg bg-slate-100 p-3 text-xs text-slate-600">
              <p>
                O e-mail <strong>{getAdminHintEmail()}</strong> deve existir em Authentication {'>'} Users no Supabase.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
