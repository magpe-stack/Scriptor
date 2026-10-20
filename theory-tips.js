/**
 * Conteúdo de Teoria: Dicas (200 Flashcards - Sorteio Aleatório Sem Repetição)
 * O texto permanece estritamente idêntico ao fornecido.
 */

const tipsData = [
  "Foque na transformação psicológica interna do protagonista, pois histórias são simulações cognitivas para processar dilemas emocionais reais da vida humana.",
  "O enredo externo existe unicamente como um catalisador planejado para desmontar a falsa visão de mundo do seu protagonista.",
  "Leitores não se conectam a eventos físicos isolados, mas à forma como o personagem sente, interpreta e reage a eles.",
  "A mente humana busca na ficção estratégias de sobrevivência emocional; sem dilema interno, a ação se torna rasa e irrelevante.",
  "O motor secreto de qualquer romance marcante é o arco psicológico do personagem, não a sequência de explosões ou reviravoltas.",
  "Evite escrever sem rumo; entenda a psicologia do personagem antes de traçar o primeiro evento físico do seu enredo.",
  "Pergunte constantemente \"E daí?\"; cada acontecimento da trama precisa ter um significado profundo e pessoal para o protagonista.",
  "A empatia do leitor surge quando ele enxerga as vulnerabilidades e os pontos cegos emocionais da figura central.",
  "Histórias universais nascem de verdades psicológicas específicas; quanto mais específica a dor do personagem, maior a conexão humana.",
  "O enredo é o teste do ácido; ele deve ser desenhado sob medida para esmagar as defesas emocionais do personagem.",
  "A falsa crença é a tese distorcida sobre o mundo que o protagonista adota para se proteger de traumas passados.",
  "Identifique o medo central do personagem, pois é dele que nasce a falsa crença que bloqueia sua felicidade real.",
  "O arco narrativo completo consiste em forçar o protagonista a abandonar sua falsa crença para abraçar a verdade interna.",
  "A falsa crença deve parecer perfeitamente lógica para o protagonista, tornando sua resistência à mudança dolorosa e crível.",
  "Cada decisão equivocada do protagonista no enredo deve ser uma tentativa desesperada de proteger sua própria falsa crença.",
  "Dê ao personagem uma armadura emocional rígida; a história será o martelo que quebrará essa proteção passo a passo.",
  "A verdadeira batalha da história ocorre dentro da mente do herói, entre a falsa crença e a necessidade de transformação.",
  "Sem uma falsa crença clara, o protagonista não tem o que aprender e o enredo perde seu propósito emocional.",
  "A falsa crença não é um defeito superficial, mas uma estratégia de sobrevivência que falhou ao longo do tempo.",
  "Confronte a falsa crença em todas as cenas; nunca dê trégua às ilusões defensivas do seu protagonista.",
  "Escreva a cena de origem onde a falsa crença nasceu de uma dor ou decepção na infância do personagem.",
  "A cena de origem revela o momento exato em que uma expectativa saudável do personagem foi destruída pela realidade.",
  "Redija a cena de origem em primeira pessoa para sentir a carga emocional que moldou a psique do protagonista.",
  "Mesmo que a cena de origem não entre no livro, ela é o pilar que sustenta toda a lógica do enredo.",
  "Crie três cenas de encruzilhada no passado onde o personagem tomou decisões erradas guiado pela falsa crença.",
  "Ninguém entra na história como folha em branco; o passado dramatizado justifica o comportamento defensivo do presente.",
  "As cenas de encruzilhada mostram o enrijecimento gradual das defesas psicológicas do protagonista ao longo dos anos.",
  "Use a backstory para garantir que cada atitude do personagem no primeiro capítulo tenha uma justificativa histórica sólida.",
  "A dor do passado é o combustível da história presente; escave a memória do personagem antes de começar.",
  "O passado do protagonista dita a forma como ele interpreta erroneamente os fatos do presente no romance.",
  "Separe claramente o objetivo superficial externo do personagem da sua necessidade interna profunda de transformação emocional.",
  "O objetivo superficial é o que o personagem quer; a necessidade interna é o que ele precisa para se curar.",
  "No início da história, o protagonista acredita falsamente que alcançar sua meta superficial resolverá todos os seus problemas.",
  "O conflito humano surge porque o desejo superficial e a necessidade interna entram em rota de colisão inevitável.",
  "Torne o objetivo superficial extremamente concreto e específico, evitando metas vagas ou abstratas para o enredo.",
  "O desejo superficial cria a ação visível do enredo, enquanto a necessidade interna cria o significado emocional da obra.",
  "Ao perseguir a meta externa, o protagonista deve colidir continuamente com as limitações impostas pela sua falsa crença.",
  "A verdadeira vitória do herói ocorre quando ele renuncia ao objetivo egoísta em prol de sua necessidade interna.",
  "Pergunte por que o personagem quer aquela meta superficial; a resposta revelará a carência emocional subjacente.",
  "Mantenha a meta externa clara para que o leitor saiba exatamente o que está em jogo fisicamente a cada momento.",
  "O terceiro trilho é a voltagem emocional interna que precisa atravessar absolutamente todas as cenas da história.",
  "Uma cena sem terceiro trilho é apenas ação física vazia; descarte eventos que não alterem o estado emocional.",
  "Pergunte em cada cena: \"Por que isso importa pessoalmente para o protagonista e como afeta sua falsa crença?\"",
  "Conecte cada evento externo a uma tomada de consciência psicológica imediata na mente da figura central.",
  "O terceiro trilho garante que a ação física e o significado psicológico caminhem juntos em cada página escrita.",
  "Se o evento não provocar um dilema ou uma reavaliação interna no protagonista, a cena perderá o interesse do leitor.",
  "A voltagem do terceiro trilho deve aumentar a cada capítulo, elevando a pressão sobre as defesas do personagem.",
  "Mostre o processamento interno do personagem entre o estímulo externo e a decisão que ele toma em seguida.",
  "O leitor lê nas entrelinhas; o terceiro trilho dá sentido e profundidade subtextual aos diálogos e ações.",
  "Mantenha o terceiro trilho ativo mesmo nas cenas de ritmo acelerado para não perder o foco na transformação.",
  "Substitua a lógica fraca do \"e então\" pela dinâmica rigorosa do \"e por isso\" ao encadear suas cenas.",
  "Toda cena deve ser a consequência direta da decisão tomada pelo protagonista no final da cena anterior.",
  "Elimine coincidências convenientes; faça com que os problemas nasçam das próprias escolhas equivocadas do personagem.",
  "A causalidade ininterrupta impede que a história pareça uma colagem desconexa de episódios sem relação entre si.",
  "Submeta cada ponto do enredo ao teste da lógica: por que isso acontece e qual reação imediata provoca?",
  "Se você pode trocar a ordem de duas cenas sem alterar a história, a cadeia causal está quebrada.",
  "O efeito de uma cena deve se tornar a causa imediata do conflito da cena que vem a seguir.",
  "Crie uma reação em cadeia onde cada tentativa de consertar o problema gera uma complicação ainda maior.",
  "Causalidade estrita cria o sentimento inevitável de que o destino do protagonista está sendo selado por ele mesmo.",
  "Teste a viabilidade logística de cada evento externo antes de usá-lo para pressionar a psicologia do personagem.",
  "Planeje cada cena definindo o Ponto Alfa, a função narrativa indispensável que ela cumpre na obra.",
  "Mapeie a causa física no topo do cartão de cena e o efeito prático imediato que ela produz no mundo.",
  "Registre a realização psicológica do protagonista no cartão de cena antes de redigir o texto definitivo.",
  "Finalize o cartão de cena com a pergunta \"E por isso?\", estabelecendo a ação concreta que deflagra a próxima cena.",
  "O cartão de cena evita o bloqueio criativo, garantindo que você saiba para onde a escrita está caminhando.",
  "Diagnosticando cenas fracas com o cartão de cena, você elimina trechos inúteis antes mesmo de escrever o rascunho.",
  "Use o cartão de cena para equilibrar o avanço do enredo externo com o amadurecimento psicológico interno.",
  "Cada cartão de cena deve conter um dilema real que obrigue o personagem a fazer uma escolha difícil.",
  "Não confunda cartão de cena com resumo de enredo; o foco deve estar na mudança de percepção interna.",
  "Um bom cartão de cena mostra como o mundo externo e o mundo interno colidem em um ponto crítico.",
  "Crie um problema externo grande o bastante para sustentar todo o romance do início ao fim sem enrolação.",
  "Estabeleça um prazo limite claro e um relógio regressivo para injetar urgência e tensão constante na trama.",
  "Aumente as apostas revelando as consequências terríveis e inevitáveis caso o protagonista falhe na sua missão.",
  "Torne os obstáculos cada vez mais difíceis, exigindo sacrifícios pessoais crescentes do personagem a cada etapa.",
  "O problema externo deve forçar o protagonista a agir exatamente onde ele se sente mais inseguro e desarmado.",
  "Force o personagem a fazer escolhas entre duas opções igualmente dolorosas para revelar seu verdadeiro caráter.",
  "Não proteja seu protagonista; coloque-o em situações onde suas antigas estratégias de defesa falhem miseravelmente.",
  "O problema do enredo deve ser personalizado para expor e desmantelar a falsa crença específica daquele personagem.",
  "Mantenha as consequências da falha sempre visíveis no horizonte para que o leitor nunca perca o medo do fracasso.",
  "O prazo limite impede que o personagem adie decisões difíceis, acelerando a narrativa em direção ao clímax.",
  "Subtramas não são distrações; elas devem espelhar, desafiar ou intensificar o dilema central do protagonista.",
  "Cada personagem secundário deve representar uma visão de mundo diferente que confronta a falsa crença do herói.",
  "Evite personagens funcionais sem vida; dê a todos motivações próprias e opiniões sobre o conflito principal.",
  "O antagonista não é apenas mau; ele é a encarnação perfeita das forças que testam a Falsa Crença do protagonista.",
  "Use aliados para apontar os pontos cegos do protagonista, mesmo quando ele se recusa a ouvir a verdade.",
  "Converta subtramas em pressões adicionais que reduzem o espaço de manobra do personagem no enredo principal.",
  "Relações amorosas na ficção devem funcionar como espelhos emocionais que exigem vulnerabilidade e entrega real.",
  "Elimine personagens secundários que não afetam as escolhas do protagonista ou não avançam a cadeia causal.",
  "A jornada do herói transforma também os personagens ao seu redor, reagindo à sua mudança de atitude.",
  "Alinhe todas as linhas secundárias para que convirjam juntas em direção ao momento decisivo do clímax.",
  "O clímax é o momento de revelação onde o protagonista finalmente enxerga e destrói sua falsa crença central.",
  "A vitória no enredo externo só é possível após a rendição emocional do personagem à verdade interna.",
  "No clímax, a nova visão de mundo do herói deve ser testada através de um sacrifício pessoal supremo.",
  "Saiba como o romance termina antes de redigir o primeiro capítulo para manter o foco na transformação.",
  "Escreva o rascunho permitindo que o leitor habite a mente do protagonista e sinta seu processamento interno.",
  "Não descreva apenas o cenário; mostre o cenário através do filtro emocional e preconceitos do personagem.",
  "Na revisão, corte cenas que não possuem terceiro trilho ou que não alteram a trajetória de causa e efeito.",
  "Verifique se o momento de vitória no clímax foi plenamente merecido através de dores e aprendizados reais.",
  "O final do romance deve mostrar a nova realidade do personagem, contrastando com seu estado inicial engessado.",
  "Confie na neurociência da narrativa: mantenha o foco no arco interno e seu livro conquistará o leitor.",
  "Defina uma voz narrativa coerente antes de começar; ela orientará vocabulário, ritmo, sintaxe e distância emocional ao longo do romance.",
  "Diferencie personagens pela maneira de construir frases, não apenas por bordões ou gírias repetidas.",
  "Leia diálogos em voz alta para perceber pausas artificiais, ritmos iguais e falas que não soam naturais.",
  "Use sotaques com moderação; poucas marcas bem escolhidas são mais eficazes que uma transcrição fonética cansativa.",
  "Evite representar variedades linguísticas como sinais de inferioridade, ignorância ou mau caráter.",
  "Crie uma ficha de voz para cada personagem, registrando ritmo, vocabulário, pronomes e construções preferidas.",
  "Use frases curtas para transmitir urgência, medo, choque ou aceleração durante uma cena.",
  "Reserve períodos longos para reflexão, descrição detalhada, memória ou pensamento labiríntico.",
  "Varie o comprimento das frases para evitar uma prosa monótona e controlar o ritmo da leitura.",
  "Use a pontuação para orientar a velocidade, não apenas para corrigir pausas gramaticais.",
  "Coloque uma informação decisiva em frase isolada quando quiser aumentar seu impacto narrativo.",
  "Use dois-pontos para preparar uma revelação, explicação ou consequência importante.",
  "Empregue o ponto e vírgula para aproximar ideias relacionadas sem fundi-las completamente.",
  "Reserve as reticências para hesitação, interrupção ou suspensão; o excesso enfraquece seu efeito.",
  "Use o travessão para marcar interrupções, mudanças bruscas ou comentários destacados.",
  "Não separe sujeito e predicado por vírgula sem uma razão sintática ou expressiva clara.",
  "Use perguntas sem resposta imediata para criar expectativa e prolongar a tensão narrativa.",
  "Faça a pontuação refletir o estado emocional, mas não substitua ações, gestos e descrições concretas.",
  "Use interrogações sucessivas apenas quando a intensidade da cena realmente exigir esse recurso.",
  "Revise a pontuação observando se ela altera involuntariamente o sentido de uma frase.",
  "Escolha o tempo verbal conforme a distância desejada entre narrador e acontecimento.",
  "Use o pretérito imperfeito para ações habituais, durativas ou inacabadas no passado.",
  "Use o pretérito perfeito para acontecimentos concluídos e relevantes para o avanço da trama.",
  "Empregue o futuro do pretérito para hipóteses, possibilidades, desejos ou informações condicionais.",
  "Observe a concordância verbal mesmo quando a fala coloquial da personagem apresentar desvios deliberados.",
  "Use a voz passiva para destacar quem sofre uma ação ou ocultar temporariamente seu agente.",
  "Prefira a voz ativa quando quiser tornar a ação mais direta e destacar o responsável por ela.",
  "Use verbos precisos no lugar de advérbios excessivos que apenas expliquem emoções já evidentes.",
  "Troque verbos genéricos por verbos específicos quando a ação precisar ganhar clareza ou força.",
  "Evite acumular adjetivos; escolha detalhes capazes de revelar aparência, atmosfera e personalidade simultaneamente.",
  "Use diminutivos para expressar tamanho, carinho, ironia, intimidade ou desprezo conforme o contexto.",
  "Observe como prefixos e sufixos alteram o sentido de palavras e podem formar neologismos plausíveis.",
  "Crie palavras inventadas seguindo padrões morfológicos reconhecíveis do português.",
  "Verifique se um neologismo parece pertencer ao período histórico e ao grupo social representado.",
  "Use nomes próprios coerentes com época, região, religião e origem social das personagens.",
  "Escolha pronomes de tratamento de acordo com hierarquia, intimidade e contexto histórico.",
  "Use “tu”, “você” ou outras formas pronominais para revelar relações regionais e sociais, não aleatoriamente.",
  "Controle a colocação pronominal conforme o registro da cena e a voz de quem fala.",
  "Use a ordem dos termos para destacar objetos, ações ou personagens importantes na percepção narrativa.",
  "Comece a frase pelo elemento que deseja colocar em primeiro plano na consciência do leitor.",
  "Use orações subordinadas para representar relações de causa, condição, tempo ou consequência entre acontecimentos.",
  "Prefira coordenação e frases enxutas em cenas de ação rápida ou conflito físico.",
  "Use frases nominais em momentos de choque, fragmentação mental ou observação instantânea.",
  "Evite repetir a mesma estrutura sintática em parágrafos consecutivos sem intenção estilística.",
  "Use paralelismo para reforçar contrastes, listas, promessas ou transformações de uma personagem.",
  "Construa o subtexto deixando a intenção real diferente do significado literal da fala.",
  "Defina o que cada personagem sabe antes de escrever um diálogo com omissões ou indiretas.",
  "Use respostas evasivas para mostrar medo, culpa, manipulação ou desejo de esconder informação.",
  "Faça silêncios comunicarem algo específico: recusa, surpresa, luto, ameaça ou constrangimento.",
  "Revise pronomes como “ele”, “ela” e “isso” para evitar referentes ambíguos.",
  "Use palavras recorrentes para criar motivos temáticos, mas altere seu sentido conforme a história avança.",
  "Escolha metáforas coerentes com a experiência, profissão e imaginação da personagem que as emprega.",
  "Evite metáforas incompatíveis com o ponto de vista ou com o conhecimento da personagem.",
  "Use polissemia para permitir que uma palavra adquira sentidos diferentes em momentos decisivos.",
  "Diferencie ironia verbal de afirmação literal por meio do contexto, das reações e do contraste entre fala e ação.",
  "Crie campos semânticos discretos para associar personagens a cores, objetos, sons ou elementos naturais.",
  "Revise ambiguidades acidentais que possam fazer o leitor interpretar a ação de maneira errada.",
  "Preserve ambiguidades intencionais quando elas contribuírem para suspense, conflito ou múltiplas interpretações.",
  "Use palavras concretas para ancorar emoções abstratas em objetos, gestos e sensações observáveis.",
  "Substitua explicações emocionais por sinais físicos quando a cena puder demonstrar o sentimento.",
  "Pesquise o vocabulário histórico antes de ambientar um romance em outra época.",
  "Consulte dicionários regionais ao representar falares específicos, verificando se os termos são realmente usados.",
  "Evite inserir gírias atuais em narrativas históricas sem justificar sua presença.",
  "Use vocabulário profissional para indicar conhecimento, rotina e pertencimento ocupacional.",
  "Explique termos técnicos pelo contexto, evitando interromper a cena com definições enciclopédicas.",
  "Permita que o repertório lexical de uma personagem mude quando sua identidade ou posição social se transforma.",
  "Use empréstimos linguísticos somente quando forem coerentes com contatos culturais presentes no enredo.",
  "Verifique a origem de palavras antes de atribuí-las a personagens de outra época ou comunidade.",
  "Use arcaísmos seletivamente; poucos termos situam melhor o período que uma fala inteiramente artificial.",
  "Consulte exemplos de uso, não apenas definições, antes de escolher uma palavra incomum.",
  "Use dicionários de regência para conferir preposições exigidas por verbos e nomes.",
  "Confira se a palavra escolhida pertence à classe gramatical adequada à frase.",
  "Pesquise sinônimos observando diferenças de registro, intensidade, região e conotação.",
  "Não trate sinônimos como perfeitamente intercambiáveis; cada escolha pode alterar o tom da cena.",
  "Use o dicionário para descobrir sentidos esquecidos, mas confirme se combinam com o contexto narrativo.",
  "Revise a coesão verificando pronomes, conectores, repetições e retomadas entre frases.",
  "Garanta que cada capítulo avance uma ação, uma informação, uma relação ou uma transformação significativa.",
  "Use conectores temporais para orientar mudanças de cena, passagem de horas e saltos cronológicos.",
  "Marque mudanças de focalização para que o leitor saiba cuja percepção está organizando a cena.",
  "Limite a informação ao que o narrador ou a personagem poderia saber naquele momento.",
  "Use documentos, cartas e mensagens para variar gêneros textuais dentro do romance.",
  "Diferencie cada documento por finalidade, destinatário, grau de formalidade e relação com os acontecimentos.",
  "Revise a coerência temporal para evitar que uma personagem saiba fatos ainda não descobertos.",
  "Use repetições de objetos ou frases para conectar capítulos distantes e produzir continuidade temática.",
  "Corte frases que apenas repetem informações já demonstradas por ações ou diálogos.",
  "Planeje o vocabulário central de cada núcleo narrativo antes de escrever suas cenas.",
  "Revise primeiro a estrutura do romance; corrija estilo e pontuação depois de resolver problemas de enredo.",
  "Faça uma leitura exclusiva para detectar palavras repetidas em excesso próximas umas das outras.",
  "Faça outra leitura procurando verbos vagos, como “fazer”, “ter”, “dar” e “pôr”, que podem ser substituídos.",
  "Verifique se cada descrição contém detalhes relevantes para atmosfera, personagem ou conflito.",
  "Corte comparações que não acrescentem imagem, informação, humor ou interpretação à cena.",
  "Use a primeira pessoa para limitar informação e aproximar o leitor da experiência subjetiva.",
  "Use a terceira pessoa limitada para manter proximidade sem prender toda a narração ao “eu”.",
  "Escolha o narrador considerando quanto suspense, intimidade e confiabilidade a história precisa.",
  "Não misture vozes narrativas no mesmo parágrafo sem sinalizar claramente a mudança.",
  "Use discurso indireto livre para aproximar a narração dos pensamentos sem introduzir cada frase com “pensou”.",
  "Diferencie pensamento, fala e narração por contexto, pontuação e escolha de registro.",
  "Revise cada diálogo perguntando se ele produz ação, revela caráter ou transforma uma relação.",
  "Elimine saudações, explicações e informações que os personagens já conhecem quando servirem apenas ao leitor.",
  "Leia o romance como leitor: marque trechos confusos, previsíveis ou artificiais e reescreva-os com objetivo definido."
];

// Fila de índices não exibidos para garantir sorteio sem repetição
let availableTipIndices = [];
let currentTip = "";
let shownCount = 0;

function renderTipsView() {
  return `
    <article class="theory-article">
      <h1>Dicas de Escrita e Arquitetura Narrativa</h1>
      <p>Consulte 200 cartões com diretrizes práticas. Cada clique sorteia uma dica totalmente aleatória sem repetição até que todas as 200 sejam visualizadas.</p>

      <div class="flashcard-container">
        <div class="flashcard-header">
          <span class="flashcard-counter" id="tip-counter">Exibindo Dicas</span>
          <button class="copy-btn" id="copy-tip-btn" title="Copiar Dica" aria-label="Copiar Dica">
            🖐️ <span id="copy-text">Copiar Dica</span>
          </button>
        </div>

        <div class="flashcard-body">
          <p id="tip-text" class="flashcard-content"></p>
        </div>

        <div class="flashcard-controls" style="justify-content: center;">
          <button class="card-ctrl-btn random-btn" id="next-random-tip-btn" title="Exibir Próxima Dica Aleatória">
            🎲 Próxima Dica Aleatória
          </button>
        </div>
      </div>
    </article>
  `;
}

function initTipsEvents() {
  const tipText = document.getElementById('tip-text');
  const tipCounter = document.getElementById('tip-counter');
  const copyBtn = document.getElementById('copy-tip-btn');
  const copyText = document.getElementById('copy-text');
  const nextRandomBtn = document.getElementById('next-random-tip-btn');

  if (!tipText) return;

  // Inicializa ou reinicia a pilha de sorteio sem repetição
  function resetAvailableIndices() {
    availableTipIndices = Array.from({ length: tipsData.length }, (_, i) => i);
    shownCount = 0;
  }

  function getNextRandomTip() {
    if (availableTipIndices.length === 0) {
      resetAvailableIndices();
    }

    const randomIndexPosition = Math.floor(Math.random() * availableTipIndices.length);
    const selectedIndex = availableTipIndices.splice(randomIndexPosition, 1)[0];
    
    shownCount++;
    currentTip = tipsData[selectedIndex];

    tipText.innerText = currentTip;
    tipCounter.innerText = `Dica ${shownCount} de ${tipsData.length} (Sorteio Aleatório)`;
    if (copyText) copyText.innerText = 'Copiar Dica';
  }

  // Primeiro sorteio se a lista estiver vazia
  if (availableTipIndices.length === 0) {
    resetAvailableIndices();
  }
  getNextRandomTip();

  nextRandomBtn.addEventListener('click', () => {
    getNextRandomTip();
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(currentTip).then(() => {
      if (copyText) copyText.innerText = 'Copiado!';
      setTimeout(() => {
        if (copyText) copyText.innerText = 'Copiar Dica';
      }, 2000);
    }).catch(err => {
      console.error('Erro ao copiar dica: ', err);
    });
  });
}
