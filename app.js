/**
 * Scriptor - Aplicação Principal
 */

// Estado Global do Projeto do Usuário
let projectState = {
  title: "",
  phase1: {},
  phase2: {},
  phase3: {},
  phase4: [],
  phase5: [],
  editorDraft: ""
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMenu();
  initPWA();
  // Carrega projeto salvo anteriormente se existir no localStorage
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
    } catch (e) {
      console.error('Erro ao carregar projeto local:', e);
    }
  }
}

/* ==========================================================================
   2. Alternância do Modo Claro/Escuro
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

/* ==========================================================================
   3. Renderização da Tela "Novo Projeto"
   ========================================================================== */
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

    // Grava o título no estado global
    projectState.title = inputVal;
    saveLocalProject();

    // Redireciona para a Fase 1
    navigateToRoute('phase1');
  });

  // Permite dar Enter no campo para iniciar
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

  // Atualiza botão ativo na barra de navegação
  document.querySelectorAll('.icon-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.icon-btn[data-route="${route}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  if (route === 'new') {
    mainView.innerHTML = renderNewProjectView();
    initNewProjectEvents();
  } else if (route === 'phase1') {
    mainView.innerHTML = `
      <article class="theory-article">
        <h1>Fase 1: Fundação e Conexão Autoral</h1>
        <p><strong>Projeto:</strong> ${projectState.title || 'Sem título'}</p>
        <p>Formulário da Fase 1 em desenvolvimento...</p>
      </article>
    `;
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

  // Listener do botão Novo e demais rotas
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

      if (target.dataset.import) {
        console.log('Importar projeto:', target.dataset.import);
        return;
      }
    });
  });
}

/* ==========================================================================
   5. Exportação Semântica Ordenada
   ========================================================================== */
function exportProject(format) {
  if (!projectState.title) {
    alert('Nenhum projeto foi iniciado ainda.');
    return;
  }

  const filename = `${projectState.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_scriptor`;

  if (format === 'json') {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projectState, null, 2));
    downloadFile(dataStr, `${filename}.json`);
  } else if (format === 'md' || format === 'txt') {
    let content = `# ${projectState.title}\n\n`;
    content += `## Fase 1: Fundação e Conexão Autoral\n\n(A preencher)\n\n`;
    content += `## Fase 2: Arquitetura Psicológica\n\n(A preencher)\n\n`;
    content += `## Fase 3: Enredo Causal\n\n(A preencher)\n\n`;
    content += `## Fase 4: Cartões de Cena\n\n(A preencher)\n\n`;
    content += `## Fase 5: Roteiro (Roadmap)\n\n(A preencher)\n\n`;
    content += `## Rascunho Final\n\n${projectState.editorDraft || '(Vazio)'}\n`;

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
   6. Registro do Service Worker (PWA)
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
