# Scriptor — Manual do Usuário e Documentação Técnica

Bem-vindo ao manual oficial do **Scriptor**, a aplicação web progressiva (PWA) desenvolvida para auxílio no planejamento e escrita de romances com base na metodologia *Story Genius* (Lisa Cron).

---

## Sumário
1. [Introdução e Visão Geral](#1-introdução-e-visão-geral)
2. [Requisitos do Sistema](#2-requisitos-do-sistema)
3. [Instalação e Configuração](#3-instalação-e-configuração)
4. [Guia de Início Rápido](#4-guia-de-início-rápido)
5. [Interface e Navegação](#5-interface-e-navegação)
6. [Funcionalidades Principais](#6-funcionalidades-principais)
7. [Configurações Avançadas](#7-configurações-avançadas)
8. [Solução de Problemas](#8-solução-de-problemas)
9. [Suporte e Contato](#9-suporte-e-contato)
10. [Glossário de Termos](#10-glossário-de-termos)

---

## 1. Introdução e Visão Geral

O **Scriptor** é uma ferramenta focada em autores e roteiristas. Ele orienta o processo criativo desde a concepção do argumento e da psique do protagonista até o detalhamento de cada cena e a redação da prosa final.

### Objetivos Principais
* **Desenvolvimento Causal:** Garantir que cada cena da história seja consequência direta da ação anterior.
* **Arco de Transformação Interna:** Conectar a trama externa com a evolução interna (ponto de vista e crença falsa) do protagonista.
* **Privacidade e Portabilidade:** Funcionar de forma 100% *client-side* (no próprio navegador do usuário), garantindo a propriedade total dos dados.

---

## 2. Requisitos do Sistema

### Especificações Técnicas
* **Plataforma:** Qualquer navegador web moderno com suporte a HTML5, CSS3, ES6 JavaScript e `localStorage`.
* **Navegadores Recomendados:** Google Chrome, Mozilla Firefox, Microsoft Edge, Safari ou Brave (versões atualizadas).
* **Armazenamento:** Mínimo de 10 MB de espaço disponível no navegador.

### Compatibilidade
* **Dispositivos:** Desktops, Laptops, Tablets e Smartphones.
* **Sistemas Operacionais:** Windows, macOS, Linux, Android e iOS.

---

## 3. Instalação e Configuração

Como PWA (Progressive Web App), o Scriptor não exige instalação por instaladores tradicionais.

### Acesso Web
1. Abra o navegador e navegue até a URL do projeto <https://magpe-stack.github.io/Scriptor/> ou abra o ficheiro `index.html` localmente.

### Instalação como Aplicativo (PWA)
1. No navegador (Chrome/Edge/Safari), clique no ícone de **Instalar** na barra de endereço ou selecione **"Adicionar à Tela Inicial"**.
2. O Scriptor será instalado como um aplicativo nativo, permitindo uso **offline**.

---

## 4. Guia de Início Rápido

Para começar a planejar seu romance em menos de 5 minutos:

1. **Configuração do Projeto:** Clique no ícone `+` no menu lateral para definir o título e premissa.
2. **Fase 1 (Fundação):** Defina a questão central e o conflito base da história.
3. **Fase 2 (Protagonista):** Preencha a crença falsa e a ferida de origem do personagem.
4. **Fase 3 & 4 (Roteiro):** Mapeie os cartões de cena com Ponto Alfa e Causabilidade ("E por isso...").
5. **Escrever Prosa:** Acesse o **Editor de Rascunho** para escrever a cena ativa.
6. **Exportar:** Clique no menu de exportação e baixe a cópia em `.docx`.

---

## 5. Interface e Navegação

A interface do Scriptor foi projetada de forma minimalista, utilizando um painel lateral fixo (*Sidebar*) e uma área central de trabalho.

### Estrutura do Menu Lateral
* **Novo / Configurar Projeto (`+`):** Criação e redefinição de projetos.
* **Exportação / Importação (Ícone de Download):** Submenu para baixar arquivos nos formatos JSON, MD, TXT e DOCX, ou carregar cópias de segurança.
* **Módulo Teórico (Ícone de Graduação):** Acesso à teoria do método *Story Genius*.
* **Painel de Progresso (Ícone de Gráfico):** Visão geral de métricas, contagem de palavras e status do livro.
* **Fases Práticas (F1 a F5):**
  * `F1`: Fundação.
  * `F2`: Psique do Protagonista.
  * `F3`: Enredo Causal.
  * `F4`: Cartões de Cena.
  * `F5`: Roteiro e Roadmap.
* **Editor de Rascunho (Ícone de Lápis):** Espaço para a escrita e edição da prosa.

---

## 6. Funcionalidades Principais

### 1. Sistema de Fases Interativas
Formulários validados que guiam o autor passo a passo. Os dados são salvos automaticamente à medida que são digitados.

### 2. Editor de Rascunho Integrado
Ambiente focado na escrita de cenas específicas, com contagem de palavras em tempo real e atalhos de formatação.

### 3. Exportação para Word (.docx)
Permite gerar um documento `.docx` contendo todo o livro ou apenas a cena selecionada. O arquivo gerado utiliza especificação oficial do Microsoft Word para abrir em modo de edição direta (sem travamento de leitura protegida).

### 4. Salvamento Local e Backup JSON
Todos os dados permanecem salvos no `localStorage` do navegador. É possível exportar a estrutura inteira em arquivo `.json` para transferência entre dispositivos.

---

## 7. Configurações Avançadas

### Alternância de Tema (Modo Claro / Escuro)
O Scriptor ajusta o contraste visual conforme as preferências do usuário, preservando a identidade visual e o foco na leitura.

### Persistência de Dados
Os dados ficam gravados no navegador local. Recomenda-se realizar exportações periódicas em `.json` antes de limpar o histórico ou a cache do navegador.

---

## 8. Solução de Problemas

### 1. O arquivo `.docx` abre em modo de exibição protegida
* **Causa:** Conflito de extensões antigas.
* **Solução:** O Scriptor foi atualizado com o namespace oficial do MS Office. Baixe o documento novamente usando a versão atual do botão `DOCX`.

### 2. A tela da Fase 5 ficou em branco ou desapareceu
* **Causa:** Tentativa de leitura de dados corrompidos ou cena sem identificador válido.
* **Solução:** Certifique-se de estar utilizando a versão atualizada do `form-phase5.js`, que contém validações de integridade.

### 3. A tradução via extensão/script quebrou a layout
* **Causa:** Injeção externa de elementos DOM que alteram o CSS do aplicativo.
* **Solução:** O Scriptor funciona com o layout nativo. Desative extensões de tradução automática que forcem modificações de estilo no elemento `body`.

---

## 9. Suporte e Contato

Em caso de dúvidas sobre a metodologia ou bugs técnicos:

* **Repositório do Projeto:** Acompanhe atualizações no repositório de código.
* **Relato de Erros:** Abra uma *issue* descrevendo o passo a passo para reprodução do problema.

---

## 10. Glossário de Termos

* **Ponto Alfa:** A motivação inicial ou gatilho que dispara a ação da cena.
* **Causabilidade ("E por isso..."):** O nexo de causa e efeito que liga a cena atual à cena seguinte.
* **Crença Falsa:** A visão distorcida do mundo que o protagonista desenvolveu no passado e precisa superar ao longo da narrativa.
* **Story Genius:** Método de planejamento focado na causa, efeito e transformação interna do personagem.
