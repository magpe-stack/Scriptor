/**
 * Scriptor - Aplicação Principal
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMenu();
  initPWA();
});

/* ==========================================================================
   1. Gerenciamento do Modo Claro/Escuro
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
   2. Navegação e Comportamento dos Submenus
   ========================================================================== */
function initMenu() {
  const hasSubmenuItems = document.querySelectorAll('.menu-item.has-submenu');

  // Alternar visibilidade do submenu de Nível 2
  hasSubmenuItems.forEach(item => {
    const toggleBtn = item.querySelector('.toggle-submenu');
    
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Fecha outros submenus abertos
      hasSubmenuItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
        }
      });

      item.classList.toggle('open');
    });
  });

  // Fechar submenus ao clicar fora da sidebar
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.sidebar')) {
      hasSubmenuItems.forEach(item => item.classList.remove('open'));
    }
  });

  // Handler universal para cliques nos botões de ação e rotas
  document.querySelectorAll('.icon-btn[data-route], .icon-btn[data-action], .icon-btn[data-export], .icon-btn[data-import]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget;
      
      // Remove classe 'active' de todos os botões de nível 1
      document.querySelectorAll('.main-menu > .menu-item > .icon-btn').forEach(b => b.classList.remove('active'));
      
      // Adiciona 'active' ao botão clicado ou ao pai se for submenu
      const parentMenuItem = target.closest('.menu-item');
      if (parentMenuItem) {
        const primaryBtn = parentMenuItem.querySelector('.icon-btn');
        if (primaryBtn) primaryBtn.classList.add('active');
      }

      // Fecha submenus após seleção
      hasSubmenuItems.forEach(item => item.classList.remove('open'));

      // Log temporário de teste
      if (target.dataset.route) console.log(`Navegar para rota: ${target.dataset.route}`);
      if (target.dataset.action) console.log(`Executar ação: ${target.dataset.action}`);
      if (target.dataset.export) console.log(`Exportar formato: ${target.dataset.export}`);
      if (target.dataset.import) console.log(`Importar formato: ${target.dataset.import}`);
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
        .then(reg => console.log('Service Worker registrado com sucesso:', reg.scope))
        .catch(err => console.error('Falha ao registrar Service Worker:', err));
    });
  }
}
