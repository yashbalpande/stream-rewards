import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, RefreshCw, LogOut, ExternalLink } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';

const WalletConnection = () => {
  const {
    address,
    balance,
    isConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
    refreshBalance,
  } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: string) => {
    return parseFloat(bal).toFixed(4);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Wallet className="h-5 w-5" />
          Shardeum Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect your MetaMask wallet to interact with Shardeum Sphinx Dappnet
            </p>
            <Button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full"
              size="lg"
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect MetaMask
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Badge variant="default" className="bg-green-600">
                Connected
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Address</span>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {formatAddress(address!)}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(`https://explorer-dapps.shardeum.org/address/${address}`, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Balance</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono">
                    {formatBalance(balance!)} SHM
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={refreshBalance}
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t">
              <Button
                variant="outline"
                onClick={disconnectWallet}
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            </div>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          <p>Network: Shardeum Sphinx 1.X</p>
          <p>Chain ID: 8081</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletConnection;