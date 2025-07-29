import React from "react";
import { Headset, Smartphone, BadgeCheck, Cpu } from 'lucide-react';

const features = [
  {
    icon: <Headset className="w-16 h-16 mx-auto text-[var(--primary-color)] group-hover:text-[var(--secondary-color)] transition-colors duration-300" />,
    title: "24/7 Friendly Support",
    desc: "Our team is always here to help, no matter the hour."
  },
  {
    icon: <Smartphone className="w-16 h-16 mx-auto text-[var(--primary-color)] group-hover:text-[var(--secondary-color)] transition-colors duration-300" />,
    title: "Easy App Access",
    desc: "Scan and go! Manage your moves with our intuitive app."
  },
  {
    icon: <BadgeCheck className="w-16 h-16 mx-auto text-[var(--primary-color)] group-hover:text-[var(--secondary-color)] transition-colors duration-300" />,
    title: "Verified Partners",
    desc: "All helpers are background-checked and rated by users."
  },
  {
    icon: <Cpu className="w-16 h-16 mx-auto text-[var(--primary-color)] group-hover:text-[var(--secondary-color)] transition-colors duration-300" />,
    title: "Powered by Tech",
    desc: "Smart algorithms for the smoothest experience."
  }
];
const UniqueFeatures = () => (
  <section className="unique-features py-20 bg-gradient-to-br from-[#ece9f7] via-[#fcfcfd] to-[#f3fff7] relative overflow-hidden">
    {/* Decorative gradient blobs */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute top-16 left-1/4 w-44 h-44 bg-[#bca8f3]/15 rounded-full blur-3xl"></div>
      <div className="absolute top-24 right-10 w-32 h-32 bg-[#3ec9a7]/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-24 left-10 w-48 h-48 bg-[#4d21b9]/15 rounded-full blur-3xl"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#2e1967]">
          Why Choose MoveEasy?
        </h2>
        <p className="text-xl text-[#3b1769]/85 max-w-3xl mx-auto">
          Discover what makes us different and why thousands of customers trust us with their moves.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="group bg-gradient-to-br from-white/90 via-[#e7edfb]/90 to-white/95 rounded-3xl shadow-2xl hover:shadow-3xl p-8 border border-[#d0c3f5]/40 hover:border-[#3ec9a7]/50 transition-all duration-300 card-hover hover:scale-[1.05]"
          >
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-md group-hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-[#4d21b9] mb-4 text-center group-hover:text-[#3ec9a7] transition-colors duration-300">
              {f.title}
            </h3>
            <p className="text-[#3b1769]/90 text-center leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default UniqueFeatures;
