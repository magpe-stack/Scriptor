/**
 * Scriptor - Aplicação Principal
 */

// Estado Global do Projeto do Utilizador
let projectState = {
  title: "",
  phase1: {},
  phase2: {},
  phase3: {
    problemaExterno: {},
    conflitosSecundarios: [],
    pontosDeVirada: [],
    personagensApoio: []
  },
  phase4: [], // Array de Cartões de Cena
  phase5: [],
  sceneDrafts: {}, // Guardador individual dos rascunhos por id de cena
  currentWritingSceneId: null,
  editorDraft: ""
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMenu();
  initPWA();
  initBrandClick();
  loadLocalProject();
});

/* ==========================================================================
   1. Persistência Local Básica
   ========================================================================== */
function saveLocalProject() {
  localStorage.setItem('scriptor_current_project', JSON.stringify(projectState));
}

function loadLocalProject() {
  const saved = localStorage.getItem('scriptor_current_project');
  if (saved) {
    try {
      projectState = JSON.parse(saved);
      if (!Array.isArray(projectState.phase4)) {
        projectState.phase4 = [];
      }
      if (!projectState.sceneDrafts) {
        projectState.sceneDrafts = {};
      }
    } catch (e) {
      console.error('Erro ao carregar projeto local:', e);
    }
  }
}

/* ==========================================================================
   2. Alternância do Modo Claro/Escuro & Ação do Logótipo
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('scriptor-theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('scriptor-theme', newTheme);
  });
}

function initBrandClick() {
  const brandElem = document.querySelector('.brand');
  if (!brandElem) return;

  brandElem.style.cursor = 'pointer';
  brandElem.addEventListener('click', () => {
    navigateToRoute('home');
  });
}

/* ==========================================================================
   3. Renderização de Ecrãs "Home" e "Novo Projeto"
   ========================================================================== */
function renderWelcomeView() {
  return `
    <section id="app-view" class="welcome-container">
      <div class="welcome-overlay">
        <h2>Bem-vindo ao Scriptor</h2>
        <p>Selecione uma opção no menu lateral para começar.</p>
      </div>
      <img src="ilustra-scriptor.svg" alt="Ilustração de boas-vindas do Scriptor" class="welcome-illustration">
    </section>
  `;
}

function renderNewProjectView() {
  return `
    <article class="theory-article">
      <h1>Novo Projeto de Romance</h1>
      <p>Informe o título do seu livro para iniciar a jornada de arquitetura e planejamento narrativo.</p>

      <div class="project-form-card">
        <label for="project-title-input" class="form-label">Título do Romance</label>
        <input 
          type="text" 
          id="project-title-input" 
          class="form-input" 
          placeholder="Título do projeto" 
          value="${projectState.title || ''}"
          autocomplete="off"
        />
        
        <div class="form-actions">
          <button id="start-project-btn" class="primary-btn">
            Iniciar
          </button>
        </div>
      </div>
    </article>
  `;
}

function initNewProjectEvents() {
  const titleInput = document.getElementById('project-title-input');
  const startBtn = document.getElementById('start-project-btn');

  if (!startBtn) return;

  startBtn.addEventListener('click', () => {
    const inputVal = titleInput.value.trim();
    if (!inputVal) {
      alert('Por favor, digite o título do projeto antes de iniciar.');
      titleInput.focus();
      return;
    }

    projectState.title = inputVal;
    saveLocalProject();
    navigateToRoute('phase1');
  });

  titleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      startBtn.click();
    }
  });
}

/* ==========================================================================
   4. Navegação Principal e Rotas
   ========================================================================== */
function navigateToRoute(route) {
  const mainView = document.getElementById('app-view');

  document.querySelectorAll('.icon-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.icon-btn[data-route="${route}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  if (route === 'home') {
    mainView.outerHTML = renderWelcomeView();
  } else if (route === 'new') {
    mainView.innerHTML = renderNewProjectView();
    initNewProjectEvents();
  } else if (route === 'phase1') {
    if (typeof renderPhase1View !== 'undefined') {
      mainView.innerHTML = renderPhase1View();
      initPhase1Events();
    }
  } else if (route === 'phase2') {
    if (typeof renderPhase2View !== 'undefined') {
      mainView.innerHTML = renderPhase2View();
      initPhase2Events();
    }
  } else if (route === 'phase3') {
    if (typeof renderPhase3View !== 'undefined') {
      mainView.innerHTML = renderPhase3View();
      initPhase3Events();
    }
  } else if (route === 'phase4') {
    if (typeof renderPhase4View !== 'undefined') {
      mainView.innerHTML = renderPhase4View();
      initPhase4Events();
    }
  } else if (route === 'phase5') {
    if (typeof renderPhase5View !== 'undefined') {
      mainView.innerHTML = renderPhase5View();
      initPhase5Events();
    }
  } else if (route === 'editor') {
    if (typeof renderEditorView !== 'undefined') {
      mainView.innerHTML = renderEditorView();
      initEditorEvents();
    } else {
      mainView.innerHTML = `
        <article class="theory-article">
          <h1>EDITOR DE RASCUNHO</h1>
          <p>Certifique-se de que o arquivo editor.js está incluído no index.html.</p>
        </article>
      `;
    }
  } else if (route === 'theory-pt') {
    if (typeof theoryPtContent !== 'undefined') mainView.innerHTML = theoryPtContent;
  } else if (route === 'theory-storygenius') {
    if (typeof theoryStoryGeniusContent !== 'undefined') mainView.innerHTML = theoryStoryGeniusContent;
  } else if (route === 'theory-steps') {
    if (typeof theoryStepsContent !== 'undefined') mainView.innerHTML = theoryStepsContent;
  } else if (route === 'theory-example') {
    if (typeof theoryExampleContent !== 'undefined') mainView.innerHTML = theoryExampleContent;
  } else if (route === 'theory-tips') {
    if (typeof renderTipsView !== 'undefined') {
      mainView.innerHTML = renderTipsView();
      initTipsEvents();
    }
  } else {
    mainView.innerHTML = `
      <article class="theory-article">
        <h1>${route.toUpperCase()}</h1>
        <p>Página em desenvolvimento.</p>
      </article>
    `;
  }
}

function initMenu() {
  const hasSubmenuItems = document.querySelectorAll('.menu-item.has-submenu');

  hasSubmenuItems.forEach(item => {
    const toggleBtn = item.querySelector('.toggle-submenu');
    
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = item.classList.contains('open');

      hasSubmenuItems.forEach(otherItem => otherItem.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  document.querySelectorAll('.icon-btn[data-route], .icon-btn[data-action], .icon-btn[data-export], .icon-btn[data-import]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget;

      if (target.dataset.action === 'new') {
        navigateToRoute('new');
        return;
      }

      if (target.dataset.route) {
        navigateToRoute(target.dataset.route);
        return;
      }

      if (target.dataset.export) {
        exportProject(target.dataset.export);
        return;
      }

      if (target.dataset.import === 'json') {
        importJsonProject();
        return;
      }
    });
  });
}

/* ==========================================================================
   5. Carregar / Importar Projeto de Ficheiro JSON
   ========================================================================== */
function importJsonProject() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json,application/json';

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);

        if (importedData && typeof importedData === 'object' && importedData.title) {
          projectState = importedData;
          if (!Array.isArray(projectState.phase4)) {
            projectState.phase4 = [];
          }
          if (!projectState.sceneDrafts) {
            projectState.sceneDrafts = {};
          }
          saveLocalProject();
          alert(`Projeto "${projectState.title}" carregado com sucesso!`);
          
          navigateToRoute('phase1');
        } else {
          alert('O arquivo JSON selecionado é inválido ou não possui o formato de projeto do Scriptor.');
        }
      } catch (err) {
        console.error('Erro ao ler arquivo JSON:', err);
        alert('Erro ao abrir o arquivo. Certifique-se de que é um JSON válido.');
      }
    };

    reader.readAsText(file);
  });

  fileInput.click();
}

/* ==========================================================================
   6. Exportação Semântica Ordenada
   ========================================================================== */
function exportProject(format) {
  if (!projectState.title) {
    alert('Nenhum projeto foi iniciado ainda.');
    return;
  }

  const filename = `${projectState.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_scriptor`;
  const p1 = projectState.phase1 || {};
  const p2 = projectState.phase2 || {};
  const p3 = projectState.phase3 || {};
  const pe = p3.problemaExterno || {};

  if (format === 'json') {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projectState, null, 2));
    downloadFile(dataStr, `${filename}.json`);
  } else if (format === 'md' || format === 'txt') {
    let content = `# ${projectState.title}\n\n`;

    // Fase 1
    content += `## Fase 1: Fundação e Conexão Autoral\n\n`;
    content += `### 1. A Primeira Fagulha\n${p1.fagulha || '(Vazio)'}\n\n`;
    content += `### 2. Por Que Você Se Importa?\n${p1.motivacao || '(Vazio)'}\n\n`;
    content += `### 3. O Ponto Central\n${p1.pontoCentral || '(Vazio)'}\n\n`;
    content += `### 4. A Premissa "E Se?"\n${p1.premissa || '(Vazio)'}\n\n`;
    content += `### 5. Leitor Ideal\n${p1.leitorIdeal || '(Vazio)'}\n\n`;
    content += `### 6. Sinopse de Contracapa\n${p1.sinopse || '(Vazio)'}\n\n`;
    content += `### 7. Livros Comparáveis\n${p1.comps || '(Vazio)'}\n\n`;
    content += `### 8. Promessa de Entretenimento e Gênero\n${p1.promessa || '(Vazio)'}\n\n`;

    // Fase 2
    content += `## Fase 2: Arquitetura Psicológica e Backstory Dramatizada\n\n`;
    content += `### 5. Estado Inicial\n${p2.estadoInicial || '(Vazio)'}\n\n`;
    content += `### 6. Desejo Superficial\n${p2.desejoSuperficial || '(Vazio)'}\n\n`;
    content += `### 7. Motivação Interna do Desejo\n${p2.motivacaoInterna || '(Vazio)'}\n\n`;
    content += `### 8. A Falsa Crença Central\n${p2.falsaCrenca || '(Vazio)'}\n\n`;
    content += `### 9 e 10. A Cena de Origem (Planejamento)\n${p2.cenaOrigemPlanejamento || '(Vazio)'}\n\n`;
    content += `### 9 e 10. A Cena de Origem (A Escrita)\n${p2.cenaOrigemEscrita || '(Vazio)'}\n\n`;
    content += `### 11. Cenas de Encruzilhada\n`;
    content += `* **Primeiro Momento:** ${p2.encruzilhada1 || '(Vazio)'}\n`;
    content += `* **Segundo Momento:** ${p2.encruzilhada2 || '(Vazio)'}\n`;
    content += `* **Terceiro Momento:** ${p2.encruzilhada3 || '(Vazio)'}\n\n`;

    // Fase 3
    content += `## Fase 3: Estruturação Causal do Enredo e Terceiro Trilho\n\n`;
    content += `### 12. O Problema Externo Principal\n`;
    content += `* **Descrição:** ${pe.descricao || '(Vazio)'}\n`;
    content += `* **Consequências Reais:** ${pe.consequencias || '(Vazio)'}\n`;
    content += `* **Prazo Limite:** ${pe.prazoLimite || '(Vazio)'}\n`;
    content += `* **Alto Custo Emocional:** ${pe.custoEmocional || '(Vazio)'}\n\n`;

    content += `### 13 & 14. Conflitos Secundários e Avaliação do Terceiro Trilho\n`;
    if (p3.conflitosSecundarios && p3.conflitosSecundarios.length > 0) {
      p3.conflitosSecundarios.forEach((c, i) => {
        content += `#### Conflito #${i+1}\n`;
        content += `* **Texto:** ${c.texto || '(Vazio)'}\n`;
        content += `* **Estágio:** ${c.categoria}\n`;
        content += `* **Força Dramática:** ${c.avaliacaoForca}\n`;
        content += `* **Terceiro Trilho:** ${c.avaliacaoTerceiroTrilho}\n`;
        content += `* **Notas:** ${c.notasQualitativas || '(Sem notas)'}\n\n`;
      });
    } else {
      content += `(Nenhum conflito cadastrado)\n\n`;
    }

    content += `### 15. Pontos de Virada\n`;
    if (p3.pontosDeVirada && p3.pontosDeVirada.length > 0) {
      p3.pontosDeVirada.forEach((pv, i) => {
        content += `#### Ponto de Virada #${i+1}: ${pv.titulo || '(Sem título)'}\n`;
        content += `${pv.descricao || '(Sem descrição)'}\n`;
        content += `* Causalidade ("Portanto"): ${pv.testeCausaEfeito ? 'Sim' : 'Não'}\n`;
        content += `* Fere Falsa Crença: ${pv.testeImpactoFalsaCrenca ? 'Sim' : 'Não'}\n`;
        content += `* Sem saída fácil: ${pv.testeAcaoVazia ? 'Sim' : 'Não'}\n\n`;
      });
    } else {
      content += `(Nenhum ponto de virada cadastrado)\n\n`;
    }

    content += `### 16. Personagens de Apoio\n`;
    if (p3.personagensApoio && p3.personagensApoio.length > 0) {
      p3.personagensApoio.forEach((pers) => {
        content += `* **${pers.nome || 'Sem nome'}** (${pers.funcao}): ${pers.conexaoEnredoCrenca || '(Sem conexão)'}\n`;
      });
      content += `\n`;
    } else {
      content += `(Nenhum personagem de apoio cadastrado)\n\n`;
    }

    // Fase 4
    content += `## Fase 4: Cartões de Cena\n\n`;
    if (Array.isArray(projectState.phase4) && projectState.phase4.length > 0) {
      projectState.phase4.forEach((sc, i) => {
        content += `### Cena #${i+1}: ${sc.titulo || '(Sem título)'}\n`;
        content += `* **Ponto Alfa:** ${sc.pontoAlfa || '(Vazio)'}\n`;
        content += `* **Causa (Ação):** ${sc.enredoCausa || '(Vazio)'}\n`;
        content += `* **Efeito (Consequência):** ${sc.enredoEfeito || '(Vazio)'}\n`;
        content += `* **Terceiro Trilho (Significado):** ${sc.terceiroTrilhoImporta || '(Vazio)'}\n`;
        content += `* **Terceiro Trilho (Realização):** ${sc.terceiroTrilhoRealizacao || '(Vazio)'}\n`;
        content += `* **E Por Isso? (Próxima decisão):** ${sc.ePorIsso || '(Vazio)'}\n\n`;
      });
    } else {
      content += `(Nenhum cartão de cena cadastrado)\n\n`;
    }

    // Fase 5
    content += `## Fase 5: Roteiro (Roadmap)\n\n`;
    if (Array.isArray(projectState.phase4) && projectState.phase4.length > 0) {
      projectState.phase4.forEach((sc, i) => {
        const draftText = projectState.sceneDrafts ? projectState.sceneDrafts[sc.id] : '';
        content += `### ${i+1}. ${sc.titulo || 'Cena sem título'}\n`;
        content += `* **ALFA:** ${sc.pontoAlfa || '(Vazio)'}\n`;
        content += `* **E POR ISSO?:** ${sc.ePorIsso || '(Vazio)'}\n`;
        content += `* **RASCUNHO:**\n${draftText || '(Sem rascunho escrito)'}\n\n`;
      });
    } else {
      content += `(Nenhuma cena no roteiro)\n\n`;
    }

    // Rascunho Geral e Cenas Escritas
    content += `## Rascunho Geral e Cenas Escritas\n\n`;
    if (projectState.sceneDrafts && Object.keys(projectState.sceneDrafts).length > 0) {
      Object.keys(projectState.sceneDrafts).forEach((id) => {
        const d = projectState.sceneDrafts[id];
        const sceneInfo = (projectState.phase4 || []).find(s => s.id === id);
        const title = d.title || (sceneInfo ? sceneInfo.titulo : 'Cena');
        content += `### ${title}\n\n${d.content || '(Vazio)'}\n\n`;
      });
    } else {
      content += `${projectState.editorDraft || '(Vazio)'}\n`;
    }

    const mime = format === 'md' ? 'text/markdown' : 'text/plain';
    const dataStr = `data:${mime};charset=utf-8,` + encodeURIComponent(content);
    downloadFile(dataStr, `${filename}.${format}`);
  } else if (format === 'docx') {
    alert('A exportação em DOCX será ativada com o preenchimento das fases.');
  }
}

function downloadFile(dataStr, fileName) {
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", fileName);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/* ==========================================================================
   7. Registro do Service Worker (PWA)
   ========================================================================== */
function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('Service Worker registrado:', reg.scope))
        .catch(err => console.error('Erro no Service Worker:', err));
    });
  }
}
