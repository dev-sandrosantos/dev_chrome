UI (feature)
=============

Objetivo
--------

Criar um popup simples, responsivo e acessível que permite o usuário configurar e gerar senhas.

Componentes
-----------

- Slider/entrada para `length` (8–16).
- Checkboxes para `lower`, `upper`, `digits`, `specials`.
- Input de texto para `specialChars`.
- Checkbox `excludeAmbiguous`.
- Toggle `forceAll` (Garantir 1 de cada categoria).
- Botões: Gerar, Copiar.
- Controles no header: alternância de tema (sol/lua) e tamanho de fonte (A-, A, A+).
- Área que mostra a senha gerada e indicador de força.

Acessibilidade
--------------

- Todos os controles devem ter `aria-label` descritivos.
- Grupo de controle de fonte deve usar `role="radiogroup"` e botões `role="radio"` com `aria-checked`.
- Foco visível (outline) para elementos interativos.
- `aria-live="polite"` para a área que mostra a senha.

Comportamento
-------------

- Persistir preferências em localStorage.
- Validar inputs e desabilitar o botão Gerar quando inválido.
- Ao clicar em Copiar, mostrar feedback temporário.
