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
        <button type="button" class="remover-curso">Remover</button>
    `;
    container.appendChild(novoCurso);
});

document.getElementById('cursos-container').addEventListener('click', function(e) {
    if (e.target.classList.contains('remover-curso')) {
        e.target.parentElement.remove();
    }
});


document.getElementById('adicionar-experiencia').addEventListener('click', function() {
    const container = document.getElementById('experiencia-container');
    const novaExperiencia = document.createElement('div');
    novaExperiencia.className = 'experiencia-item';
    novaExperiencia.innerHTML = `
        <input type="text" class="cargo" placeholder="Cargo/Nome do Projeto" required>
        <input type="text" class="empresa" placeholder="Empresa/Tecnologias Utilizadas" required>
        <input type="text" class="periodo" placeholder="Período" required>
        <textarea class="realizacoes" placeholder="Digite cada realização/descrição em uma nova linha" required></textarea>
        <button type="button" class="remover-experiencia">Remover</button>
    `;
    container.appendChild(novaExperiencia);
});

document.getElementById('experiencia-container').addEventListener('click', function(e) {
    if (e.target.classList.contains('remover-experiencia')) {
        e.target.parentElement.remove();
    }
});


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

    const html = `
        <div class="header" style="text-align: center; margin-bottom: 20px;">
            <h1 style="text-transform: uppercase; margin-bottom: 10px;">${dados.nome}</h1>
            <p style="margin-bottom: 15px;">${dados.localizacao} | ${dados.email} | ${dados.whatsapp} | ${dados.linkedin}</p>
        </div>

        <div class="section" style="margin-bottom: 15px;">
            <strong>OBJETIVO:</strong> ${dados.objetivo}
        </div>

        <div class="keywords" style="background-color: #f5f5f5; padding: 10px; margin-bottom: 20px; text-align: center;">
            ${dados.palavrasChave.map(palavra => `<span style="font-weight: bold;">${palavra.toUpperCase()}</span>`).join(' | ')}
        </div>

        <div class="section" style="margin-bottom: 20px;">
            <div class="section-title" style="font-weight: bold; margin-bottom: 10px;">RESUMO</div>
            <p>${dados.resumo}</p>
        </div>

        <div class="section" style="margin-bottom: 20px;">
            <div class="section-title" style="font-weight: bold; margin-bottom: 10px;">EXPERTISE</div>
            <ul style="margin-left: 20px;">
                ${dados.expertise.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        ${dados.linguagens.length > 0 ? `
        <div class="section" style="margin-bottom: 20px;">
            <div class="section-title" style="font-weight: bold; margin-bottom: 10px;">LINGUAGENS E TECNOLOGIAS</div>
            <ul style="margin-left: 20px;">
                ${dados.linguagens.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        <div class="section" style="margin-bottom: 20px;">
            <div class="section-title" style="font-weight: bold; margin-bottom: 10px;">${tipoExperienciaTitle}</div>
            ${dados.experiencias.map(exp => `
                <div style="margin-bottom: 15px;">
                    <p style="font-weight: bold;">${exp.cargo} | ${exp.empresa} - ${exp.periodo}</p>
                    <ul style="margin-left: 20px;">
                        ${exp.realizacoes.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>

        <div class="section" style="margin-bottom: 20px;">
            <div class="section-title" style="font-weight: bold; margin-bottom: 10px;">EDUCAÇÃO</div>
            <p><strong>${dados.formacao.curso}</strong> | ${dados.formacao.instituicao} | ${dados.formacao.ano}</p>
        </div>

        ${dados.cursos.length > 0 ? `
        <div class="section" style="margin-bottom: 20px;">
            <div class="section-title" style="font-weight: bold; margin-bottom: 10px;">CURSOS E CERTIFICAÇÕES</div>
            ${dados.cursos.map(curso => `
                <p><strong>${curso.nome}</strong> | ${curso.instituicao} | ${curso.ano}</p>
            `).join('')}
        </div>
        ` : ''}
    `;

    document.getElementById('curriculo').innerHTML = html;
    return html;
}


function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const dados = coletarDados();

    
    const margemEsquerda = 20;
    const larguraUtil = 170;
    const espacoEntreLinhas = 7;
    let posicaoAtual = 20;

    
    const adicionarTexto = (texto, fonte = 12, estilo = 'normal', cor = '#000000') => {
        if (!texto) return;
        doc.setFontSize(fonte);
        doc.setFont('helvetica', estilo);
        doc.setTextColor(cor);
        const linhas = doc.splitTextToSize(texto, larguraUtil);
        doc.text(linhas, margemEsquerda, posicaoAtual);
        posicaoAtual += (linhas.length * espacoEntreLinhas);
    };

    const adicionarTextoCenter = (texto, fonte = 12, estilo = 'normal') => {
        if (!texto) return;
        doc.setFontSize(fonte);
        doc.setFont('helvetica', estilo);
        const textWidth = doc.getTextWidth(texto);
        const x = (doc.internal.pageSize.width - textWidth) / 2;
        doc.text(texto, x, posicaoAtual);
        posicaoAtual += espacoEntreLinhas;
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

    verificarPaginacao(20);
    adicionarBackground(posicaoAtual - 4, 12);
    const palavrasChaveText = dados.palavrasChave.join(' | ').toUpperCase();
    adicionarTextoCenter(palavrasChaveText, 10, 'bold');
    posicaoAtual += 10;

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

    const nomeArquivo = `curriculo-${dados.nome.toLowerCase().replace(/\s+/g, '-')}.pdf`;
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

        
        document.getElementById('adicionar-curso').click();
        document.getElementById('adicionar-experiencia').click();
    }

    
    window.addEventListener('load', function() {
        const actionsDiv = document.querySelector('.actions');

        
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

        
        document.getElementById('adicionar-curso').click();
        document.getElementById('adicionar-experiencia').click();
    });

    
    