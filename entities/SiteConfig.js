export default {
  "name": "SiteConfig",
  "type": "object",
  "properties": {
    "chave": {
      "type": "string",
      "description": "Identificador \u00fanico da configura\u00e7\u00e3o (ex: 'global')"
    },
    "logo_url": {
      "type": "string",
      "description": "URL da imagem da logo do site"
    },
    "nome_site": {
      "type": "string",
      "description": "Nome do site/portal"
    }
  },
  "required": [
    "chave"
  ]
};