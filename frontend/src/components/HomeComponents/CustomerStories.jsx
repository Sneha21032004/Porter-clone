import React from "react";

const stories = [
  {
    name: 'Aarav',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    quote: 'MoveEasy made my shifting day a breeze! Friendly helpers and no stress.',
    rating: 5
  },
  {
    name: 'Priyanshu',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    quote: 'Loved the app! Booking was super easy and the team was on time.',
    rating: 5
  },
  {
    name: 'Rohan',
    avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
    quote: 'I never thought moving could be this fun. Highly recommend MoveEasy!',
    rating: 5
  }
];
const CustomerStories = () => (
  <section className="customer-stories py-20 bg-gradient-to-br from-[#f3fff7] via-[#fcfcfd] to-[#ece9f7] relative overflow-hidden">
    {/* Decorative background blobs */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute top-14 left-1/3 w-32 h-32 bg-[#3ec9a7]/12 rounded-full blur-3xl"></div>
      <div className="absolute bottom-12 right-1/3 w-44 h-44 bg-[#bca8f3]/16 rounded-full blur-3xl"></div>
      <div className="absolute bottom-16 left-20 w-36 h-36 bg-[#4d21b9]/12 rounded-full blur-3xl"></div>
    </div>

    <div className="max-w-6xl mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#2e1967]">Happy Stories</h2>
        <p className="text-xl text-[#3b1769]/85 max-w-3xl mx-auto">
          Real experiences from our satisfied customers across India.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
        {stories.map((story, i) => (
          <div
            key={i}
            className="group bg-gradient-to-br from-white/95 via-[#e7edfb]/95 to-white/100 rounded-3xl shadow-2xl hover:shadow-3xl border border-[#d0c3f5]/40 hover:border-[#3ec9a7]/60 transition-all duration-300 card-hover px-8 py-10 flex flex-col items-center hover:scale-105"
          >
            <div className="relative mb-7">
              <img 
                src={story.avatar} 
                alt={story.name}
                className="w-24 h-24 rounded-full border-4 border-[#3ec9a7]/50 group-hover:border-[#4d21b9]/70 transition-all duration-300 object-cover shadow-lg"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute -top-2 -right-2 bg-[#4d21b9] text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-extrabold shadow-md animate-pulse">
                ★
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#3ec9a7] mb-3 group-hover:text-[#4d21b9] transition-colors duration-300">
              {story.name}
            </h3>
            <div className="flex items-center gap-1 mb-3 justify-center">
              {[...Array(story.rating)].map((_, i) => (
                <span key={i} className="text-[#3ec9a7] text-lg group-hover:text-[#4d21b9] transition-colors">★</span>
              ))}
            </div>
            <p className="text-[#3b1769]/90 text-center italic font-medium leading-relaxed">
              "{story.quote}"
            </p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button className="bg-gradient-to-r from-[#4d21b9] to-[#3ec9a7] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300">
          Share Your Story
        </button>
      </div>
    </div>
  </section>
);

export default CustomerStories;
