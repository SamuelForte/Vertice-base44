export default {
  "name": "Edital",
  "type": "object",
  "properties": {
    "numero": {
      "type": "string",
      "description": "N\u00famero do edital (ex: Edital 003/2025)"
    },
    "titulo": {
      "type": "string",
      "description": "T\u00edtulo do processo seletivo"
    },
    "sigla_instituicao": {
      "type": "string",
      "description": "Sigla da institui\u00e7\u00e3o ou \u00f3rg\u00e3o parceiro"
    },
    "nome_instituicao": {
      "type": "string",
      "description": "Nome completo da institui\u00e7\u00e3o"
    },
    "area_atuacao": {
      "type": "string",
      "enum": [
        "Educa\u00e7\u00e3o",
        "Sa\u00fade",
        "Banco de Bolsistas",
        "Gest\u00e3o Escolar",
        "Assist\u00eancia Social",
        "Cultura",
        "Meio Ambiente",
        "Administra\u00e7\u00e3o",
        "Tecnologia",
        "Seguran\u00e7a"
      ],
      "description": "\u00c1rea de atua\u00e7\u00e3o do processo"
    },
    "municipio": {
      "type": "string",
      "description": "Munic\u00edpio onde o processo ocorre"
    },
    "estado": {
      "type": "string",
      "default": "MA",
      "description": "Estado (UF)"
    },
    "status": {
      "type": "string",
      "enum": [
        "Aberto",
        "Em andamento",
        "Encerrado"
      ],
      "default": "Aberto",
      "description": "Status atual do edital"
    },
    "descricao": {
      "type": "string",
      "description": "Descri\u00e7\u00e3o detalhada do processo seletivo"
    },
    "requisitos": {
      "type": "string",
      "description": "Requisitos para participa\u00e7\u00e3o"
    },
    "vagas": {
      "type": "number",
      "description": "N\u00famero de vagas dispon\u00edveis"
    },
    "remuneracao": {
      "type": "string",
      "description": "Faixa de remunera\u00e7\u00e3o ou bolsa"
    },
    "data_publicacao": {
      "type": "string",
      "format": "date",
      "description": "Data de publica\u00e7\u00e3o do edital"
    },
    "data_inicio_inscricoes": {
      "type": "string",
      "format": "date",
      "description": "Data de in\u00edcio das inscri\u00e7\u00f5es"
    },
    "data_fim_inscricoes": {
      "type": "string",
      "format": "date",
      "description": "Data limite para inscri\u00e7\u00f5es"
    },
    "arquivo_cronograma_url": {
      "type": "string",
      "description": "URL do arquivo PDF com o cronograma detalhado"
    },
    "arquivo_cronograma_nome": {
      "type": "string",
      "description": "Nome do arquivo PDF do cronograma"
    },
    "cronograma": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "etapa": {
            "type": "string"
          },
          "data": {
            "type": "string"
          },
          "observacao": {
            "type": "string"
          }
        }
      },
      "description": "Cronograma completo do processo"
    },
    "documentos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "nome": {
            "type": "string"
          },
          "url": {
            "type": "string"
          },
          "tipo": {
            "type": "string"
          }
        }
      },
      "description": "Documentos oficiais para download"
    },
    "link_inscricao": {
      "type": "string",
      "description": "Link para inscri\u00e7\u00e3o online"
    },
    "contato_email": {
      "type": "string",
      "description": "Email para contato"
    },
    "contato_telefone": {
      "type": "string",
      "description": "Telefone para contato"
    },
    "destaque": {
      "type": "boolean",
      "default": false,
      "description": "Se o edital deve aparecer em destaque"
    },
    "ano": {
      "type": "number",
      "description": "Ano do edital"
    },
    "logo_url": {
      "type": "string",
      "description": "URL da logo da institui\u00e7\u00e3o do edital"
    }
  },
  "required": [
    "numero",
    "titulo",
    "sigla_instituicao",
    "area_atuacao",
    "municipio",
    "status"
  ]
};