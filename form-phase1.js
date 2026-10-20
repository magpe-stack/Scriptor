/**
 * Scriptor - Formulário da Fase 1: Fundação e Conexão Autoral
 */

function renderPhase1View() {
  const p1 = projectState.phase1 || {};

  return `
    <article class="theory-article">
      <h1>Fase 1: Fundação e Conexão Autoral</h1>
      <p>Defina a essência narrativa do seu romance e o alinhamento comercial antes de estruturar a trama.</p>

      <!-- Seção 1: Núcleo do Método Story Genius -->
      <section class="phase-section">
        <h2>Essência e Conexão Narrativa</h2>

        <!-- Passo 1 -->
        <div class="project-form-card">
          <label for="f1-fagulha" class="form-label">1. A Primeira Fagulha</label>
          <p class="field-hint">A imagem ou conceito inicial que deu origem à ideia. Identifique o que chamou sua atenção primeiro e escreva o que exatamente o atrai nessa ideia inicial.</p>
          <textarea id="f1-fagulha" class="form-textarea" rows="4" placeholder="Escreva aqui...">${p1.fagulha || ''}</textarea>
        </div>

        <!-- Passo 2 -->
        <div class="project-form-card">
          <label for="f1-motivacao" class="form-label">2. Por Que Você Se Importa?</label>
          <p class="field-hint">Registre por que essa história importa para você e por que você é a pessoa indicada para escrevê-la. Essa motivação autoral será seu combustível nos momentos de bloqueio criativo.</p>
          <textarea id="f1-motivacao" class="form-textarea" rows="4" placeholder="Escreva aqui...">${p1.motivacao || ''}</textarea>
        </div>

        <!-- Passo 3 -->
        <div class="project-form-card">
          <label for="f1-ponto-central" class="form-label">3. O Ponto Central</label>
          <p class="field-hint">Condense em 1 a 3 frases a mensagem moral ou filosófica que você quer que o leitor compreenda ao fechar o livro. Esse é o aprendizado do seu protagonista.</p>
          <textarea id="f1-ponto-central" class="form-textarea" rows="3" placeholder="Escreva aqui...">${p1.pontoCentral || ''}</textarea>
        </div>

        <!-- Passo 4 -->
        <div class="project-form-card">
          <label for="f1-premissa" class="form-label">4. A Premissa "E Se?"</label>
          <p class="field-hint">Escreva uma premissa detalhada conectando o conflito externo ao dilema emocional do protagonista. Inclua contexto, uma surpresa e consequências pessoais claras.</p>
          <textarea id="f1-premissa" class="form-textarea" rows="4" placeholder="Escreva aqui...">${p1.premissa || ''}</textarea>
        </div>
      </section>

      <!-- Seção 2: Preparação Comercial -->
      <section class="phase-section">
        <h2>Preparação Comercial</h2>

        <!-- Passo 5 -->
        <div class="project-form-card">
          <label for="f1-leitor-ideal" class="form-label">5. Leitor Ideal</label>
          <p class="field-hint">O perfil do público-alvo exato — quais autores e subgêneros ele já consome e qual experiência ou satisfação emocional ele busca ao ler o seu livro.</p>
          <textarea id="f1-leitor-ideal" class="form-textarea" rows="3" placeholder="Escreva aqui...">${p1.leitorIdeal || ''}</textarea>
        </div>

        <!-- Passo 6 -->
        <div class="project-form-card">
          <label for="f1-sinopse" class="form-label">6. Sinopse de Contracapa</label>
          <p class="field-hint">O texto de vendas de 150 a 200 palavras destacando o protagonista, o incidente incitador, o dilema central e as apostas, que são o risco concreto caso ele falhe.</p>
          <textarea id="f1-sinopse" class="form-textarea" rows="5" placeholder="Escreva aqui...">${p1.sinopse || ''}</textarea>
        </div>

        <!-- Passo 7 -->
        <div class="project-form-card">
          <label for="f1-comps" class="form-label">7. Livros Comparáveis</label>
          <p class="field-hint">De 2 a 3 títulos recentes de 3 a 5 anos com tom, público ou tema semelhantes, indicando em qual prateleira o livro se posiciona no mercado.</p>
          <textarea id="f1-comps" class="form-textarea" rows="3" placeholder="Escreva aqui...">${p1.comps || ''}</textarea>
        </div>

        <!-- Passo 8 -->
        <div class="project-form-card">
          <label for="f1-promessa" class="form-label">8. Promessa de Entretenimento e Gênero</label>
          <p class="field-hint">O gênero literário exato, a emoção primária garantida ao leitor em cada capítulo e o relógio regressivo que é o prazo limite que cria urgência.</p>
          <textarea id="f1-promessa" class="form-textarea" rows="3" placeholder="Escreva aqui...">${p1.promessa || ''}</textarea>
        </div>
      </section>
    </article>
  `;
}

function initPhase1Events() {
  const fieldsMap = {
    'f1-fagulha': 'fagulha',
    'f1-motivacao': 'motivacao',
    'f1-ponto-central': 'pontoCentral',
    'f1-premissa': 'premissa',
    'f1-leitor-ideal': 'leitorIdeal',
    'f1-sinopse': 'sinopse',
    'f1-comps': 'comps',
    'f1-promessa': 'promessa'
  };

  Object.keys(fieldsMap).forEach(id => {
    const elem = document.getElementById(id);
    if (!elem) return;

    elem.addEventListener('input', (e) => {
      const key = fieldsMap[id];
      if (!projectState.phase1) {
        projectState.phase1 = {};
      }
      projectState.phase1[key] = e.target.value;
      saveLocalProject();
    });
  });
}
