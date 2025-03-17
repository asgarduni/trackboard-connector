
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error boundary for catching initialization issues
try {
  const container = document.getElementById("root");
  if (!container) {
    console.error("Root element not found! Make sure there's a div with id 'root' in the HTML.");
    document.body.innerHTML = "<div style='color:red;padding:20px;'>Erro: Elemento root não encontrado na página.</div>";
  } else {
    console.log("Initializing application...");
    createRoot(container).render(<App />);
    console.log("Application rendering complete");
  }
} catch (error) {
  console.error("Application initialization error:", error);
  document.body.innerHTML = "<div style='color:red;padding:20px;'>Erro na inicialização da aplicação. Verifique o console para mais detalhes.</div>";
}
