# Multi-stage build for optimized production image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application files
COPY . .

# Validate application files
RUN npm run validate

# Production stage
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S dailyaffirmations -u 1001

# Set working directory
WORKDIR /app

# Copy dependencies and application from builder stage
COPY --from=builder --chown=dailyaffirmations:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=dailyaffirmations:nodejs /app/package*.json ./
COPY --chown=dailyaffirmations:nodejs . .

# Remove unnecessary files
RUN rm -rf docs/ .git* *.md LICENSE netlify.toml vercel.json

# Switch to non-root user
USER dailyaffirmations

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "const http=require('http');const options={hostname:'localhost',port:3000,path:'/',timeout:2000};const req=http.request(options,(res)=>{process.exit(res.statusCode===200?0:1)});req.on('error',()=>process.exit(1));req.end();"

# Start the application with dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]