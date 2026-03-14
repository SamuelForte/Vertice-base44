import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  Search,
  FileText,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Building2,
  MapPin,
  ClipboardList,
  BarChart2,
  BookOpen,
  Lightbulb,
  Briefcase,
  TrendingUp,
  PieChart,
} from "lucide-react";
import { motion } from "framer-motion";
import StatusBadge from "@/components/editais/StatusBadge";

export default function Home() {
  const { data: editais = [], isLoading } = useQuery({
    queryKey: ["editais-destaque"],
    queryFn: () => base44.entities.Edital.filter({ status: "Aberto" }, "-created_date", 6),
  });

  const destaques = editais.filter(e => e.destaque).slice(0, 3);
  const recentes = destaques.length > 0 ? destaques : editais.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-emerald-500/20 text-emerald-400 border-0 mb-6 py-1.5 px-4">
                Gestão e Planejamento Institucional
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Planejamento estratégico e condução{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  segura
                </span>{" "}
                de processos públicos
              </h1>
              
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
                A Vértice Consultoria e Planejamento oferece soluções completas em consultoria, planejamento, capacitação e execução de editais e processos seletivos para órgãos públicos e instituições privadas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={createPageUrl("Sobre")}>
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 h-14 px-8 text-base gap-2"
                  >
                    Saiba mais
                  </Button>
                </Link>
                <Link to={createPageUrl("Contato")}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto border-slate-600 text-slate-900 hover:bg-white/10 h-14 px-8 text-base"
                  >
                    Entre em contato
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-0 mb-5 py-1.5 px-4 text-sm">
                    Confira os Editais abertos
                  </Badge>
                  <div className="space-y-4">
                    {isLoading ? (
                      [1, 2, 3].map((i) => (
                        <div key={i} className="bg-slate-700/30 rounded-xl p-4 flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div className="flex-1">
                            <div className="h-3 bg-slate-600/50 rounded w-3/4 mb-2" />
                            <div className="h-2 bg-slate-700/50 rounded w-1/2" />
                          </div>
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-0">Aberto</Badge>
                        </div>
                      ))
                    ) : editais.length > 0 ? (
                      editais.slice(0, 3).map((edital) => (
                        <Link key={edital.id} to={createPageUrl(`EditalDetalhes?id=${edital.id}`)}>
                          <div className="bg-slate-700/30 hover:bg-slate-700/50 transition-colors rounded-xl p-4 flex items-center gap-4 cursor-pointer">
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">{edital.titulo}</p>
                              <p className="text-slate-400 text-xs">{edital.municipio}</p>
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-0 flex-shrink-0">Aberto</Badge>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-center py-6 text-slate-400 text-sm">
                        Nenhum edital aberto no momento.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              NOSSOS SERVIÇOS
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Soluções completas para gestão e execução de processos em instituições públicas, privadas e do terceiro setor.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ClipboardList,
                title: "Condução de Processos Seletivos",
                description: "Execução integral: inscrições, provas, análise documental e resultados.",
              },
              {
                icon: BarChart2,
                title: "Planejamento Institucional",
                description: "Planejamento estratégico, diagnóstico e estruturação organizacional.",
              },
              {
                icon: Lightbulb,
                title: "Consultoria em Gestão Pública e Institucional",
                description: "Assessoria técnica especializada para órgãos públicos, privados e do terceiro setor.",
              },
              {
                icon: BookOpen,
                title: "Treinamentos e Capacitações",
                description: "Formação técnica para equipes administrativas e comissões.",
              },
              {
                icon: FileText,
                title: "Elaboração de Editais",
                description: "Elaboração completa, cronograma, regulamentação e segurança jurídica.",
              },
              {
                icon: Briefcase,
                title: "Consultoria Empresarial",
                description: "Assessoria estratégica para empresas privadas, otimização de processos e crescimento sustentável.",
              },
              {
                icon: TrendingUp,
                title: "Estudos de Mercado",
                description: "Análises e pesquisas aprofundadas para embasar decisões estratégicas e identificar oportunidades.",
              },
              {
                icon: PieChart,
                title: "Auditoria Financeira",
                description: "Revisão e análise de demonstrações financeiras com foco em transparência e conformidade.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Editais */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                Processos Seletivos em Andamento
              </h2>
              <p className="text-lg text-slate-600">
                Oportunidades com inscrições abertas
              </p>
            </div>
            <Link to={createPageUrl("Editais")} className="hidden sm:block">
              <Button variant="outline" className="gap-2">
                Ver todos os editais
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-slate-200">
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-6 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-6" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : recentes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentes.map((edital, index) => (
                <motion.div
                  key={edital.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-slate-200 hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-slate-400">{edital.numero}</span>
                        <StatusBadge status={edital.status} size="sm" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-slate-700 transition-colors">
                        {edital.titulo}
                      </h3>

                      <div className="space-y-2 mb-5">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Building2 className="w-4 h-4 text-slate-400" />
                          <span>{edital.sigla_instituicao}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span>{edital.municipio}</span>
                        </div>
                      </div>

                      <Link to={createPageUrl(`EditalDetalhes?id=${edital.id}`)}>
                        <Button 
                          variant="outline" 
                          className="w-full group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all"
                        >
                          Ver detalhes
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="border-slate-200">
              <CardContent className="py-16 text-center">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Nenhum edital com inscrições abertas no momento.</p>
              </CardContent>
            </Card>
          )}

          <Link to={createPageUrl("Editais")} className="sm:hidden block mt-6">
            <Button variant="outline" className="w-full gap-2">
              Ver todos os editais
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Transparência e Acompanhamento de Processos
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Acompanhe os editais sob nossa responsabilidade e tenha acesso às informações oficiais e atualizadas.
            </p>
            <Link to={createPageUrl("Editais")}>
              <Button 
                size="lg" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white h-14 px-10 text-base gap-2"
              >
                Acompanhar Processos
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}