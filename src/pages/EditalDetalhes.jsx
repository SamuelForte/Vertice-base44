import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Mail,
  Phone,
  FileText,
  Download,
  ExternalLink,
  Clock,
  CheckCircle2,
  Briefcase,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import StatusBadge from "@/components/editais/StatusBadge";

export default function EditalDetalhes() {
  const urlParams = new URLSearchParams(window.location.search);
  const editalId = urlParams.get("id");

  const { data: edital, isLoading, error } = useQuery({
    queryKey: ["edital", editalId],
    queryFn: async () => {
      const editais = await base44.entities.Edital.filter({ id: editalId });
      return editais[0];
    },
    enabled: !!editalId,
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return format(new Date(dateStr), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return dateStr;
    }
  };

  const formatShortDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return format(new Date(dateStr), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
            <div>
              <Skeleton className="h-80 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !edital) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Edital não encontrado</h2>
          <p className="text-slate-500 mb-6">
            O edital que você está procurando não existe ou foi removido.
          </p>
          <Link to={createPageUrl("Editais")}>
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar para Editais
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to={createPageUrl("Editais")}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Editais
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-slate-400 font-mono text-sm">{edital.numero}</span>
              <StatusBadge status={edital.status} />
              {edital.destaque && (
                <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0">
                  DESTAQUE
                </Badge>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              {edital.titulo}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>
                  <strong>{edital.sigla_instituicao}</strong>
                  {edital.nome_instituicao && ` - ${edital.nome_instituicao}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{edital.municipio}{edital.estado && `, ${edital.estado}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span>{edital.area_atuacao}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descrição */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-slate-400" />
                    Sobre o Processo Seletivo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {edital.descricao || "Descrição não disponível."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Requisitos */}
            {edital.requisitos && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-slate-400" />
                      Requisitos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                      {edital.requisitos}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Cronograma */}
            {edital.cronograma && edital.cronograma.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <Clock className="w-5 h-5 text-slate-400" />
                      Cronograma
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {edital.cronograma.map((item, index) => (
                        <div 
                          key={index}
                          className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg"
                        >
                          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-semibold text-slate-600">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-800">{item.etapa}</p>
                            <p className="text-sm text-slate-500 mt-1">{item.data}</p>
                            {item.observacao && (
                              <p className="text-sm text-slate-400 mt-1">{item.observacao}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Documentos */}
            {edital.documentos && edital.documentos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <Download className="w-5 h-5 text-slate-400" />
                      Documentos para Download
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {edital.documentos.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-800">{doc.nome}</p>
                              {doc.tipo && (
                                <p className="text-xs text-slate-500">{doc.tipo.toUpperCase()}</p>
                              )}
                            </div>
                          </div>
                          <Download className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-slate-200 shadow-sm sticky top-24">
                <CardContent className="p-6 space-y-5">
                  {/* Vagas */}
                  {edital.vagas && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Vagas Disponíveis</p>
                        <p className="font-semibold text-slate-800">{edital.vagas}</p>
                      </div>
                    </div>
                  )}

                  {/* Remuneração */}
                  {edital.remuneracao && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Remuneração</p>
                        <p className="font-semibold text-slate-800">{edital.remuneracao}</p>
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Datas */}
                  <div className="space-y-3">
                    {edital.data_publicacao && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Publicação</span>
                        <span className="font-medium text-slate-700">{formatShortDate(edital.data_publicacao)}</span>
                      </div>
                    )}
                    {edital.data_inicio_inscricoes && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Início Inscrições</span>
                        <span className="font-medium text-slate-700">{formatShortDate(edital.data_inicio_inscricoes)}</span>
                      </div>
                    )}
                    {edital.data_fim_inscricoes && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Fim Inscrições</span>
                        <span className="font-medium text-slate-700">{formatShortDate(edital.data_fim_inscricoes)}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Contato */}
                  <div className="space-y-3">
                    {edital.contato_email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <a 
                          href={`mailto:${edital.contato_email}`}
                          className="text-slate-600 hover:text-slate-900 transition-colors"
                        >
                          {edital.contato_email}
                        </a>
                      </div>
                    )}
                    {edital.contato_telefone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{edital.contato_telefone}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  {edital.status === "Aberto" && edital.link_inscricao && (
                    <>
                      <Separator />
                      <a
                        href={edital.link_inscricao}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 gap-2">
                          <ExternalLink className="w-4 h-4" />
                          Fazer Inscrição
                        </Button>
                      </a>
                    </>
                  )}

                  {edital.status === "Encerrado" && (
                    <>
                      <Separator />
                      <div className="bg-slate-100 text-slate-500 text-center py-3 rounded-lg text-sm">
                        Inscrições encerradas
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}