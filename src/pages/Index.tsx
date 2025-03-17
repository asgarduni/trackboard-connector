
import React from "react";
import TraccarConnection from "@/components/TraccarConnection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="text-center mb-10 max-w-xl animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
          Painel de Conexão Traccar
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
          Conecte-se ao seu servidor Traccar de forma segura e comece a monitorar seus dispositivos.
        </p>
      </div>
      
      <TraccarConnection />
      
      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400 opacity-80">
        <p>Preencha os dados para se conectar ao servidor Traccar</p>
      </div>
    </div>
  );
};

export default Index;
