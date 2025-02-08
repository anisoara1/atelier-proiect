# Folosește o imagine oficială de Node.js
FROM node:18-alpine

# Setează directorul de lucru
WORKDIR /app

# Copiază package.json și package-lock.json
COPY package*.json ./

# Instalează dependențele
RUN npm install

# Copiază codul aplicației
COPY . .

# Expune portul pe care rulează aplicația
EXPOSE 5000

# Rulează serverul
CMD ["node", "server.js"]
