document.addEventListener('DOMContentLoaded', () => {
  // Estado da Aplicação
  const state = {
    theme: localStorage.getItem('scriptor_theme') || 'dark',
    activeView: 'dashboard',
    activeFlyout: null
  };

  // Elementos do DOM
  const htmlEl = document.documentElement;
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const iconDark = btnThemeToggle.querySelector('.theme-icon-dark');
  const iconLight = btnThemeToggle.querySelector('.theme-icon-light');

  const btnExport = document.getElementById('btn-export');
  const btnImport = document.getElementById('btn-import');
  const flyoutExport = document.getElementById('flyout-export');
  const flyoutImport = document.getElementById('flyout-import');

  const viewTitle = document.getElementById('view-title');
  const viewDesc = document.getElementById('view-desc');
  const fileInputJson = document.getElementById('file-input-json');

  // Mapeamento de Títulos das Seções
  const viewDetails = {
    'btn-dashboard': { title: 'Painel', desc: 'Visão geral do seu projeto literário.' },
    'btn-fase1': { title: 'Fase 1 - Fundação', desc: 'Definição do conceito, premissa e tema central.' },
    'btn-fase2': { title: 'Fase 2 - Psique do Protagonista', desc: 'Mapeamento psicológico, motivações e arcos dos personagens.' },
    'btn-fase3': { title: 'Fase 3 - Enredo Causal e Terceiro Trilho', desc: 'Construção do enredo de causa e efeito e subplot emocional.' },
    'btn-fase4': { title: 'Fase 4 - Cartões de Cena', desc: 'Organização sequencial de cenas e eventos chave.' },
    'btn-fase5': { title: 'Fase 5 - Roteiro (Roadmap)', desc: 'Estruturação completa da narrativa.' },
    'btn-editor': { title: 'Editor de Rascunho', desc: 'Espaço dedicado para escrita livre e rascunho.' }
  };

  // 1. Inicializar Tema
  function applyTheme(theme) {
    state.theme = theme;
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('scriptor_theme', theme);
    if (theme === 'light') {
      iconDark.classList.add('hidden');
      iconLight.classList.remove('hidden');
    } else {
      iconDark.classList.remove('hidden');
      iconLight.classList.add('hidden');
    }
  }
  applyTheme(state.theme);

  btnThemeToggle.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  });

  // 2. Controle de Submenus (Flyouts - Nível 2)
  function toggleFlyout(flyoutName) {
    if (state.activeFlyout === flyoutName) {
      closeFlyouts();
    } else {
      closeFlyouts();
      state.activeFlyout = flyoutName;
      if (flyoutName === 'export') flyoutExport.classList.add('open');
      if (flyoutName === 'import') flyoutImport.classList.add('open');
    }
  }

  function closeFlyouts() {
    flyoutExport.classList.remove('open');
    flyoutImport.classList.remove('open');
    state.activeFlyout = null;
  }

  btnExport.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFlyout('export');
  });

  btnImport.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFlyout('import');
  });

  // Fechar submenus ao clicar fora da barra de menu
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.sidebar')) {
      closeFlyouts();
    }
  });

  // 3. Navegação Nível 1
  const mainNavBtns = [
    'btn-dashboard', 'btn-fase1', 'btn-fase2', 
    'btn-fase3', 'btn-fase4', 'btn-fase5', 'btn-editor'
  ];

  mainNavBtns.forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', () => {
      mainNavBtns.forEach(bId => {
        const b = document.getElementById(bId);
        if (b) b.classList.remove('active');
      });
      btn.classList.add('active');
      closeFlyouts();

      const details = viewDetails[id] || { title: 'Seção', desc: '' };
      viewTitle.textContent = details.title;
      viewDesc.textContent = details.desc;
    });
  });

  // Novo Projeto
  document.getElementById('btn-new').addEventListener('click', () => {
    closeFlyouts();
    if (confirm('Deseja iniciar um novo projeto? Dados não salvos serão perdidos.')) {
      alert('Novo projeto iniciado.');
    }
  });

  // 4. Ações do Submenu Nível 2 (Exportar / Carregar)
  document.getElementById('btn-exp-json').addEventListener('click', () => {
    closeFlyouts();
    alert('Exportando em formato JSON...');
  });

  document.getElementById('btn-exp-md').addEventListener('click', () => {
    closeFlyouts();
    alert('Exportando em formato Markdown (.md)...');
  });

  document.getElementById('btn-exp-txt').addEventListener('click', () => {
    closeFlyouts();
    alert('Exportando em formato Texto (.txt)...');
  });

  document.getElementById('btn-exp-docx').addEventListener('click', () => {
    closeFlyouts();
    alert('Exportando em formato Word (.docx)...');
  });

  document.getElementById('btn-imp-json').addEventListener('click', () => {
    closeFlyouts();
    fileInputJson.click();
  });

  fileInputJson.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      alert(`Arquivo "${e.target.files[0].name}" carregado com sucesso.`);
      e.target.value = '';
    }
  });

  // 5. Registrar Service Worker para PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('SW registrado com sucesso:', reg.scope))
        .catch(err => console.log('Falha ao registrar SW:', err));
    });
  }
});
