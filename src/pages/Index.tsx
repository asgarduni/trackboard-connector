
import React from "react";
import TraccarConnection from "@/components/TraccarConnection";

const Index = () => {
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
      
      <TraccarConnection />
      
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 opacity-80">
        <p>Conectado ao servidor: http://181.189.124.150</p>
      </div>
    </div>
  );
};

export default Index;
