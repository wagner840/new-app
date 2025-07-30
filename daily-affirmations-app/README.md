# 🌟 Daily Affirmations SPA

> **Transforme seu mindset, uma afirmação por vez**

Uma aplicação web moderna e responsiva que oferece afirmações diárias positivas para promover bem-estar mental e crescimento pessoal. Construída com foco em simplicidade, performance e monetização através do AdTerra.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Performance](https://img.shields.io/badge/Performance-90%2B-green)](https://web.dev/measure/)
[![Mobile Friendly](https://img.shields.io/badge/Mobile-Friendly-blue)](https://search.google.com/test/mobile-friendly)

## 📖 Sobre o Projeto

A Daily Affirmations SPA é uma Single Page Application (SPA) criada para ajudar pessoas a começarem o dia com energia positiva e mentalidade construtiva. Com mais de 340 afirmações cuidadosamente selecionadas, o app oferece uma experiência única e personalizável.

### ✨ Características Principais

- 🎯 **340+ Afirmações Únicas** - Distribuídas em 6 temas principais
- 📱 **100% Responsivo** - Design mobile-first otimizado para todos os dispositivos
- ⚡ **Performance Otimizada** - Carregamento em menos de 2 segundos
- 🎨 **Interface Moderna** - Design clean com animações suaves
- 🔄 **Algoritmo Anti-Repetição** - Fisher-Yates shuffle para máxima variedade
- 💰 **Monetização Integrada** - Pronto para AdTerra.com
- ♿ **Acessibilidade** - ARIA labels e navegação por teclado
- 🌙 **Suporte Dark Mode** - Adaptação automática ao tema do sistema

## 🎨 Preview

```
┌─────────────────────────────────┐
│      Daily Affirmations         │
│  Transform your mindset, one    │
│   affirmation at a time         │
│                                 │
│  ┌─────────────────────────────┐ │
│  │  "I am worthy of love and   │ │
│  │   respect exactly as I am"  │ │
│  └─────────────────────────────┘ │
│                                 │
│    [Get New Affirmation]        │
│                                 │
│   ✨ Embrace positivity ✨      │
└─────────────────────────────────┘
```

## 🗂️ Estrutura do Projeto

```
daily-affirmations-app/
├── index.html              # Página principal da aplicação
├── src/                    # Código fonte
│   ├── style.css          # Estilos responsivos com CSS moderno
│   ├── script.js          # Lógica da aplicação (ES6+)
│   └── affirmations.json  # Base de dados das afirmações
├── docs/                   # Documentação
│   ├── DEPLOYMENT-README.md
│   └── daily-affirmations-spa-prp.md
├── assets/                 # Recursos estáticos (futuro)
├── README.md              # Este arquivo
├── package.json           # Metadados do projeto
└── .gitignore            # Arquivos ignorados pelo Git
```

## 🚀 Início Rápido

### Pré-requisitos

- Navegador web moderno (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Servidor local para desenvolvimento (opcional)

### Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/daily-affirmations-app.git
   cd daily-affirmations-app
   ```

2. **Execute localmente:**
   ```bash
   # Usando Python
   python -m http.server 3000
   
   # Usando Node.js
   npx serve . -p 3000
   
   # Usando PHP
   php -S localhost:3000
   ```

3. **Abra no navegador:**
   ```
   http://localhost:3000
   ```

### Deploy Rápido

**Vercel (Recomendado):**
```bash
npm install -g vercel
vercel --prod
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir .
```

## 🎯 Funcionalidades Detalhadas

### 📚 Base de Afirmações

- **340+ afirmações únicas** cobrindo 6 temas principais:
  - 💕 **Amor próprio e aceitação**
  - 🏆 **Sucesso e conquistas**
  - 🙏 **Gratidão e mindfulness**
  - 😌 **Calma e paz interior**
  - ⚡ **Motivação e energia**
  - 🤝 **Relacionamentos e conexão**

### 🎲 Sistema de Randomização

- **Algoritmo Fisher-Yates** para distribuição uniforme
- **Anti-repetição inteligente** - evita afirmações recentes
- **Re-shuffle automático** quando 80% das afirmações foram exibidas

### 📱 Design Responsivo

- **Mobile-first approach** com breakpoints otimizados:
  - 📱 Mobile: até 480px
  - 📟 Tablet: 481px - 768px
  - 💻 Desktop: 769px - 1024px
  - 🖥️ Large Desktop: 1200px+

### ⚡ Performance

- **Tamanho total: 48.6KB** (meta: <50KB)
- **Zero dependências externas** para funcionalidade core
- **Lazy loading** para anúncios
- **Caching inteligente** da base de afirmações

## 💰 Monetização com AdTerra

O projeto está preparado para monetização imediata através do AdTerra.com:

### 🔧 Configuração Rápida

1. **Cadastre-se no AdTerra.com**
2. **Crie unidades de anúncio** (Banner 300x250, Popunder, Social Bar)
3. **Substitua o comentário em `index.html`** pelo código do anúncio
4. **Deploy e comece a ganhar!**

### 📊 Formatos Suportados

- **Banner Ads**: 728x90 (Leaderboard), 300x250 (Medium Rectangle)
- **Popunder**: Alta receita, menos intrusivo
- **Social Bar**: Anúncio flutuante estilo social
- **In-Page Push**: Estilo notificação do navegador

### 💡 Estratégias de Otimização

- **Posicionamento A/B testing** para máxima receita
- **UX-first approach** - experiência do usuário em primeiro lugar
- **Mobile optimization** - 60%+ do tráfego é mobile
- **Analytics integration** para tracking de performance

## 🛠️ Desenvolvimento

### 🏗️ Arquitetura Técnica

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Padrão**: Single Page Application (SPA)
- **Armazenamento**: JSON estático (sem banco de dados)
- **Hosting**: Vercel, Netlify, GitHub Pages compatível

### 🧩 Estrutura do Código

```javascript
// Classe principal da aplicação
class DailyAffirmationsApp {
    constructor()           // Inicialização
    loadAffirmations()     // Carrega dados JSON
    shuffleAffirmations()  // Fisher-Yates shuffle
    getRandomAffirmation() // Seleção inteligente
    displayAffirmation()   // Renderização com animações
    bindEvents()           // Event listeners
}
```

### 🎨 CSS Moderno

- **CSS Custom Properties** para temas consistentes
- **Flexbox** para layouts robustos
- **Clamp()** para tipografia fluída
- **Media queries** para responsividade
- **Animations** com requestAnimationFrame

### 🔍 Validação e Testes

```bash
# Validação de sintaxe
node -c src/script.js
node -e "JSON.parse(require('fs').readFileSync('src/affirmations.json'))"

# Teste de performance
lighthouse http://localhost:3000 --output html

# Validação HTML
html-validate index.html
```

## 🎨 Personalização

### 🌈 Alterando Cores

Edite as variáveis CSS em `src/style.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --accent-color: #667eea;
    --background-main: #f7fafc;
    /* ... mais variáveis */
}
```

### 📝 Adicionando Afirmações

Edite `src/affirmations.json`:

```json
{
  "affirmations": [
    "Sua nova afirmação aqui",
    "Outra afirmação inspiradora"
  ]
}
```

### ⚙️ Configurações da Aplicação

Edite `src/script.js`:

```javascript
this.config = {
    jsonPath: './src/affirmations.json',
    fadeTransitionDuration: 300,
    loadingText: 'Carregando sua afirmação...',
    // ... mais configurações
};
```

## 🔄 Template para Outros Projetos

Este projeto serve como template para apps similares:

### 🎯 Variações Possíveis

1. **Daily Quotes App** - Substitua afirmações por citações
2. **Productivity Tips** - Dicas de produtividade
3. **Random Facts** - Fatos interessantes
4. **Meditation Prompts** - Prompts de meditação
5. **Study Motivations** - Motivações para estudos

### 🔧 Processo de Replicação

1. **Fork este repositório**
2. **Substitua `affirmations.json`** pelo seu conteúdo
3. **Atualize branding** em `index.html` e `style.css`
4. **Modifique esquema de cores** no CSS
5. **Deploy usando o mesmo workflow**

## 📊 Métricas e Analytics

### 🎯 KPIs Recomendados

- **Performance Score**: >90 (Lighthouse)
- **Tempo de Carregamento**: <2 segundos
- **Taxa de Rejeição**: <40%
- **Sessões por Usuário**: >2
- **Revenue por 1000 Visualizações**: Varia por região

### 📈 Google Analytics Setup

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🛡️ Segurança e Privacidade

### 🔒 Recursos de Segurança

- **Sem coleta de dados pessoais** - GDPR friendly por design
- **Sem cookies de tracking** - apenas sessionStorage local
- **CSP headers** recomendados para produção
- **HTTPS obrigatório** - SSL automático no Vercel/Netlify

### 📋 GDPR Compliance

```html
<!-- Adicione se necessário -->
<div id="cookie-banner" style="display: none;">
  Este site usa apenas armazenamento local para melhorar a experiência.
  <button onclick="acceptCookies()">Entendi</button>
</div>
```

## 🐛 Troubleshooting

### ❓ Problemas Comuns

**Afirmações não carregam:**
```javascript
// Verifique o console do navegador
// Certifique-se que affirmations.json está no local correto
// Teste a sintaxe JSON em jsonlint.com
```

**Layout quebrado em mobile:**
```css
/* Verifique o viewport meta tag */
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Anúncios não aparecem:**
```html
<!-- Aguarde 24-48h para aprovação do AdTerra -->
<!-- Verifique se o código foi colado corretamente -->
<!-- Teste em modo incógnito -->
```

### 🔧 Debug Mode

Adicione `?debug=true` na URL para habilitar logs detalhados:

```javascript
// Em script.js
const isDebug = new URLSearchParams(window.location.search).get('debug') === 'true';
if (isDebug) console.log('Debug mode enabled');
```

## 🤝 Contribuindo

### 🎯 Como Contribuir

1. **Fork o projeto**
2. **Crie uma branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit suas mudanças** (`git commit -m 'Add some AmazingFeature'`)
4. **Push para a branch** (`git push origin feature/AmazingFeature`)
5. **Abra um Pull Request**

### 📝 Guidelines de Contribuição

- **Mantenha** o tamanho total do projeto <50KB
- **Siga** a estrutura de código existente
- **Teste** em múltiplos dispositivos e navegadores
- **Documente** mudanças no README
- **Mantenha** compatibilidade com ES6+

### 🐛 Reportando Bugs

Use o template de issue no GitHub:

```markdown
**Descrição do Bug:**
Descrição clara e concisa do bug.

**Para Reproduzir:**
1. Vá para '...'
2. Clique em '....'
3. Role para baixo até '....'
4. Veja o erro

**Comportamento Esperado:**
Descrição do que deveria acontecer.

**Screenshots:**
Se aplicável, adicione screenshots.

**Ambiente:**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
```

## 📜 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

```
MIT License

Copyright (c) 2025 Daily Affirmations App

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Agradecimentos

- **Inter Font Family** - Google Fonts
- **AdTerra.com** - Plataforma de monetização
- **Vercel** - Hosting e deployment
- **Claude AI** - Assistência no desenvolvimento
- **Comunidade Open Source** - Inspiração e feedback

## 📞 Contato e Suporte

- **Documentação**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/daily-affirmations-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/seu-usuario/daily-affirmations-app/discussions)

---

<div align="center">

**💝 Feito com amor para promover positividade e bem-estar mental**

[🌟 Star no GitHub](https://github.com/seu-usuario/daily-affirmations-app) | [🚀 Live Demo](https://daily-affirmations-app.vercel.app) | [📖 Documentação](./docs/)

</div>