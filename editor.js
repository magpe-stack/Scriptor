/**
 * Scriptor - Editor de Escrita Focalizada por Cena (Rich Text / WYSIWYG)
 */

function renderEditorView() {
  if (!Array.isArray(projectState.phase4)) {
    projectState.phase4 = [];
  }
  if (!projectState.sceneDrafts) {
    projectState.sceneDrafts = {};
  }

  // Definir cena ativa padrão se não houver nenhuma selecionada
  if (!projectState.currentWritingSceneId && projectState.phase4.length > 0) {
    projectState.currentWritingSceneId = projectState.phase4[0].id;
  }

  const activeSceneId = projectState.currentWritingSceneId;
  const activeScene = projectState.phase4.find(s => s.id === activeSceneId) || projectState.phase4[0];
  
  const draftData = activeScene && projectState.sceneDrafts[activeScene.id] 
    ? projectState.sceneDrafts[activeScene.id] 
    : { title: activeScene ? (activeScene.titulo || '') : '', content: '' };

  // Calcular contadores do texto
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = draftData.content || '';
  const plainText = tempDiv.innerText || tempDiv.textContent || '';

  const wordCount = plainText.trim() === '' ? 0 : plainText.trim().split(/\s+/).length;
  const paraCount = plainText.trim() === '' ? 0 : plainText.split(/\n+/).filter(p => p.trim() !== '').length;
  const sentCount = plainText.trim() === '' ? 0 : plainText.split(/[.!?]+/).filter(s => s.trim() !== '').length;

  const isCardVisible = projectState.isEditorCardVisible !== false;
  const isFocusMode = Boolean(projectState.isEditorFocusMode);

  return `
    <div class="editor-page-container ${isFocusMode ? 'focus-mode-active' : ''}">
      
      <!-- Cabeçalho Superior do Editor (Oculto no Modo Foco) -->
      ${!isFocusMode ? `
        <div class="editor-top-bar">
          <div>
            <h1 style="margin:0; font-size: 1.6rem; color: var(--primary-color);">Editor de Rascunho</h1>
            <p style="margin:2px 0 0 0; font-size: 0.9rem; opacity: 0.75;">Escreva a prosa do seu livro com foco total e apoio dramático.</p>
          </div>
        </div>

        <!-- Barra de Ferramentas e Seletor de Cenas -->
        <div class="editor-toolbar-card project-form-card">
          
          <!-- Seletor de Cenas e Botão Adicionar -->
          <div class="editor-selector-row">
            <select id="editor-scene-selector" class="form-input editor-select">
              ${projectState.phase4.length === 0 ? `<option value="">Nenhuma cena cadastrada no roteiro</option>` : ''}
              ${projectState.phase4.map((s, idx) => `
                <option value="${s.id}" ${s.id === activeSceneId ? 'selected' : ''}>
                  ${idx + 1}. ${s.titulo && s.titulo.trim() !== '' ? s.titulo : 'Cena sem título'}
                </option>
              `).join('')}
            </select>

            <button id="editor-add-scene-btn" class="icon-btn editor-icon-btn" title="Adicionar Nova Cena">
              <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </button>
          </div>

          <!-- Ações e Ferramentas de Formatação Visual -->
          <div class="editor-tools-row">
            
            <button id="toggle-card-btn" class="icon-btn editor-icon-btn ${isCardVisible ? 'active' : ''}" title="Mostrar/Esconder Cartão de Cena">
              <svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>
            </button>

            <button id="toggle-focus-btn" class="icon-btn editor-icon-btn" title="Ativar Modo Foco">
              <svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
            </button>

            <div class="editor-divider"></div>

            <!-- Botões de Formatação Visual (Rich Text) -->
            <button class="icon-btn editor-icon-btn fmt-btn" data-cmd="bold" title="Negrito">
              <svg viewBox="0 0 24 24"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.35zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 11H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>
            </button>
            <button class="icon-btn editor-icon-btn fmt-btn" data-cmd="italic" title="Itálico">
              <svg viewBox="0 0 24 24"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/></svg>
            </button>
            
            <!-- Botão de Travessão Longo -->
            <button class="icon-btn editor-icon-btn fmt-btn" data-cmd="emdash" title="Inserir Travessão (—)">
              <span style="font-weight: 800; font-size: 1.4rem; transform: scaleX(1.4); display: inline-block;">—</span>
            </button>

            <button class="icon-btn editor-icon-btn fmt-btn" data-cmd="formatBlock" data-val="h2" title="Título H2">
              <span style="font-weight: 800; font-size: 0.9rem;">H2</span>
            </button>
            <button class="icon-btn editor-icon-btn fmt-btn" data-cmd="formatBlock" data-val="h3" title="Título H3">
              <span style="font-weight: 800; font-size: 0.85rem;">H3</span>
            </button>
            <button class="icon-btn editor-icon-btn fmt-btn" data-cmd="insertUnorderedList" title="Lista de Marcadores">
              <svg viewBox="0 0 24 24"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>
            </button>

          </div>
        </div>
      ` : `
        <!-- Botão Discreto para Sair do Modo Foco -->
        <div class="exit-focus-container">
          <button id="exit-focus-btn" class="primary-btn exit-focus-btn">
            Sair do Modo Foco
          </button>
        </div>
      `}

      <!-- Espaço do Editor e Cartão de Cena -->
      <div class="editor-workspace ${isCardVisible && !isFocusMode ? 'with-card' : 'card-hidden'}">
        
        <!-- Cartão de Cena Lateral -->
        ${isCardVisible && !isFocusMode && activeScene ? `
          <aside class="editor-scene-card-panel project-form-card">
            <h3 class="scene-card-title">Cartão de Cena</h3>

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

            <button class="card-ctrl-btn" id="goto-phase4-btn" style="width: 100%; justify-content: center; margin-top: 6px;">
              Editar na Fase 4
            </button>
          </aside>
        ` : ''}

        <!-- Área Principal de Escrita Visual (Editable) -->
        <div class="editor-main-area">
          
          <input 
            type="text" 
            id="scene-title-input" 
            class="form-input scene-title-editor" 
            placeholder="Título da cena" 
            value="${draftData.title || ''}" 
          />

          <!-- Área de Rich Text Editável -->
          <div 
            id="scene-content-editor" 
            class="form-textarea scene-content-editor" 
            contenteditable="true"
            placeholder="Comece a escrever a prosa da sua cena aqui..."
          >${draftData.content || ''}</div>

          <!-- Contadores em Tempo Real -->
          ${!isFocusMode ? `
            <div class="editor-counters">
              <span id="word-counter">${wordCount}${wordCount === 1 ? 'palavra' : 'palavras'}</span>
              <span id="sentence-counter">${sentCount}${sentCount === 1 ? 'frase' : 'frases'} | ${paraCount}${paraCount === 1 ? 'parágrafo' : 'parágrafos'}</span>
            </div>
          ` : ''}

        </div>

      </div>

    </div>
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
      projectState.isEditorFocusMode = true;
      saveLocalProject();
      refreshEditorView();
    });
  }

  const exitFocusBtn = document.getElementById('exit-focus-btn');
  if (exitFocusBtn) {
    exitFocusBtn.addEventListener('click', () => {
      projectState.isEditorFocusMode = false;
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

  // Execução de Comandos de Formatação Visual (WYSIWYG)
  document.querySelectorAll('.fmt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const editor = document.getElementById('scene-content-editor');
      if (!editor) return;

      editor.focus();

      const cmd = e.currentTarget.dataset.cmd;
      const val = e.currentTarget.dataset.val || null;

      if (cmd === 'emdash') {
        document.execCommand('insertText', false, '— ');
      } else if (cmd === 'formatBlock') {
        document.execCommand('formatBlock', false, `<${val}>`);
      } else {
        document.execCommand(cmd, false, val);
      }

      // Disparar salvamento automático
      editor.dispatchEvent(new Event('input'));
    });
  });

  const titleInput = document.getElementById('scene-title-input');
  const editorDiv = document.getElementById('scene-content-editor');
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

  if (editorDiv && activeId) {
    editorDiv.addEventListener('input', () => {
      if (!projectState.sceneDrafts[activeId]) {
        projectState.sceneDrafts[activeId] = { title: '', content: '' };
      }

      const htmlVal = editorDiv.innerHTML;
      projectState.sceneDrafts[activeId].content = htmlVal;
      saveLocalProject();

      // Atualizar contadores
      const plainText = editorDiv.innerText || editorDiv.textContent || '';
      const words = plainText.trim() === '' ? 0 : plainText.trim().split(/\s+/).length;
      const paras = plainText.trim() === '' ? 0 : plainText.split(/\n+/).filter(p => p.trim() !== '').length;
      const sents = plainText.trim() === '' ? 0 : plainText.split(/[.!?]+/).filter(s => s.trim() !== '').length;

      const wordCounterElem = document.getElementById('word-counter');
      const sentenceCounterElem = document.getElementById('sentence-counter');

      if (wordCounterElem) wordCounterElem.innerText = `${words} ${words === 1 ? 'palavra' : 'palavras'}`;
      if (sentenceCounterElem) sentenceCounterElem.innerText = `${sents} ${sents === 1 ? 'frase' : 'frases'} | ${paras} ${paras === 1 ? 'parágrafo' : 'parágrafos'}`;
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
