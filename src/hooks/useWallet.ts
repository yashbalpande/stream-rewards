import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { toast } from '@/hooks/use-toast';

// Shardeum Sphinx Dappnet configuration
const SHARDEUM_NETWORK = {
  chainId: '0x1F91', // 8081 in hex
  chainName: 'Shardeum Sphinx 1.X',
  nativeCurrency: {
    name: 'SHM',
    symbol: 'SHM',
    decimals: 18,
  },
  rpcUrls: ['https://dapps.shardeum.org/'],
  blockExplorerUrls: ['https://explorer-dapps.shardeum.org/'],
};

interface WalletState {
  address: string | null;
  balance: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    balance: null,
    isConnected: false,
    isConnecting: false,
    provider: null,
    signer: null,
  });

  // Check if wallet is already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            
            setWalletState({
              address,
              balance: ethers.formatEther(balance),
              isConnected: true,
              isConnecting: false,
              provider,
              signer,
            });
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected
          setWalletState({
            address: null,
            balance: null,
            isConnected: false,
            isConnecting: false,
            provider: null,
            signer: null,
          });
        } else {
          // Account changed
          connectWallet();
        }
      };

      const handleChainChanged = () => {
        // Reload the page when chain changes
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const addShardeumNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [SHARDEUM_NETWORK],
      });
      return true;
    } catch (error) {
      console.error('Error adding Shardeum network:', error);
      toast({
        title: "Network Error",
        description: "Failed to add Shardeum network to MetaMask",
        variant: "destructive",
      });
      return false;
    }
  };

  const switchToShardeum = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SHARDEUM_NETWORK.chainId }],
      });
      return true;
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        return await addShardeumNetwork();
      }
      console.error('Error switching to Shardeum network:', error);
      toast({
        title: "Network Error",
        description: "Failed to switch to Shardeum network",
        variant: "destructive",
      });
      return false;
    }
  };

  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to connect your wallet",
        variant: "destructive",
      });
      return;
    }

    setWalletState(prev => ({ ...prev, isConnecting: true }));

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      // Check if we're on Shardeum network
      const network = await provider.getNetwork();
      if (network.chainId !== 8081n) {
        const switched = await switchToShardeum();
        if (!switched) {
          setWalletState(prev => ({ ...prev, isConnecting: false }));
          return;
        }
      }

      const balance = await provider.getBalance(address);
      
      setWalletState({
        address,
        balance: ethers.formatEther(balance),
        isConnected: true,
        isConnecting: false,
        provider,
        signer,
      });

      toast({
        title: "Wallet Connected",
        description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
      });

    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      setWalletState(prev => ({ ...prev, isConnecting: false }));
      
      if (error.code === 4001) {
        toast({
          title: "Connection Rejected",
          description: "You rejected the connection request",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Connection Error",
          description: "Failed to connect wallet",
          variant: "destructive",
        });
      }
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletState({
      address: null,
      balance: null,
      isConnected: false,
      isConnecting: false,
      provider: null,
      signer: null,
    });
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  }, []);

  const refreshBalance = useCallback(async () => {
    if (walletState.provider && walletState.address) {
      try {
        const balance = await walletState.provider.getBalance(walletState.address);
        setWalletState(prev => ({
          ...prev,
          balance: ethers.formatEther(balance),
        }));
      } catch (error) {
        console.error('Error refreshing balance:', error);
      }
    }
  }, [walletState.provider, walletState.address]);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    refreshBalance,
    addShardeumNetwork,
    switchToShardeum,
  };
};