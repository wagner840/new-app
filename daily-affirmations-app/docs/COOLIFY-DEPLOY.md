# 🚀 Deploy no Coolify - Guia Completo

Este guia detalha como fazer o deploy da aplicação Daily Affirmations no Coolify v4.0+.

## 🔧 Problemas Identificados e Soluções

### ❌ **Problemas Anteriores:**
- Script `python -m http.server` não funcionava em container Node.js
- Dependência do Python não disponível no container
- Configuração inadequada para deployment estático

### ✅ **Soluções Implementadas:**
- Scripts corrigidos no `package.json` para usar `serve`
- Dockerfile otimizado com multi-stage build
- Configurações específicas para Coolify
- Alternativa com Nginx para máxima performance

## 📋 Pré-requisitos

- Coolify v4.0+ instalado e configurado
- Repositório Git público (GitHub, GitLab, etc.)
- Acesso ao servidor Coolify

## 🚀 Opções de Deploy

### **Opção 1: Deploy com Node.js + Serve (Recomendado)**

1. **Configure o repositório no Coolify:**
   ```
   Repository: https://github.com/seu-usuario/daily-affirmations-app
   Branch: main (ou development)
   Build Pack: Node.js
   ```

2. **Configuração do Build:**
   ```
   Build Command: npm install
   Start Command: npm start
   Port: 3000
   ```

3. **Variáveis de Ambiente:**
   ```
   NODE_ENV=production
   PORT=3000
   ```

### **Opção 2: Deploy com Nginx (Máxima Performance)**

1. **Use o Dockerfile.nginx:**
   ```bash
   # Renomeie o arquivo
   mv Dockerfile.nginx Dockerfile
   ```

2. **Configure no Coolify:**
   ```
   Build Pack: Docker
   Dockerfile: Dockerfile
   Port: 80
   ```

## 📁 Estrutura de Arquivos para Deploy

```
daily-affirmations-app/
├── Dockerfile                    # Build com Node.js + serve
├── Dockerfile.nginx             # Alternativa com Nginx
├── .dockerignore               # Otimização do build
├── docker-compose.coolify.yml  # Configuração específica
├── nginx.conf                  # Config Nginx (se usar opção 2)
├── package.json               # Scripts corrigidos
└── ...outros arquivos
```

## ⚙️ Configuração Detalhada

### **Scripts do package.json (Corrigidos):**
```json
{
  "scripts": {
    "start": "npx serve . -l 3000 -s",
    "dev": "npx serve . -l 3000 -s",
    "build": "echo 'No build process needed for vanilla JS app'",
    "docker:start": "npx serve . -l 3000 -s --no-clipboard"
  },
  "dependencies": {
    "serve": "^14.2.0"
  }
}
```

### **Dockerfile Otimizado:**
- Multi-stage build para reduzir tamanho da imagem
- Non-root user para segurança
- Health check integrado
- Otimizações de cache

### **Health Check:**
```javascript
// Verificação automática de saúde da aplicação
const http = require('http');
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  timeout: 2000
};
```

## 🔍 Troubleshooting

### **Erro: "python: not found"**
✅ **Solução:** Corrigido com uso do `serve` em vez de Python

### **Erro: "npm start failed"**
✅ **Solução:** Script de start atualizado para `npx serve . -l 3000 -s`

### **Container não inicia:**
```bash
# Verifique os logs
docker logs container-name

# Teste local
docker build -t daily-affirmations .
docker run -p 3000:3000 daily-affirmations
```

### **Porta não acessível:**
```bash
# Verifique se a porta está correta no Coolify
PORT=3000 # No ambiente
```

## 📊 Otimizações de Performance

### **Configurações Nginx (Opção 2):**
- Gzip compression habilitado
- Cache headers otimizados
- Security headers implementados
- Health check endpoint `/health`

### **Node.js + Serve (Opção 1):**
- Single Page Application mode (`-s`)
- Listen em todas interfaces (`-l`)
- Cache automático de arquivos estáticos

## 🔒 Configurações de Segurança

### **Headers de Segurança:**
```nginx
X-Frame-Options: DENY
X-Content-Type-Options: nosniff  
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### **Container Security:**
- Non-root user (ID 1001)
- Minimal Alpine Linux base
- Arquivos desnecessários removidos

## 🚦 Processo de Deploy Recomendado

1. **Faça push das correções:**
   ```bash
   git add .
   git commit -m "Fix deployment configuration for Coolify"
   git push origin main
   ```

2. **Configure no Coolify:**
   - Acesse o dashboard do Coolify
   - Crie nova aplicação
   - Conecte ao repositório
   - Use as configurações da **Opção 1**

3. **Monitore o deploy:**
   - Acompanhe os logs em tempo real
   - Verifique health checks
   - Teste a aplicação após deploy

4. **Validação pós-deploy:**
   ```bash
   curl -I http://seu-dominio.com/
   curl http://seu-dominio.com/health
   ```

## 📈 Monitoramento

### **Health Check Endpoint:**
```
GET /health
Response: 200 OK
Body: "healthy"
```

### **Logs Importantes:**
```bash
# Aplicação iniciada
> daily-affirmations-app@1.0.0 start
> npx serve . -l 3000 -s

# Serve rodando
┌─────────────────────────────────────────────────┐
│                                                 │
│   Serving!                                      │
│                                                 │
│   - Local:            http://localhost:3000     │
│   - On Your Network:  http://0.0.0.0:3000      │
│                                                 │
└─────────────────────────────────────────────────┘
```

## ✅ Checklist de Deploy

- [ ] Scripts do package.json corrigidos
- [ ] Dockerfile otimizado criado
- [ ] .dockerignore configurado
- [ ] Repositório atualizado no Git
- [ ] Configuração no Coolify aplicada
- [ ] Deploy executado com sucesso
- [ ] Health check funcionando
- [ ] Aplicação acessível externamente
- [ ] AdTerra pode ser integrado

## 🎯 Resultado Esperado

Após seguir este guia, você terá:
- ✅ Aplicação funcionando no Coolify
- ✅ Deploy automatizado via Git
- ✅ Health checks ativos
- ✅ Performance otimizada
- ✅ Configuração de segurança aplicada
- ✅ Pronto para monetização com AdTerra

---

**💡 Dica:** Use a **Opção 1 (Node.js + Serve)** para simplicidade, ou **Opção 2 (Nginx)** para máxima performance em produção.