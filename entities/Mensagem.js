export default {
  "name": "Mensagem",
  "type": "object",
  "properties": {
    "nome": {
      "type": "string",
      "description": "Nome do remetente"
    },
    "email": {
      "type": "string",
      "description": "E-mail do remetente"
    },
    "assunto": {
      "type": "string",
      "description": "Assunto da mensagem"
    },
    "mensagem": {
      "type": "string",
      "description": "Conte\u00fado da mensagem"
    },
    "lida": {
      "type": "boolean",
      "default": false,
      "description": "Se a mensagem foi lida pelo admin"
    }
  },
  "required": [
    "nome",
    "email",
    "assunto",
    "mensagem"
  ]
};