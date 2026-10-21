function renderPhase5View() {
  if (!projectState) {
    projectState = { phase4: [], sceneDrafts: {} };
  }
  if (!Array.isArray(projectState.phase4)) {
    projectState.phase4 = [];
  }
  if (!projectState.sceneDrafts) {
    projectState.sceneDrafts = {};
  }

  const scenes = projectState.phase4;

  return `
    <article class="theory-article" style="gap: 20px;">
      <div>
        <h1 style="margin: 0; font-size: 1.8rem; color: var(--primary-color);">Fase 5: Roteiro e Acompanhamento de Cenas</h1>
        <p style="margin: 4px 0 0 0; color: var(--text-muted); font-size: 0.95rem;">
          Visão geral do seu roteiro estruturado com os respectivos rascunhos em progresso.
        </p>
      </div>

      ${scenes.length === 0 ? `
        <div class="project-form-card" style="text-align: center; padding: 30px;">
          <p style="color: var(--text-muted); margin-bottom: 12px;">Nenhuma cena cadastrada na Fase 4 ainda.</p>
          <button class="primary-btn" onclick="navigateToRoute('phase4')">Ir para a Fase 4 (Criar Cenas)</button>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${scenes.map((sc, i) => {
            const draft = projectState.sceneDrafts[sc.id] || { title: '', content: '' };
            const sceneTitle = draft.title || sc.titulo || `Cena ${i + 1}`;
            
            // Extrai texto limpo para contagem rápida
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = draft.content || '';
            const plainText = tempDiv.innerText || tempDiv.textContent || '';
            const wordCount = plainText.trim() === '' ? 0 : plainText.trim().split(/\s+/).length;

            return `
              <div class="project-form-card" style="gap: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <h3 style="margin: 0; font-size: 1.1rem; color: var(--text-color);">
                    ${i + 1}. ${sceneTitle}
                  </h3>
                  <span class="field-hint" style="font-weight: 600; color: var(--primary-color);">
                    ${wordCount} ${wordCount === 1 ? 'palavra' : 'palavras'}
                  </span>
                </div>
                
                <p style="margin: 4px 0 0 0; font-size: 0.9rem; color: var(--text-muted);">
                  <strong> Alfa:</strong> ${sc.pontoAlfa || '—'} | <strong>E por isso?:</strong> ${sc.ePorIsso || '—'}
                </p>

                <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
                  <button class="card-ctrl-btn" onclick="projectState.currentWritingSceneId = '${sc.id}'; navigateToRoute('editor');">
                    Editar Prosa no Editor
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </article>
  `;
}

function initPhase5Events() {
  // Eventos específicos da Fase 5, se houver
}
