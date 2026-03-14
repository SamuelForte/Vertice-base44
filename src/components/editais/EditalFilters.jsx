import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const areas = [
  "Educação",
  "Saúde",
  "Banco de Bolsistas",
  "Gestão Escolar",
  "Assistência Social",
  "Cultura",
  "Meio Ambiente",
  "Administração",
  "Tecnologia",
  "Segurança"
];

const statusOptions = [
  { label: "Inscrições abertas", value: "Aberto" },
  { label: "Em andamento", value: "Em andamento" },
  { label: "Encerrado", value: "Encerrado" },
];

const currentYear = new Date().getFullYear();
const anos = Array.from({ length: 5 }, (_, i) => currentYear - i);

export default function EditalFilters({ 
  filters, 
  onFilterChange, 
  municipios = [],
  onReset 
}) {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = filters.municipio || filters.area || filters.ano || filters.status;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Buscar por número, município ou instituição..."
            value={filters.busca || ""}
            onChange={(e) => onFilterChange({ ...filters, busca: e.target.value })}
            className="pl-12 h-12 bg-white border-slate-200 text-base placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"
          />
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className={`h-12 px-4 gap-2 ${showFilters ? "bg-slate-900 text-white" : "border-slate-200"}`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="hidden sm:inline">Filtros</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-slate-700">Filtrar editais</h3>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onReset}
                    className="text-slate-500 hover:text-slate-700 gap-1"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Limpar filtros
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Município */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Município</label>
                  <Select
                    value={filters.municipio || "all"}
                    onValueChange={(value) => 
                      onFilterChange({ ...filters, municipio: value === "all" ? "" : value })
                    }
                  >
                    <SelectTrigger className="h-11 bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Todos os municípios" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os municípios</SelectItem>
                      {municipios.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Área */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Área de atuação</label>
                  <Select
                    value={filters.area || "all"}
                    onValueChange={(value) => 
                      onFilterChange({ ...filters, area: value === "all" ? "" : value })
                    }
                  >
                    <SelectTrigger className="h-11 bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Todas as áreas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as áreas</SelectItem>
                      {areas.map((a) => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Ano */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Ano</label>
                  <Select
                    value={filters.ano?.toString() || "all"}
                    onValueChange={(value) => 
                      onFilterChange({ ...filters, ano: value === "all" ? "" : parseInt(value) })
                    }
                  >
                    <SelectTrigger className="h-11 bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Todos os anos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os anos</SelectItem>
                      {anos.map((a) => (
                        <SelectItem key={a} value={a.toString()}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Status</label>
                  <Select
                    value={filters.status || "all"}
                    onValueChange={(value) => 
                      onFilterChange({ ...filters, status: value === "all" ? "" : value })
                    }
                  >
                    <SelectTrigger className="h-11 bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      {statusOptions.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.municipio && (
            <FilterTag 
              label={filters.municipio} 
              onRemove={() => onFilterChange({ ...filters, municipio: "" })} 
            />
          )}
          {filters.area && (
            <FilterTag 
              label={filters.area} 
              onRemove={() => onFilterChange({ ...filters, area: "" })} 
            />
          )}
          {filters.ano && (
            <FilterTag 
              label={`Ano: ${filters.ano}`} 
              onRemove={() => onFilterChange({ ...filters, ano: "" })} 
            />
          )}
          {filters.status && (
            <FilterTag 
              label={filters.status} 
              onRemove={() => onFilterChange({ ...filters, status: "" })} 
            />
          )}
        </div>
      )}
    </div>
  );
}

function FilterTag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="ml-1 p-0.5 hover:bg-slate-200 rounded-full transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}