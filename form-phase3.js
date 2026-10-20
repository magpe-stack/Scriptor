/**
 * Scriptor - Formulário da Fase 3: Estruturação Causal do Enredo e Terceiro Trilho
 */

function renderPhase3View() {
  if (!projectState.phase3) projectState.phase3 = {};
  const p3 = projectState.phase3;

  if (!p3.problemaExterno) p3.problemaExterno = {};
  if (!Array.isArray(p3.conflitosSecundarios)) p3.conflitosSecundarios = [];
  if (!Array.isArray(p3.pontosDeVirada)) p3.pontosDeVirada = [];
  if (!Array.isArray(p3.personagensApoio)) p3.personagensApoio = [];

  const pe = p3.problemaExterno;

  return `
    <article class="theory-article">
      <h1>Fase 3: Estruturação Causal do Enredo e Terceiro Trilho</h1>
      <p>Mapeie o conflito externo, teste a causalidade dos acontecimentos e garanta que cada evento pressione diretamente a Falsa Crença da protagonista.</p>

      <!-- 12. O Problema Externo Principal -->
      <section class="phase-section">
        <h2>12. O Problema Externo Principal (Obvious Plot Problem)</h2>
        <p class="field-hint">Escolha um conflito externo grande o bastante para sustentar todo o romance, contendo consequências reais, um prazo limite e um alto custo emocional.</p>

        <div class="project-form-card">
          <label for="f3-pe-descricao" class="form-label">Descrição do Conflito Principal</label>
          <textarea id="f3-pe-descricao" class="form-textarea" rows="3" placeholder="Escreva aqui...">${pe.descricao || ''}</textarea>

          <label for="f3-pe-consequencias" class="form-label" style="margin-top:12px;">Consequências Reais</label>
          <p class="field-hint">O que acontece de concreto e irreversível se o protagonista falhar?</p>
          <textarea id="f3-pe-consequencias" class="form-textarea" rows="3" placeholder="Escreva aqui...">${pe.consequencias || ''}</textarea>

          <label for="f3-pe-prazo" class="form-label" style="margin-top:12px;">Prazo Limite (Ticking Clock)</label>
          <p class="field-hint">Qual é o elemento temporal que cria urgência constante no enredo?</p>
          <textarea id="f3-pe-prazo" class="form-textarea" rows="2" placeholder="Escreva aqui...">${pe.prazoLimite || ''}</textarea>

          <label for="f3-pe-custo" class="form-label" style="margin-top:12px;">Alto Custo Emocional</label>
          <p class="field-hint">Qual é a perda íntima que o personagem sofre caso vença ou perca essa disputa?</p>
          <textarea id="f3-pe-custo" class="form-textarea" rows="3" placeholder="Escreva aqui...">${pe.custoEmocional || ''}</textarea>
        </div>
      </section>

      <!-- 13. Lista de Conflitos Secundários -->
      <section class="phase-section">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h2 style="margin:0;">13. Lista de Conflitos Secundários</h2>
          <button id="add-conflito-btn" class="primary-btn" title="Adicionar Novo Conflito">+ Novo Conflito</button>
        </div>
        <p class="field-hint">Catalogue obstáculos e complicações adicionais dividindo-os em ideias desenvolvidas, ideias genéricas e problemas em maturação.</p>

        <div id="conflitos-container">
          ${renderConflitosList(p3.conflitosSecundarios)}
        </div>
      </section>

      <!-- 14. Avaliação do Terceiro Trilho -->
      <section class="phase-section">
        <h2>14. Avaliação do Terceiro Trilho</h2>
        <p class="field-hint">Teste os conflitos cadastrados acima perguntando: "Isso força o personagem a encarar sua Falsa Crença?" Se a resposta for não, o conflito é ação vazia e deve ser descartado ou reformulado.</p>

        <div id="avaliacao-terceiro-trilho-container">
          ${renderAvaliacaoTerceiroTrilhoList(p3.conflitosSecundarios)}
        </div>
      </section>

      <!-- 15. Desenvolvimento dos Pontos de Virada -->
      <section class="phase-section">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h2 style="margin:0;">15. Desenvolvimento dos Pontos de Virada</h2>
          <button id="add-pv-btn" class="primary-btn" title="Adicionar Novo Ponto de Virada">+ Novo Ponto de Virada</button>
        </div>
        <p class="field-hint">Mapeie segredos, mentiras e obstáculos passados aplicando os testes de causalidade em cada cena decisiva.</p>

        <div id="pv-container">
          ${renderPontosDeViradaList(p3.pontosDeVirada)}
        </div>
      </section>

      <!-- 16. Integração de Subtramas e Personagens de Apoio -->
      <section class="phase-section">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h2 style="margin:0;">16. Personagens de Apoio e Subtramas</h2>
          <button id="add-personagem-btn" class="primary-btn" title="Adicionar Personagem de Apoio">+ Novo Personagem</button>
        </div>
        <p class="field-hint">Cadastre personagens secundários e defina como suas funções e subtramas convergem para desafiar ou refletir a Falsa Crença da protagonista.</p>

        <div id="personagens-container">
          ${renderPersonagensList(p3.personagensApoio)}
        </div>
      </section>
    </article>
  `;
}

/* ==========================================================================
   Funções Auxiliares de Renderização de Listas
   ========================================================================== */

function renderConflitosList(list) {
  if (!list || list.length === 0) {
    return `<p class="field-hint" style="font-style:italic;">Nenhum conflito secundário adicionado. Clique no botão "+ Novo Conflito" acima.</p>`;
  }

  return list.map((item, idx) => `
    <div class="project-form-card" data-id="${item.id}">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="form-label">Conflito #${idx + 1}</span>
        <button class="card-ctrl-btn remove-conflito-btn" data-id="${item.id}" style="padding:4px 8px; color:#e53935; border-color:#e53935;">Remover</button>
      </div>

      <textarea class="form-textarea conflito-texto" data-id="${item.id}" rows="3" placeholder="Descreva o conflito secundário...">${item.texto || ''}</textarea>

      <div style="margin-top:10px;">
        <label class="form-label" style="font-size:0.85rem;">Estágio do Conflito:</label>
        <select class="form-input conflito-categoria" data-id="${item.id}">
          <option value="Ideia desenvolvida" ${item.categoria === 'Ideia desenvolvida' ? 'selected' : ''}>Ideia desenvolvida</option>
          <option value="Ideia genérica" ${item.categoria === 'Ideia genérica' ? 'selected' : ''}>Ideia genérica</option>
          <option value="Problema em maturação" ${item.categoria === 'Problema em maturação' ? 'selected' : ''}>Problema em maturação</option>
        </select>
      </div>
    </div>
  `).join('');
}

function renderAvaliacaoTerceiroTrilhoList(list) {
  if (!list || list.length === 0) {
    return `<p class="field-hint" style="font-style:italic;">Adicione conflitos no item 13 para habilitar a avaliação do Terceiro Trilho nesta seção.</p>`;
  }

  return list.map((item, idx) => `
    <div class="project-form-card" data-id="${item.id}">
      <span class="form-label" style="color:var(--primary-color);">Avaliação do Conflito #${idx + 1}: ${item.texto ? `"${item.texto.substring(0, 40)}..."` : '(Sem texto)'}</span>
      
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-top:10px;">
        <div>
          <label class="form-label" style="font-size:0.85rem;">Força Dramática do Conflito:</label>
          <select class="form-input conflito-forca" data-id="${item.id}">
            <option value="excelente" ${item.avaliacaoForca === 'excelente' ? 'selected' : ''}>Excelente (Ação e impacto alto)</option>
            <option value="bom" ${item.avaliacaoForca === 'bom' ? 'selected' : ''}>Bom (Relevante na trama)</option>
            <option value="regular" ${item.avaliacaoForca === 'regular' ? 'selected' : ''}>Regular (Precisa ser ajustado)</option>
            <option value="ruim" ${item.avaliacaoForca === 'ruim' ? 'selected' : ''}>Ruim (Fraco ou superficial)</option>
          </select>
        </div>

        <div>
          <label class="form-label" style="font-size:0.85rem;">Alinhamento com Terceiro Trilho:</label>
          <select class="form-input conflito-tt" data-id="${item.id}">
            <option value="forte" ${item.avaliacaoTerceiroTrilho === 'forte' ? 'selected' : ''}>Força encarar a Falsa Crença</option>
            <option value="parcial" ${item.avaliacaoTerceiroTrilho === 'parcial' ? 'selected' : ''}>Apenas tangencia o dilema interno</option>
            <option value="acao_vazia" ${item.avaliacaoTerceiroTrilho === 'acao_vazia' ? 'selected' : ''}>Ação vazia (Sem impacto na Falsa Crença)</option>
          </select>
        </div>
      </div>

      <div style="margin-top:10px;">
        <label class="form-label" style="font-size:0.85rem;">Avaliação Qualitativa do Autor:</label>
        <textarea class="form-textarea conflito-notas" data-id="${item.id}" rows="2" placeholder="Descreva por que este conflito força ou não o crescimento interno...">${item.notasQualitativas || ''}</textarea>
      </div>
    </div>
  `).join('');
}

function renderPontosDeViradaList(list) {
  if (!list || list.length === 0) {
    return `<p class="field-hint" style="font-style:italic;">Nenhum ponto de virada cadastrado. Clique em "+ Novo Ponto de Virada".</p>`;
  }

  return list.map((item, idx) => `
    <div class="project-form-card" data-id="${item.id}">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="form-label">Ponto de Virada #${idx + 1}</span>
        <button class="card-ctrl-btn remove-pv-btn" data-id="${item.id}" style="padding:4px 8px; color:#e53935; border-color:#e53935;">Remover</button>
      </div>

      <input type="text" class="form-input pv-titulo" data-id="${item.id}" placeholder="Título do Ponto de Virada (ex: O Descobrimento do Testamento)" value="${item.titulo || ''}" style="margin-top:8px;" />
      
      <textarea class="form-textarea pv-descricao" data-id="${item.id}" rows="3" placeholder="Descreva o evento, segredo revelado ou virada dramática..." style="margin-top:8px;">${item.descricao || ''}</textarea>

      <div style="margin-top:12px; background-color:var(--bg-color); padding:12px; border-radius:8px; border:1px solid var(--border-color);">
        <span class="form-label" style="font-size:0.85rem; display:block; margin-bottom:8px;">Testes de Causalidade:</span>
        
        <label style="display:flex; align-items:center; gap:8px; margin-bottom:6px; font-size:0.88rem; cursor:pointer;">
          <input type="checkbox" class="pv-t1" data-id="${item.id}" ${item.testeCausaEfeito ? 'checked' : ''} />
          Esse evento é uma consequência direta ("Portanto") de uma ação anterior e não um acaso ("E Então")?
        </label>

        <label style="display:flex; align-items:center; gap:8px; margin-bottom:6px; font-size:0.88rem; cursor:pointer;">
          <input type="checkbox" class="pv-t2" data-id="${item.id}" ${item.testeImpactoFalsaCrenca ? 'checked' : ''} />
          Esse ponto de virada altera a percepção do protagonista e fere sua Falsa Crença?
        </label>

        <label style="display:flex; align-items:center; gap:8px; font-size:0.88rem; cursor:pointer;">
          <input type="checkbox" class="pv-t3" data-id="${item.id}" ${item.testeAcaoVazia ? 'checked' : ''} />
          O evento exige uma tomada de decisão com custo inevitável (sem saída fácil)?
        </label>
      </div>
    </div>
  `).join('');
}

function renderPersonagensList(list) {
  if (!list || list.length === 0) {
    return `<p class="field-hint" style="font-style:italic;">Nenhum personagem de apoio adicionado. Clique em "+ Novo Personagem".</p>`;
  }

  const funcoesOpcoes = [
    "Aliado Leal", "Antagonista Principal", "Antagonista Secundário", "Interesse Amoroso",
    "Mentor / Guia", "Familiar / Parente", "Máscara (Falso Amigo)", "Sósia / Espelho (Foiled Character)",
    "Rival Profissional", "Catalisador de Mudança", "Guardião do Limiar", "Sombra / Projeção de Medo",
    "Cético / Provocador", "Arauto / Anunciador", "Alívio Cômico Dramático", "Confidente",
    "Obstáculo Institucional", "Membro do Bando / Equipe"
  ];

  return list.map((item, idx) => `
    <div class="project-form-card" data-id="${item.id}">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="form-label">Ficha de Personagem de Apoio #${idx + 1}</span>
        <button class="card-ctrl-btn remove-personagem-btn" data-id="${item.id}" style="padding:4px 8px; color:#e53935; border-color:#e53935;">Remover</button>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-top:8px;">
        <div>
          <label class="form-label" style="font-size:0.85rem;">Nome do Personagem:</label>
          <input type="text" class="form-input pers-nome" data-id="${item.id}" placeholder="Nome completo" value="${item.nome || ''}" />
        </div>

        <div>
          <label class="form-label" style="font-size:0.85rem;">Função Dramática:</label>
          <select class="form-input pers-funcao" data-id="${item.id}">
            ${funcoesOpcoes.map(f => `<option value="${f}" ${item.funcao === f ? 'selected' : ''}>${f}</option>`).join('')}
          </select>
        </div>
      </div>

      <div style="margin-top:10px;">
        <label class="form-label" style="font-size:0.85rem;">Conexão com o Enredo e a Falsa Crença:</label>
        <p class="field-hint">Como este personagem ou subtrama pressiona (ou espelha) a Falsa Crença do protagonista?</p>
        <textarea class="form-textarea pers-conexao" data-id="${item.id}" rows="3" placeholder="Escreva a relação direta deste personagem com o aprendizado da protagonista...">${item.conexaoEnredoCrenca || ''}</textarea>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   Inicialização de Eventos e Captura de Dados
   ========================================================================== */

function initPhase3Events() {
  const p3 = projectState.phase3;

  // 1. Problema Externo
  ['descricao', 'consequencias', 'prazoLimite', 'custoEmocional'].forEach(key => {
    const idMap = {
      'descricao': 'f3-pe-descricao',
      'consequencias': 'f3-pe-consequencias',
      'prazoLimite': 'f3-pe-prazo',
      'custoEmocional': 'f3-pe-custo'
    };
    const elem = document.getElementById(idMap[key]);
    if (elem) {
      elem.addEventListener('input', (e) => {
        if (!p3.problemaExterno) p3.problemaExterno = {};
        p3.problemaExterno[key] = e.target.value;
        saveLocalProject();
      });
    }
  });

  // 2. Conflitos Secundários - Botão Adicionar
  const addConflitoBtn = document.getElementById('add-conflito-btn');
  if (addConflitoBtn) {
    addConflitoBtn.addEventListener('click', () => {
      const newId = 'conf_' + Date.now();
      p3.conflitosSecundarios.push({
        id: newId,
        texto: '',
        categoria: 'Ideia desenvolvida',
        avaliacaoForca: 'bom',
        avaliacaoTerceiroTrilho: 'forte',
        notasQualitativas: ''
      });
      saveLocalProject();
      refreshPhase3View();
    });
  }

  // 3. Pontos de Virada - Botão Adicionar
  const addPvBtn = document.getElementById('add-pv-btn');
  if (addPvBtn) {
    addPvBtn.addEventListener('click', () => {
      const newId = 'pv_' + Date.now();
      p3.pontosDeVirada.push({
        id: newId,
        titulo: '',
        descricao: '',
        testeCausaEfeito: false,
        testeImpactoFalsaCrenca: false,
        testeAcaoVazia: false
      });
      saveLocalProject();
      refreshPhase3View();
    });
  }

  // 4. Personagens de Apoio - Botão Adicionar
  const addPersBtn = document.getElementById('add-personagem-btn');
  if (addPersBtn) {
    addPersBtn.addEventListener('click', () => {
      const newId = 'pers_' + Date.now();
      p3.personagensApoio.push({
        id: newId,
        nome: '',
        funcao: 'Aliado Leal',
        conexaoEnredoCrenca: ''
      });
      saveLocalProject();
      refreshPhase3View();
    });
  }

  // Delegar eventos Dinâmicos em Listas
  const mainView = document.getElementById('app-view');
  if (!mainView) return;

  mainView.addEventListener('input', (e) => {
    const t = e.target;
    const id = t.dataset.id;
    if (!id) return;

    // Conflitos
    if (t.classList.contains('conflito-texto')) {
      updateConflitoItem(id, 'texto', t.value);
    } else if (t.classList.contains('conflito-categoria')) {
      updateConflitoItem(id, 'categoria', t.value);
    } else if (t.classList.contains('conflito-forca')) {
      updateConflitoItem(id, 'avaliacaoForca', t.value);
    } else if (t.classList.contains('conflito-tt')) {
      updateConflitoItem(id, 'avaliacaoTerceiroTrilho', t.value);
    } else if (t.classList.contains('conflito-notas')) {
      updateConflitoItem(id, 'notasQualitativas', t.value);
    }

    // Pontos de Virada
    else if (t.classList.contains('pv-titulo')) {
      updatePvItem(id, 'titulo', t.value);
    } else if (t.classList.contains('pv-descricao')) {
      updatePvItem(id, 'descricao', t.value);
    } else if (t.classList.contains('pv-t1')) {
      updatePvItem(id, 'testeCausaEfeito', t.checked);
    } else if (t.classList.contains('pv-t2')) {
      updatePvItem(id, 'testeImpactoFalsaCrenca', t.checked);
    } else if (t.classList.contains('pv-t3')) {
      updatePvItem(id, 'testeAcaoVazia', t.checked);
    }

    // Personagens
    else if (t.classList.contains('pers-nome')) {
      updatePersItem(id, 'nome', t.value);
    } else if (t.classList.contains('pers-funcao')) {
      updatePersItem(id, 'funcao', t.value);
    } else if (t.classList.contains('pers-conexao')) {
      updatePersItem(id, 'conexaoEnredoCrenca', t.value);
    }
  });

  mainView.addEventListener('click', (e) => {
    const t = e.target;
    if (t.classList.contains('remove-conflito-btn')) {
      const id = t.dataset.id;
      p3.conflitosSecundarios = p3.conflitosSecundarios.filter(i => i.id !== id);
      saveLocalProject();
      refreshPhase3View();
    } else if (t.classList.contains('remove-pv-btn')) {
      const id = t.dataset.id;
      p3.pontosDeVirada = p3.pontosDeVirada.filter(i => i.id !== id);
      saveLocalProject();
      refreshPhase3View();
    } else if (t.classList.contains('remove-personagem-btn')) {
      const id = t.dataset.id;
      p3.personagensApoio = p3.personagensApoio.filter(i => i.id !== id);
      saveLocalProject();
      refreshPhase3View();
    }
  });
}

function updateConflitoItem(id, field, val) {
  const item = projectState.phase3.conflitosSecundarios.find(i => i.id === id);
  if (item) {
    item[field] = val;
    saveLocalProject();
  }
}

function updatePvItem(id, field, val) {
  const item = projectState.phase3.pontosDeVirada.find(i => i.id === id);
  if (item) {
    item[field] = val;
    saveLocalProject();
  }
}

function updatePersItem(id, field, val) {
  const item = projectState.phase3.personagensApoio.find(i => i.id === id);
  if (item) {
    item[field] = val;
    saveLocalProject();
  }
}

function refreshPhase3View() {
  const mainView = document.getElementById('app-view');
  if (mainView) {
    mainView.innerHTML = renderPhase3View();
    initPhase3Events();
  }
}
