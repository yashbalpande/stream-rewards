
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Zap, TrendingUp, Coins } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-7xl pt-20 pb-24 text-center lg:pt-32">
          {/* Badge */}
          <div className="mx-auto mb-8 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100/10 px-7 py-2 ring-1 ring-blue-400/30 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-blue-400" />
            <p className="text-sm font-medium text-blue-200">
              Powered by SHM Blockchain
            </p>
          </div>

          {/* Main heading */}
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Turn Every
            <span className="relative whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              <span className="relative"> Comment</span>
            </span>
            Into Earnings
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            The first Web3 livestream platform where viewers pay SHM to engage, 
            creators earn from every interaction, and top fans get rewarded from community pools.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
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
          </div>

          {/* Feature highlights */}
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
