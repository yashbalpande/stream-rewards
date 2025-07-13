import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { ethers } from 'ethers';

interface AirdropTransaction {
  hash: string;
  recipient: string;
  amount: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  blockNumber?: number;
}

const AirdropHistory = () => {
  const { address, provider } = useWallet();
  const [transactions, setTransactions] = useState<AirdropTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load transaction history from localStorage
  useEffect(() => {
    if (address) {
      const stored = localStorage.getItem(`airdrop_history_${address}`);
      if (stored) {
        setTransactions(JSON.parse(stored));
      }
    }
  }, [address]);

  // Save transactions to localStorage
  useEffect(() => {
    if (address && transactions.length > 0) {
      localStorage.setItem(`airdrop_history_${address}`, JSON.stringify(transactions));
    }
  }, [transactions, address]);

  const addTransaction = (tx: AirdropTransaction) => {
    setTransactions(prev => [tx, ...prev]);
  };

  const updateTransactionStatus = (hash: string, status: 'pending' | 'confirmed' | 'failed', blockNumber?: number) => {
    setTransactions(prev => 
      prev.map(tx => 
        tx.hash === hash 
          ? { ...tx, status, blockNumber }
          : tx
      )
    );
  };

  const checkTransactionStatus = async (hash: string) => {
    if (!provider) return;

    try {
      const receipt = await provider.getTransactionReceipt(hash);
      if (receipt) {
        updateTransactionStatus(hash, 'confirmed', Number(receipt.blockNumber));
      }
    } catch (error) {
      console.error('Error checking transaction status:', error);
    }
  };

  const refreshAllTransactions = async () => {
    if (!provider) return;

    setIsLoading(true);
    try {
      const pendingTxs = transactions.filter(tx => tx.status === 'pending');
      await Promise.all(pendingTxs.map(tx => checkTransactionStatus(tx.hash)));
    } catch (error) {
      console.error('Error refreshing transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatAmount = (amount: string) => {
    return parseFloat(amount).toFixed(4);
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="default" className="bg-green-600">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (!address) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center">
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">
            Connect your wallet to view airdrop history
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshAllTransactions}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No airdrop transactions yet
            </p>
          </div>
        ) : (
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {transactions.map((tx, index) => (
                <div
                  key={tx.hash}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(tx.status)}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {formatAmount(tx.amount)} SHM
                        </span>
                        {getStatusBadge(tx.status)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        To: {formatAddress(tx.recipient)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatTimestamp(tx.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`https://explorer-dapps.shardeum.org/tx/${tx.hash}`, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    {tx.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => checkTransactionStatus(tx.hash)}
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default AirdropHistory; 