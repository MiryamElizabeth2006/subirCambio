#!/bin/bash

# Script para iniciar el desarrollo de la aplicación
# Inicia tanto el frontend como el backend

echo "🚀 Iniciando App Minijuegos E.Vial..."
echo ""

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 18+"
    exit 1
fi

# Verificar que npm esté instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instala npm"
    exit 1
fi

echo "✅ Node.js y npm están instalados"
echo ""

# Instalar dependencias del frontend si no existen
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias del frontend..."
    npm install
    echo ""
fi

# Instalar dependencias del backend si no existen
if [ ! -d "server/node_modules" ]; then
    echo "📦 Instalando dependencias del backend..."
    cd server
    npm install
    cd ..
    echo ""
fi

echo "🎯 Iniciando servidor backend..."
cd server
npm run dev &
BACKEND_PID=$!
cd ..

echo "⏳ Esperando que el backend se inicie..."
sleep 3

echo "📱 Iniciando aplicación frontend..."
npm start &
FRONTEND_PID=$!

echo ""
echo "🎉 ¡Aplicación iniciada!"
echo ""
echo "📱 Frontend: http://localhost:8081"
echo "🔌 Backend: http://localhost:3001"
echo ""
echo "Para detener la aplicación, presiona Ctrl+C"

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo aplicación..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Aplicación detenida"
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT

# Esperar a que termine cualquiera de los procesos
wait

