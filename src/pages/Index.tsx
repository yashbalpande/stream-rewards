
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Demo from '../components/Demo';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import WalletConnection from '../components/WalletConnection';
import Web3Demo from '../components/Web3Demo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Hero />
      <Features />
      <HowItWorks />
      <Demo />
      
      {/* Web3 Integration Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Connect to Shardeum
            </h2>
            <p className="text-lg leading-8 text-gray-300">
              Experience the power of Shardeum blockchain with MetaMask integration
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <WalletConnection />
            <Web3Demo />
          </div>
        </div>
      </section>
      
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
