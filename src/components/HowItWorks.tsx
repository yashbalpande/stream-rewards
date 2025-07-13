
import React from 'react';
import { ArrowRight, Users, Coins, Trophy } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Users,
      title: "Join the Stream",
      description: "Connect your SHM wallet and join any live stream on our platform",
      step: "01"
    },
    {
      icon: Coins,
      title: "Pay to Engage",
      description: "Send comments, reactions, or tips using SHM microtransactions",
      step: "02"
    },
    {
      icon: Trophy,
      title: "Earn Rewards",
      description: "Top supporters get weekly SHM rewards from community pools",
      step: "03"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How Stream to Earn Works
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Three simple steps to revolutionize livestream engagement
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                  
                  <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-4 text-gray-300">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
