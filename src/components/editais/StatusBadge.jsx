import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusConfig = {
  "Aberto": {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500"
  },
  "Em andamento": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500"
  },
  "Encerrado": {
    bg: "bg-slate-100",
    text: "text-slate-500",
    border: "border-slate-200",
    dot: "bg-slate-400"
  }
};

export default function StatusBadge({ status, size = "default" }) {
  const config = statusConfig[status] || statusConfig["Encerrado"];
  
  return (
    <Badge 
      variant="outline"
      className={cn(
        "font-medium border",
        config.bg,
        config.text,
        config.border,
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full mr-2", config.dot)} />
      {status}
    </Badge>
  );
}