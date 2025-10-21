Acessibilidade (feature)
=========================

Objetivo
--------

Garantir que o popup seja utilizável por pessoas com diferentes necessidades de acessibilidade.

Requisitos
----------

- Contraste suficiente entre texto e fundo em ambos os temas.
- Navegação por teclado completa (Tab, Shift+Tab, setas onde aplicável).
- Foco visível em todos os controles.
- Labels acessíveis (`aria-label`, `role`, `aria-checked`).
- `aria-live` para feedbacks dinâmicos.

Verificações automáticas
------------------------

- Use ferramentas como Lighthouse e axe para checar problemas de contraste, roles e foco.
- Teste com leitor de tela (NVDA/VoiceOver) para verificar leitura correta de labels.

Melhorias possíveis
-------------------

- Adicionar opção de alto contraste e tema de grandes fontes.
- Fornecer mensagens mais descritivas para leitores de tela (por exemplo, "Botão Gerar — ativa para gerar senha com comprimento 12").
