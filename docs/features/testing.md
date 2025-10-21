Testes (feature)
=================

Objetivo
--------

Definir os testes mínimos necessários para garantir que a geração de senhas e a UI funcionem conforme especificado.

Testes unitários (recomendado)
------------------------------

- Testar `generatePassword` isoladamente:
  - comprimento correto.
  - caracteres pertencentes ao conjunto permitido.
  - regra `forceAll` quando ativa.
  - `excludeAmbiguous` funciona.

- Framework recomendado: Jest.

Testes E2E / A11y
-----------------

- Playwright para interações no popup (abrir, alterar opções, gerar, copiar).
- axe-core integrado ao Playwright para checar problemas de acessibilidade.

Sugestão de scripts
-------------------

- `npm test` — roda testes unitários.
- `npm run e2e` — roda testes E2E (opcional, requer ambiente headless configurado).
