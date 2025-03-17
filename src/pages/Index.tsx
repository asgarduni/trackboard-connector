
import React, { useState, useEffect } from "react";
import TraccarConnection from "@/components/TraccarConnection";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Index = () => {
  const [isLocal, setIsLocal] = useState(false);
  const [appError, setAppError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Check if running locally through XAMPP/Apache
      if (window.location.hostname === 'localhost' || 
          window.location.hostname === '127.0.0.1') {
        setIsLocal(true);
      }
      console.log("Application initialized with hostname:", window.location.hostname);
      console.log("Full URL:", window.location.href);
    } catch (error) {
      console.error("Error during initialization:", error);
      setAppError("Erro na inicialização da aplicação. Verifique o console para detalhes.");
    }
  }, []);

  // If we have an application error, show it
  if (appError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-red-50">
        <div className="w-full max-w-md">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro na Aplicação</AlertTitle>
            <AlertDescription>{appError}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="text-center mb-8 max-w-2xl animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
          Painel de Gerenciamento Traccar
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
          Gerencie seu servidor Traccar, monitore dispositivos e configure usuários em um só lugar.
        </p>
      </div>
      
      {isLocal && (
        <div className="w-full max-w-4xl mb-4">
          <Alert variant="default" className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Executando localmente</AlertTitle>
            <AlertDescription>
              Aplicação está rodando localmente através do XAMPP/Apache. 
              Para conexões com o servidor Traccar, certifique-se de que a URL esteja correta e acessível.
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <TraccarConnection />
      
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 opacity-80">
        <p>Conecte-se ao servidor Traccar para começar</p>
      </div>
    </div>
  );
};

export default Index;
