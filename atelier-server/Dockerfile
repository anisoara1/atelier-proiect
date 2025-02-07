# Folosește o imagine mai recentă de Node.js
FROM node:18.17.0

# Setează directorul de lucru
WORKDIR /app

# Copiați package.json și package-lock.json
COPY package*.json ./

# Instalați dependențele
RUN npm install

# Copiați restul fișierelor aplicației
COPY . .

# Expuneți portul pe care rulează aplicația
EXPOSE 5000

# Comanda de rulare a aplicației
CMD ["node", "app.js"]
