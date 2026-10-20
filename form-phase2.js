/**
 * Scriptor - Formulário da Fase 2: Arquitetura Psicológica e Backstory Dramatizada
 */

function renderPhase2View() {
  const p2 = projectState.phase2 || {};

  return `
    <article class="theory-article">
      <h1>Fase 2: Arquitetura Psicológica e Backstory Dramatizada</h1>
      <p>Construa o perfil psicológico profundo da sua protagonista, mapeando sua Falsa Crença Central, a dor do passado e os momentos de decisão.</p>

      <!-- Bloco A: Ponto de Partida e Motivações -->
      <section class="phase-section">
        <h2>Ponto de Partida e Motivação</h2>

        <!-- Passo 5 -->
        <div class="project-form-card">
          <label for="f2-estado-inicial" class="form-label">5. Estado Inicial (Starting Point)</label>
          <p class="field-hint">Quem é o personagem imediatamente antes de a história começar, qual é seu comportamento e sua posição na vida?</p>
          <textarea id="f2-estado-inicial" class="form-textarea" rows="4" placeholder="Escreva aqui...">${p2.estadoInicial || ''}</textarea>
        </div>

        <!-- Passo 6 -->
        <div class="project-form-card">
          <label for="f2-desejo-superficial" class="form-label">6. Desejo Superficial (Surface Want)</label>
          <p class="field-hint">Qual é o objetivo concreto, visível e específico que o personagem busca no início do romance?</p>
          <textarea id="f2-desejo-superficial" class="form-textarea" rows="3" placeholder="Escreva aqui...">${p2.desejoSuperficial || ''}</textarea>
        </div>

        <!-- Passo 7 -->
        <div class="project-form-card">
          <label for="f2-motivacao-interna" class="form-label">7. Motivação Interna do Desejo (Desire)</label>
          <p class="field-hint">Por que o personagem deseja essa meta e o que ele acredita que a conquista provará sobre ele?</p>
          <textarea id="f2-motivacao-interna" class="form-textarea" rows="4" placeholder="Escreva aqui...">${p2.motivacaoInterna || ''}</textarea>
        </div>

        <!-- Passo 8 -->
        <div class="project-form-card">
          <label for="f2-falsa-crenca" class="form-label">8. A Falsa Crença Central (The Misbelief)</label>
          <p class="field-hint">Qual é a convicção errônea sobre o mundo que a protagonista adota como escudo protetor e qual é sua necessidade interna real?</p>
          <textarea id="f2-falsa-crenca" class="form-textarea" rows="4" placeholder="Escreva aqui...">${p2.falsaCrenca || ''}</textarea>
        </div>
      </section>

      <!-- Bloco B: A Cena de Origem -->
      <section class="phase-section">
        <h2>9 e 10. A Cena de Origem (Origin Scene)</h2>

        <div class="project-form-card">
          <label for="f2-origem-planejamento" class="form-label">O Planejamento</label>
          <p class="field-hint">Identifique o evento específico da infância ou juventude no qual uma expectativa saudável do personagem foi destruída pela realidade.</p>
          <textarea id="f2-origem-planejamento" class="form-textarea" rows="4" placeholder="Escreva aqui...">${p2.cenaOrigemPlanejamento || ''}</textarea>
        </div>

        <div class="project-form-card">
          <label for="f2-origem-escrita" class="form-label">A Escrita</label>
          <p class="field-hint">Redija essa cena em primeira pessoa para vivenciar o choque emocional que o fez adotar a Falsa Crença como mecanismo de defesa. Essa cena não precisa entrar no romance, mas serve como bússola para o autor.</p>
          <textarea id="f2-origem-escrita" class="form-textarea" rows="6" placeholder="Escreva aqui...">${p2.cenaOrigemEscrita || ''}</textarea>
        </div>
      </section>

      <!-- Bloco C: Cenas de Encruzilhada -->
      <section class="phase-section">
        <h2>11. As Três Cenas de Encruzilhada (Crossroads Moments)</h2>
        <p class="field-hint">Escreva três momentos posteriores na vida pregressa do personagem onde escolhas guiadas pela Falsa Crença aprofundaram suas defesas e geraram isolamento ou dor.</p>

        <div class="project-form-card">
          <label for="f2-encruzilhada-1" class="form-label">Primeiro Momento (ex: aos 18 anos)</label>
          <textarea id="f2-encruzilhada-1" class="form-textarea" rows="3" placeholder="Escreva aqui...">${p2.encruzilhada1 || ''}</textarea>
        </div>

        <div class="project-form-card">
          <label for="f2-encruzilhada-2" class="form-label">Segundo Momento (ex: aos 22 anos)</label>
          <textarea id="f2-encruzilhada-2" class="form-textarea" rows="3" placeholder="Escreva aqui...">${p2.encruzilhada2 || ''}</textarea>
        </div>

        <div class="project-form-card">
          <label for="f2-encruzilhada-3" class="form-label">Terceiro Momento (ex: aos 29 anos)</label>
          <textarea id="f2-encruzilhada-3" class="form-textarea" rows="3" placeholder="Escreva aqui...">${p2.encruzilhada3 || ''}</textarea>
        </div>
      </section>
    </article>
  `;
}

function initPhase2Events() {
  const fieldsMap = {
    'f2-estado-inicial': 'estadoInicial',
    'f2-desejo-superficial': 'desejoSuperficial',
    'f2-motivacao-interna': 'motivacaoInterna',
    'f2-falsa-crenca': 'falsaCrenca',
    'f2-origem-planejamento': 'cenaOrigemPlanejamento',
    'f2-origem-escrita': 'cenaOrigemEscrita',
    'f2-encruzilhada-1': 'encruzilhada1',
    'f2-encruzilhada-2': 'encruzilhada2',
    'f2-encruzilhada-3': 'encruzilhada3'
  };

  Object.keys(fieldsMap).forEach(id => {
    const elem = document.getElementById(id);
    if (!elem) return;

    elem.addEventListener('input', (e) => {
      const key = fieldsMap[id];
      if (!projectState.phase2) {
        projectState.phase2 = {};
      }
      projectState.phase2[key] = e.target.value;
      saveLocalProject();
    });
  });
}
