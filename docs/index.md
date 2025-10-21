Objetivo: criar uma extensão simples para Google Chrome que gere senhas seguras a partir de opções do usuário.

Visão geral de funcionalidades
- Interface (popup) pequena e minimalista, com layout clean.
- Controle de comprimento: seletor numérico/slider entre 8 e 16 caracteres.
- Opções de categorias: checkboxes para incluir/excluir
	- letras maiúsculas
	- letras minúsculas
	- dígitos (0-9)
	- caracteres especiais
- Campo de texto para especificar quais caracteres especiais são permitidos (por exemplo: !@#$%&*).
- Opção para excluir caracteres ambíguos (por exemplo: I, l, 0, O).
- Indicador de força da senha (ex.: Média / Alta) — baseado em comprimento e variedade de categorias selecionadas.
- Botões: "Gerar" e "Copiar". Ao clicar em "Copiar" mostra um feedback (toast ou mudança de texto por alguns segundos).

Regras e validações
- O comprimento deve estar entre 8 e 16. Mostrar erro/feedback se fora do intervalo.
- Deve haver ao menos uma categoria selecionada; caso contrário, desabilitar o botão de gerar e mostrar aviso.

Segurança e qualidade do gerador
- Use crypto.getRandomValues (Web Crypto API) para entropia criptográfica forte; não use Math.random.
- Não persistir as senhas geradas em storage público por padrão. Se for implementar histórico, criptografe localmente ou ofereça opção desativável.
- Evitar gerar senhas previsíveis: garantir que cada categoria selecionada possa aparecer pelo menos uma vez (opcionalmente, para força mínima).

Arquitetura e arquivos mínimos (Manifest V3)
- manifest.json — metadados e permissões mínimas (popup). Manifest V3 recomendado.
- popup.html — markup do popup.
- popup.css — estilos minimalistas e responsivos.
- popup.js — lógica: leitura das opções, geração de senha com crypto.getRandomValues, copiar para clipboard e UI/feedback.

Exemplo de função segura para gerar senha (JavaScript)
```javascript
function generatePassword(length, allowedChars) {
	if (!allowedChars || allowedChars.length === 0) return '';
	const result = [];
	const rand = new Uint32Array(length);
	crypto.getRandomValues(rand);
	for (let i = 0; i < length; i++) {
		const idx = rand[i] % allowedChars.length;
		result.push(allowedChars.charAt(idx));
	}
	return result.join('');
}

// Exemplo de montagem do conjunto de caracteres
const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const digits = '0123456789';
const specials = '!@#$%&*()[]{}<>?';

// Uso exemplo
const allowed = lower + upper + digits + specials;
const pwd = generatePassword(12, allowed);
navigator.clipboard.writeText(pwd).then(() => console.log('Senha copiada'));
```

Como testar localmente
1) Crie a pasta do projeto com os arquivos `manifest.json`, `popup.html`, `popup.css` e `popup.js`.
2) Vá em chrome://extensions, ative "Modo do desenvolvedor" e clique em "Carregar sem compactação" apontando para a pasta do projeto.
3) Abra o popup da extensão, teste as combinações e use "Copiar" para verificar o clipboard.

Próximos passos sugeridos
- Se desejar, eu gero o scaffold completo (manifest + popup.html/css/js) pronto para carregar no Chrome.
- Implementar testes mínimos (unitários) para a função de geração de senha.
- Adicionar opções extras: incluir/excluir caracteres ambíguos, copiar automaticamente, botão para fixar o nível de força.

Observações finais
É uma ideia prática e de alto valor para uso diário. Posso gerar o scaffold agora se quiser — quer que eu crie os arquivos da extensão no projeto? 