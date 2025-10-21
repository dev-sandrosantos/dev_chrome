Persistência (feature)
======================

Objetivo
--------

Persistir preferências do usuário entre aberturas do popup para melhorar a experiência.

O que persistir
----------------

- length
- lower, upper, digits, specials
- specialChars
- excludeAmbiguous
- forceAll
- theme
- fontSize

LocalStorage vs chrome.storage
-----------------------------

- Implementação atual usa `localStorage` por simplicidade e compatibilidade entre navegadores.
- Para sincronização entre dispositivos, usar `chrome.storage.sync` (requer permissões e limites de quota).

Formato
-------

- Chave: `prefs` (JSON). Estrutura descrita em `docs/index.md`.

Boas práticas
------------

- Validar valores ao carregar (por exemplo, `length` estar no intervalo esperado).
- Não persistir senhas geradas por padrão.
- Fornecer um mecanismo para restaurar padrões (future improvement).
