import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  X,
  Upload,
  FileText,
  Loader2,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

const AREAS_ATUACAO = [
  "Educação",
  "Saúde",
  "Banco de Bolsistas",
  "Gestão Escolar",
  "Assistência Social",
  "Cultura",
  "Meio Ambiente",
  "Administração",
  "Tecnologia",
  "Segurança",
];

const STATUS_OPTIONS = ["Aberto", "Em andamento", "Encerrado"];

export default function EditalForm({ edital, onClose }) {
  const [formData, setFormData] = useState({
    numero: edital?.numero || "",
    titulo: edital?.titulo || "",
    sigla_instituicao: edital?.sigla_instituicao || "",
    nome_instituicao: edital?.nome_instituicao || "",
    area_atuacao: edital?.area_atuacao || "",
    municipio: edital?.municipio || "",
    estado: edital?.estado || "MA",
    status: edital?.status || "Aberto",
    descricao: edital?.descricao || "",
    requisitos: edital?.requisitos || "",
    vagas: edital?.vagas || "",
    remuneracao: edital?.remuneracao || "",
    data_publicacao: edital?.data_publicacao || "",
    data_inicio_inscricoes: edital?.data_inicio_inscricoes || "",
    data_fim_inscricoes: edital?.data_fim_inscricoes || "",
    arquivo_cronograma_url: edital?.arquivo_cronograma_url || "",
    arquivo_cronograma_nome: edital?.arquivo_cronograma_nome || "",
    link_inscricao: edital?.link_inscricao || "",
    contato_email: edital?.contato_email || "",
    contato_telefone: edital?.contato_telefone || "",
    destaque: edital?.destaque || false,
    ano: edital?.ano || new Date().getFullYear(),
    cronograma: edital?.cronograma || [],
    documentos: edital?.documentos || [],
    logo_url: edital?.logo_url || "",
  });

  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadingCronogramaFile, setUploadingCronogramaFile] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (edital) {
        return base44.entities.Edital.update(edital.id, data);
      } else {
        return base44.entities.Edital.create(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-editais"] });
      queryClient.invalidateQueries({ queryKey: ["editais"] });
      queryClient.invalidateQueries({ queryKey: ["editais-destaque"] });
      toast.success(edital ? "Edital atualizado!" : "Edital criado!");
      onClose();
    },
    onError: () => {
      toast.error("Erro ao salvar edital");
    },
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      vagas: formData.vagas ? parseInt(formData.vagas) : null,
      ano: formData.ano ? parseInt(formData.ano) : new Date().getFullYear(),
    };
    saveMutation.mutate(dataToSave);
  };

  // Cronograma
  const addCronogramaItem = () => {
    setFormData((prev) => ({
      ...prev,
      cronograma: [
        ...prev.cronograma,
        { etapa: "", data: "", observacao: "" },
      ],
    }));
  };

  const updateCronogramaItem = (index, field, value) => {
    const newCronograma = [...formData.cronograma];
    newCronograma[index][field] = value;
    setFormData((prev) => ({ ...prev, cronograma: newCronograma }));
  };

  const removeCronogramaItem = (index) => {
    const newCronograma = formData.cronograma.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, cronograma: newCronograma }));
  };

  // Documentos
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFormData((prev) => ({
        ...prev,
        documentos: [
          ...prev.documentos,
          {
            nome: file.name.replace(/\.[^/.]+$/, ""),
            url: file_url,
            tipo: "PDF",
          },
        ],
      }));
      toast.success("Arquivo enviado com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar arquivo");
    } finally {
      setUploadingFile(false);
      e.target.value = "";
    }
  };

  const removeDocumento = (index) => {
    const newDocs = formData.documentos.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, documentos: newDocs }));
  };

  const updateDocumentoNome = (index, nome) => {
    const newDocs = [...formData.documentos];
    newDocs[index].nome = nome;
    setFormData((prev) => ({ ...prev, documentos: newDocs }));
  };

  // Upload logo do edital
  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      handleChange("logo_url", file_url);
      toast.success("Logo enviada com sucesso!");
    } catch {
      toast.error("Erro ao enviar logo");
    } finally {
      setUploadingLogo(false);
      e.target.value = "";
    }
  };

  // Upload arquivo de cronograma
  const handleCronogramaFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCronogramaFile(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setFormData((prev) => ({
        ...prev,
        arquivo_cronograma_url: file_url,
        arquivo_cronograma_nome: file.name,
      }));
      toast.success("Cronograma PDF enviado com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar arquivo");
    } finally {
      setUploadingCronogramaFile(false);
      e.target.value = "";
    }
  };

  const removeCronogramaFile = () => {
    setFormData((prev) => ({
      ...prev,
      arquivo_cronograma_url: "",
      arquivo_cronograma_nome: "",
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      {/* Informações Básicas */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Informações Básicas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="numero">Número do Edital *</Label>
            <Input
              id="numero"
              placeholder="Ex: Edital 001/2025"
              value={formData.numero}
              onChange={(e) => handleChange("numero", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ano">Ano *</Label>
            <Input
              id="ano"
              type="number"
              placeholder="2025"
              value={formData.ano}
              onChange={(e) => handleChange("ano", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="titulo">Título *</Label>
            <Input
              id="titulo"
              placeholder="Título do processo seletivo"
              value={formData.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sigla">Sigla da Instituição *</Label>
            <Input
              id="sigla"
              placeholder="Ex: SME"
              value={formData.sigla_instituicao}
              onChange={(e) => handleChange("sigla_instituicao", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nome_inst">Nome da Instituição</Label>
            <Input
              id="nome_inst"
              placeholder="Nome completo"
              value={formData.nome_instituicao}
              onChange={(e) => handleChange("nome_instituicao", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="area">Área de Atuação *</Label>
            <Select
              value={formData.area_atuacao}
              onValueChange={(value) => handleChange("area_atuacao", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {AREAS_ATUACAO.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="municipio">Município *</Label>
            <Input
              id="municipio"
              placeholder="Ex: São Luís"
              value={formData.municipio}
              onChange={(e) => handleChange("municipio", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estado">Estado</Label>
            <Input
              id="estado"
              placeholder="MA"
              value={formData.estado}
              onChange={(e) => handleChange("estado", e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Checkbox
            id="destaque"
            checked={formData.destaque}
            onCheckedChange={(checked) => handleChange("destaque", checked)}
          />
          <Label htmlFor="destaque" className="cursor-pointer">
            Exibir em destaque
          </Label>
        </div>

        {/* Logo do Edital */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <Label className="text-sm font-medium mb-1 block">
            Logo da Instituição <span className="text-slate-400 font-normal">(opcional)</span>
          </Label>
          <p className="text-xs text-slate-500 mb-3">Imagem exibida na página de detalhes do edital.</p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center bg-white overflow-hidden flex-shrink-0">
              {formData.logo_url ? (
                <img src={formData.logo_url} alt="Logo" className="w-full h-full object-contain p-1" />
              ) : (
                <Upload className="w-6 h-6 text-slate-300" />
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-edital-upload"
                disabled={uploadingLogo}
              />
              <label htmlFor="logo-edital-upload">
                <Button type="button" variant="outline" size="sm" disabled={uploadingLogo} asChild>
                  <span className="flex items-center gap-2 cursor-pointer">
                    {uploadingLogo ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Enviando...</>
                    ) : (
                      <><Upload className="w-3.5 h-3.5" /> {formData.logo_url ? "Trocar Logo" : "Upload Logo"}</>
                    )}
                  </span>
                </Button>
              </label>
              {formData.logo_url && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleChange("logo_url", "")}
                  className="text-red-600 hover:bg-red-50"
                >
                  <X className="w-3.5 h-3.5 mr-1" /> Remover
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Descrição */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Descrição e Requisitos
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Descrição detalhada do processo seletivo"
              value={formData.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requisitos">Requisitos</Label>
            <Textarea
              id="requisitos"
              placeholder="Requisitos para participação"
              value={formData.requisitos}
              onChange={(e) => handleChange("requisitos", e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Vagas e Remuneração */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Vagas e Remuneração
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vagas">Número de Vagas</Label>
            <Input
              id="vagas"
              type="number"
              placeholder="Ex: 30"
              value={formData.vagas}
              onChange={(e) => handleChange("vagas", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="remuneracao">Remuneração</Label>
            <Input
              id="remuneracao"
              placeholder="Ex: R$ 3.200,00"
              value={formData.remuneracao}
              onChange={(e) => handleChange("remuneracao", e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Datas */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Prazos e Datas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="data_pub">Data de Publicação</Label>
            <Input
              id="data_pub"
              type="date"
              value={formData.data_publicacao}
              onChange={(e) => handleChange("data_publicacao", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="data_inicio">Início das Inscrições</Label>
            <Input
              id="data_inicio"
              type="date"
              value={formData.data_inicio_inscricoes}
              onChange={(e) =>
                handleChange("data_inicio_inscricoes", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="data_fim">Fim das Inscrições</Label>
            <Input
              id="data_fim"
              type="date"
              value={formData.data_fim_inscricoes}
              onChange={(e) => handleChange("data_fim_inscricoes", e.target.value)}
            />
          </div>
        </div>

        {/* Upload Cronograma PDF */}
        <div className="border-t border-slate-200 pt-6">
          <Label className="text-sm font-medium mb-3 block">
            Cronograma Detalhado (PDF)
          </Label>
          <p className="text-sm text-slate-500 mb-3">
            Faça upload de um PDF com o cronograma completo do processo seletivo
          </p>
          
          {formData.arquivo_cronograma_url ? (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-900 truncate">
                  {formData.arquivo_cronograma_nome || "Cronograma.pdf"}
                </p>
                <a
                  href={formData.arquivo_cronograma_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-600 hover:underline"
                >
                  Ver arquivo
                </a>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={removeCronogramaFile}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div>
              <input
                type="file"
                accept=".pdf"
                onChange={handleCronogramaFileUpload}
                className="hidden"
                id="cronograma-file-upload"
                disabled={uploadingCronogramaFile}
              />
              <label htmlFor="cronograma-file-upload">
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploadingCronogramaFile}
                  className="w-full sm:w-auto"
                  asChild
                >
                  <span className="flex items-center justify-center gap-2">
                    {uploadingCronogramaFile ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        Selecionar PDF do Computador
                      </>
                    )}
                  </span>
                </Button>
              </label>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Cronograma */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Cronograma</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addCronogramaItem}
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Etapa
          </Button>
        </div>
        <div className="space-y-3">
          {formData.cronograma.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 items-start p-4 bg-slate-50 rounded-lg"
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Nome da etapa"
                  value={item.etapa}
                  onChange={(e) =>
                    updateCronogramaItem(index, "etapa", e.target.value)
                  }
                />
                <Input
                  placeholder="Data"
                  value={item.data}
                  onChange={(e) =>
                    updateCronogramaItem(index, "data", e.target.value)
                  }
                />
                <Input
                  placeholder="Observação (opcional)"
                  value={item.observacao}
                  onChange={(e) =>
                    updateCronogramaItem(index, "observacao", e.target.value)
                  }
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeCronogramaItem(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Documentos */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Documentos (PDF)
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Clique no botão abaixo para fazer upload de PDFs do seu computador
          </p>
          <div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              disabled={uploadingFile}
            />
            <label htmlFor="file-upload">
              <Button
                type="button"
                variant="outline"
                disabled={uploadingFile}
                className="w-full sm:w-auto"
                asChild
              >
                <span className="flex items-center justify-center gap-2">
                  {uploadingFile ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando PDF...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Selecionar PDF do Computador
                    </>
                  )}
                </span>
              </Button>
            </label>
          </div>
        </div>
        <div className="space-y-3">
          {formData.documentos.map((doc, index) => (
            <div
              key={index}
              className="flex gap-3 items-center p-4 bg-slate-50 rounded-lg border border-slate-200"
            >
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <Input
                  placeholder="Nome do documento (ex: Edital Completo)"
                  value={doc.nome}
                  onChange={(e) => updateDocumentoNome(index, e.target.value)}
                  className="mb-2"
                />
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline truncate block"
                >
                  {doc.url}
                </a>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeDocumento(index)}
                className="flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {formData.documentos.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-lg">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">
                Nenhum documento adicionado ainda
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Use o botão acima para fazer upload de PDFs
              </p>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Contato */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Informações de Contato
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="contato@exemplo.com"
              value={formData.contato_email}
              onChange={(e) => handleChange("contato_email", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              placeholder="(00) 0000-0000"
              value={formData.contato_telefone}
              onChange={(e) => handleChange("contato_telefone", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="link">Link de Inscrição</Label>
            <Input
              id="link"
              type="url"
              placeholder="https://inscricoes.exemplo.com"
              value={formData.link_inscricao}
              onChange={(e) => handleChange("link_inscricao", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={saveMutation.isPending}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {saveMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : (
            "Salvar Edital"
          )}
        </Button>
      </div>
    </form>
  );
}