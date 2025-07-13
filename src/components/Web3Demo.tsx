import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Send, RefreshCw } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { ethers } from 'ethers';
import { toast } from '@/hooks/use-toast';

const Web3Demo = () => {
  const { isConnected, provider, signer, refreshBalance } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendTransaction = async () => {
    if (!signer || !provider) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (!recipient || !amount) {
      toast({
        title: "Invalid Input",
        description: "Please enter both recipient address and amount",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount),
      });

      toast({
        title: "Transaction Sent",
        description: `Transaction hash: ${tx.hash.slice(0, 10)}...`,
      });

      // Wait for transaction confirmation
      const receipt = await tx.wait();
      
      toast({
        title: "Transaction Confirmed",
        description: `Transaction confirmed in block ${receipt!.blockNumber}`,
      });

      // Refresh balance after transaction
      await refreshBalance();
      
      // Clear form
      setRecipient('');
      setAmount('');
      
    } catch (error: any) {
      console.error('Transaction error:', error);
      toast({
        title: "Transaction Failed",
        description: error.message || "Transaction failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Connect your wallet to interact with Shardeum
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Send SHM
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            placeholder="0x..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (SHM)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.1"
            step="0.001"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <Button
          onClick={sendTransaction}
          disabled={isLoading || !recipient || !amount}
          className="w-full"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send Transaction
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground text-center">
          <p>Test the Shardeum network by sending SHM tokens</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Web3Demo;