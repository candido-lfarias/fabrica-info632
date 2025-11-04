# Usar a imagem Node.js completa para máxima compatibilidade
FROM node:20

WORKDIR /app

# Copiar os arquivos de dependência E o schema do Prisma
# O schema é necessário para o script "postinstall" funcionar.
COPY package*.json ./
COPY prisma ./prisma/

# Instalar as dependências. O script "postinstall" irá acionar "prisma generate".
RUN npm install

# Copiar o restante do código-fonte
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]