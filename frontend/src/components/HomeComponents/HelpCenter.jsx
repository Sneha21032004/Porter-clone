import React, { useState } from "react";
import { LifeBuoy } from 'lucide-react';

const faqs = [
  "How do I book a move?",
  "What if I need to reschedule?",
  "Are my belongings insured?",
  "How do I contact support?"
];

const HelpCenter = () => {
  const [search, setSearch] = useState("");
  const filteredFaqs = faqs.filter(q => q.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="help-center py-20 bg-gradient-to-br from-[#ece9f7] via-[#fcfcfd] to-[#f3fff7] relative overflow-hidden">
      {/* Decorative pastel blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-8 left-1/4 w-36 h-36 bg-[#bca8f3]/15 rounded-full blur-3xl"></div>
        <div className="absolute top-24 right-10 w-32 h-32 bg-[#3ec9a7]/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-8 left-8 w-44 h-44 bg-[#4d21b9]/15 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl mx-auto px-4 flex flex-col items-center relative z-10">
        <LifeBuoy className="w-20 h-20 mb-6 text-[#4d21b9] drop-shadow" />
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-3 text-[#2e1967]">Need Help?</h2>
        <p className="text-lg text-[#3b1769]/85 mb-8 text-center">
          Find answers to common questions or reach out to our support team.
        </p>
        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-5 py-4 rounded-full bg-white/80 border-2 border-[#d0c3f5]/60 mb-6 shadow focus:outline-none focus:ring-2 focus:ring-[#3ec9a7]/40 text-gray-700 font-medium transition"
        />
        <ul className="w-full mb-6">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((q, i) => (
              <li key={i}
                className="py-3 px-5 bg-gradient-to-r from-[#e7edfb]/80 to-white/95 rounded-2xl mb-3 text-[#3b1769] font-semibold shadow-sm border border-[#bca8f3]/30 hover:shadow-md transition-all duration-200"
              >
                {q}
              </li>
            ))
          ) : (
            <li className="py-3 px-5 bg-white/95 rounded-2xl text-[#bca8f3] font-semibold shadow-sm border border-[#d0c3f5]/30">
              No FAQs found.
            </li>
          )}
        </ul>
        <button
          className="bg-gradient-to-r from-[#4d21b9] to-[#3ec9a7]
          text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#4d21b9]/30"
        >
          Contact Support
        </button>
      </div>
    </section>
  );
};

export default HelpCenter;
