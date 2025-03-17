
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ConnectionStatus from "./ConnectionStatus";
import { Server, Database, Key, Wifi, Users, Activity, Settings, Shield, BarChart } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type ConnectionState = "disconnected" | "connecting" | "connected" | "error" | "monitoring";

const TraccarConnection = () => {
  const { toast } = useToast();
  const [serverUrl, setServerUrl] = useState("http://181.189.124.150");
  const [dbPort, setDbPort] = useState("3306");
  const [username, setUsername] = useState("root");
  const [password, setPassword] = useState("root");
  const [connectionStatus, setConnectionStatus] = useState<ConnectionState>("disconnected");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("connection");
  const [devices, setDevices] = useState([
    { id: 1, name: "Veículo 1", status: "online", lastUpdate: "Agora mesmo", battery: "100%" },
    { id: 2, name: "Veículo 2", status: "offline", lastUpdate: "1h atrás", battery: "45%" },
    { id: 3, name: "Veículo 3", status: "online", lastUpdate: "5min atrás", battery: "78%" },
  ]);
  const [users, setUsers] = useState([
    { id: 1, name: "Administrador", email: "admin@exemplo.com", role: "Admin" },
    { id: 2, name: "Usuário 1", email: "usuario1@exemplo.com", role: "Usuário" },
  ]);
  const [serverSettings, setServerSettings] = useState({
    autoStart: true,
    notificationEnabled: true,
    dataRetention: "30",
    sslEnabled: false
  });

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

  const handleStartMonitoring = () => {
    setConnectionStatus("monitoring");
    toast({
      title: "Monitoramento iniciado",
      description: "O servidor Traccar está sendo monitorado agora",
    });
  };

  const handleStopMonitoring = () => {
    setConnectionStatus("connected");
    toast({
      title: "Monitoramento parado",
      description: "O monitoramento do servidor Traccar foi interrompido",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações do servidor foram atualizadas com sucesso",
    });
  };

  return (
    <Card className="w-full max-w-4xl shadow-lg animate-fade-in glass-panel">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <Server className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl font-semibold">Traccar Manager</CardTitle>
        </div>
        <ConnectionStatus status={connectionStatus} />
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsHeader>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="connection" className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              <span className="hidden sm:inline">Conexão</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Dispositivos</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Usuários</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Configurações</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Segurança</span>
            </TabsTrigger>
          </TabsList>
        </TabsHeader>

        <TabsContent value="connection" className="space-y-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {connectionStatus === "disconnected" && (
              <Button
                onClick={handleConnect}
                className="transition-all"
                disabled={connectionStatus === "connecting"}
              >
                {connectionStatus === "connecting" ? "Conectando..." : "Conectar"}
              </Button>
            )}
            
            {(connectionStatus === "connected" || connectionStatus === "monitoring") && (
              <Button
                onClick={handleDisconnect}
                variant="destructive"
                className="transition-all"
              >
                Desconectar
              </Button>
            )}
            
            {connectionStatus === "connected" && (
              <Button
                onClick={handleStartMonitoring}
                variant="secondary"
                className="transition-all"
              >
                Iniciar monitoramento
              </Button>
            )}
            
            {connectionStatus === "monitoring" && (
              <Button
                onClick={handleStopMonitoring}
                variant="secondary"
                className="transition-all"
              >
                Parar monitoramento
              </Button>
            )}
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-md shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Última atualização</TableHead>
                  <TableHead>Bateria</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell>{device.id}</TableCell>
                    <TableCell>{device.name}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${device.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {device.status}
                      </span>
                    </TableCell>
                    <TableCell>{device.lastUpdate}</TableCell>
                    <TableCell>{device.battery}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Detalhes</Button>
                        <Button variant="outline" size="sm">Localizar</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end">
            <Button>Adicionar dispositivo</Button>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-md shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="outline" size="sm">Permissões</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end">
            <Button>Adicionar usuário</Button>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Iniciar servidor automaticamente</Label>
                  <p className="text-sm text-muted-foreground">
                    O servidor iniciará automaticamente quando o sistema for iniciado
                  </p>
                </div>
                <Switch 
                  checked={serverSettings.autoStart}
                  onCheckedChange={(checked) => 
                    setServerSettings({...serverSettings, autoStart: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Habilitar notificações</Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar notificações quando eventos ocorrerem
                  </p>
                </div>
                <Switch 
                  checked={serverSettings.notificationEnabled}
                  onCheckedChange={(checked) => 
                    setServerSettings({...serverSettings, notificationEnabled: checked})
                  }
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Retenção de dados (dias)</Label>
                <Input 
                  value={serverSettings.dataRetention}
                  onChange={(e) => 
                    setServerSettings({...serverSettings, dataRetention: e.target.value})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Habilitar SSL</Label>
                  <p className="text-sm text-muted-foreground">
                    Usar conexão segura para comunicação
                  </p>
                </div>
                <Switch 
                  checked={serverSettings.sslEnabled}
                  onCheckedChange={(checked) => 
                    setServerSettings({...serverSettings, sslEnabled: checked})
                  }
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button onClick={handleSaveSettings}>Salvar configurações</Button>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 p-4">
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4 rounded-md">
              <h3 className="text-lg font-medium text-amber-800 dark:text-amber-200 mb-2">Segurança do servidor</h3>
              <p className="text-amber-700 dark:text-amber-300">
                Recomendamos fortemente que você altere as senhas padrão e configure corretamente as permissões de usuário para manter seu servidor seguro.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Alterar senha do administrador</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="password" placeholder="Nova senha" />
                  <Input type="password" placeholder="Confirmar senha" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Lista de IPs permitidos</Label>
                <Input placeholder="192.168.1.1, 10.0.0.1" />
                <p className="text-xs text-muted-foreground">
                  Separe múltiplos IPs com vírgulas. Deixe em branco para permitir todos os IPs.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button>Atualizar configurações de segurança</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default TraccarConnection;
