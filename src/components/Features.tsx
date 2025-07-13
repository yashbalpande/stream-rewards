
import React from 'react';
import { MessageSquare, DollarSign, Trophy, QrCode, Sparkles } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Pay-per-Comment System",
      description: "Every comment requires SHM payment, eliminating spam and ensuring meaningful engagement from your audience.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: DollarSign,
      title: "Digital Tip Jar",
      description: "Viewers can tip creators directly during streams with instant SHM transactions, bypassing traditional platform fees.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Trophy,
      title: "SHM Leaderboard & Rewards",
      description: "Weekly rewards for top supporters and commenters from community pools, creating a competitive engagement economy.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: QrCode,
      title: "QR Pay Support",
      description: "Lightning-fast SHM payments via wallet QR scanning for seamless mobile tipping during live streams.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Sparkles,
      title: "Live Moment NFTs",
      description: "Big contributors receive collectible 'Live Moments' NFTs as proof of their support and participation.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-400">
            Revolutionary Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to monetize engagement
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Built on SHM blockchain technology for instant, transparent, and fair creator economy.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="flex flex-col p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r ${feature.color}`}>
                    <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Features;
