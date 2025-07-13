
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Rocket } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-400/30 mb-8">
            <Rocket className="h-6 w-6 text-blue-400 mr-2" />
            <span className="text-blue-200 font-medium">Ready to revolutionize your streams?</span>
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
            Start earning from
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {" "}every interaction
            </span>
          </h2>
          
          <p className="text-xl leading-8 text-gray-300 mb-12">
            Join the Web3 streaming revolution. Connect your SHM wallet and start monetizing 
            your community engagement today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-12">
            <Input 
              placeholder="Enter your email" 
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 backdrop-blur-sm"
            />
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              Get Early Access
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3"
            >
              Watch Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3"
            >
              Read Whitepaper
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
