import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  HelpCircle,
  FileQuestion,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Contato() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { base44 } = await import("@/api/base44Client");

    // Salva a mensagem no banco de dados
    await base44.entities.Mensagem.create({
      nome: formData.nome,
      email: formData.email,
      assunto: formData.assunto,
      mensagem: formData.mensagem,
      lida: false,
    });

    // Mostra sucesso imediatamente após salvar
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("Mensagem enviada com sucesso!");

    // Envia e-mail em segundo plano sem bloquear
    base44.integrations.Core.SendEmail({
      to: "contato@verticeconsultoria.com.br",
      subject: `[Fale Conosco] ${formData.assunto} — ${formData.nome}`,
      body: `Nome: ${formData.nome}\nE-mail: ${formData.email}\nAssunto: ${formData.assunto}\n\nMensagem:\n${formData.mensagem}`,
    });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Fale Conosco</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Tem dúvidas, sugestões ou precisa de ajuda? Nossa equipe está 
              pronta para atendê-lo. Entre em contato conosco.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Informações de Contato
                </h2>

                <div className="space-y-4">
                  <Card className="border-slate-200">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900 mb-1">E-mail</h3>
                        <p className="text-slate-600 text-sm">contato@verticecp.com</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900 mb-1">Telefone</h3>
                        <p className="text-slate-600 text-sm">(85) 991687462</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900 mb-1">Endereço</h3>
                        <p className="text-slate-600 text-sm">Fortaleza - CE</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900 mb-1">Horário de Atendimento</h3>
                        <p className="text-slate-600 text-sm">
                          Segunda a Sexta<br />
                          8h às 18h
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="border-slate-200 shadow-sm">
                  <CardContent className="p-8">
                    {submitted ? (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-emerald-700 mb-2">
                          Mensagem Enviada com Sucesso!
                        </h3>
                        <p className="text-slate-600 mb-2">
                          Sua mensagem foi enviada à nossa equipe de suporte.
                        </p>
                        <p className="text-slate-500 text-sm mb-8">
                          Em breve entraremos em contato pelo e-mail informado. 😊
                        </p>
                        <Button
                          className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                          onClick={() => {
                            setSubmitted(false);
                            setFormData({ nome: "", email: "", assunto: "", mensagem: "" });
                          }}
                        >
                          <Send className="w-4 h-4" />
                          Enviar nova mensagem
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                          Envie sua Mensagem
                        </h2>
                        <p className="text-slate-600 mb-8">
                          Preencha o formulário abaixo e entraremos em contato o mais rápido possível.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="nome">Nome completo</Label>
                              <Input
                                id="nome"
                                placeholder="Seu nome"
                                value={formData.nome}
                                onChange={(e) => handleChange("nome", e.target.value)}
                                required
                                className="h-12"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">E-mail</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                required
                                className="h-12"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="assunto">Assunto</Label>
                            <Select
                              value={formData.assunto}
                              onValueChange={(value) => handleChange("assunto", value)}
                              required
                            >
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Selecione o assunto" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="duvida">
                                  <div className="flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4" />
                                    Dúvida sobre edital
                                  </div>
                                </SelectItem>
                                <SelectItem value="sugestao">
                                  <div className="flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Sugestão
                                  </div>
                                </SelectItem>
                                <SelectItem value="problema">
                                  <div className="flex items-center gap-2">
                                    <FileQuestion className="w-4 h-4" />
                                    Reportar problema
                                  </div>
                                </SelectItem>
                                <SelectItem value="outro">
                                  <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Outro assunto
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="mensagem">Mensagem</Label>
                            <Textarea
                              id="mensagem"
                              placeholder="Escreva sua mensagem..."
                              value={formData.mensagem}
                              onChange={(e) => handleChange("mensagem", e.target.value)}
                              required
                              className="min-h-[150px] resize-none"
                            />
                          </div>

                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto h-12 px-8 bg-slate-900 hover:bg-slate-800 gap-2"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Enviando...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                Enviar Mensagem
                              </>
                            )}
                          </Button>
                        </form>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Perguntas Frequentes</h2>
            <p className="text-slate-600">Confira as dúvidas mais comuns sobre a Vértice e nossos processos</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "A Vértice é um órgão público?",
                a: "Não. A Vértice Consultoria e Planejamento é uma empresa privada especializada na organização, planejamento e condução de processos seletivos e projetos institucionais para entes públicos e demais instituições.",
              },
              {
                q: "Como posso me inscrever em um processo seletivo?",
                a: "As inscrições são realizadas exclusivamente pela página oficial de cada processo seletivo conduzido pela Vértice. Basta acessar o edital desejado e seguir as orientações disponíveis na seção de inscrições.",
              },
              {
                q: "Onde posso consultar resultados e publicações?",
                a: 'Todos os atos oficiais, resultados, retificações e comunicados são disponibilizados na página específica de cada processo seletivo, na seção "Publicações Oficiais".',
              },
              {
                q: "Como contratar a Vértice para organizar um processo seletivo?",
                a: 'Gestores públicos e instituições interessadas podem entrar em contato por meio da página "Contato" para solicitar proposta e conhecer nossas soluções em consultoria, planejamento e execução de processos seletivos.',
              },
            ].map((faq, index) => (
              <Card key={index} className="border-slate-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold flex-shrink-0">{index + 1}.</span>
                    {faq.q}
                  </h3>
                  <p className="text-slate-600 leading-relaxed pl-5">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}