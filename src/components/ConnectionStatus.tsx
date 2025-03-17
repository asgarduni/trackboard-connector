
import React from "react";
import { cn } from "@/lib/utils";

type ConnectionStatusProps = {
  status: "disconnected" | "connecting" | "connected" | "error";
  className?: string;
};

const ConnectionStatus = ({ status, className }: ConnectionStatusProps) => {
  const statusMap = {
    disconnected: {
      color: "bg-gray-400",
      text: "Desconectado",
    },
    connecting: {
      color: "bg-yellow-400 animate-pulse-subtle",
      text: "Conectando...",
    },
    connected: {
      color: "bg-emerald-500",
      text: "Conectado",
    },
    error: {
      color: "bg-red-500",
      text: "Erro",
    },
  };

  const { color, text } = statusMap[status];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("h-2.5 w-2.5 rounded-full", color)} />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

export default ConnectionStatus;
