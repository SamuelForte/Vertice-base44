import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Loader2, ImageIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";

const LOGO_CONFIGS = [
  {
    chave: "global",
    label: "Logo Principal (Header)",
    description: "Exibida no cabeçalho do site em todas as páginas.",
  },
  {
    chave: "logo_footer",
    label: "Logo do Rodapé (Footer)",
    description: "Exibida no rodapé do site.",
  },
  {
    chave: "logo_favicon",
    label: "Favicon",
    description: "Ícone pequeno exibido na aba do navegador. Recomendado: 32x32px.",
  },
];

function LogoItem({ chave, label, description, configs, onUpload, uploading }) {
  const config = configs.find((c) => c.chave === chave);
  const isUploading = uploading === chave;

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: (logo_url) => {
      if (config) {
        return base44.entities.SiteConfig.update(config.id, { logo_url });
      } else {
        return base44.entities.SiteConfig.create({ chave, logo_url });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-config-all"] });
      queryClient.invalidateQueries({ queryKey: ["site-config"] });
      toast.success(`${label} atualizada com sucesso!`);
    },
  });

  const handleRemove = () => {
    if (config) {
      saveMutation.mutate("");
    }
  };

  return (
    <div className="flex items-center gap-5 py-5 border-b border-slate-100 last:border-0">
      {/* Preview */}
      <div className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden flex-shrink-0">
        {config?.logo_url ? (
          <img
            src={config.logo_url}
            alt={label}
            className="w-full h-full object-contain p-2"
          />
        ) : (
          <ImageIcon className="w-7 h-7 text-slate-300" />
        )}
      </div>

      {/* Info + Actions */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-900 text-sm mb-0.5">{label}</p>
        <p className="text-xs text-slate-500 mb-3">{description}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onUpload(e, chave, config, saveMutation)}
            className="hidden"
            id={`logo-upload-${chave}`}
            disabled={isUploading}
          />
          <label htmlFor={`logo-upload-${chave}`}>
            <Button type="button" variant="outline" size="sm" disabled={isUploading} asChild>
              <span className="flex items-center gap-2 cursor-pointer">
                {isUploading ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Enviando...</>
                ) : (
                  <><Upload className="w-3.5 h-3.5" /> {config?.logo_url ? "Trocar" : "Fazer Upload"}</>
                )}
              </span>
            </Button>
          </label>
          {config?.logo_url && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              Remover
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LogoUpload() {
  const [uploading, setUploading] = useState(null);
  const queryClient = useQueryClient();

  const { data: configs = [] } = useQuery({
    queryKey: ["site-config-all"],
    queryFn: () => base44.entities.SiteConfig.list(),
  });

  const handleUpload = async (e, chave, config, saveMutation) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(chave);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await saveMutation.mutateAsync(file_url);
    } catch {
      toast.error("Erro ao enviar imagem");
    } finally {
      setUploading(null);
      e.target.value = "";
    }
  };

  return (
    <Card className="border-slate-200 mb-8">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Logos e Imagens do Site</h2>
        <p className="text-sm text-slate-500 mb-4">PNG, JPG ou SVG. Recomendado: fundo transparente.</p>
        <div>
          {LOGO_CONFIGS.map((item) => (
            <LogoItem
              key={item.chave}
              {...item}
              configs={configs}
              onUpload={handleUpload}
              uploading={uploading}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}