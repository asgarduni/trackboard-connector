
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
  base: "", // Alterado de "./" para "" para garantir que funcione em qualquer contexto
  build: {
    outDir: "dist", // Diretório onde os arquivos de build serão gerados
    emptyOutDir: true, // Limpa o diretório antes de construir
    sourcemap: true, // Ativado sourcemaps para ajudar na depuração
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
}));
