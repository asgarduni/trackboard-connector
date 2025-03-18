
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  base: "", // Configurado para funcionar em qualquer contexto, incluindo XAMPP
  build: {
    outDir: "dist", // Diretório onde os arquivos de build serão gerados
    emptyOutDir: true, // Limpa o diretório antes de construir
    sourcemap: true, // Mantido para facilitar depuração
    // Garantindo que todos os recursos sejam relativos
    assetsDir: "assets",
    minify: true, // Minificar os arquivos JavaScript
    target: 'es2015', // Configurar o target para JavaScript mais compatível
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]"
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
}));
