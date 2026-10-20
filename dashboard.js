/**
 * Scriptor - Painel de Progresso e Visão Geral (Dashboard)
 */

function renderDashboardView() {
  if (!projectState.title) {
    return `
      <article class="theory-article">
        <h1>Painel de Progresso</h1>
        <div class="project-form-card" style="text-align: center; padding: 40px 20px;">
          <p class="field-hint" style="text-align: center !important; margin-bottom: 16px !important;">
            Nenhum projeto iniciado no momento. Crie ou carregue um romance para visualizar as estatísticas.
          </p>
          <button class="primary-btn" onclick="navigateToRoute('new')">Criar Novo Projeto</button>
        </div>
      </article>
    `;
  }

  // Cálculos de Estatísticas
  const scenes = Array.isArray(projectState.phase4) ? projectState.phase4 : [];
  const totalScenes = scenes.length;
  
  let completedCards = 0;
  scenes.forEach(scene => {
    if (scene.pontoAlfa && scene.enredoCausa && scene.enredoEfeito && scene.terceiroTrilhoImporta && scene.terceiroTrilhoRealizacao && scene.ePorIsso) {
      completedCards++;
    }
  });

  // Contagem total de palavras no rascunho
  let totalWords = 0;
  let totalChars = 0;
  const drafts = projectState.sceneDrafts || {};
  Object.values(drafts).forEach(d => {
    if (d && d.content) {
      const text = d.content.trim();
      if (text) {
        totalWords += text.split(/\s+/).length;
        totalChars += text.length;
      }
    }
  });

  const cardProgressPercent = totalScenes > 0 ? Math.round((completedCards / totalScenes) * 100) : 0;

  return `
    <article class="theory-article">
      <h1>Painel · ${projectState.title}</h1>
      <p>Acompanhe o progresso estrutural, a contagem de palavras e o andamento geral do seu romance.</p>

      <!-- Cartões de Resumo (Métricas Principais) -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 20px 0 32px 0;">
        
        <div class="project-form-card" style="margin-top:0; text-align:center; padding: 20px;">
          <span style="font-size: 0.8rem; font-weight: 800; color: var(--primary-color); text-transform: uppercase; letter-spacing: 0.5px;">Total de Cenas</span>
          <h2 style="font-size: 2.2rem; margin: 8px 0 0 0; border: none; padding: 0;">${totalScenes}</h2>
        </div>

        <div class="project-form-card" style="margin-top:0; text-align:center; padding: 20px;">
          <span style="font-size: 0.8rem; font-weight: 800; color: var(--primary-color); text-transform: uppercase; letter-spacing: 0.5px;">Cartões Concluídos</span>
          <h2 style="font-size: 2.2rem; margin: 8px 0 0 0; border: none; padding: 0;">${completedCards} <span style="font-size: 1.2rem; opacity: 0.6;">/ ${totalScenes}</span></h2>
        </div>

        <div class="project-form-card" style="margin-top:0; text-align:center; padding: 20px;">
          <span style="font-size: 0.8rem; font-weight: 800; color: var(--primary-color); text-transform: uppercase; letter-spacing: 0.5px;">Palavras Escritas</span>
          <h2 style="font-size: 2.2rem; margin: 8px 0 0 0; border: none; padding: 0;">${totalWords.toLocaleString('pt-BR')}</h2>
        </div>

      </div>

      <!-- Seção de Atalhos e Estado das Fases -->
      <section class="phase-section">
        <h2>Progresso Estrutural</h2>
        
        <div class="project-form-card" style="gap: 12px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight: 700;">Cartões de Cena Preenchidos</span>
            <span style="font-size: 0.9rem; font-weight: 700; color: var(--primary-color);">${cardProgressPercent}%</span>
          </div>
          
          <!-- Barra de Progresso Simples -->
          <div style="width: 100%; height: 10px; background-color: var(--bg-color); border-radius: 5px; overflow: hidden; border: 1px solid var(--border-color);">
            <div style="width: ${cardProgressPercent}%; height: 100%; background-color: var(--primary-color); transition: width 0.3s ease;"></div>
          </div>
        </div>
      </section>

      <!-- Ações Rápidas -->
      <section class="phase-section">
        <h2>Ações Rápidas</h2>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="primary-btn" onclick="navigateToRoute('phase4')">Gerenciar Cartões de Cena</button>
          <button class="card-ctrl-btn" onclick="navigateToRoute('phase5')">Ver Roteiro (Roadmap)</button>
          <button class="card-ctrl-btn" onclick="navigateToRoute('editor')">Abrir Editor de Rascunho</button>
        </div>
      </section>

    </article>
  `;
}

function initDashboardEvents() {
  // Eventos específicos do painel, caso necessários no futuro
}
