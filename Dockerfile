# Use uma imagem atual e segura
FROM node:20-alpine3.20

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de dependência
COPY package*.json ./

# Instalar dependências de forma limpa
RUN npm ci --omit=dev

# Atualizar pacotes do sistema para mitigar CVEs
RUN apk update && apk upgrade --no-cache

# Copiar o restante do código
COPY . .

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
