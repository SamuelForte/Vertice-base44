import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mail, Phone, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";

export default function Footer() {
  const { data: configs = [] } = useQuery({
    queryKey: ["site-config-all"],
    queryFn: () => base44.entities.SiteConfig.list(),
  });

  const globalConfig = configs.find((config) => config.chave === "global");
  const footerConfig = configs.find((config) => config.chave === "logo_footer");
  const footerLogoUrl =
    footerConfig?.logo_url ||
    globalConfig?.logo_url ||
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6974013d13b063a64cbb4085/7acb13af3_LogoVrtice-HorizontalColorida.png";

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={footerLogoUrl}
                alt="Vértice Consultoria e Planejamento"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Soluções completas em consultoria, planejamento, capacitação e execução de editais e processos seletivos para órgãos públicos e instituições privadas.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to={createPageUrl("Sobre")} 
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Sobre a Vértice
                </Link>
              </li>
              <li>
                <Link 
                  to={createPageUrl("Editais")} 
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Editais e Seleções
                </Link>
              </li>
              <li>
                <Link 
                  to={createPageUrl("Contato")} 
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

          {/* Áreas */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">
              Áreas de Atuação
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to={createPageUrl("Editais?area=Educação")}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Educação
                </Link>
              </li>
              <li>
                <Link 
                  to={createPageUrl("Editais?area=Saúde")}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Saúde
                </Link>
              </li>
              <li>
                <Link 
                  to={createPageUrl("Editais?area=Assistência Social")}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Assistência Social
                </Link>
              </li>
              <li>
                <Link 
                  to={createPageUrl("Editais?area=Administração")}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Administração
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:contato@verticecp.com" className="hover:text-white transition-colors">
                  contato@verticecp.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(85) 991687462</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Av. Pontes Vieira, 1079 - Sala 18, Fortaleza-CE</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Portal Seletivo. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
              Termos de Uso
            </a>
            <Link
              to={createPageUrl("AdminLogin")}
              className="text-slate-600 hover:text-slate-400 text-xs transition-colors"
            >
              Gerenciar Editais
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}