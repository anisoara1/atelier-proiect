# Folosește o imagine oficială de Node.js
FROM node:18.17.0 AS build

# Setează directorul de lucru
WORKDIR /app

# Copiază package.json și package-lock.json
COPY package*.json ./

# Instalează dependențele
RUN npm install

# Copiază restul fișierelor aplicației
COPY . .

# Rulează build-ul pentru producție
RUN npm run build

# Folosește imaginea oficială Nginx pentru a servi aplicația
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expune portul 80
EXPOSE 80

# Comanda de start
CMD ["nginx", "-g", "daemon off;"]