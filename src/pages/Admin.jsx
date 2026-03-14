import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  FileText,
  Loader2,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import StatusBadge from "@/components/editais/StatusBadge";
import EditalForm from "@/components/admin/EditalForm";
import LogoUpload from "@/components/admin/LogoUpload";
import MensagensManager from "@/components/admin/MensagensManager";
import { logoutAdmin } from "@/lib/admin-auth";

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEdital, setEditingEdital] = useState(null);

  const queryClient = useQueryClient();

  const { data: editais = [], isLoading } = useQuery({
    queryKey: ["admin-editais"],
    queryFn: () => base44.entities.Edital.list("-created_date"),
  });

  const deleteEditalMutation = useMutation({
    mutationFn: (id) => base44.entities.Edital.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-editais"] });
      toast.success("Edital excluído com sucesso");
    },
    onError: () => {
      toast.error("Erro ao excluir edital");
    },
  });

  const handleEdit = (edital) => {
    setEditingEdital(edital);
    setIsFormOpen(true);
  };

  const handleNew = () => {
    setEditingEdital(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingEdital(null);
  };

  const handleDelete = (edital) => {
    if (confirm(`Tem certeza que deseja excluir o edital "${edital.numero}"?`)) {
      deleteEditalMutation.mutate(edital.id);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    toast.success("Sessão encerrada");
    window.location.href = "/admin/login";
  };

  const filteredEditais = editais.filter((edital) => {
    const term = searchTerm.toLowerCase();
    return (
      edital.numero?.toLowerCase().includes(term) ||
      edital.titulo?.toLowerCase().includes(term) ||
      edital.municipio?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Administração de Editais
              </h1>
              <p className="text-slate-600">
                Gerencie editais, seleções e processos seletivos
              </p>
            </div>

            <Button variant="outline" onClick={handleLogout} className="gap-2 self-start sm:self-auto">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        {/* Logo Upload */}
        <LogoUpload />

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Buscar por número, título ou município..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button
            onClick={handleNew}
            className="bg-emerald-600 hover:bg-emerald-700 h-12 px-6 gap-2"
          >
            <Plus className="w-5 h-5" />
            Novo Edital
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-slate-200">
            <CardContent className="p-5">
              <p className="text-sm text-slate-500 mb-1">Total</p>
              <p className="text-2xl font-bold text-slate-900">{editais.length}</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-5">
              <p className="text-sm text-slate-500 mb-1">Abertos</p>
              <p className="text-2xl font-bold text-emerald-600">
                {editais.filter((e) => e.status === "Aberto").length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-5">
              <p className="text-sm text-slate-500 mb-1">Em Andamento</p>
              <p className="text-2xl font-bold text-blue-600">
                {editais.filter((e) => e.status === "Em andamento").length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-5">
              <p className="text-sm text-slate-500 mb-1">Encerrados</p>
              <p className="text-2xl font-bold text-slate-600">
                {editais.filter((e) => e.status === "Encerrado").length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        )}

        {/* Editais List */}
        {!isLoading && (
          <div className="space-y-3">
            {filteredEditais.length === 0 ? (
              <Card className="border-slate-200">
                <CardContent className="py-16 text-center">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">
                    {searchTerm
                      ? "Nenhum edital encontrado com esse termo"
                      : "Nenhum edital cadastrado ainda"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredEditais.map((edital, index) => (
                <motion.div
                  key={edital.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-slate-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-mono text-slate-500">
                              {edital.numero}
                            </span>
                            <StatusBadge status={edital.status} size="sm" />
                            {edital.destaque && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                                DESTAQUE
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            {edital.titulo}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                            <span>📍 {edital.municipio}</span>
                            <span>🏢 {edital.sigla_instituicao}</span>
                            <span>📋 {edital.area_atuacao}</span>
                            {edital.vagas && <span>👥 {edital.vagas} vagas</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(edital)}
                            className="h-9 w-9"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(edital)}
                            className="h-9 w-9 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Mensagens */}
        <MensagensManager />

        {/* Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEdital ? "Editar Edital" : "Novo Edital"}
              </DialogTitle>
            </DialogHeader>
            <EditalForm edital={editingEdital} onClose={handleCloseForm} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}