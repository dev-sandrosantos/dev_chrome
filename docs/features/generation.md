Geração de Senhas (feature)
===========================

Objetivo
--------

Implementar a lógica segura e testável que monta e retorna senhas, respeitando as preferências do usuário.

Requisitos funcionais
---------------------

- Entrada: { length, options: { lower, upper, digits, specials }, specialChars, excludeAmbiguous, forceAll }
- length: inteiro entre 8 e 16.
- options: booleans que ativam/desativam categorias.
- forceAll: quando true, deve garantir pelo menos 1 de cada categoria (lower, upper, digit, special).

Regras de segurança
-------------------

- Usar crypto.getRandomValues para todas as necessidades de aleatoriedade.
- Não usar Math.random em nenhuma parte do gerador.
- Validar e sanitizar `specialChars` (remover duplicados, trim).
- Respeitar `excludeAmbiguous` removendo caracteres ambíguos do conjunto.

Implementação
-------------

1. Construir conjuntos por categoria (strings): lower, upper, digits, specials.
2. Se `excludeAmbiguous`, filtrar `Il0O` de todos os conjuntos.
3. Se `forceAll` for true:
   - Validar que `specials` não está vazio.
   - Reservar 1 posição aleatória para cada categoria e preencher com um caractere aleatório daquela categoria.
   - Preencher o restante com caracteres aleatórios do conjunto total permitido.
4. Se `forceAll` for false: preencher toda a senha a partir do conjunto permitido (sem garantia de categorias específicas).

Testes recomendados
-------------------

- gera comprimento correto (8..16).
- quando forceAll=true, cada categoria aparece pelo menos uma vez.
- quando excludeAmbiguous=true, nenhum caractere ambíguo aparece.
- caracteres gerados pertencem somente ao conjunto permitido.
- não usar Math.random (testar auditando código ou mockando comportamento).
