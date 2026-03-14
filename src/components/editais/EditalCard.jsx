import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Calendar, ArrowRight, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import StatusBadge from "./StatusBadge";
import { motion } from "framer-motion";

const areaColors = {
  "Educação": "bg-blue-50 text-blue-700 border-blue-200",
  "Saúde": "bg-rose-50 text-rose-700 border-rose-200",
  "Banco de Bolsistas": "bg-purple-50 text-purple-700 border-purple-200",
  "Gestão Escolar": "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Assistência Social": "bg-orange-50 text-orange-700 border-orange-200",
  "Cultura": "bg-pink-50 text-pink-700 border-pink-200",
  "Meio Ambiente": "bg-green-50 text-green-700 border-green-200",
  "Administração": "bg-slate-50 text-slate-700 border-slate-200",
  "Tecnologia": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Segurança": "bg-red-50 text-red-700 border-red-200"
};

export default function EditalCard({ edital, index = 0 }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return format(new Date(dateStr), "dd 'de' MMM, yyyy", { locale: ptBR });
    } catch {
      return dateStr;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="group bg-white hover:shadow-lg transition-all duration-300 border-slate-200/80 overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                    {edital.numero}
                  </span>
                  {edital.destaque && (
                    <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0 text-[10px] px-2">
                      DESTAQUE
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 leading-tight group-hover:text-slate-900 transition-colors line-clamp-2">
                  {edital.titulo}
                </h3>
              </div>
              <StatusBadge status={edital.status} size="sm" />
            </div>

            {/* Órgão e Localização */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="font-medium">{edital.sigla_instituicao}{edital.nome_instituicao ? ` — ${edital.nome_instituicao}` : ""}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{edital.municipio}{edital.estado ? `, ${edital.estado}` : ""}</span>
              </div>
            </div>

            {/* Área */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge 
                variant="outline" 
                className={`text-xs font-medium ${areaColors[edital.area_atuacao] || areaColors["Administração"]}`}
              >
                <Briefcase className="w-3 h-3 mr-1" />
                {edital.area_atuacao}
              </Badge>
            </div>

            {/* Descrição */}
            {edital.descricao && (
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">
                {edital.descricao}
              </p>
            )}

            {/* Data fim inscrições */}
            {edital.data_fim_inscricoes && edital.status === "Aberto" && (
              <div className="flex items-center gap-2 text-sm bg-emerald-50/50 text-emerald-700 px-3 py-2 rounded-lg mb-2">
                <Calendar className="w-4 h-4" />
                <span>Inscrições até <strong>{formatDate(edital.data_fim_inscricoes)}</strong></span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
            <Link to={createPageUrl(`EditalDetalhes?id=${edital.id}`)}>
              <Button 
                variant="ghost" 
                className="w-full justify-between text-slate-600 hover:text-slate-900 hover:bg-slate-100 group/btn"
              >
                <span>Ver detalhes completos</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}