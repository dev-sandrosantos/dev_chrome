Gerador de Senhas - Extensão Chrome (Manifest V3)

Instalação local (modo desenvolvedor):

1. Abra `chrome://extensions` no Chrome/Edge.
2. Ative "Modo do desenvolvedor".
3. Clique em "Carregar sem compactação" e selecione a pasta `extension/` neste repositório.

Arquivos principais:
- `manifest.json` — manifest V3
- `popup.html` — UI
- `popup.css` — estilos
- `popup.js` — lógica do gerador (usa Web Crypto API)

Notas de segurança:
- A extensão NÃO grava senhas em storage.
- Usa `crypto.getRandomValues` para entropia forte.

