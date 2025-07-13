
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Gaming Streamer",
      content: "Stream to Earn completely changed my income. Instead of hoping for donations, I earn from every meaningful interaction. My community loves the gamified aspect!",
      avatar: "AC",
      rating: 5
    },
    {
      name: "Sarah Williams",
      role: "Art Creator",
      content: "The pay-per-comment system eliminated all the spam from my streams. Now every message adds value, and I'm earning more than ever before.",
      avatar: "SW",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Tech Educator",
      content: "As someone teaching blockchain concepts, Stream to Earn is perfect. Students engage more when they have skin in the game, and I earn from quality discussions.",
      avatar: "MR",
      rating: 5
    }
  ];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What creators are saying
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Real feedback from creators earning with our platform
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
