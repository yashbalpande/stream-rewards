import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Zap, TrendingUp, Coins, Gift } from 'lucide-react';
import { ethers } from 'ethers';

const Hero = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [airdropStatus, setAirdropStatus] = useState<'idle' | 'claiming' | 'success' | 'error'>('idle');

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask.");
      return;
    }

    const shardeumNetwork = {
      chainId: '0x1F93', // 8081 in hex
      chainName: 'Shardeum Testnet',
      nativeCurrency: {
        name: 'SHM',
        symbol: 'SHM',
        decimals: 18
      },
      rpcUrls: ['https://api-testnet.shardeum.org'],
      blockExplorerUrls: ['https://explorer-sphinx.shardeum.org/']
    };

    try {
      await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [shardeumNetwork] });
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const claimAirdrop = async () => {
    if (!walletAddress) return alert("Connect your wallet first.");
    setAirdropStatus('claiming');

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();

      const tx = await signer.sendTransaction({
        to: walletAddress, // sending SHM to yourself in this dummy version
        value: ethers.utils.parseEther("0.01") // replace with your desired airdrop amount
      });

      await tx.wait();
      setAirdropStatus('success');
    } catch (error) {
      console.error(error);
      setAirdropStatus('error');
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')]"></div>

      <div className="relative px-6 lg:px-8">
        {/* 🔗 Connect Wallet Button */}
        <div className="absolute top-6 right-6 z-10">
          <Button
            onClick={connectWallet}
            className="bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur px-5 py-2 rounded-xl"
          >
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
          </Button>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl pt-20 pb-24 text-center lg:pt-32">
          <div className="mx-auto mb-8 flex max-w-fit items-center justify-center space-x-2 rounded-full bg-blue-100/10 px-7 py-2 ring-1 ring-blue-400/30 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-blue-400" />
            <p className="text-sm font-medium text-blue-200">Powered by SHM Blockchain</p>
          </div>

          <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Turn Every
            <span className="relative whitespace-nowrap text- bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              <span className="relative"> Comment </span>
            </span>
            Into Earnings
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            The first Web3 livestream platform where viewers pay SHM to engage, 
            creators earn from every interaction, and top fans get rewarded from community pools.
          </p>

          {/* 🎬 CTA + 🎁 Airdrop */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Streaming
            </Button>

            <Button 
              variant="outline" 
              size="lg"
              className="border-purple-400/50 text-purple-200 hover:bg-purple-400/10 px-8 py-3 text-lg font-semibold backdrop-blur-sm"
            >
              Watch Demo
            </Button>

            <Button
              size="lg"
              onClick={claimAirdrop}
              className="bg-gradient-to-r from-yellow-500 to-pink-500 text-white px-6 py-3 text-lg font-semibold hover:brightness-110 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              disabled={airdropStatus === 'claiming'}
            >
              <Gift className="h-5 w-5" />
              {airdropStatus === 'claiming' ? "Claiming..." : "Claim Airdrop"}
            </Button>
          </div>

          {airdropStatus === 'success' && (
            <p className="mt-4 text-green-400 font-semibold">✅ Airdrop successful!</p>
          )}
          {airdropStatus === 'error' && (
            <p className="mt-4 text-red-400 font-semibold">❌ You are not eligible.</p>
          )}

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <Coins className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Pay-per-Comment</h3>
              <p className="text-gray-300 text-center">Every message costs SHM, ensuring quality engagement</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <TrendingUp className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Direct Earnings</h3>
              <p className="text-gray-300 text-center">Creators receive tips instantly, no platform fees</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <Zap className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Gamified Rewards</h3>
              <p className="text-gray-300 text-center">Top supporters earn from community SHM pools</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
