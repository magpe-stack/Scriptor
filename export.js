/**
 * Scriptor - Módulo de Exportação para Word (.doc / .docx)
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

  const htmlContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #111111; padding: 20px; }
        h1 { color: #257d0d; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #257d0d; padding-bottom: 8px; }
        p { font-size: 12pt; margin-bottom: 12px; text-align: justify; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      ${content}
    </body>
    </html>
  `;

  downloadDocxFile(htmlContent, title);
}

// 2. Exportar o livro inteiro (todas as cenas do rascunho em sequência)
function exportFullBookToDocx() {
  if (!projectState || !projectState.phase4 || projectState.phase4.length === 0) {
    alert('Não há cenas cadastradas no roteiro para exportar.');
    return;
  }

  let bookHtml = '';
  const scenes = projectState.phase4;
  const drafts = projectState.sceneDrafts || {};

  scenes.forEach((scene, index) => {
    const draft = drafts[scene.id] || {};
    const title = draft.title || scene.titulo || `Cena ${index + 1}`;
    const content = draft.content || '<p><i>[Cena sem conteúdo cadastrado.]</i></p>';

    bookHtml += `
      <div style="page-break-before: always; margin-top: 40px;">
        <h1>Capítulo / Cena ${index + 1}: ${title}</h1>
        ${content}
      </div>
      <hr style="border: none; border-top: 1px dashed #ccc; margin: 30px 0;" />
    `;
  });

  const fullHtmlContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>Rascunho Completo - Scriptor</title>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #111111; padding: 20px; }
        h1 { color: #257d0d; font-size: 22px; margin-bottom: 16px; }
        p { font-size: 12pt; margin-bottom: 12px; text-align: justify; }
      </style>
    </head>
    <body>
      <div style="text-align: center; margin-bottom: 50px;">
        <h1 style="font-size: 28px; color: #257d0d;">${projectState.title || 'Rascunho do Livro'}</h1>
        <p style="color: #666;">Gerado pelo Scriptor — Método Story Genius</p>
      </div>
      ${bookHtml}
    </body>
    </html>
  `;

  downloadDocxFile(fullHtmlContent, projectState.title || 'Livro_Completo_Scriptor');
}

// Função utilitária privada para disparar o download do arquivo
function downloadDocxFile(htmlString, baseFilename) {
  const blob = new Blob(['\ufeff' + htmlString], {
    type: 'application/msword'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  
  const safeFilename = baseFilename.replace(/[^a-zA-Z0-9à-úÀ-Ú\s-_]/g, '').trim() || 'documento_scriptor';
  a.download = `${safeFilename}.doc`;
  
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
