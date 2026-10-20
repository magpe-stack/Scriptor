/**
 * Scriptor - Editor de Escrita Focalizada por Cena
 */

function renderEditorView() {
  if (!Array.isArray(projectState.phase4)) {
    projectState.phase4 = [];
  }
  if (!projectState.sceneDrafts) {
    projectState.sceneDrafts = {};
  }

  // Definir cena ativa padrão se não houver
  if (!projectState.currentWritingSceneId && projectState.phase4.length > 0) {
    projectState.currentWritingSceneId = projectState.phase4[0].id;
  }

  const activeSceneId = projectState.currentWritingSceneId;
  const activeScene = projectState.phase4.find(s => s.id === activeSceneId) || projectState.phase4[0];
  
  const draftData = activeScene && projectState.sceneDrafts[activeScene.id] 
    ? projectState.sceneDrafts[activeScene.id] 
    : { title: activeScene ? (activeScene.titulo || '') : '', content: '' };

  // Contadores de palavras, frases e parágrafos
  const textContent = draftData.content || '';
  const wordCount = textContent.trim() === '' ? 0 : textContent.trim().split(/\s+/).length;
  const paraCount = textContent.trim() === '' ? 0 : textContent.split(/\n+/).filter(p => p.trim() !== '').length;
  const sentCount = textContent.trim() === '' ? 0 : textContent.split(/[.!?]+/).filter(s => s.trim() !== '').length;

  const isCardVisible = projectState.isEditorCardVisible !== false;
  const isFocusMode = Boolean(projectState.isEditorFocusMode);

  return `
    <article class="theory-article editor-wrapper ${isFocusMode ? 'focus-mode-active' : ''}">
      
      <!-- Cabeçalho do Editor -->
      <div class="editor-top-bar">
        <h1 style="margin:0; font-size: 1.5rem; color: var(--primary-color);">Editor de Rascunho</h1>
        <p style="margin:4px 0 0 0; font-size: 0.9rem; opacity: 0.7;">Escreva a prosa com o cartão de cena à vista.</p>
      </div>

      <!-- Barra de Ferramentas e Seletor de Cenas -->
      <div class="editor-toolbar-container project-form-card" style="padding: 12px 16px; margin-top: 16px;">
        
        <!-- Seletor de Cenas e Botão Adicionar -->
        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px;">
          <select id="editor-scene-selector" class="form-input" style="flex: 1; font-weight: 600;">
            ${projectState.phase4.length === 0 ? `<option value="">Nenhuma cena cadastrada no roteiro</option>` : ''}
            ${projectState.phase4.map((s, idx) => `
              <option value="${s.id}" ${s.id === activeSceneId ? 'selected' : ''}>
                ${idx + 1}.${s.titulo && s.titulo.trim() !== '' ? s.titulo : 'Cena sem título'}
              </option>
            `).join('')}
          </select>

          <button id="editor-add-scene-btn" class="icon-btn" title="Adicionar Nova Cena" style="border: 1px solid var(--border-color); background: var(--surface-color);">
            <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          </button>
        </div>

        <!-- Botões de Cartão, Foco e Exportação -->
        <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center; border-top: 1px solid var(--border-color); padding-top: 10px;">
          
          <button id="toggle-card-btn" class="icon-btn ${isCardVisible ? 'active' : ''}" title="Mostrar/Esconder Cartão de Cena">
            <svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>
          </button>

          <button id="toggle-focus-btn" class="icon-btn ${isFocusMode ? 'active' : ''}" title="Alternar Modo Foco">
            <svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
          </button>

          <div style="width: 1px; height: 24px; background: var(--border-color); margin: 0 4px;"></div>

          <button class="icon-btn" id="export-scene-txt" title="Exportar Cena em TXT">
            <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
          </button>
        </div>
      </div>

      <!-- Área de Trabalho: Cartão de Cena (Esq) + Textarea de Escrita (Dir) -->
      <div class="editor-workspace ${isCardVisible ? 'with-card' : 'card-hidden'}">
        
        ${isCardVisible && activeScene ? `
          <aside class="editor-scene-card-panel project-form-card" style="margin-top: 16px;">
            <h3 style="font-size: 1.05rem; color: var(--primary-color); margin-bottom: 10px; border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">
              Cartão de Cena
            </h3>

            <div class="scene-card-field">
              <span class="roadmap-label">DILEMA / FALSA CRENÇA</span>
              <p class="field-hint">${activeScene.terceiroTrilhoImporta || '—'}</p>
            </div>

            <div class="scene-card-field">
              <span class="roadmap-label">PONTO ALFA</span>
              <p class="field-hint">${activeScene.pontoAlfa || '—'}</p>
            </div>

            <div class="scene-card-field">
              <span class="roadmap-label">CAUSA EXTERNA</span>
              <p class="field-hint">${activeScene.enredoCausa || '—'}</p>
            </div>

            <div class="scene-card-field">
              <span class="roadmap-label">EFEITO PRÁTICO</span>
              <p class="field-hint">${activeScene.enredoEfeito || '—'}</p>
            </div>

            <div class="scene-card-field">
              <span class="roadmap-label">TERCEIRO TRILHO</span>
              <p class="field-hint">${activeScene.terceiroTrilhoRealizacao || '—'}</p>
            </div>

            <div class="scene-card-field">
              <span class="roadmap-label">E POR ISSO?</span>
              <p class="field-hint">${activeScene.ePorIsso || '—'}</p>
            </div>

            <button class="card-ctrl-btn" id="goto-phase4-btn" style="width: 100%; justify-content: center; margin-top: 8px;">
              Editar na Fase 4
            </button>
          </aside>
        ` : ''}

        <!-- Área Principal do Editor -->
        <div class="editor-main-area" style="flex: 1; margin-top: 16px; display: flex; flex-direction: column; gap: 12px;">
          
          <input 
            type="text" 
            id="scene-title-input" 
            class="form-input" 
            placeholder="Título da cena" 
            value="${draftData.title || ''}" 
          />

          <textarea 
            id="scene-content-textarea" 
            class="form-textarea" 
            rows="18" 
            placeholder="Comece a escrever a prosa da sua cena aqui..."
          >${draftData.content || ''}</textarea>

          <!-- Contadores em Tempo Real -->
          <div class="editor-counters" style="display: flex; justify-content: space-between; font-size: 0.85rem; opacity: 0.75; padding: 0 4px;">
            <span id="word-counter">${wordCount} ${wordCount === 1 ? 'palavra' : 'palavras'}</span>
            <span id="sentence-counter">${sentCount} ${sentCount === 1 ? 'frase' : 'frases'} | ${paraCount} ${paraCount === 1 ? 'parágrafo' : 'parágrafos'}</span>
          </div>

        </div>

      </div>

    </article>
  `;
}

function initEditorEvents() {
  const sceneSelector = document.getElementById('editor-scene-selector');
  if (sceneSelector) {
    sceneSelector.addEventListener('change', (e) => {
      projectState.currentWritingSceneId = e.target.value;
      saveLocalProject();
      refreshEditorView();
    });
  }

  const addSceneBtn = document.getElementById('editor-add-scene-btn');
  if (addSceneBtn) {
    addSceneBtn.addEventListener('click', () => {
      const newScene = {
        id: 'scene_' + Date.now(),
        titulo: 'Nova Cena',
        pontoAlfa: '',
        enredoCausa: '',
        enredoEfeito: '',
        terceiroTrilhoImporta: '',
        terceiroTrilhoRealizacao: '',
        ePorIsso: ''
      };
      if (!Array.isArray(projectState.phase4)) projectState.phase4 = [];
      projectState.phase4.push(newScene);
      projectState.currentWritingSceneId = newScene.id;
      saveLocalProject();
      refreshEditorView();
    });
  }

  const toggleCardBtn = document.getElementById('toggle-card-btn');
  if (toggleCardBtn) {
    toggleCardBtn.addEventListener('click', () => {
      projectState.isEditorCardVisible = !Boolean(projectState.isEditorCardVisible !== false);
      saveLocalProject();
      refreshEditorView();
    });
  }

  const toggleFocusBtn = document.getElementById('toggle-focus-btn');
  if (toggleFocusBtn) {
    toggleFocusBtn.addEventListener('click', () => {
      projectState.isEditorFocusMode = !Boolean(projectState.isEditorFocusMode);
      saveLocalProject();
      refreshEditorView();
    });
  }

  const gotoPhase4Btn = document.getElementById('goto-phase4-btn');
  if (gotoPhase4Btn) {
    gotoPhase4Btn.addEventListener('click', () => {
      navigateToRoute('phase4');
    });
  }

  const titleInput = document.getElementById('scene-title-input');
  const contentTextarea = document.getElementById('scene-content-textarea');
  const activeId = projectState.currentWritingSceneId;

  if (titleInput && activeId) {
    titleInput.addEventListener('input', (e) => {
      if (!projectState.sceneDrafts[activeId]) {
        projectState.sceneDrafts[activeId] = { title: '', content: '' };
      }
      projectState.sceneDrafts[activeId].title = e.target.value;
      
      const sceneObj = projectState.phase4.find(s => s.id === activeId);
      if (sceneObj) sceneObj.titulo = e.target.value;

      saveLocalProject();
    });
  }

  if (contentTextarea && activeId) {
    contentTextarea.addEventListener('input', (e) => {
      if (!projectState.sceneDrafts[activeId]) {
        projectState.sceneDrafts[activeId] = { title: '', content: '' };
      }
      const val = e.target.value;
      projectState.sceneDrafts[activeId].content = val;
      saveLocalProject();

      const words = val.trim() === '' ? 0 : val.trim().split(/\s+/).length;
      const paras = val.trim() === '' ? 0 : val.split(/\n+/).filter(p => p.trim() !== '').length;
      const sents = val.trim() === '' ? 0 : val.split(/[.!?]+/).filter(s => s.trim() !== '').length;

      const wordCounterElem = document.getElementById('word-counter');
      const sentenceCounterElem = document.getElementById('sentence-counter');

      if (wordCounterElem) wordCounterElem.innerText = `${words} ${words === 1 ? 'palavra' : 'palavras'}`;
      if (sentenceCounterElem) sentenceCounterElem.innerText = `${sents} ${sents === 1 ? 'frase' : 'frases'} | ${paras} ${paras === 1 ? 'parágrafo' : 'parágrafos'}`;
    });
  }

  const exportTxtBtn = document.getElementById('export-scene-txt');
  if (exportTxtBtn && activeId) {
    exportTxtBtn.addEventListener('click', () => {
      const draft = projectState.sceneDrafts[activeId] || { title: 'Cena', content: '' };
      const filename = `${(draft.title || 'cena').toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`;
      const fileContent = `# ${draft.title || 'Cena'}\n\n${draft.content || ''}`;
      const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(fileContent);
      downloadFile(dataStr, filename);
    });
  }
}

function refreshEditorView() {
  const mainView = document.getElementById('app-view');
  if (mainView) {
    mainView.innerHTML = renderEditorView();
    initEditorEvents();
  }
}
