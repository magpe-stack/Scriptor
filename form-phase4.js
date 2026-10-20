/**
 * Scriptor - Formulário da Fase 4: O Design de Cenas (O Cartão de Cena)
 */

function renderPhase4View() {
  if (!Array.isArray(projectState.phase4)) {
    projectState.phase4 = [];
  }
  const scenes = projectState.phase4;

  return `
    <article class="theory-article">
      <h1>Fase 4: O Design de Cenas (O Cartão de Cena)</h1>
      <p>Desenvolva cada unidade dramática do seu romance conectando a ação física (causa e efeito) ao dilema interno (Terceiro Trilho) e à próxima decisão.</p>

      <!-- Dica Metodológica de Causalidade -->
      <div class="project-form-card" style="border-left: 4px solid var(--primary-color);">
        <span class="form-label">Dica de Causalidade para o Enredo</span>
        <p class="field-hint" style="margin-bottom: 0 !important;">
          A transição entre as cenas nunca deve seguir a lógica fraca do <em>"e então"</em> (acontecimento aleatório), mas sim a lógica rigorosa do <strong>"portanto / por causa disso"</strong> (causalidade direta) ou <strong>"mas / porém"</strong> (obstáculo imprevisto).
        </p>
      </div>

      <!-- Seção Principal com Botão Adicionar -->
      <section class="phase-section" style="margin-top: 24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h2 style="margin:0;">Cartões de Cena (${scenes.length})</h2>
          <button id="add-scene-btn" class="primary-btn" title="Adicionar Novo Cartão de Cena">+ Nova Cena</button>
        </div>

        <div id="scenes-container">
          ${renderScenesList(scenes)}
        </div>
      </section>
    </article>
  `;
}

function renderScenesList(scenes) {
  if (!scenes || scenes.length === 0) {
    return `
      <div class="project-form-card" style="text-align:center; padding: 40px 20px;">
        <p class="field-hint" style="font-style:italic; text-align:center !important;">
          Nenhum cartão de cena criado ainda. Clique no botão <strong>"+ Nova Cena"</strong> acima para montar a arquitetura das suas cenas.
        </p>
      </div>
    `;
  }

  return scenes.map((scene, idx) => `
    <div class="project-form-card scene-card" data-id="${scene.id}" style="margin-bottom: 24px;">
      
      <!-- Cabeçalho do Cartão de Cena -->
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 14px;">
        <span class="form-label" style="font-size: 1.1rem;">Cena #${idx + 1}</span>
        <button class="card-ctrl-btn remove-scene-btn" data-id="${scene.id}" style="padding:4px 10px; color:#e53935; border-color:#e53935; font-size: 0.85rem;">
          Excluir Cena
        </button>
      </div>

      <!-- Título da Cena -->
      <div style="margin-bottom: 14px;">
        <label class="form-label">Título da Cena</label>
        <input type="text" class="form-input scene-titulo" data-id="${scene.id}" placeholder="Ex: Cena 1 - O Confronto na Biblioteca" value="${scene.titulo || ''}" />
      </div>

      <!-- Ponto Alfa -->
      <div style="margin-bottom: 14px;">
        <label class="form-label">Ponto Alfa (Alpha Point)</label>
        <p class="field-hint">A função narrativa indispensável desta cena no romance.</p>
        <textarea class="form-textarea scene-ponto-alfa" data-id="${scene.id}" rows="2" placeholder="Qual o propósito fundamental desta cena para a história?">${scene.pontoAlfa || ''}</textarea>
      </div>

      <!-- Enredo (Causa e Efeito) -->
      <div style="margin-bottom: 14px; background-color: var(--bg-color); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
        <span class="form-label" style="display:block; margin-bottom: 8px;">Enredo (Causa e Efeito)</span>
        
        <label class="form-label" style="font-size: 0.85rem; margin-top: 6px;">Primeira Metade (Causa):</label>
        <p class="field-hint">O fato físico e concreto que acontece no mundo exterior.</p>
        <textarea class="form-textarea scene-causa" data-id="${scene.id}" rows="2" placeholder="O que o personagem faz ou o que acontece fisicamente?">${scene.enredoCausa || ''}</textarea>

        <label class="form-label" style="font-size: 0.85rem; margin-top: 10px; display:block;">Segunda Metade (Efeito):</label>
        <p class="field-hint">A consequência prática e imediata gerada no ambiente ou no enredo.</p>
        <textarea class="form-textarea scene-efeito" data-id="${scene.id}" rows="2" placeholder="Qual o resultado prático imediato dessa ação?">${scene.enredoEfeito || ''}</textarea>
      </div>

      <!-- Terceiro Trilho -->
      <div style="margin-bottom: 14px; background-color: var(--bg-color); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
        <span class="form-label" style="display:block; margin-bottom: 8px; color: var(--primary-color);">Terceiro Trilho (Significado e Virada Interna)</span>

        <label class="form-label" style="font-size: 0.85rem;">Por que Importa (Interpretação):</label>
        <p class="field-hint">Como o personagem interpreta o fato físico através da lente da sua Falsa Crença?</p>
        <textarea class="form-textarea scene-tt-importa" data-id="${scene.id}" rows="2" placeholder="Qual o significado pessoal que o personagem atribui ao fato?">${scene.terceiroTrilhoImporta || ''}</textarea>

        <label class="form-label" style="font-size: 0.85rem; margin-top: 10px; display:block;">Realização (Insight/Virada Emocional):</label>
        <p class="field-hint">A percepção ou mudança interna que ele extrai desse resultado.</p>
        <textarea class="form-textarea scene-tt-realizacao" data-id="${scene.id}" rows="2" placeholder="O que ele percebe sobre si mesmo ou sobre a situação?">${scene.terceiroTrilhoRealizacao || ''}</textarea>
      </div>

      <!-- "E Por Isso?" -->
      <div>
        <label class="form-label">"E Por Isso?" (And So?)</label>
        <p class="field-hint">A nova decisão ou ação concreta que o personagem toma a partir da realização, provocando a cena seguinte.</p>
        <textarea class="form-textarea scene-e-por-isso" data-id="${scene.id}" rows="2" placeholder="O que ele decide fazer imediatamente a seguir?">${scene.ePorIsso || ''}</textarea>
      </div>

    </div>
  `).join('');
}

function initPhase4Events() {
  const addBtn = document.getElementById('add-scene-btn');
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
      refreshPhase4View();
    });
  }

  const mainView = document.getElementById('app-view');
  if (!mainView) return;

  // Atualização em tempo real dos campos
  mainView.addEventListener('input', (e) => {
    const target = e.target;
    const id = target.dataset.id;
    if (!id) return;

    const scene = projectState.phase4.find(s => s.id === id);
    if (!scene) return;

    if (target.classList.contains('scene-titulo')) {
      scene.titulo = target.value;
    } else if (target.classList.contains('scene-ponto-alfa')) {
      scene.pontoAlfa = target.value;
    } else if (target.classList.contains('scene-causa')) {
      scene.enredoCausa = target.value;
    } else if (target.classList.contains('scene-efeito')) {
      scene.enredoEfeito = target.value;
    } else if (target.classList.contains('scene-tt-importa')) {
      scene.terceiroTrilhoImporta = target.value;
    } else if (target.classList.contains('scene-tt-realizacao')) {
      scene.terceiroTrilhoRealizacao = target.value;
    } else if (target.classList.contains('scene-e-por-isso')) {
      scene.ePorIsso = target.value;
    }

    saveLocalProject();
  });

  // Remoção de cena
  mainView.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-scene-btn')) {
      const id = e.target.dataset.id;
      if (confirm('Deseja realmente remover este cartão de cena?')) {
        projectState.phase4 = projectState.phase4.filter(s => s.id !== id);
        saveLocalProject();
        refreshPhase4View();
      }
    }
  });
}

function refreshPhase4View() {
  const mainView = document.getElementById('app-view');
  if (mainView) {
    mainView.innerHTML = renderPhase4View();
    initPhase4Events();
  }
}
