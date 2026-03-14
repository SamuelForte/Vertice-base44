import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Inbox, Trash2, MailOpen, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

const formatBRT = (dateStr) => {
  if (!dateStr) return "";
  const zoned = toZonedTime(new Date(dateStr), "America/Sao_Paulo");
  return format(zoned, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
};

const assuntoLabels = {
  duvida: "Dúvida sobre edital",
  sugestao: "Sugestão",
  problema: "Reportar problema",
  outro: "Outro assunto",
};

export default function MensagensManager() {
  const [selected, setSelected] = useState(null);
  const queryClient = useQueryClient();

  const { data: mensagens = [], isLoading } = useQuery({
    queryKey: ["admin-mensagens"],
    queryFn: () => base44.entities.Mensagem.list("-created_date"),
  });

  const markReadMutation = useMutation({
    mutationFn: (id) => base44.entities.Mensagem.update(id, { lida: true }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-mensagens"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Mensagem.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-mensagens"] });
      setSelected(null);
      toast.success("Mensagem excluída");
    },
  });

  const handleOpen = (msg) => {
    setSelected(msg);
    if (!msg.lida) markReadMutation.mutate(msg.id);
  };

  const naoLidas = mensagens.filter((m) => !m.lida).length;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-slate-900">Mensagens de Contato</h2>
        {naoLidas > 0 && (
          <Badge className="bg-red-500 text-white">{naoLidas} não lida{naoLidas > 1 ? "s" : ""}</Badge>
        )}
      </div>

      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      )}

      {!isLoading && mensagens.length === 0 && (
        <Card className="border-slate-200">
          <CardContent className="py-14 text-center">
            <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Nenhuma mensagem recebida ainda</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && mensagens.length > 0 && (
        <div className="space-y-2">
          {mensagens.map((msg) => (
            <Card
              key={msg.id}
              className={`border-slate-200 cursor-pointer hover:shadow-md transition-shadow ${!msg.lida ? "border-l-4 border-l-blue-500" : ""}`}
              onClick={() => handleOpen(msg)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex-shrink-0">
                  {msg.lida
                    ? <MailOpen className="w-5 h-5 text-slate-400" />
                    : <Mail className="w-5 h-5 text-blue-500" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`font-semibold text-slate-900 ${!msg.lida ? "font-bold" : ""}`}>
                      {msg.nome}
                    </span>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {assuntoLabels[msg.assunto] || msg.assunto}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 truncate">{msg.mensagem}</p>
                </div>
                <div className="text-xs text-slate-400 flex-shrink-0">
                  {msg.created_date
                    ? formatBRT(msg.created_date)
                    : ""}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de leitura */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Mensagem de {selected?.nome}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-slate-500 block">E-mail</span>
                  <a href={`mailto:${selected.email}`} className="text-blue-600 hover:underline">
                    {selected.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block">Assunto</span>
                  <span className="font-medium">{assuntoLabels[selected.assunto] || selected.assunto}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block">Recebida em</span>
                  <span>
                    {selected.created_date
                      ? formatBRT(selected.created_date)
                      : ""}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 text-sm block mb-1">Mensagem</span>
                <div className="bg-slate-50 rounded-lg p-4 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
                  {selected.mensagem}
                </div>
              </div>
              <div className="flex justify-between pt-2">
                <Button
                  variant="outline"
                  asChild
                >
                  <a href={`mailto:${selected.email}?subject=Re: ${assuntoLabels[selected.assunto] || selected.assunto}`}>
                    Responder por e-mail
                  </a>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(selected.id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Excluir
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}