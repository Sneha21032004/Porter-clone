// import React from "react";
// import reactLogo from '../../assets/react.svg';

// const WelcomeBanner = () => (
//   <section className="welcome-banner py-12 bg-gradient-to-br from-[var(--primary-bg)] via-[var(--white)] to-[var(--secondary-bg)] relative overflow-hidden flex flex-col text-center min-h-[80vh]">
//     {/* Background image from Unsplash */}
//     <div 
//       className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 "
//       style={{
//         backgroundImage: `url('https://mobibox.com.au/blog/wp-content/uploads/2022/01/reasons-you-should-let-movers-load-your-mobibox.jpg')`,
//         opacity: 0.8,
//         filter: 'brightness(0.8) contrast(1.2)',
//         backgroundSize: 'cover',
//         backgroundPosition: 'top',
//         backgroundRepeat: 'no-repeat'
//       }}
//     ></div>
    
//     {/* Background decorative elements */}
//     <div className="absolute inset-0 pointer-events-none">
//       <div className="absolute top-20 left-10 w-32 h-32 bg-[var(--primary-color)]/10 rounded-full blur-3xl animate-float"></div>
//       <div className="absolute bottom-20 right-10 w-40 h-40 bg-[var(--secondary-color)]/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[var(--primary-color)]/5 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
//     </div>

//     {/* Sab Easy Ha text overlay in top-left corner */}
//     <div className="absolute top-6 left-6 z-20">
//       <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)] drop-shadow-lg bg-[var(--white)]/90 backdrop-blur-sm px-6 py-3 rounded-full inline-block">
//         # Sab Easy Ha
//       </h2>
//     </div>

//     <div className="relative z-10">
//       <div className="bg-[var(--white)]/80 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-[var(--primary-color)]/20 mb-8 inline-block">
//         <img src={reactLogo} alt="Welcome" className="w-20 h-20 animate-spin-slow" />
//       </div>
      
//       <h1 className="text-6xl md:text-7xl font-extrabold mb-6 gradient-text drop-shadow-lg">
//         Welcome to MoveEasy!
//       </h1>
      
//       <p className="text-xl md:text-2xl text-slate-800 mb-10 max-w-2xl mx-auto leading-relaxed">
//         Experience a new way to move your world. Fast, friendly, and always reliable—your journey starts here.
//       </p>
      
//       <div className="flex flex-col sm:flex-row gap-4 justify-center">
//         <button className="bg-[var(--primary-color)] text-[var(--white)] px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[var(--primary-dark)] transition-all duration-300 transform hover:scale-105 button-glow">
//           Get Started
//         </button>
//         <button className="border-2 border-[var(--secondary-color)] text-[var(--secondary-color)] px-8 py-4 rounded-full font-bold text-lg hover:bg-[var(--secondary-color)] hover:text-[var(--white)] transition-all duration-300 transform hover:scale-105">
//           Learn More
//         </button>
//       </div>
//     </div>
//   </section>
// );

// export default WelcomeBanner; 
// import React from "react";
// import { FaTruckMoving } from "react-icons/fa";
// import italyBanner from '../../assets/italyBanner.jpg'; // Make sure this file exists

// const WelcomeBanner = () => (
//   <section className="welcome-banner py-12 relative overflow-hidden flex flex-col text-center min-h-[85vh] bg-[#24143c]">
//     {/* Italy background image */}
//     <div
//       className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
//       style={{
//         backgroundImage: `url(${italyBanner})`,
//         opacity: 0.9,
//         filter: "brightness(0.96) contrast(1.1)"
//       }}
//     />
    
//     {/* Decorative pastel blur shapes */}
//     <div className="absolute inset-0 pointer-events-none z-10">
//       <div className="absolute top-16 left-10 w-28 h-28 bg-[#bca8f3]/40 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-16 right-14 w-36 h-36 bg-[#3ec9a7]/40 rounded-full blur-3xl"></div>
//       <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-[#bca8f3]/30 rounded-full blur-3xl"></div>
//     </div>
    
//     {/* Tagline at top-left */}
//     <div className="absolute top-6 left-6 z-20">
//       <h2 className="text-2xl md:text-3xl font-bold text-[#4d21b9] drop-shadow-lg bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full inline-block shadow">
//         🇮🇹 # Italy Moves Easy
//       </h2>
//     </div>
    
//     {/* Main Content */}
//     <div className="relative z-20 flex flex-col items-center justify-center flex-1 mt-[7vh]">
//       {/* Truck icon badge */}
//       <div className="inline-flex items-center justify-center bg-white/75 backdrop-blur-md rounded-full p-6 shadow-xl border border-[#4d21b9]/30 mb-6">
//         <FaTruckMoving className="text-[#4d21b9] text-5xl md:text-6xl" />
//       </div>
//       <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-[#4d21b9] via-[#3ec9a7] to-[#3b1769] text-transparent bg-clip-text drop-shadow-lg">
//         Benvenuto a MoveEasy!
//       </h1>
//       <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow">
//         Servizi di trasporto e consegna affidabili in tutta Italia.<br/>Facile, veloce e professionale.
//       </p>
//       <div className="flex flex-col sm:flex-row gap-4 justify-center">
//         <button
//           className="bg-[#4d21b9] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#3b1769] transition-all duration-300 transform hover:scale-105"
//         >
//           Inizia Subito
//         </button>
//         <button
//           className="border-2 border-[#3ec9a7] text-[#3ec9a7] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#3ec9a7] hover:text-white transition-all duration-300 transform hover:scale-105"
//         >
//           Scopri di più
//         </button>
//       </div>
//     </div>
//   </section>
// );

// export default WelcomeBanner;
import React, { useState, useEffect } from "react";
import { FaTruckMoving } from "react-icons/fa";

// Import your images

import img2 from '../../assets/claudio-schwarz-a85IYeAXgxU-unsplash.jpg';
import img3 from '../../assets/kazem-hussein-Kq1ERpkH0eQ-unsplash.jpg';
import img4 from '../../assets/rowan-freeman-clYlmCaQbzY-unsplash.jpg';

const images = [
 
  { src: img2, alt: "Florence Bridge", caption: "Florence, Italy" },
  { src: img3, alt: "Positano Coast", caption: "Amalfi Coast" },
  { src: img4, alt: "Positano Coast", caption: "Amalfi Coast – Evening" },
];

const WelcomeBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => setCurrent((prev) => (prev + 1) % images.length),
      3900
    );
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Animated image slides */}
      <div className="absolute inset-0 w-full h-full z-0">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={img.alt}
            className={`
              absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out
              ${idx === current ? "opacity-100 z-[2]" : "opacity-0 z-[1]"}
            `}
            style={{ transition: 'opacity 1200ms cubic-bezier(0.4,0,0.2,1)' }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>
      </div>

      {/* Top Left Tagline */}
      <div className="absolute top-6 left-6 z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#4d21b9] drop-shadow-lg bg-white/90 px-6 py-3 rounded-full inline-block shadow">
          # Italy Moves Easy
        </h2>
      </div>

      {/* Main Content */}
      <div className="relative z-20 mt-10 flex flex-col items-center">
        <div className="inline-flex items-center justify-center bg-white/75 rounded-full p-6 shadow-xl border border-[#4d21b9]/30 mb-6">
          <FaTruckMoving className="text-[#4d21b9] text-5xl md:text-6xl" />
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-300 drop-shadow-lg">
          Benvenuto a MoveEasy!
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-medium drop-shadow">
          Servizi di trasporto e consegna affidabili in tutta Italia. <br /> Facile, veloce e professionale.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#4d21b9] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#3b1769] transition-all">
            Inizia Subito
          </button>
          <button className="border-2 border-[#3ec9a7] text-[#3ec9a7] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#3ec9a7] hover:text-white transition-all">
            Scopri di più
          </button>
        </div>
      </div>

      {/* Caption at the bottom for each image */}
      <div className="absolute bottom-8 w-full flex justify-center z-10">
        <div className="bg-black/50 text-white px-6 py-2 rounded-full font-semibold shadow">
          {images[current].caption}
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
