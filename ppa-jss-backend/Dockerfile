# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de configuración primero para aprovechar la caché de Docker
COPY package*.json tsconfig.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar el código TypeScript a JavaScript
RUN npm run build

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación compilada
CMD ["node", "dist/index.js"]
