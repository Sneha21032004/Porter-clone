import React from "react";

const updates = [
  {
    date: '2024-06-01',
    title: 'MoveEasy App Launch',
    desc: 'Our brand new app is live! Manage your moves, track helpers, and more—all in one place.',
    icon: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=128&q=80', // app/tech
    category: 'Product Launch'
  },
  {
    date: '2024-05-20',
    title: 'Partner Program Expanded',
    desc: 'We now have verified partners in 20+ cities. Find a helper near you!',
    icon: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=128&q=80', // business/expansion
    category: 'Expansion'
  }
];
const LatestUpdates = () => (
  <section className="latest-updates py-20 bg-gradient-to-br from-[#f3fff7] via-[#fcfcfd] to-[#ece9f7] relative overflow-hidden">
    {/* Decorative blobs for a lively, modern look */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute top-14 left-1/3 w-44 h-44 bg-[#3ec9a7]/13 rounded-full blur-3xl"></div>
      <div className="absolute top-28 right-1/4 w-40 h-40 bg-[#bca8f3]/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-16 w-32 h-32 bg-[#4d21b9]/14 rounded-full blur-2xl"></div>
    </div>

    <div className="max-w-4xl mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#2e1967]">
          Latest Updates
        </h2>
        <p className="text-xl text-[#3b1769]/80 max-w-3xl mx-auto">
          Stay updated with our latest features, expansions, and improvements.
        </p>
      </div>

      <div className="space-y-8">
        {updates.map((u, i) => (
          <div
            key={i}
            className="group bg-gradient-to-br from-white/95 via-[#e7edfb]/95 to-white/100 rounded-3xl shadow-2xl hover:shadow-3xl border-l-8 border-[#4d21b9]/80 hover:border-[#3ec9a7]/90 transition-all duration-300 card-hover px-8 py-7 flex"
          >
            <div className="bg-[#e9f4fc]/70 rounded-2xl p-4 mr-5 shadow w-24 min-w-[4.5rem] h-24 flex items-center justify-center">
              <img src={u.icon} alt={u.title} className="w-16 h-16 rounded-xl object-cover shadow" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <span className="text-xs font-bold text-[#3ec9a7] bg-[#dff8ef]/80 px-3 py-1 rounded-full tracking-wide">
                  {u.category}
                </span>
                <span className="text-xs text-[#3b1769]/75 font-medium pt-0.5">
                  {u.date}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#4d21b9] mb-2 group-hover:text-[#3ec9a7] transition-colors duration-300">
                {u.title}
              </h3>
              <p className="text-[#3b1769]/90 leading-relaxed mb-4 text-base">
                {u.desc}
              </p>
              <button className="text-[#4d21b9] font-semibold hover:text-[#3ec9a7] transition-colors duration-300 group-hover:translate-x-1 transform transition-transform duration-300">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-gradient-to-r from-[#3ec9a7] to-[#4d21b9] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300">
          View All Updates
        </button>
      </div>
    </div>
  </section>
);

export default LatestUpdates;
