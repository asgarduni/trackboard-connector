
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import ConnectionStatus from "./ConnectionStatus";
import { Server, Database, Key, Wifi } from "lucide-react";

type ConnectionState = "disconnected" | "connecting" | "connected" | "error";

const TraccarConnection = () => {
  const { toast } = useToast();
  const [serverUrl, setServerUrl] = useState("http://181.189.124.150");
  const [dbPort, setDbPort] = useState("3306");
  const [username, setUsername] = useState("root");
  const [password, setPassword] = useState("root");
  const [connectionStatus, setConnectionStatus] = useState<ConnectionState>("disconnected");
  const [showPassword, setShowPassword] = useState(false);

  const handleConnect = () => {
    if (!serverUrl.trim()) {
      toast({
        title: "URL do servidor obrigatória",
        description: "Por favor, informe a URL do servidor Traccar",
        variant: "destructive",
      });
      return;
    }

    setConnectionStatus("connecting");
    
    // Simulação da conexão (em uma aplicação real, isso seria uma requisição)
    setTimeout(() => {
      setConnectionStatus("connected");
      toast({
        title: "Conexão estabelecida",
        description: "Você está conectado ao servidor Traccar",
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    setConnectionStatus("disconnected");
    toast({
      title: "Desconectado",
      description: "Você foi desconectado do servidor Traccar",
    });
  };

  return (
    <Card className="w-full max-w-md p-6 shadow-lg animate-fade-in glass-panel">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Server className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Traccar Connect</h2>
        </div>
        <ConnectionStatus status={connectionStatus} />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="server-url" className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            URL do Servidor
          </Label>
          <Input
            id="server-url"
            placeholder="http://servidor.traccar.org"
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
            className="focus-ring"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="db-port" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Porta do Banco de Dados
          </Label>
          <Input
            id="db-port"
            placeholder="3306"
            value={dbPort}
            onChange={(e) => setDbPort(e.target.value)}
            className="focus-ring"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Usuário
          </Label>
          <Input
            id="username"
            placeholder="admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="focus-ring"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Senha
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus-ring"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          {connectionStatus === "connected" ? (
            <Button
              onClick={handleDisconnect}
              className="w-full transition-all"
              variant="destructive"
            >
              Desconectar
            </Button>
          ) : (
            <Button
              onClick={handleConnect}
              className="w-full transition-all"
              disabled={connectionStatus === "connecting"}
            >
              {connectionStatus === "connecting" ? "Conectando..." : "Conectar"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TraccarConnection;
