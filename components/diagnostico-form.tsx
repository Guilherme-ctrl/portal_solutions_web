"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FAIXAS_ORCAMENTO,
  TEMPO_OPERACAO,
  WHATSAPP_NUMERO,
} from "@/lib/site-config"

const estadoInicial = {
  nome: "",
  empresa: "",
  processo: "",
  tempoOperacao: "",
  orcamento: "",
  decisao: "",
}

export function DiagnosticoForm() {
  const [dados, setDados] = useState(estadoInicial)

  const preenchido =
    dados.nome.trim() !== "" &&
    dados.empresa.trim() !== "" &&
    dados.processo.trim() !== "" &&
    dados.tempoOperacao !== "" &&
    dados.orcamento !== "" &&
    dados.decisao !== ""

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (!preenchido) return

    const mensagem = [
      "Olá! Quero solicitar um Diagnóstico de Escopo.",
      "",
      `Nome: ${dados.nome}`,
      `Empresa: ${dados.empresa}`,
      `Tempo de operação: ${dados.tempoOperacao}`,
      `Faixa de orçamento: ${dados.orcamento}`,
      `Decisão: ${dados.decisao}`,
      "",
      "Processo que hoje roda em planilha, papel ou WhatsApp:",
      dados.processo,
    ].join("\n")

    window.open(
      `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <form onSubmit={enviar} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nome">Seu nome</Label>
          <Input
            id="nome"
            required
            value={dados.nome}
            onChange={(e) => setDados({ ...dados, nome: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="empresa">Empresa</Label>
          <Input
            id="empresa"
            required
            value={dados.empresa}
            onChange={(e) => setDados({ ...dados, empresa: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="processo">
          Qual processo da sua empresa hoje roda em planilha, papel ou WhatsApp?
        </Label>
        <Textarea
          id="processo"
          required
          rows={4}
          placeholder="Descreva como funciona hoje e onde trava."
          value={dados.processo}
          onChange={(e) => setDados({ ...dados, processo: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="tempo">Há quanto tempo a empresa opera?</Label>
          <Select
            value={dados.tempoOperacao}
            onValueChange={(v) => setDados({ ...dados, tempoOperacao: v })}
          >
            <SelectTrigger id="tempo" className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {TEMPO_OPERACAO.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="orcamento">Faixa de orçamento prevista</Label>
          <Select
            value={dados.orcamento}
            onValueChange={(v) => setDados({ ...dados, orcamento: v })}
          >
            <SelectTrigger id="orcamento" className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {FAIXAS_ORCAMENTO.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="decisao">Quem decide sobre a contratação?</Label>
        <Select
          value={dados.decisao}
          onValueChange={(v) => setDados({ ...dados, decisao: v })}
        >
          <SelectTrigger id="decisao" className="w-full">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Decido sozinho">Decido sozinho</SelectItem>
            <SelectItem value="Decido com sócios">Decido com sócios</SelectItem>
            <SelectItem value="Preciso levar para aprovação">
              Preciso levar para aprovação
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <button
        type="submit"
        disabled={!preenchido}
        className="w-full px-8 py-4 rounded-full bg-secondary text-secondary-foreground font-semibold text-lg transition-colors hover:bg-secondary/90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Enviar pelo WhatsApp
      </button>

      <p className="text-sm text-muted-foreground text-center">
        As respostas seguem preenchidas na mensagem. Retornamos em até um dia útil.
      </p>
    </form>
  )
}
