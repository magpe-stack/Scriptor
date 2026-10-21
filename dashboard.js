/**
 * Scriptor - Painel de Progresso e Métricas do Projeto
 */

function renderDashboardView() {
  if (!projectState) {
    projectState = { phase1: {}, phase2: {}, phase3: {}, phase4: [], sceneDrafts: {} };
  }

  // --- CÁLCULOS DE PROGRESSO DE PREENCHIMENTO ---

  // 1. Fase 1: Fundação (5 campos principais)
  const p1 = projectState.phase1 || {};
  const p1Fields = [p1.fagulha, p1.conexao, p1.mensagem, p1.premissa, p1.estadoInicial];
  const p1Filled = p1Fields.filter(val => val && val.trim() !== '').length;
  const p1Percent = Math.round((p1Filled / p1Fields.length) * 100);

  // 2. Fase 2: Psique do Protagonista (4 campos principais)
  const p2 = projectState.phase2 || {};
  const p2Fields = [p2.desejoInterno, p2.falsaCrenca, p2.origemCrenca, p2.problemaExterno];
  const p2Filled = p2Fields.filter(val => val && val.trim() !== '').length;
  const p2Percent = Math.round((p2Filled / p2Fields.length) * 100);

  // 3. Fase 3: Enredo Causal (3 campos principais)
  const p3 = projectState.phase3 || {};
  const p3Fields = [p3.terceiroTrilhoResumo, p3.logicaCausal, p3.climaxMomento];
  const p3Filled = p3Fields.filter(val => val && val.trim() !== '').length;
  const p3Percent = Math.round((p3Filled / p3Fields.length) * 100);

  // 4. Fase 4: Cartões de Cena (Meta base de 15 cenas para fechar o roteiro estrutural)
  const scenes = Array.isArray(projectState.phase4) ? projectState.phase4 : [];
  const sceneCount = scenes.length;
  const sceneTarget = 15;
  const p4Percent = Math.min(100, Math.round((sceneCount / sceneTarget) * 100));

  // 5. Progresso Geral do Planejamento (Média das 4 fases)
  const overallPlanningPercent = Math.round((p1Percent + p2Percent + p3Percent + p4Percent) / 4);

  // 6. Produção de Rascunho (Contagem total de palavras nas cenas do editor)
  const drafts = projectState.sceneDrafts || {};
  let totalWords = 0;
  Object.values(drafts).forEach(draft => {
    if (draft && draft.content) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = draft.content;
      const plainText = tempDiv.innerText || tempDiv.textContent || '';
      const words = plainText.trim() === '' ? 0 : plainText.trim().split(/\s+/).length;
      totalWords += words;
    }
  });

  const wordTarget = 50000; // Meta padrão de romance (50k palavras)
  const writingPercent = Math.min(100, Math.round((totalWords / wordTarget) * 100));

  return `
    <div class="theory-article" style="gap: 24px;">
      <div>
        <h1 style="margin: 0; font-size: 1.8rem; color: var(--primary-color);">Painel de Progresso do Projeto</h1>
        <p style="margin: 4px 0 0 0; color: var(--text-muted); font-size: 0.95rem;">
          Acompanhe o preenchimento das etapas de arquitetura narrativa e o avanço da escrita do seu romance.
        </p>
      </div>

      <!-- Card Principal: Progresso Geral do Planejamento -->
      <div class="project-form-card" style="background: linear-gradient(135deg, var(--panel-bg), var(--card-bg));">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h3 style="margin: 0; font-size: 1.2rem; color: var(--text-color);">Status Geral do Planejamento</h3>
          <span style="font-size: 1.4rem; font-weight: 800; color: var(--primary-color);">${overallPlanningPercent}%</span>
        </div>
        
        <!-- Barra de Progresso Geral -->
        <div style="width: 100%; background-color: var(--input-bg); border-radius: 8px; height: 12px; overflow: hidden; border: 1px solid var(--border-color);">
          <div style="width: ${overallPlanningPercent}%; background-color: var(--primary-color); height: 100%; transition: width 0.4s ease;"></div>
        </div>
        <p class="field-hint" style="margin-top: 8px;">
          ${overallPlanningPercent === 100 
            ? '🎉 Planejamento concluído com excelência! Foque total na Fase 5 (Editor de Rascunho).' 
            : 'Complete os campos pendentes nas fases de fundação, psique, enredo e roteiro para estruturar sua obra por completo.'}
        </p>
      </div>

      <!-- Grid de Fases de Planejamento -->
      <h2 style="font-size: 1.2rem; margin: 0; border: none; padding: 0;">Detalhamento das Fases</h2>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        
        <!-- Fase 1 -->
        <div class="project-form-card" style="gap: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--text-color);">Fase 1: Fundação</strong>
            <span style="font-weight: 700; color: var(--primary-color);">${p1Percent}%</span>
          </div>
          <div style="width: 100%; background-color: var(--input-bg); border-radius: 6px; height: 8px; overflow: hidden;">
            <div style="width: ${p1Percent}%; background-color: var(--primary-color); height: 100%;"></div>
          </div>
          <span class="field-hint">${p1Filled} de ${p1Fields.length} pilares essenciais preenchidos.</span>
          <button class="card-ctrl-btn" onclick="navigateToRoute('phase1')" style="justify-content: center; margin-top: auto;">Ir para Fase 1</button>
        </div>

        <!-- Fase 2 -->
        <div class="project-form-card" style="gap: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--text-color);">Fase 2: Psique do Protagonista</strong>
            <span style="font-weight: 700; color: var(--primary-color);">${p2Percent}%</span>
          </div>
          <div style="width: 100%; background-color: var(--input-bg); border-radius: 6px; height: 8px; overflow: hidden;">
            <div style="width: ${p2Percent}%; background-color: var(--primary-color); height: 100%;"></div>
          </div>
          <span class="field-hint">${p2Filled} de ${p2Fields.length} elementos psicológicos definidos.</span>
          <button class="card-ctrl-btn" onclick="navigateToRoute('phase2')" style="justify-content: center; margin-top: auto;">Ir para Fase 2</button>
        </div>

        <!-- Fase 3 -->
        <div class="project-form-card" style="gap: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--text-color);">Fase 3: Enredo Causal</strong>
            <span style="font-weight: 700; color: var(--primary-color);">${p3Percent}%</span>
          </div>
          <div style="width: 100%; background-color: var(--input-bg); border-radius: 6px; height: 8px; overflow: hidden;">
            <div style="width: ${p3Percent}%; background-color: var(--primary-color); height: 100%;"></div>
          </div>
          <span class="field-hint">${p3Filled} de ${p3Fields.length} eixos de causalidade preenchidos.</span>
          <button class="card-ctrl-btn" onclick="navigateToRoute('phase3')" style="justify-content: center; margin-top: auto;">Ir para Fase 3</button>
        </div>

        <!-- Fase 4 -->
        <div class="project-form-card" style="gap: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--text-color);">Fase 4: Cartões de Cena</strong>
            <span style="font-weight: 700; color: var(--primary-color);">${sceneCount} cenas</span>
          </div>
          <div style="width: 100%; background-color: var(--input-bg); border-radius: 6px; height: 8px; overflow: hidden;">
            <div style="width: ${p4Percent}%; background-color: var(--primary-color); height: 100%;"></div>
          </div>
          <span class="field-hint">${sceneCount} de ${sceneTarget} cenas estruturadas no roteiro.</span>
          <button class="card-ctrl-btn" onclick="navigateToRoute('phase4')" style="justify-content: center; margin-top: auto;">Ir para Fase 4</button>
        </div>

      </div>

      <!-- Card de Produção de Rascunho (Fase 5) -->
      <h2 style="font-size: 1.2rem; margin: 12px 0 0 0; border: none; padding: 0;">Produção de Rascunho</h2>
      <div class="project-form-card" style="gap: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong style="color: var(--text-color); font-size: 1.05rem;">Volume de Escrita (Meta: 50.000 palavras)</strong>
            <p style="margin: 2px 0 0 0; color: var(--text-muted); font-size: 0.9rem;">${totalWords.toLocaleString('pt-BR')} palavras escritas até o momento</p>
          </div>
          <span style="font-size: 1.3rem; font-weight: 800; color: var(--primary-color);">${writingPercent}%</span>
        </div>
        
        <div style="width: 100%; background-color: var(--input-bg); border-radius: 8px; height: 10px; overflow: hidden;">
          <div style="width: ${writingPercent}%; background-color: var(--primary-color); height: 100%; transition: width 0.4s ease;"></div>
        </div>

        <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
          <button class="primary-btn" onclick="navigateToRoute('editor')">Abrir Editor de Rascunho</button>
        </div>
      </div>

    </div>
  `;
}

function initDashboardEvents() {
  // O painel utiliza navegação nativa e botões interativos já integrados às rotas
}
