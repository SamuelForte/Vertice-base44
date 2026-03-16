import { useState, useMemo, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

import EditalCard from "@/components/editais/EditalCard";
import EditalFilters from "@/components/editais/EditalFilters";
import EmptyState from "@/components/editais/EmptyState";

export default function Editais() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  
  const [filters, setFilters] = useState({
    busca: "",
    municipio: urlParams.get("municipio") || "",
    area: urlParams.get("area") || "",
    ano: urlParams.get("ano") ? parseInt(urlParams.get("ano")) : "",
    status: urlParams.get("status") || "",
  });

  const { data: editais = [], isLoading } = useQuery({
    queryKey: ["editais"],
    queryFn: () => base44.entities.Edital.list("-created_date"),
  });

  // Extract unique municipalities
  const municipios = useMemo(() => {
    const unique = [...new Set(editais.map(e => e.municipio).filter(Boolean))];
    return unique.sort();
  }, [editais]);

  // Filter editais
  const filteredEditais = useMemo(() => {
    return editais.filter(edital => {
      // Search filter
      if (filters.busca) {
        const searchLower = filters.busca.toLowerCase();
        const matchesSearch = 
          edital.numero?.toLowerCase().includes(searchLower) ||
          edital.titulo?.toLowerCase().includes(searchLower) ||
          edital.municipio?.toLowerCase().includes(searchLower) ||
          edital.sigla_instituicao?.toLowerCase().includes(searchLower) ||
          edital.nome_instituicao?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Municipio filter
      if (filters.municipio && edital.municipio !== filters.municipio) return false;

      // Area filter
      if (filters.area && edital.area_atuacao !== filters.area) return false;

      // Ano filter
      if (filters.ano && edital.ano !== filters.ano) return false;

      // Status filter
      if (filters.status && edital.status !== filters.status) return false;

      return true;
    });
  }, [editais, filters]);



  const resetFilters = () => {
    setFilters({ busca: "", municipio: "", area: "", ano: "", status: "" });
  };

  const hasActiveFilters = filters.municipio || filters.area || filters.ano || filters.status || filters.busca;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-6">
              Processos sob Gestão da Vértice
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Processos Seletivos em Andamento
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Consulte os processos seletivos atualmente conduzidos pela Vértice Consultoria e Planejamento. Todas as informações são disponibilizadas com transparência, organização e conformidade legal.
            </p>
          </motion.div>


        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-8">
            <EditalFilters
              filters={filters}
              onFilterChange={setFilters}
              municipios={municipios}
              onReset={resetFilters}
            />
          </div>

          {/* Results Info */}
          {!isLoading && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-600">
                {filteredEditais.length === editais.length ? (
                  <span>Mostrando <strong>{editais.length}</strong> edital(is)</span>
                ) : (
                  <span>
                    Mostrando <strong>{filteredEditais.length}</strong> de{" "}
                    <strong>{editais.length}</strong> edital(is)
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-6 w-full mb-4" />
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredEditais.length === 0 && (
            <EmptyState 
              hasFilters={hasActiveFilters} 
              onClearFilters={resetFilters} 
            />
          )}

          {/* Editais Grid */}
          {!isLoading && filteredEditais.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEditais.map((edital, index) => (
                <EditalCard key={edital.id} edital={edital} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}