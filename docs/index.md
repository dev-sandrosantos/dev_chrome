Objetivo
--------

Este repositório contém um scaffold minimalista de uma extensão para Google Chrome que gera senhas seguras a partir de opções do usuário. Este documento foi escrito para novos colaboradores e para consumo por agentes automatizados (IA) que queiram entender o projeto, executar testes locais e contribuir.

Resumo rápido
--------------

- Popup pequeno e responsivo com controles para comprimento (8–16), categorias (minúsculas, maiúsculas, dígitos, especiais), campo para caracteres especiais permitidos, opção para excluir caracteres ambíguos, toggle opcional "Garantir 1 de cada categoria", indicador de força, e botões "Gerar" / "Copiar".
- Geração de senha usa crypto.getRandomValues (Web Crypto API) para entropia forte.
- Preferências do usuário (tema, tamanho da fonte, opções e caracteres) são persistidas em localStorage e restauradas quando o popup é aberto.

Contrato da função de geração (para desenvolvedores e IA)
-------------------------------------------------------

Nome: generatePassword / fluxo de geração

Entradas esperadas (antes de chamar a função):
- length: inteiro entre 8 e 16 (inclusive).
- options: objeto com booleans { lower, upper, digits, specials } indicando categorias permitidas.
- specialChars: string com os caracteres especiais permitidos (p.ex. "!@#$%&*().").
- excludeAmbiguous: boolean (se true, remove I, l, 0, O do conjunto permitido).
- forceAll: boolean (se true, garantir pelo menos 1 minúscula, 1 maiúscula, 1 dígito e 1 especial).

Saída/contrato
- Retorna uma string com o comprimento solicitado contendo apenas caracteres permitidos e, se `forceAll` estiver ativo, garantindo ao menos 1 caractere de cada categoria (lower/upper/digit/special). A função usa crypto.getRandomValues e deve ser determinística apenas no sentido de usar entropia criptográfica — não deve usar Math.random.

Regras e validações (implementadas)
----------------------------------
- O comprimento deve estar entre 8 e 16. O botão de geração é desabilitado se inválido.
- Quando `forceAll` está ativo, é necessário que `specialChars` contenha pelo menos um caractere; caso contrário a geração é impedida.
- As preferências são persistidas em `localStorage` (tema, fontSize, prefs) e restauradas na inicialização do popup.

Arquitetura e arquivos principais
--------------------------------
- `extension/manifest.json` — manifest V3 e configuração de popup.
- `extension/popup.html` — markup acessível (aria labels, radiogroup para fontes, toggle de tema).
- `extension/popup.css` — estilos com suporte a light/dark e classes de fonte escaláveis aplicadas ao `html`.
- `extension/popup.js` — lógica do UI, geração de senha (crypto), persistência de preferências e acessibilidade.

Padrões e estilo de implementação
---------------------------------
- Sempre use `crypto.getRandomValues` para aleatoriedade. Não introduza `Math.random` em caminhos de geração de senha.
- Respeite `excludeAmbiguous` ao construir o conjunto de preenchimento.
- Use apenas as dependências da web padrão (HTML/CSS/JS). Este projeto é propositalmente sem dependências externas para simplificar permissões da extensão.

Formato de preferências (localStorage)
------------------------------------

Chave: `prefs` (JSON)

Estrutura:

{
	"length": 12,
	"lower": true,
	"upper": true,
	"digits": true,
	"specials": true,
	"specialChars": "!@#$%&*()[]{}<>?.",
	"excludeAmbiguous": false,
	"forceAll": false
}

Outras chaves usadas:
- `theme` — `"light"` | `"dark"`
- `fontSize` — `"small"` | `"normal"` | `"large"`

Como rodar e testar localmente (dev)
-----------------------------------

1. Abra o Chrome/Edge e acesse chrome://extensions.
2. Ative "Modo do desenvolvedor".
3. Clique em "Carregar sem compactação" e selecione a pasta `extension/` deste repositório.
4. Abra o popup da extensão.

Testes manuais recomendados
--------------------------
- Verifique persistência: altere preferências (tema, font-size, length, checkboxes, specialChars) e feche/abra o popup — as preferências devem persistir.
- Teste `forceAll`: ative o toggle e gere senhas de vários comprimentos (8–16). Cada senha deve conter ao menos 1 minúscula, 1 maiúscula, 1 dígito e 1 caractere especial.
- Teste `excludeAmbiguous`: ative e gere várias senhas; caracteres ambíguos (I,l,0,O) não devem aparecer.
- Teste acessibilidade: navegue por Tab e verifique outlines e labels (use Lighthouse / axe para relatório mais completo).

Checklist para Pull Requests (pequeno)
------------------------------------
- [ ] Lint e formatação aplicados (Prettier / ESLint se adicionados).
- [ ] Função de geração tem testes unitários cobrindo regras (mínimo + forceAll).
- [ ] Mudanças na UI mantêm ou melhoram acessibilidade (tab order, aria labels).
- [ ] Preferências persistidas e restauradas corretamente.
- [ ] Não foram introduzidas chamadas de rede ou persistência de senhas.

Notas finais e próximos passos
----------------------------

- Adicionar testes automatizados (Jest) para `generatePassword` e um fluxo E2E com Playwright + axe para testes de acessibilidade seria o próximo passo natural.
- Se quiser sincronizar preferências entre dispositivos, usar `chrome.storage.sync` é possível, mas exige considerar quotas e permissões.

Se precisar, eu posso abrir PRs com:
- testes unitários para `generatePassword`;
- integração Playwright + axe para validar a a11y;
- configuração de CI (GitHub Actions) que rode lint + testes.
