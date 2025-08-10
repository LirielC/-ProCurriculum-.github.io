// Validadores de email, telefone
function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

function validarTelefone(telefone) {
    const regex = /^[0-9]{10,11}$/;
    return regex.test(telefone);
}

function formatarTelefone(telefone) {
    if (telefone.length === 11) {
        return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 7)}-${telefone.substring(7)}`;
    } else if (telefone.length === 10) {
        return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 6)}-${telefone.substring(6)}`;
    }
    return telefone;
}


document.getElementById('adicionar-curso').addEventListener('click', function() {
    const container = document.getElementById('cursos-container');
    const novoCurso = document.createElement('div');
    novoCurso.className = 'curso-item';
    novoCurso.innerHTML = `
        <input type="text" class="curso-nome" placeholder="Nome do Curso">
        <input type="text" class="curso-instituicao" placeholder="Instituição">
        <input type="text" class="curso-ano" placeholder="Ano">
        <div class="curso-actions">
            <button type="button" class="btn-icon remover-curso" title="Remover" aria-label="Remover"><i class="fas fa-trash"></i></button>
            <button type="button" class="btn-icon mover-cima" title="Subir" aria-label="Subir"><i class="fas fa-arrow-up"></i></button>
            <button type="button" class="btn-icon mover-baixo" title="Descer" aria-label="Descer"><i class="fas fa-arrow-down"></i></button>
        </div>
    `;
    container.appendChild(novoCurso);
    onDynamicChange();
});

document.getElementById('cursos-container').addEventListener('click', function(e) {
    if (e.target.classList.contains('remover-curso')) {
        e.target.parentElement.remove();
        onDynamicChange();
    }
    if (e.target.classList.contains('mover-cima')) {
        const item = e.target.closest('.curso-item');
        if (item && item.previousElementSibling) {
            item.parentElement.insertBefore(item, item.previousElementSibling);
            onDynamicChange();
        }
    }
    if (e.target.classList.contains('mover-baixo')) {
        const item = e.target.closest('.curso-item');
        if (item && item.nextElementSibling) {
            item.parentElement.insertBefore(item.nextElementSibling, item);
            onDynamicChange();
        }
    }
});

// Atualiza preview ao digitar nos campos dinâmicos
document.getElementById('cursos-container').addEventListener('input', function(e) {
    if (e.target.matches('input, textarea')) {
        onDynamicChange();
    }
});


document.getElementById('adicionar-experiencia').addEventListener('click', function() {
    const container = document.getElementById('experiencia-container');
    const novaExperiencia = document.createElement('div');
    novaExperiencia.className = 'experiencia-item';
    novaExperiencia.innerHTML = `
        <input type="text" class="cargo" placeholder="Cargo/Nome do Projeto">
        <input type="text" class="empresa" placeholder="Empresa/Tecnologias Utilizadas">
        <input type="text" class="periodo" placeholder="Período">
        <textarea class="realizacoes" placeholder="Digite cada realização/descrição em uma nova linha"></textarea>
        <div class="experiencia-actions">
            <button type="button" class="btn-icon remover-experiencia" title="Remover" aria-label="Remover"><i class="fas fa-trash"></i></button>
            <button type="button" class="btn-icon mover-cima" title="Subir" aria-label="Subir"><i class="fas fa-arrow-up"></i></button>
            <button type="button" class="btn-icon mover-baixo" title="Descer" aria-label="Descer"><i class="fas fa-arrow-down"></i></button>
        </div>
    `;
    container.appendChild(novaExperiencia);
    onDynamicChange();
});

document.getElementById('experiencia-container').addEventListener('click', function(e) {
    if (e.target.classList.contains('remover-experiencia')) {
        e.target.parentElement.remove();
        onDynamicChange();
    }
    if (e.target.classList.contains('mover-cima')) {
        const item = e.target.closest('.experiencia-item');
        if (item && item.previousElementSibling) {
            item.parentElement.insertBefore(item, item.previousElementSibling);
            onDynamicChange();
        }
    }
    if (e.target.classList.contains('mover-baixo')) {
        const item = e.target.closest('.experiencia-item');
        if (item && item.nextElementSibling) {
            item.parentElement.insertBefore(item.nextElementSibling, item);
            onDynamicChange();
        }
    }
});

document.getElementById('experiencia-container').addEventListener('input', function(e) {
    if (e.target.matches('input, textarea')) {
        onDynamicChange();
    }
});

// Função utilitária para sincronizar preview e rascunho
function onDynamicChange() {
    try {
        const dados = coletarDados();
        salvarLocal(dados);
        gerarCurriculo(dados);
    } catch (_) { /* noop */ }
}


function coletarDados() {
    const cursosItems = document.querySelectorAll('.curso-item');
    const cursos = Array.from(cursosItems).map(item => ({
        nome: item.querySelector('.curso-nome').value,
        instituicao: item.querySelector('.curso-instituicao').value,
        ano: item.querySelector('.curso-ano').value
    })).filter(curso => curso.nome && curso.instituicao);

    const experienciaItems = document.querySelectorAll('.experiencia-item');
    const experiencias = Array.from(experienciaItems).map(item => ({
        cargo: item.querySelector('.cargo').value,
        empresa: item.querySelector('.empresa').value,
        periodo: item.querySelector('.periodo').value,
        realizacoes: item.querySelector('.realizacoes').value.split('\n').filter(r => r.trim())
    })).filter(exp => exp.cargo && exp.empresa);

    return {
        nome: document.getElementById('nome').value,
        localizacao: document.getElementById('localizacao').value,
        email: document.getElementById('email').value,
        whatsapp: formatarTelefone(document.getElementById('whatsapp').value.replace(/\D/g, '')),
        linkedin: document.getElementById('linkedin').value,
        objetivo: document.getElementById('objetivo').value,
        palavrasChave: document.getElementById('palavrasChave').value.split('|').map(item => item.trim()),
        resumo: document.getElementById('resumo').value,
        expertise: document.getElementById('expertise').value.split('\n').filter(item => item.trim()),
        linguagens: document.getElementById('linguagens').value.split('\n').filter(item => item.trim()),
        cursos: cursos,
        tipoExperiencia: document.getElementById('tipoExperiencia').value,
        modelo: (document.getElementById('modelo') ? document.getElementById('modelo').value : 'classico'),
        espacamento: (document.getElementById('espacamento') ? document.getElementById('espacamento').value : 'padrao'),
        experiencias: experiencias,
        formacao: {
            curso: document.getElementById('curso').value,
            instituicao: document.getElementById('instituicao').value,
            ano: document.getElementById('ano').value
        }
    };
}


function gerarCurriculo(dados) {
    const tipoExperienciaTitle = dados.tipoExperiencia === 'profissional' ? 
        'EXPERIÊNCIAS PROFISSIONAIS' : 
        'PROJETOS RELEVANTES';

    const isModerno = dados.modelo === 'moderno';
    const wrapperStart = isModerno ? '<div class="cv cv--moderno">' : '<div class="cv cv--classico">';
    const wrapperEnd = '</div>';

    const curriculoEl = document.getElementById('curriculo');
    const wasEmpty = !curriculoEl || curriculoEl.innerHTML.trim().length === 0;

    const html = `
        ${wrapperStart}
            <div class="header">
                <h1>${dados.nome?.toUpperCase() || ''}</h1>
                <p class="contacts">${[dados.localizacao, dados.email, dados.whatsapp, dados.linkedin].filter(Boolean).join(' | ')}</p>
            </div>

            <div class="section">
                <div class="section-title">OBJETIVO</div>
                <p>${dados.objetivo || ''}</p>
            </div>

            <div class="keywords">
                ${dados.palavrasChave.map(palavra => `<span>${String(palavra || '').toUpperCase()}</span>`).join(' | ')}
            </div>

            <div class="section">
                <div class="section-title">RESUMO</div>
                <p>${dados.resumo || ''}</p>
            </div>

            <div class="section">
                <div class="section-title">EXPERTISE</div>
                <ul>
                    ${dados.expertise.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>

            ${dados.linguagens.length > 0 ? `
            <div class="section">
                <div class="section-title">LINGUAGENS E TECNOLOGIAS</div>
                <ul>
                    ${dados.linguagens.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>` : ''}

            <div class="section">
                <div class="section-title">${tipoExperienciaTitle}</div>
                ${dados.experiencias.map(exp => `
                    <div class="xp">
                        <p class="xp-title">${exp.cargo} | ${exp.empresa} - ${exp.periodo}</p>
                        <ul>
                            ${exp.realizacoes.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <div class="section-title">EDUCAÇÃO</div>
                <p><strong>${dados.formacao.curso}</strong> | ${dados.formacao.instituicao} | ${dados.formacao.ano}</p>
            </div>

            ${dados.cursos.length > 0 ? `
            <div class="section">
                <div class="section-title">CURSOS E CERTIFICAÇÕES</div>
                ${dados.cursos.map(curso => `
                    <p><strong>${curso.nome}</strong> | ${curso.instituicao} | ${curso.ano}</p>
                `).join('')}
            </div>` : ''}
        ${wrapperEnd}
    `;

    document.getElementById('curriculo').innerHTML = html;

    // Se for primeira geração em telas pequenas, rola o preview para o topo
    if (window.innerWidth <= 1024) {
        const pc = document.querySelector('.preview-container');
        if (pc) pc.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    return html;
}


function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    const dados = coletarDados();

    
    const margemEsquerda = 20;
    const larguraUtil = 170;
    const espacamentoSelecionado = dados.espacamento || 'padrao';
    const espacoEntreLinhas = espacamentoSelecionado === 'compacto' ? 6 : espacamentoSelecionado === 'espacado' ? 9 : 7;
    let posicaoAtual = 20;

    
    const adicionarTexto = (texto, fonte = 12, estilo = 'normal', cor = '#000000') => {
        if (!texto) return;
        doc.setFontSize(fonte);
        doc.setFont('helvetica', estilo);
        doc.setTextColor(cor);
        const linhas = doc.splitTextToSize(texto, larguraUtil);
        linhas.forEach((linha) => {
            verificarPaginacao();
            doc.text(linha, margemEsquerda, posicaoAtual);
            posicaoAtual += espacoEntreLinhas;
        });
    };

    const adicionarTextoCenter = (texto, fonte = 12, estilo = 'normal') => {
        if (!texto) return;
        doc.setFontSize(fonte);
        doc.setFont('helvetica', estilo);
        const linhas = doc.splitTextToSize(texto, larguraUtil);
        const centroX = doc.internal.pageSize.width / 2;
        linhas.forEach((linha) => {
            verificarPaginacao();
            doc.text(linha, centroX, posicaoAtual, { align: 'center' });
            posicaoAtual += espacoEntreLinhas;
        });
    };

    const adicionarSecao = (titulo, espacoAdicional = 2) => {
        verificarPaginacao(15);
        const alturaBackground = 8;
        adicionarBackground(posicaoAtual - 5, alturaBackground);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(titulo, margemEsquerda, posicaoAtual);
        posicaoAtual += espacoAdicional + espacoEntreLinhas;
    };

    const adicionarBackground = (y, altura) => {
        const width = doc.internal.pageSize.width - (margemEsquerda * 2);
        doc.setFillColor(245, 245, 245);
        doc.rect(margemEsquerda, y, width, altura, 'F');
    };

    const verificarPaginacao = (alturaNecessaria = espacoEntreLinhas) => {
        if (posicaoAtual + alturaNecessaria > doc.internal.pageSize.height - 20) {
            doc.addPage();
            posicaoAtual = 20;
            return true;
        }
        return false;
    };

   
    adicionarTextoCenter(dados.nome.toUpperCase(), 16, 'bold');
    adicionarTextoCenter(`${dados.localizacao} | ${dados.email} | ${dados.whatsapp} | ${dados.linkedin}`, 10);
    posicaoAtual += 5;

    adicionarSecao('OBJETIVO');
    adicionarTexto(dados.objetivo, 10);
    posicaoAtual += 5;

    const palavrasChaveText = dados.palavrasChave.join(' | ').toUpperCase();
    const linhasKeywords = doc.splitTextToSize(palavrasChaveText, larguraUtil);
    verificarPaginacao(linhasKeywords.length * espacoEntreLinhas + 10);
    adicionarBackground(posicaoAtual - 4, (linhasKeywords.length * espacoEntreLinhas) + 4);
    adicionarTextoCenter(palavrasChaveText, 10, 'bold');
    posicaoAtual += 5;

    adicionarSecao('RESUMO');
    adicionarTexto(dados.resumo, 10);
    posicaoAtual += 5;

    adicionarSecao('EXPERTISE');
    dados.expertise.forEach(item => {
        verificarPaginacao();
        adicionarTexto(`• ${item}`, 10);
    });
    posicaoAtual += 5;

    if (dados.linguagens.length > 0) {
        adicionarSecao('LINGUAGENS E TECNOLOGIAS');
        dados.linguagens.forEach(item => {
            verificarPaginacao();
            adicionarTexto(`• ${item}`, 10);
        });
        posicaoAtual += 5;
    }

    const tipoExperienciaTitle = dados.tipoExperiencia === 'profissional' ? 
        'EXPERIÊNCIAS PROFISSIONAIS' : 
        'PROJETOS RELEVANTES';

    adicionarSecao(tipoExperienciaTitle);
    dados.experiencias.forEach(exp => {
        verificarPaginacao();
        adicionarTexto(`${exp.cargo} | ${exp.empresa}`, 10, 'bold');
        adicionarTexto(`Período: ${exp.periodo}`, 10);
        exp.realizacoes.forEach(item => {
            verificarPaginacao();
            adicionarTexto(`• ${item}`, 10);
        });
        posicaoAtual += 5;
    });

    adicionarSecao('EDUCAÇÃO');
    adicionarTexto(`${dados.formacao.curso}`, 10, 'bold');
    adicionarTexto(`${dados.formacao.instituicao} | ${dados.formacao.ano}`, 10);

    if (dados.cursos.length > 0) {
        adicionarSecao('CURSOS E CERTIFICAÇÕES');
        dados.cursos.forEach(curso => {
            verificarPaginacao();
            adicionarTexto(`${curso.nome}`, 10, 'bold');
            adicionarTexto(`${curso.instituicao} | ${curso.ano}`, 10);
        });
    }

    const nomeArquivo = `curriculo-${(dados.nome || 'meu').toLowerCase().replace(/\s+/g, '-')}.pdf`;
    doc.save(nomeArquivo);
}


document.getElementById('curriculoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    
    const email = document.getElementById('email').value;
    if (!validarEmail(email)) {
        alert('Por favor, insira um email válido');
        return;
    }

    
    const telefone = document.getElementById('whatsapp').value.replace(/\D/g, '');
    if (!validarTelefone(telefone)) {
        alert('Por favor, insira um número de telefone válido (10 ou 11 dígitos)');
        return;
    }
    const dados = coletarDados();
        gerarCurriculo(dados);
        salvarLocal(dados);

        
        let botaoPDF = document.getElementById('gerarPDF');
        if (!botaoPDF) {
            botaoPDF = document.createElement('button');
            botaoPDF.id = 'gerarPDF';
            botaoPDF.type = 'button';
            botaoPDF.className = 'btn btn-primary';
            botaoPDF.textContent = 'Baixar PDF';
            botaoPDF.onclick = gerarPDF;
            document.querySelector('.actions').appendChild(botaoPDF);
        }
    });

   
    document.getElementById('tipoExperiencia').addEventListener('change', function(e) {
        const isProfissional = e.target.value === 'profissional';
        const cargoInputs = document.querySelectorAll('.cargo');
        const empresaInputs = document.querySelectorAll('.empresa');
        const realizacoesInputs = document.querySelectorAll('.realizacoes');

        cargoInputs.forEach(input => {
            input.placeholder = isProfissional ? 'Cargo' : 'Nome do Projeto';
        });

        empresaInputs.forEach(input => {
            input.placeholder = isProfissional ? 'Empresa' : 'Tecnologias Utilizadas';
        });

        realizacoesInputs.forEach(input => {
            input.placeholder = isProfissional ? 
                'Digite cada realização em uma nova linha' : 
                'Digite cada descrição/funcionalidade em uma nova linha';
        });
    });

    
    document.getElementById('whatsapp').addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length > 11) {
            valor = valor.slice(0, 11);
        }
        if (valor.length >= 2) {
            valor = `(${valor.slice(0,2)}) ${valor.slice(2)}`;
        }
        if (valor.length >= 10) {
            valor = `${valor.slice(0,9)}-${valor.slice(9)}`;
        }
        e.target.value = valor;
    });

    
    function limparFormulario() {
        document.getElementById('curriculoForm').reset();
        document.getElementById('cursos-container').innerHTML = '';
        document.getElementById('experiencia-container').innerHTML = '';
        document.getElementById('curriculo').innerHTML = '';

        
    // Inicializa com um bloco de projeto/experiência opcional
    document.getElementById('adicionar-experiencia').click();
    }

    
    window.addEventListener('load', function() {
        const actionsDiv = document.querySelector('.actions');
        // Garante preview acima no mobile: move o nó para o topo do container, se necessário
        const container = document.querySelector('.container');
        const preview = document.getElementById('previewContainer');
        const form = document.getElementById('formContainer');
        if (container && preview && form) {
            if (window.innerWidth <= 1024 && container.firstElementChild !== preview) {
                container.insertBefore(preview, container.firstElementChild);
            }
        }

        
        const limparBtn = document.createElement('button');
        limparBtn.type = 'button';
        limparBtn.className = 'btn btn-clear';
        limparBtn.textContent = 'Limpar Formulário';
        limparBtn.onclick = limparFormulario;
        actionsDiv.appendChild(limparBtn);

        
        const pdfBtn = document.createElement('button');
        pdfBtn.id = 'gerarPDF';
        pdfBtn.type = 'button';
        pdfBtn.className = 'btn btn-primary';
        pdfBtn.textContent = 'Baixar PDF';
        pdfBtn.onclick = gerarPDF;
        actionsDiv.appendChild(pdfBtn);

        const imprimirBtn = document.createElement('button');
        imprimirBtn.type = 'button';
        imprimirBtn.className = 'btn btn-secondary';
        imprimirBtn.textContent = 'Imprimir';
        imprimirBtn.onclick = () => window.print();
        actionsDiv.appendChild(imprimirBtn);

        const exportarBtn = document.createElement('button');
        exportarBtn.type = 'button';
        exportarBtn.className = 'btn btn-secondary';
        exportarBtn.textContent = 'Exportar JSON';
        exportarBtn.onclick = exportarJSON;
        actionsDiv.appendChild(exportarBtn);

        const importarBtn = document.createElement('button');
        importarBtn.type = 'button';
        importarBtn.className = 'btn btn-secondary';
        importarBtn.textContent = 'Importar JSON';
        importarBtn.onclick = () => document.getElementById('importarArquivo').click();
        actionsDiv.appendChild(importarBtn);

        const docxBtn = document.createElement('button');
        docxBtn.type = 'button';
        docxBtn.className = 'btn btn-secondary';
        docxBtn.textContent = 'Baixar DOCX';
        docxBtn.onclick = gerarDOCX;
        actionsDiv.appendChild(docxBtn);

        
        document.getElementById('adicionar-curso').click();
        document.getElementById('adicionar-experiencia').click();

        const salvos = carregarLocal();
        if (salvos) {
            preencherFormulario(salvos);
            gerarCurriculo(coletarDados());
        }
    });

// Autosave localStorage
function salvarLocal(dados) {
    try { localStorage.setItem('procurriculum_draft', JSON.stringify(dados)); } catch (_) {}
}

function carregarLocal() {
    try {
        const raw = localStorage.getItem('procurriculum_draft');
        return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
}

function exportarJSON() {
    const dados = coletarDados();
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `procurriculum-${(dados.nome || 'dados')}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

document.getElementById('importarArquivo')?.addEventListener('change', function(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const dados = JSON.parse(String(reader.result || '{}'));
            preencherFormulario(dados);
            salvarLocal(coletarDados());
            gerarCurriculo(coletarDados());
        } catch (err) {
            alert('Arquivo inválido');
        }
    };
    reader.readAsText(file);
});

function preencherFormulario(d) {
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
    setVal('nome', d.nome);
    setVal('localizacao', d.localizacao);
    setVal('email', d.email);
    setVal('whatsapp', d.whatsapp);
    setVal('linkedin', d.linkedin);
    setVal('objetivo', d.objetivo);
    setVal('palavrasChave', (d.palavrasChave || []).join(' | '));
    setVal('resumo', d.resumo);
    setVal('expertise', (d.expertise || []).join('\n'));
    setVal('linguagens', (d.linguagens || []).join('\n'));
    setVal('tipoExperiencia', d.tipoExperiencia || 'profissional');
    const modeloSelect = document.getElementById('modelo');
    if (modeloSelect) modeloSelect.value = d.modelo || 'classico';

    document.getElementById('cursos-container').innerHTML = '';
    (d.cursos || []).forEach(curso => {
        document.getElementById('adicionar-curso').click();
        const item = document.querySelector('#cursos-container .curso-item:last-child');
        if (!item) return;
        item.querySelector('.curso-nome').value = curso.nome || '';
        item.querySelector('.curso-instituicao').value = curso.instituicao || '';
        item.querySelector('.curso-ano').value = curso.ano || '';
    });

    document.getElementById('experiencia-container').innerHTML = '';
    (d.experiencias || []).forEach(exp => {
        document.getElementById('adicionar-experiencia').click();
        const item = document.querySelector('#experiencia-container .experiencia-item:last-child');
        if (!item) return;
        item.querySelector('.cargo').value = exp.cargo || '';
        item.querySelector('.empresa').value = exp.empresa || '';
        item.querySelector('.periodo').value = exp.periodo || '';
        item.querySelector('.realizacoes').value = (exp.realizacoes || []).join('\n');
    });

    setVal('curso', d.formacao?.curso);
    setVal('instituicao', d.formacao?.instituicao);
    setVal('ano', d.formacao?.ano);
}

// Preview em tempo real e autosave em inputs
['nome','localizacao','email','whatsapp','linkedin','objetivo','palavrasChave','resumo','expertise','linguagens','curso','instituicao','ano','tipoExperiencia','modelo','espacamento']
  .forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => { const d = coletarDados(); salvarLocal(d); gerarCurriculo(d); });
    el.addEventListener('change', () => { const d = coletarDados(); salvarLocal(d); gerarCurriculo(d); });
});

// Exportação DOCX básica (ATS-friendly)
async function gerarDOCX() {
    const dados = coletarDados();
    const { Document, Packer, Paragraph, HeadingLevel, TextRun } = window.docx;

    const makeHeading = (text) => new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { after: 120 } });
    const makePara = (text) => new Paragraph({ children: [new TextRun({ text })], spacing: { after: 120 } });
    const makeBullet = (text) => new Paragraph({ text, bullet: { level: 0 }, spacing: { after: 60 } });

    const doc = new Document({ sections: [{ properties: {}, children: [
        new Paragraph({ text: (dados.nome || '').toUpperCase(), heading: HeadingLevel.TITLE, spacing: { after: 200 } }),
        makePara([dados.localizacao, dados.email, dados.whatsapp, dados.linkedin].filter(Boolean).join(' | ')),
        makeHeading('OBJETIVO'),
        makePara(dados.objetivo || ''),
        makeHeading('PALAVRAS-CHAVE'),
        makePara((dados.palavrasChave || []).map(k => String(k || '').toUpperCase()).join(' | ')),
        makeHeading('RESUMO'),
        makePara(dados.resumo || ''),
        makeHeading('EXPERTISE'),
        ...(dados.expertise || []).map(x => makeBullet(x)),
        ...(dados.linguagens && dados.linguagens.length ? [makeHeading('LINGUAGENS E TECNOLOGIAS'), ...dados.linguagens.map(l => makeBullet(l))] : []),
        makeHeading(dados.tipoExperiencia === 'profissional' ? 'EXPERIÊNCIAS PROFISSIONAIS' : 'PROJETOS RELEVANTES'),
        ...((dados.experiencias || []).flatMap(exp => [
            new Paragraph({ children: [ new TextRun({ text: `${exp.cargo} | ${exp.empresa} - ${exp.periodo}`, bold: true }) ], spacing: { after: 60 } }),
            ...(exp.realizacoes || []).map(r => makeBullet(r)),
        ])),
        makeHeading('EDUCAÇÃO'),
        makePara(`${dados.formacao?.curso || ''} | ${dados.formacao?.instituicao || ''} | ${dados.formacao?.ano || ''}`),
        ...(dados.cursos && dados.cursos.length ? [makeHeading('CURSOS E CERTIFICAÇÕES'), ...dados.cursos.map(c => makePara(`${c.nome || ''} | ${c.instituicao || ''} | ${c.ano || ''}`))] : []),
    ]}]});

    const blob = await Packer.toBlob(doc);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `curriculo-${(dados.nome || 'meu').toLowerCase().replace(/\s+/g, '-')}.docx`;
    a.click();
}