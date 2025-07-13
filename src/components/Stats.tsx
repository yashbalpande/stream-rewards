
import React from 'react';

const Stats = () => {
  const stats = [
    { value: '10,000+', label: 'Active Streamers' },
    { value: '2.5M', label: 'SHM Transactions' },
    { value: '89%', label: 'Creator Satisfaction' },
    { value: '$500K+', label: 'Creator Earnings' }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Trusted by creators worldwide
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Join thousands of creators already earning with Stream to Earn
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
