import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

const navItems = [
  { label: "Início", page: "Home" },
  { label: "Sobre", page: "Sobre" },
  { label: "Editais e Seleções", page: "Editais" },
  { label: "Contato", page: "Contato" },
];

export default function Header({ currentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: configs = [] } = useQuery({
    queryKey: ["site-config-all"],
    queryFn: () => base44.entities.SiteConfig.list(),
  });
  const globalConfig = configs.find((config) => config.chave === "global");
  const logoUrl =
    globalConfig?.logo_url ||
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6974013d13b063a64cbb4085/7acb13af3_LogoVrtice-HorizontalColorida.png";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to={createPageUrl("Home")} className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt="Vértice Consultoria e Planejamento"
              className="h-14 w-auto max-w-[260px] object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" translate="no">
            {navItems.map((item) => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                  currentPage === item.page
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link to={createPageUrl("Editais")}>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-5 h-10">
                Ver Editais Abertos
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1" translate="no">
              {navItems.map((item) => (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    currentPage === item.page
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                to={createPageUrl("Editais")}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg h-12">
                  Ver Editais Abertos
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}