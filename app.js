/**
 * Scriptor - Aplicação Principal
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMenu();
  initPWA();
});

/* ==========================================================================
   1. Alternância do Modo Claro/Escuro
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
   2. Navegação e Expansão dos Submenus de Nível 2
   ========================================================================== */
function initMenu() {
  const hasSubmenuItems = document.querySelectorAll('.menu-item.has-submenu');

  hasSubmenuItems.forEach(item => {
    const toggleBtn = item.querySelector('.toggle-submenu');
    
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      const isOpen = item.classList.contains('open');

      // Fecha outros submenus para manter sanfona única
      hasSubmenuItems.forEach(otherItem => {
        otherItem.classList.remove('open');
      });

      // Alterna o submenu atual
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Handler para ações e cliques nos botões
  document.querySelectorAll('.icon-btn[data-route], .icon-btn[data-action], .icon-btn[data-export], .icon-btn[data-import]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget;
      
      // Destaca botão ativo
      document.querySelectorAll('.icon-btn').forEach(b => b.classList.remove('active'));
      target.classList.add('active');

      const mainView = document.getElementById('app-view');

      // Carregamento dinâmico das rotas de Teoria
      if (target.dataset.route === 'theory-pt') {
        if (typeof theoryPtContent !== 'undefined') {
          mainView.innerHTML = theoryPtContent;
        }
      } else if (target.dataset.route === 'theory-storygenius') {
        if (typeof theoryStoryGeniusContent !== 'undefined') {
          mainView.innerHTML = theoryStoryGeniusContent;
        }
      } else if (target.dataset.route === 'theory-steps') {
        if (typeof theoryStepsContent !== 'undefined') {
          mainView.innerHTML = theoryStepsContent;
        }
      } else if (target.dataset.route === 'theory-example') {
        if (typeof theoryExampleContent !== 'undefined') {
          mainView.innerHTML = theoryExampleContent;
        }
      } else if (target.dataset.route) {
        mainView.innerHTML = `<h2>Conteúdo da rota: ${target.dataset.route}</h2><p>Página em desenvolvimento.</p>`;
      }

      if (target.dataset.action) console.log(`Ação acionada: ${target.dataset.action}`);
      if (target.dataset.export) console.log(`Exportar arquivo: ${target.dataset.export}`);
      if (target.dataset.import) console.log(`Importar arquivo: ${target.dataset.import}`);
    });
  });
}

/* ==========================================================================
   3. Registro do Service Worker (PWA & PWABuilder .exe)
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
