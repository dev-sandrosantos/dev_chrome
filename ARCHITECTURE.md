ARCHITECTURE — dev_chrome
=========================

Visão geral
-----------

A extensão foi projetada para ser pequena, segura e fácil de auditar. A arquitetura evita dependências externas e confia nas APIs web padrão (Web Crypto, Clipboard API, localStorage) para reduzir a superfície de ataque e simplificar permissões no manifest.

Principais conceitos
--------------------

- Segurança por design: geração de senhas usa `crypto.getRandomValues`.
- Simplicidade: UI mínima no `popup.html` sem background scripts complexos.
- Persistência local: preferências do usuário em `localStorage`.
- Separação de responsabilidades: UI (HTML/CSS) e lógica (popup.js).

Estrutura de módulos
--------------------

- `popup.js` — orquestra eventos do UI, valida entradas, monta conjuntos de caracteres e chama a rotina de geração.
- `generatePassword` — função central (local em `popup.js`) que pode ser extraída para um módulo separado para facilitar testes.

Boas práticas recomendadas
-------------------------

- Testabilidade: extraia a função de geração para um módulo importável e crie testes unitários.
- Permissões: mantenha o manifesto mínimo. Evite solicitações de permissões desnecessárias.
- Segurança: nunca persista senhas em storage sem criptografia. Se histórico for necessário, criptografe antes de salvar.
- Acessibilidade: manter roles e aria-attributes corretos e rodar testes automáticos (axe)

Escalabilidade
--------------

O design atual é propositalmente simples. Para escalar:

- Extraia lógica para módulos e adicione bundling (esbuild/webpack) se necessário.
- Adicione testes automatizados e CI.
- Considere migrar preferências para `chrome.storage.sync` se quiser sincronização entre dispositivos (ver limites).
