Gerador de Senhas — dev_chrome

Resumo
------

Este projeto é uma extensão minimalista para Google Chrome que gera senhas seguras com base em preferências do usuário (comprimento, categorias de caracteres, caracteres especiais, exclusão de ambíguos e opção para garantir pelo menos 1 de cada categoria). O foco é segurança (uso da Web Crypto API), simplicidade (UI pequena e acessível) e facilidade de contribuição.

Por onde começar
----------------

1. Clone o repositório e abra-o no VS Code.
2. Revise os arquivos em `extension/` (`popup.html`, `popup.css`, `popup.js`) — é aqui que a maior parte da lógica e UI residem.
3. Leia `docs/index.md` para visão geral, contrato da função de geração e instruções de teste.
4. Para desenvolver localmente: abra `chrome://extensions`, ative modo desenvolvedor e carregue a pasta `extension/`.

Dicas rápidas para contribuir
----------------------------
- Mantenha as alterações pequenas e focadas (uma feature por PR).
- Sempre prefira `crypto.getRandomValues` para aleatoriedade nas senhas.
- Teste manualmente mudanças de UI no popup (prefira testes automatizados quando possível).

Próximos passos recomendados
---------------------------
- Adicionar testes unitários para `generatePassword`.
- Configurar CI (GitHub Actions) com lint e testes.
- Adicionar E2E com Playwright + axe para validar acessibilidade.
