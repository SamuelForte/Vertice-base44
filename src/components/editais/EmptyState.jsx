import { FileSearch, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function EmptyState({ hasFilters, onClearFilters }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
        <FileSearch className="w-10 h-10 text-slate-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-slate-800 mb-2 text-center">
        {hasFilters ? "Nenhum edital encontrado" : "Nenhum edital disponível"}
      </h3>
      
      <p className="text-slate-500 text-center max-w-md mb-6">
        {hasFilters 
          ? "Não encontramos editais com os filtros selecionados. Tente ajustar sua busca."
          : "Ainda não há editais publicados. Novos processos seletivos serão divulgados em breve."
        }
      </p>

      {hasFilters && onClearFilters && (
        <Button 
          variant="outline" 
          onClick={onClearFilters}
          className="gap-2"
        >
          Limpar filtros
          <ArrowRight className="w-4 h-4" />
        </Button>
      )}
    </motion.div>
  );
}