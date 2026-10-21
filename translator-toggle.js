/**
 * Scriptor - Módulo Isolado de Tradução e Tema
 */

(function initTranslatorAndTheme() {
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Injeta os estilos isolados para não afetar a interface original
    const style = document.createElement('style');
    style.innerHTML = `
      #scriptor-top-tools {
        position: fixed;
        top: 14px;
        right: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 999999;
      }
      .goog-te-combo {
        background-color: var(--card-bg, #1e1e1e) !important;
        color: var(--text-color, #ffffff) !important;
        border: 1px solid var(--border-color, #333333) !important;
        padding: 5px 8px !important;
        border-radius: 6px !important;
        font-size: 0.85rem !important;
        outline: none !important;
        cursor: pointer !important;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      }
      .goog-te-gadget {
        font-size: 0 !important;
        color: transparent !important;
      }
      .goog-te-gadget span {
        display: none !important;
      }
      body > .skiptranslate, .goog-te-banner-frame {
        display: none !important;
      }
      body {
        top: 0px !important;
      }
    `;
    document.head.appendChild(style);

    // 2. Cria o container dinâmico no topo à direita
    const container = document.createElement('div');
    container.id = 'scriptor-top-tools';
    
    // Div onde o Google Translate se vai montar
    const translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';
    container.appendChild(translateDiv);

    // Botão de alternância do modo claro/escuro
    const themeBtn = document.createElement('button');
    themeBtn.id = 'theme-toggle-injected';
    themeBtn.title = 'Alternar Modo Claro / Escuro';
    themeBtn.style.cssText = `
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--card-bg, #1e1e1e);
      border: 1px solid var(--border-color, #333333);
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    `;
    themeBtn.innerHTML = `
      <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: var(--text-color, #ffffff);">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
      </svg>
    `;

    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('scriptor-theme', newTheme);
    });

    container.appendChild(themeBtn);
    document.body.appendChild(container);

    // 3. Carrega o script do Google Translate
    window.googleTranslateElementInit = function() {
      new google.translate.TranslateElement({
        pageLanguage: 'pt',
        includedLanguages: 'en,es,fr,it,de,pt',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    };

    const gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(gtScript);
  });
})();
