import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Eye,
  Shield,
  Scale,
  Wrench,
  Clock,
  Handshake,
  CheckCircle,
  ArrowRight,
  FileText,
  BarChart2,
  BookOpen,
  ClipboardList,
  Lightbulb,
  Users,
  TrendingUp,
  PieChart,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";

const valores = [
  {
    icon: Scale,
    title: "Ética e responsabilidade",
    description: "Atuação pautada pela integridade, imparcialidade e respeito às normas legais em todas as etapas dos processos conduzidos.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Shield,
    title: "Transparência",
    description: "Compromisso com a divulgação clara, organizada e acessível de todas as informações e publicações oficiais.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Wrench,
    title: "Rigor técnico",
    description: "Planejamento estruturado e execução criteriosa, garantindo segurança jurídica e qualidade em cada processo.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Clock,
    title: "Eficiência",
    description: "Gestão estratégica de prazos, etapas e recursos, assegurando organização e cumprimento dos cronogramas.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Handshake,
    title: "Compromisso institucional",
    description: "Relacionamento profissional com entes públicos e candidatos, baseado em confiança, responsabilidade e excelência.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Users,
    title: "Parceria",
    description: "Construção de relações colaborativas com clientes, fornecedores e demais atores dos processos, promovendo confiança, cooperação e crescimento mútuo.",
    color: "bg-rose-50 text-rose-600",
  },
];

const diferenciais = [
  "Planejamento estratégico personalizado",
  "Segurança jurídica em todas as etapas",
  "Transparência e organização documental",
  "Equipe técnica especializada",
  "Conformidade com legislação vigente",
  "Gestão eficiente de cronogramas",
];

const servicos = [
  { icon: ClipboardList, title: "Condução de Processos Seletivos" },
  { icon: BarChart2, title: "Planejamento Institucional" },
  { icon: Lightbulb, title: "Consultoria em Gestão Pública e Institucional" },
  { icon: BookOpen, title: "Treinamentos e Capacitações" },
  { icon: FileText, title: "Elaboração de Editais" },
  { icon: TrendingUp, title: "Consultoria Empresarial" },
  { icon: Search, title: "Estudos de Mercado" },
  { icon: PieChart, title: "Auditoria Financeira" },
];

const areas = [
  "Educação", "Saúde", "Assistência Social", "Administração",
  "Gestão Escolar", "Cultura", "Meio Ambiente", "Tecnologia",
];

export default function Sobre() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">QUEM SOMOS</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              A Vértice Consultoria e Planejamento é uma empresa privada que oferece soluções completas em consultoria, planejamento, capacitação e execução de editais e processos seletivos para órgãos públicos, terceiro setor e instituições privadas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="h-full border-slate-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Missão</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Oferecer soluções técnicas de excelência em gestão pública e privada, pautadas pelo planejamento estratégico, transparência e responsabilidade institucional, gerando valor contínuo para a sociedade e organizações.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="h-full border-slate-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Visão</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Ser a principal referência regional na condução de processos seletivos, consultorias, auditorias e treinamentos até 2030, consolidando o reconhecimento pela nossa excelência técnica e confiabilidade inabalável.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">NOSSOS VALORES</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Princípios que norteiam todas as nossas ações</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="h-full border-slate-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-7">
                    <div className={`w-12 h-12 ${value.color} rounded-xl flex items-center justify-center mb-5`}>
                      <value.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">Nossos Diferenciais</h2>
              <p className="text-xl font-semibold text-emerald-600 mb-8">Por que escolher a Vértice?</p>
              <ul className="space-y-4">
                {diferenciais.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Serviços */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Nossos Serviços</h2>
              <div className="space-y-3">
                {servicos.map((servico, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-5 py-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <servico.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-slate-800">{servico.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Áreas de Atuação</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {areas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-900 text-white rounded-xl px-5 py-4 text-center font-medium text-sm"
              >
                {area}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Precisa de soluções estratégicas para sua instituição?
            </h2>
            <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
              Entre em contato com nossa equipe e descubra como podemos ajudar.
            </p>
            <Link to={createPageUrl("Contato")}>
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 h-14 px-10 text-base gap-2">
                Fale com Nossa Equipe
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}