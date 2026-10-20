/**
 * Scriptor - Formulário da Fase 5: Roteiro (Roadmap de Cenas)
 */

function renderPhase5View() {
  if (!Array.isArray(projectState.phase4)) {
    projectState.phase4 = [];
  }
  if (!projectState.sceneDrafts) {
    projectState.sceneDrafts = {};
  }

  const scenes = projectState.phase4;

  return `
    <article class="theory-article">
      <h1>Fase 5 · Roteiro</h1>
      <p>A visão geral da história, cena a cena, e o caminho contínuo para o rascunho final.</p>

      <!-- Seção Principal do Roteiro -->
      <section class="phase-section" style="margin-top: 20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
          <span style="font-size: 0.95rem; opacity: 0.8; font-weight: 600;">
            ${scenes.length} ${scenes.length === 1 ? 'cena no roteiro' : 'cenas no roteiro'}
          </span>
          <div style="display:flex; gap: 8px;">
            <button id="p5-add-scene-btn" class="icon-btn" title="Adicionar Nova Cena" style="border: 1px solid var(--border-color); background-color: var(--surface-color);">
              <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </button>
          </div>
        </div>

        <!-- Timeline de Cenas -->
        <div class="roadmap-timeline">
          ${renderRoadmapScenes(scenes)}
        </div>
      </section>
    </article>
  `;
}

function renderRoadmapScenes(scenes) {
  if (!scenes || scenes.length === 0) {
    return `
      <div class="project-form-card" style="text-align:center; padding: 40px 20px;">
        <p class="field-hint" style="font-style:italic; text-align:center !important;">
          Nenhuma cena criada ainda. Clique no botão <strong>"+"</strong> acima para adicionar sua primeira cena ao roteiro.
        </p>
      </div>
    `;
  }

  return scenes.map((scene, idx) => {
    // Validação de preenchimento do Cartão
    const isCardComplete = Boolean(
      scene.pontoAlfa && 
      scene.enredoCausa && 
      scene.enredoEfeito && 
      scene.terceiroTrilhoImporta && 
      scene.terceiroTrilhoRealizacao && 
      scene.ePorIsso
    );

    // Validação de Rascunho no Editor
    const draftText = projectState.sceneDrafts ? projectState.sceneDrafts[scene.id] : '';
    const hasDraft = Boolean(draftText && draftText.trim().length > 0);

    const titleDisplay = scene.titulo && scene.titulo.trim() !== '' 
      ? `${idx + 1}. ${scene.titulo}` 
      : `${idx + 1}. Cena sem título`;

    return `
      <div class="timeline-item" data-id="${scene.id}">
        <!-- Marcador Circular da Timeline -->
        <div class="timeline-node"></div>

        <!-- Conteúdo do Cartão de Roteiro -->
        <div class="timeline-content project-form-card">
          
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap: 12px;">
            <h3 class="roadmap-scene-title">${titleDisplay}</h3>
            
            <div style="display:flex; gap: 6px;">
              <!-- Botão Editar Cartão (Fase 4) -->
              <button class="icon-btn edit-card-btn" data-id="${scene.id}" title="Editar Cartão de Cena" style="width:32px; height:32px;">
                <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              </button>

              <!-- Botão Escrever no Editor -->
              <button class="icon-btn write-scene-btn" data-id="${scene.id}" title="Escrever Rascunho no Editor" style="width:32px; height:32px; color: var(--primary-color);">
                <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
              </button>
            </div>
          </div>

          <!-- Badges de Status -->
          <div style="display:flex; gap: 8px; margin: 10px 0 14px 0; flex-wrap: wrap;">
            ${isCardComplete 
              ? `<span class="roadmap-badge badge-success">✓ Cartão completo</span>` 
              : `<span class="roadmap-badge badge-warning">Cartão incompleto</span>`
            }

            ${hasDraft 
              ? `<span class="roadmap-badge badge-info">Rascunho iniciado</span>` 
              : `<span class="roadmap-badge badge-neutral">Sem rascunho</span>`
            }
          </div>

          <!-- Ponto Alfa -->
          <div style="margin-bottom: 10px;">
            <span class="roadmap-label">ALFA</span>
            <p class="roadmap-text">${scene.pontoAlfa || '<em style="opacity:0.5;">Não informado</em>'}</p>
          </div>

          <!-- E Por Isso? -->
          <div>
            <span class="roadmap-label">E POR ISSO?</span>
            <p class="roadmap-text">${scene.ePorIsso || '<em style="opacity:0.5;">Não informado</em>'}</p>
          </div>

        </div>
      </div>
    `;
  }).join('');
}

function initPhase5Events() {
  const addBtn = document.getElementById('p5-add-scene-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const newScene = {
        id: 'scene_' + Date.now(),
        titulo: '',
        pontoAlfa: '',
        enredoCausa: '',
        enredoEfeito: '',
        terceiroTrilhoImporta: '',
        terceiroTrilhoRealizacao: '',
        ePorIsso: ''
      };
      if (!Array.isArray(projectState.phase4)) {
        projectState.phase4 = [];
      }
      projectState.phase4.push(newScene);
      saveLocalProject();
      refreshPhase5View();
    });
  }

  const mainView = document.getElementById('app-view');
  if (!mainView) return;

  mainView.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.edit-card-btn');
    const writeBtn = e.target.closest('.write-scene-btn');

    if (editBtn) {
      const sceneId = editBtn.dataset.id;
      navigateToRoute('phase4');
      setTimeout(() => {
        const cardElem = document.querySelector(`.scene-card[data-id="${sceneId}"]`);
        if (cardElem) {
          cardElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
          cardElem.style.border = '2px solid var(--primary-color)';
        }
      }, 100);
    } else if (writeBtn) {
      const sceneId = writeBtn.dataset.id;
      projectState.currentWritingSceneId = sceneId;
      saveLocalProject();
      navigateToRoute('editor');
    }
  });
}

function refreshPhase5View() {
  const mainView = document.getElementById('app-view');
  if (mainView) {
    mainView.innerHTML = renderPhase5View();
    initPhase5Events();
  }
}
