# Manual do Usuário: Scriptor (PWA)

O **Scriptor** é uma aplicação web progressiva (PWA) desenvolvida para o planejamento, estruturação e redação de romances literários, fundamentada na metodologia *Story Genius* (Lisa Cron). Este manual contém todas as especificações técnicas, guias de navegação e instruções operacionais do sistema.

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

O **Scriptor** foi concebido para auxiliar escritoras e escritores na construção de narrativas coesas do ponto de vista causal e psicológico. Em vez de focar apenas em eventos externos, o software orienta a elaboração da trama a partir da jornada interna do protagonista (a luta entre o desejo consciente e a crença limitante/ferida do passado).

### Objetivos do Software
* **Estruturação Causal:** Eliminar furos de roteiro conectando a causa e a consequência de cada cena.
* **Privacidade e Desempenho:** Armazenamento 100% *client-side* (os dados residem exclusivamente no navegador do usuário via `localStorage`).
* **Portabilidade:** Permitir exportação integral do projeto em formatos padronizados (`.docx`, `.json`, `.md`, `.txt`).
* **Acessibilidade Offline:** Funcionamento completo sem dependência de conexão com a internet através de tecnologia PWA.

---

## 2. Requisitos do Sistema

### Especificações Técnicas
* **Arquitetura:** Progressive Web App (PWA) de página única (SPA).
* **Tecnologias de Frontend:** HTML5, CSS3 puro (Variáveis CSS e CSS Grid/Flexbox) e JavaScript ES6+.
* **Motor de Execução:** Qualquer navegador moderno com suporte a `localStorage` e *Service Workers*.

### Compatibilidade de Navegadores
* **Google Chrome / Chromium:** Versão 90 ou superior (Recomendado).
* **Mozilla Firefox:** Versão 88 ou superior.
* **Microsoft Edge:** Versão 90 ou superior.
* **Safari (macOS / iOS):** Versão 14 ou superior.

### Armazenamento e Hardware
* **Memória RAM Mínima:** 2 GB.
* **Espaço em Disco:** Menos de 5 MB de cache para a aplicação. O armazenamento dos projetos utiliza a cota do `localStorage` do navegador (aproximadamente 5 MB a 10 MB por domínio, o equivalente a centenas de manuscritos).

---

## 3. Instalação e Configuração

Por se tratar de um PWA, o Scriptor não exige executáveis tradicionais (`.exe` ou `.dmg`).

### Instalação no Desktop (Chrome / Edge / Firefox)
1. Acesse o endereço do Scriptor no seu navegador.
2. Observe o ícone de instalação de aplicativo no canto direito da barra de endereço (ou acesse o menu de opções do navegador).
3. Clique em **"Instalar Scriptor"**.
4. A aplicação passará a abrir em uma janela autônoma, com atalho na sua área de trabalho ou menu de aplicativos.

### Instalação no Mobile (Android / iOS)
* **Android (Chrome):** Abra o link, toque nos três pontos verticais no canto superior direito e selecione **"Adicionar à tela inicial"** ou **"Instalar aplicativo"**.
* **iOS (Safari):** Abra o link, toque no ícone de **Compartilhar** (quadrado com seta para cima) e selecione **"Adicionar à Tela de Início"**.

---

## 4. Guia de Início Rápido

Para iniciar um projeto no Scriptor em menos de 5 minutos:

1. **Criar / Configurar Projeto:** Clique no ícone de adição (`+`) no menu lateral para definir o título, autor e premissa.
2. **Fase 1 (Fundação):** Defina o argumento central do livro e qual é o *Terceiro Trilho* (o dilema interno do protagonista).
3. **Fase 2 (Psique do Protagonista):** Mapeie a Ferida Primária (o evento do passado) e a Crença Limitante.
4. **Fase 3 (Enredo Causal):** Estruture os marcos de virada da trama baseados nas decisões do personagem.
5. **Fase 4 (Cartões de Cena):** Crie os cartões individuais aplicando a estrutura *Ponto Alfa* e *E Por Isso?*.
6. **Fase 5 (Roteiro) & Editor:** Acompanhe a visão geral na Fase 5 e clique em **"Editar Prosa no Editor"** para escrever os capítulos no Editor de Rascunho.

---

## 5. Interface e Navegação

A interface do Scriptor organiza-se em dois eixos funcionais:

* **Painel Lateral Esquerdo (Sidebar Persistente):** Concentra as ações globais de projeto, módulo de estudo, atalhos para as 5 fases e editor.
* **Área Central (`#app-view`):** Espaço dinâmico onde os formulários, relatórios, métricas e telas de escrita são renderizados.

### Menu Lateral Persistente (Sidebar)
* **Novo / Configurar Projeto (`+`):** Abre a tela para criação ou edição dos metadados do projeto.
* **Menu de Exportação / Importação:** Submenu com opções para baixar em `.docx`, `.json`, `.md`, `.txt` e carregar projetos via `.json`.
* **Módulo Teórico (`PT`, `SG`, `PA`, `EX`, `DC`):** Coleção de materiais explicativos sobre a metodologia *Story Genius*.
* **Painel de Progresso:** Exibe métricas de contagem de palavras, número de cenas ativas e metas.
* **Fases da Metodologia (`F1` a `F5`):** Acesso direto aos formulários de estruturação.
* **Editor de Rascunho:** Ambiente de escrita limpo para desenvolvimento da prosa.

---

## 6. Funcionalidades Principais

### Módulo Teórico
Fornece embasamento direto na interface, dividido em 5 seções:
* **PT (Primeiros Passos):** Visão geral da jornada.
* **SG (Story Genius):** Fundamentos teóricos sobre a dinâmica entre enredo interno e externo.
* **PA (Passo a Passo):** Guia prático de execução das fases.
* **EX (Exemplo Prático):** Estudo de caso de um romance completo desdobrado na metodologia.
* **DC (Dicas de Redação):** Técnicas de prosa, mostre-não-conte (*show, don't tell*) e ritmo.

### Fases de Planejamento (F1 a F5)
1. **Fase 1 (Fundação):** Coleta da ideia inicial, tema e conceito.
2. **Fase 2 (Psique do Protagonista):** Mapeamento do Desejo Consciente (*Want*), Necessidade Inconsciente (*Need*), Ferida Primária e Crença Limitante.
3. **Fase 3 (Enredo Causal):** Construção da linha do tempo com foco em causa e efeito.
4. **Fase 4 (Cartões de Cena):** Cada cena é dividida estritamente em:
   * **Ponto Alfa:** O evento da cena e o objetivo do protagonista.
   * **E Por Isso?:** A consequência direta do evento na mentalidade do protagonista e o gancho para a cena seguinte.
5. **Fase 5 (Roteiro / Roadmap):** Painel consolidador de todas as cenas, exibindo contagem de palavras em tempo real e atalho direto para redação.

### Editor de Rascunho
* Ambiente de foco focado na escrita da cena selecionada.
* Sincronização automática em tempo real com o estado global do aplicativo.
* Calculadora integrada de palavras e caracteres.

### Sistema de Exportação e Importação
* **Word (.docx):** Gera um documento editável com formatação limpa e estrutura de capítulos.
* **JSON:** Salva o arquivo de backup completo da estrutura do projeto (ideal para transferência entre dispositivos ou segurança).
* **Markdown (.md) / Texto (.txt):** Exportações leves para integração com editores de código ou compiladores de e-books.
* **Importação (JSON):** Restaura um projeto completo previamente exportado.

---

## 7. Configurações Avançadas

### Gerenciamento de Memória Local (`localStorage`)
Todo o progresso do Scriptor é persistido sob a chave de estado global. 

* **Dica de Segurança:** Como o banco de dados é mantido no navegador, limpar os dados de navegação ("Limpar Cache e Biscoitos/Cookies") pode apagar seu trabalho se você não tiver feito um backup recente.
* **Boas Práticas:** Exporte regularmente seu projeto no formato **JSON** para garantir cópias de segurança externas.

### Utilização offline
O *Service Worker* do Scriptor armazena em cache todos os ficheiros estáticos (`HTML`, `CSS`, `JS`, fontes e ícones). Após a primeira visita com conexão à internet, a aplicação torna-se completamente autônoma e funcional sem rede.

---

## 8. Solução de Problemas

### 1. A página da Fase 5 ficou em branco ou não exibe o roteiro
* **Causa:** Tentar ler um rascunho de cena ou id corrompido/inexistente no `sceneDrafts`.
* **Solução:** O script `form-phase5.js` possui proteção contra arrays e objetos indefinios. Certifique-se de que possui a versão atualizada do arquivo com validações para `projectState.phase4` e `projectState.sceneDrafts`.

### 2. O arquivo `.docx` exportado abre em modo "Somente Leitura" ou com erro de formato
* **Causa:** Incompatibilidade do namespace XML no cabeçalho do documento exportado.
* **Solução:** O módulo `export.js` utiliza o namespace oficial Microsoft Office Word (`xmlns:w="urn:schemas-microsoft-com:office:word"`), garantindo compatibilidade nativa com Microsoft Word, Google Docs e LibreOffice.

### 3. A interface parece desconfigurada ou desalinhada
* **Causa:** Injeção de scripts externos incompatíveis (como widgets do Google Translate) ou cache de versão antiga do CSS.
* **Solução:** Pressione `Ctrl + F5` (ou `Cmd + Shift + R` no Mac) para forçar a limpeza do cache de estilos. Evite injetar scripts dinâmicos de terceiros que modifiquem as tags `body` ou `html`.

---

## 9. Suporte e Contato

O Scriptor é um projeto open-source desenvolvido por **Marinaldo Gomes Pedrosa**.

* **Repositório oficial:** [GitHub Pages / Scriptor](https://github.com/)
* **Relato de Bugs e Sugestões:** Abra uma *Issue* no repositório oficial descrevendo o comportamento esperado e o comportamento observado.

---

## 10. Glossário de Termos

* **PWA (Progressive Web App):** Aplicativo construído com tecnologias web que oferece experiência similar a um aplicativo nativo.
* **Crença Limitante:** A visão equivocada sobre o mundo que o protagonista desenvolve devido a uma trauma/ferida do passado.
* **Ponto Alfa:** O gatilho prático de ação que inicia uma cena dentro do método *Story Genius*.
* **E Por Isso?:** A justificativa lógica e emocional que conecta a reação da cena atual ao estopim da próxima cena.
* **Terceiro Trilho:** A linha de tensão interna do personagem que corre paralelamente aos acontecimentos externos da trama.
