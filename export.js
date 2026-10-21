/**
 * Scriptor - Módulo de Exportação para Word (.docx Editável)
 */

// 1. Exportar a cena atual ativa no editor
function exportCurrentSceneToDocx() {
  if (!projectState || !projectState.currentWritingSceneId || !projectState.sceneDrafts) {
    alert('Nenhuma cena ativa encontrada para exportar.');
    return;
  }

  const activeId = projectState.currentWritingSceneId;
  const sceneDraft = projectState.sceneDrafts[activeId];
  const sceneObj = (projectState.phase4 || []).find(s => s.id === activeId);

  const title = sceneDraft && sceneDraft.title ? sceneDraft.title : (sceneObj ? sceneObj.titulo : 'Cena Sem Título');
  const content = sceneDraft && sceneDraft.content ? sceneDraft.content : '<p><i>[Nenhum conteúdo escrito nesta cena ainda.]</i></p>';

  const htmlContent = buildWordDocumentHtml(title, `<h1>${title}</h1>${content}`);
  downloadDocxFile(htmlContent, title);
}

// 2. Exportar o livro inteiro (todas as cenas do rascunho em sequência)
function exportFullBookToDocx() {
  if (!projectState || !projectState.phase4 || projectState.phase4.length === 0) {
    alert('Não há cenas cadastradas no roteiro para exportar.');
    return;
  }

  let bookHtml = `
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="font-size: 28pt; color: #257d0d; margin-bottom: 8px;">${projectState.title || 'Rascunho do Livro'}</h1>
      <p style="font-size: 11pt; color: #555555;">Gerado pelo Scriptor — Método Story Genius</p>
    </div>
  `;

  const scenes = projectState.phase4;
  const drafts = projectState.sceneDrafts || {};

  scenes.forEach((scene, index) => {
    const draft = drafts[scene.id] || {};
    const title = draft.title || scene.titulo || `Cena ${index + 1}`;
    const content = draft.content || '<p><i>[Cena sem conteúdo cadastrado.]</i></p>';

    bookHtml += `
      <div style="page-break-before: always; margin-top: 30px;">
        <h2 style="font-size: 18pt; color: #257d0d; border-bottom: 1px solid #257d0d; padding-bottom: 6px; margin-bottom: 16px;">
          Capítulo / Cena ${index + 1}: ${title}
        </h2>
        ${content}
      </div>
    `;
  });

  const fullHtmlContent = buildWordDocumentHtml(projectState.title || 'Livro Completo', bookHtml);
  downloadDocxFile(fullHtmlContent, projectState.title || 'Livro_Completo_Scriptor');
}

// Constrói o HTML estruturado com namespaces do Microsoft Office Word
function buildWordDocumentHtml(title, bodyContent) {
  return `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${title}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page {
          size: A4;
          margin: 2.5cm 2.5cm 2.5cm 2.5cm;
        }
        body {
          font-family: 'Calibri', 'Arial', sans-serif;
          font-size: 12pt;
          line-height: 1.5;
          color: #000000;
        }
        p {
          margin-bottom: 10pt;
          text-align: justify;
        }
        h1, h2, h3 {
          font-family: 'Calibri', 'Arial', sans-serif;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      ${bodyContent}
    </body>
    </html>
  `;
}

// Dispara o download com a extensão .docx e MIME correto para edição imediata
function downloadDocxFile(htmlString, baseFilename) {
  const blob = new Blob(['\ufeff' + htmlString], {
    type: 'application/vnd.ms-word;charset=utf-8'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  
  const safeFilename = baseFilename.replace(/[^a-zA-Z0-9à-úÀ-Ú\s-_]/g, '').trim() || 'documento_scriptor';
  a.download = `${safeFilename}.docx`;
  
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
