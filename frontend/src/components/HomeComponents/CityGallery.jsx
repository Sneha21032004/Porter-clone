import React from "react";
import delhi from '../../assets/Enterprises/Delhi.webp';
import mumbai from '../../assets/Enterprises/Mumbai.webp';
import bangalore from '../../assets/Enterprises/Bangalore.webp';
import hyderabad from '../../assets/Enterprises/Hyderabad.webp';
import chennai from '../../assets/Enterprises/Chennai.webp';
import pune from '../../assets/Enterprises/Pune.webp';
import ahmedabad from '../../assets/Enterprises/Ahmedabad.webp';
import surat from '../../assets/Enterprises/Surat.webp';
import kolkata from '../../assets/Enterprises/Kolkata.webp';

const cities = [
  { name: 'Delhi NCR', img: delhi },
  { name: 'Mumbai', img: mumbai },
  { name: 'Bengaluru', img: bangalore },
  { name: 'Hyderabad', img: hyderabad },
  { name: 'Chennai', img: chennai },
  { name: 'Pune', img: pune },
  { name: 'Ahmedabad', img: ahmedabad },
  { name: 'Surat', img: surat },
  { name: 'Kolkata', img: kolkata },
];
const CityGallery = () => (
  <section className="city-gallery py-20 bg-gradient-to-br from-[#ece9f7] via-[#fcfcfd] to-[#f3fff7] relative overflow-hidden">
    {/* Decorative background blobs */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute top-16 left-1/4 w-44 h-44 bg-[#bca8f3]/20 rounded-full blur-3xl"></div>
      <div className="absolute top-28 right-10 w-40 h-40 bg-[#3ec9a7]/15 rounded-full blur-2xl"></div>
      <div className="absolute bottom-12 left-12 w-52 h-52 bg-[#4d21b9]/20 rounded-full blur-3xl"></div>
    </div>

    <div className="max-w-6xl mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#2e1967]">
          Cities We Love to Serve
        </h2>
        <p className="text-xl text-[#3b1769]/85 max-w-3xl mx-auto">
          From bustling metros to charming cities, we're connecting communities across India.
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {cities.map((city) => (
          <div 
            key={city.name}
            className="group relative bg-gradient-to-br from-white/95 via-[#e7edfb]/95 to-white/100 rounded-3xl shadow-2xl hover:shadow-3xl border border-[#d0c3f5]/40 hover:border-[#3ec9a7]/60 overflow-hidden transition-all duration-300 card-hover hover:scale-105"
          >
            {/* City Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={city.img} 
                alt={city.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              {/* Color overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4d21b9]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            {/* City Name Badge */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 px-6 py-2 rounded-full shadow-lg border border-[#4d21b9]/10 text-center z-10 transition-all duration-300 group-hover:bg-[#3ec9a7]/95">
              <span className="text-lg font-bold text-[#4d21b9] group-hover:text-white transition-colors duration-300 tracking-wide">
                {city.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <p className="text-[#3b1769]/85 text-lg font-semibold">
          And many more cities coming soon! 🚀
        </p>
      </div>
    </div>
  </section>
);

export default CityGallery;
