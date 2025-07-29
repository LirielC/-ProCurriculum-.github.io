# 📄 ProCurriculum - Gerador de Currículos Profissionais

[![GitHub](https://img.shields.io/badge/GitHub-LirielC-blue?style=flat&logo=github)](https://github.com/LirielC)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

## 🎯 Sobre o Projeto

O **ProCurriculum** é uma aplicação web moderna e intuitiva para criação de currículos profissionais. Desenvolvido com tecnologias web padrão, oferece uma experiência completa desde o preenchimento dos dados até o download do currículo em PDF.

## ✨ Funcionalidades Principais

### 🏠 **Página Inicial (Landing Page)**
- **Design Responsivo**: Interface moderna e adaptável a diferentes dispositivos
- **Navegação Intuitiva**: Menu de navegação com scroll suave
- **Seção Hero**: Apresentação clara do produto com call-to-action
- **Benefícios**: Destaque das principais vantagens do sistema
- **Como Funciona**: Explicação passo a passo do processo
- **Menu Mobile**: Navegação otimizada para dispositivos móveis

### 📝 **Gerador de Currículo**
- **Formulário Completo**: Campos para todas as informações profissionais
- **Validação em Tempo Real**: Verificação de email e telefone
- **Campos Dinâmicos**: Adição/remoção de cursos e experiências
- **Dois Tipos de Experiência**: Profissional ou Projetos Relevantes
- **Preview em Tempo Real**: Visualização instantânea do currículo

### 📊 **Seções do Currículo**
- **Informações Pessoais**: Nome, localização, contatos
- **Objetivo Profissional**: Declaração de objetivos
- **Palavras-chave**: Destaque de competências principais
- **Resumo Profissional**: Descrição das qualificações
- **Expertise**: Lista de habilidades e competências
- **Linguagens e Tecnologias**: Stack técnico (opcional)
- **Experiência Profissional/Projetos**: Histórico detalhado
- **Formação Acadêmica**: Educação formal
- **Cursos e Certificações**: Formação complementar

### 💾 **Exportação e Download**
- **Geração de PDF**: Exportação em formato profissional
- **Formatação Automática**: Layout otimizado para impressão
- **Nomeação Inteligente**: Arquivo nomeado com o nome do candidato
- **Paginação Automática**: Quebra de página quando necessário

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização moderna com variáveis CSS e Flexbox
- **JavaScript (ES6+)**: Funcionalidades interativas e validações
- **Font Awesome**: Ícones profissionais
- **jsPDF**: Biblioteca para geração de PDFs

### **Design System**
- **Cores**: Paleta profissional com azul como cor principal
- **Tipografia**: Sistema de fontes moderno (Inter, system-ui)
- **Responsividade**: Design mobile-first
- **Animações**: Transições suaves e feedback visual

## 🚀 Como Usar

### **1. Acesso ao Sistema**
- Acesse a página inicial: `index.html`
- Clique em "CRIAR CURRÍCULO" para acessar o gerador

### **2. Preenchimento dos Dados**
- **Informações Básicas**: Nome, localização, email, WhatsApp, LinkedIn
- **Objetivo**: Descreva sua meta profissional
- **Palavras-chave**: Separe competências com "|"
- **Resumo**: Apresentação profissional
- **Expertise**: Uma habilidade por linha
- **Tecnologias**: Stack técnico (opcional)

### **3. Experiência e Formação**
- **Tipo de Experiência**: Escolha entre profissional ou projetos
- **Adicionar Experiências**: Use o botão para adicionar múltiplas
- **Formação**: Curso, instituição e ano
- **Cursos**: Adicione certificações complementares

### **4. Visualização e Download**
- Clique em "Visualizar Currículo" para preview
- Use "Baixar PDF" para exportar o arquivo
- "Limpar Formulário" para recomeçar

## 📱 Responsividade

O sistema é totalmente responsivo e funciona perfeitamente em:
- **Desktop**: Layout completo com preview lado a lado
- **Tablet**: Layout adaptado com navegação otimizada
- **Mobile**: Interface mobile-first com menu hambúrguer

## 🔧 Funcionalidades Técnicas

### **Validações**
- **Email**: Formato válido obrigatório
- **Telefone**: Formatação automática (XX) XXXXX-XXXX
- **Campos Obrigatórios**: Validação antes da geração

### **Formatação Automática**
- **Telefone**: Formatação em tempo real
- **Palavras-chave**: Separação automática por "|"
- **Listas**: Quebra de linha para expertise e tecnologias

### **Geração de PDF**
- **Layout Profissional**: Formatação otimizada
- **Paginação**: Quebra automática de páginas
- **Estilos**: Cores e tipografia consistentes
- **Nome do Arquivo**: Baseado no nome do candidato

## 📁 Estrutura do Projeto

```
-ProCurriculum-.github.io/
├── index.html          # Página inicial/landing page
├── gerador.html        # Gerador de currículo
├── script.js           # Lógica JavaScript principal
├── styles.css          # Estilos da landing page
├── gerador.css         # Estilos do gerador
└── README.md           # Documentação do projeto
```

## 🎨 Design e UX

### **Princípios de Design**
- **Simplicidade**: Interface limpa e intuitiva
- **Profissionalismo**: Visual adequado para currículos
- **Acessibilidade**: Navegação por teclado e leitores de tela
- **Feedback Visual**: Estados hover e focus bem definidos

### **Paleta de Cores**
- **Primária**: #2563eb (Azul profissional)
- **Secundária**: #f43f5e (Rosa para destaque)
- **Acento**: #0ea5e9 (Azul claro)
- **Fundo**: #f8fafc (Cinza claro)
- **Texto**: #0f172a (Preto suave)

## 🔄 Fluxo de Uso

1. **Acesso** → Página inicial com apresentação
2. **Navegação** → Menu intuitivo e responsivo
3. **Preenchimento** → Formulário com validações
4. **Preview** → Visualização em tempo real
5. **Download** → Exportação em PDF
6. **Reutilização** → Limpeza do formulário

## 🌟 Diferenciais

- **Gratuito**: Sem custos ou limitações
- **Offline**: Funciona sem conexão após carregamento
- **Rápido**: Geração instantânea de currículos
- **Profissional**: Layout adequado para processos seletivos
- **Flexível**: Suporte a diferentes tipos de experiência
- **Moderno**: Interface atual e responsiva

## 👨‍💻 Desenvolvimento

### **Autor**
- **GitHub**: [LirielC](https://github.com/LirielC)

### **Tecnologias**
- HTML5, CSS3, JavaScript puro
- jsPDF para geração de PDFs
- Font Awesome para ícones
- Design responsivo e acessível

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

**ProCurriculum** - Transformando a criação de currículos em uma experiência simples e profissional! 
