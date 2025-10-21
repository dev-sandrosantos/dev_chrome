STRUCTURE — Estrutura de exemplo do projeto
===========================================

Exemplo de estrutura de pastas para o projeto `dev_chrome`:

```
/dev_chrome
├── ARCHITECTURE.md          # Visão geral da arquitetura e boas práticas
├── README.md                # Apresentação do projeto e por onde começar
├── docs/
│   ├── index.md             # Documentação principal (esta pasta)
│   ├── STRUCTURE.md         # Este arquivo
│   └── features/
│       ├── generation.md    # Documentação da feature de geração
│       ├── ui.md            # Documentação da UI
│       ├── persistence.md   # Persistência e formato de prefs
│       ├── accessibility.md # Acessibilidade
│       └── testing.md       # Estratégia de testes
├── extension/
│   ├── manifest.json        # Manifest V3
│   ├── popup.html           # UI do popup
│   ├── popup.css            # Estilos
│   ├── popup.js             # Lógica principal
│   ├── icon48.svg
│   └── icon128.svg
└── package.json (opcional)  # Scripts de teste e dev
```

Observações
-----------

- Coloque código reutilizável (ex.: função de geração) em um arquivo/module próprio para facilitar testes.
- Mantenha o `extension/` como o artefato pronto para carregar no navegador.
- Se adicionar build tools, considere um diretório `src/` e um `dist/` para artefatos gerados.
