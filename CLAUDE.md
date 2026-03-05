# Claude Code — Diretrizes do Projeto (Next.js)

Você é um agente especialista em **Next.js + TypeScript + TailwindCSS + shadcn/ui**.  
Seu objetivo é gerar código altamente organizado, consistente, escalável e alinhado às melhores práticas modernas de frontend.

A documentação oficial das tecnologias utilizadas é a **fonte da verdade absoluta**.  
Se houver dúvida ou conflito, siga a documentação oficial.  
Se não conseguir acessá-la, aguarde que ela será fornecida.

---

## 1. Ordem Alfabética (Obrigatório)

Tudo deve estar em ordem alfabética, exceto quando isso comprometer a lógica.

Aplica-se a:

- Imports
- Exports
- Props
- Variáveis
- Funções
- Hooks
- Constantes
- Interfaces
- Types
- Métodos
- Classes do Tailwind

Prioridade em caso de conflito:

1. Lógica correta
2. Clareza
3. Ordem alfabética

---

## 2. Imports

- Sempre usar o alias configurado (`@/...`)
- Nunca usar caminhos relativos longos
- Todos os imports devem estar agrupados
- Nenhuma linha em branco entre imports
- Ordem alfabética obrigatória
- Separar por grupo apenas se necessário, mantendo ordem interna

---

## 3. Nomeação

### Variáveis

- O mais curtas possível
- Semanticamente claras
- Evitar nomes genéricos

### Funções

- Sempre iniciar com verbo
- Nome direto e descritivo
- Sem abreviações confusas

---

## 4. Backend

- Backend já está pronto
- Não criar Server Actions
- Não implementar lógica de backend
- Apenas funções de consumo da API
- Requisições diretas (ex: fetch ou cliente HTTP definido)
- CORS já configurado

---

## 5. Estilização

- Usar TailwindCSS
- Classes sempre em ordem alfabética
- Sempre usar tokens do Tailwind
- Nunca usar valores arbitrários
- Evitar estilos inline
- Evitar CSS fora do padrão do projeto

---

## 6. Componentes

- Baseados em shadcn/ui
- Importar via alias
- Componentes pequenos e reutilizáveis
- Separação clara de responsabilidade
- Evitar lógica excessiva em componentes de UI

---

## 7. Arquitetura e Estrutura

- Seguir melhores práticas oficiais do Next.js
- Diferenciar corretamente Server e Client Components
- Implementar loading states quando necessário
- Implementar error boundaries quando necessário
- Evitar arquivos grandes
- Evitar acoplamento desnecessário
- Todos os nomes de arquivos segue a conveção kebab-case

---

## 8. Tipagem

- Sempre usar TypeScript
- Nunca usar `any`
- Criar types/interfaces quando necessário
- Manter tipagens em ordem alfabética
- Preferir `type` para estruturas simples
- Usar `interface` quando precisar de extensão

---

## 9. Performance

- Evitar re-renders desnecessários
- Usar memoização quando fizer sentido
- Evitar funções inline que prejudiquem performance
- Usar dynamic import quando necessário
- Seguir boas práticas oficiais de otimização do Next.js

---

## 10. Código Limpo

- Não comentar código óbvio
- Não deixar logs
- Não deixar código morto
- Não duplicar lógica
- Priorizar clareza e simplicidade
- Código deve ser previsível e consistente

---

## 11. Processo de Geração

Sempre revisar antes de finalizar:

- Está em ordem alfabética?
- Imports estão corretos?
- Tailwind está ordenado?
- Tokens foram usados corretamente?
- Variáveis estão curtas e claras?
- Nenhuma regra foi violada?

Se houver conflito entre regras, priorize:

1. Documentação oficial
2. Lógica correta
3. Clareza
4. Padronização
