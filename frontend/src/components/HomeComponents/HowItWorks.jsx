import React from "react";
import { Download, CalendarCheck, UserCheck, LocateFixed } from 'lucide-react';

const steps = [
  {
    icon: <Download className="w-16 h-16 mx-auto text-[#4d21b9] group-hover:text-[#3ec9a7] transition-colors duration-300" />,
    title: "Download the App",
    desc: "Get started by downloading MoveEasy from the app store."
  },
  {
    icon: <CalendarCheck className="w-16 h-16 mx-auto text-[#4d21b9] group-hover:text-[#3ec9a7] transition-colors duration-300" />,
    title: "Book Your Move",
    desc: "Choose your service, set your locations, and book instantly."
  },
  {
    icon: <UserCheck className="w-16 h-16 mx-auto text-[#4d21b9] group-hover:text-[#3ec9a7] transition-colors duration-300" />,
    title: "Meet Your Helper",
    desc: "A friendly, verified partner arrives to assist you."
  },
  {
    icon: <LocateFixed className="w-16 h-16 mx-auto text-[#4d21b9] group-hover:text-[#3ec9a7] transition-colors duration-300" />,
    title: "Track & Relax",
    desc: "Track your move in real-time and enjoy a stress-free experience."
  }
];

const HowItWorks = () => (
  <section className="how-it-works py-20 bg-gradient-to-br from-[#ece9f7] via-[#fcfcfd] to-[#f3fff7] relative overflow-hidden">
    {/* Decorative blobs for Italian-modern mood */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute left-1/5 top-16 w-44 h-44 bg-[#bca8f3]/20 rounded-full blur-3xl"></div>
      <div className="absolute right-8 top-28 w-36 h-36 bg-[#3ec9a7]/15 rounded-full blur-2xl"></div>
      <div className="absolute bottom-12 left-16 w-52 h-52 bg-[#4d21b9]/20 rounded-full blur-3xl"></div>
    </div>
    <div className="max-w-5xl mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#2e1967]">
          How It Works
        </h2>
        <p className="text-xl text-[#3b1769]/85 max-w-2xl mx-auto">
          Moving is easy with MoveEasy. Just follow these simple steps!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {steps.map((step, i) => (
          <div
            key={i}
            className="group bg-gradient-to-br from-white/90 via-[#e7edfb]/90 to-white/95 rounded-3xl shadow-2xl hover:shadow-3xl p-8 border border-[#d0c3f5]/40 hover:border-[#3ec9a7]/60 transition-all duration-300 flex flex-col items-center hover:scale-[1.05]"
          >
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-md group-hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-[#4d21b9] mb-4 text-center group-hover:text-[#3ec9a7] transition-colors duration-300">
              {step.title}
            </h3>
            <p className="text-[#3b1769]/85 text-center leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
