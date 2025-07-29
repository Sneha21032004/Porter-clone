import React from "react";

const partners = [
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' },
  { name: 'Flipkart', logo: 'https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png' },
  { name: 'DHL', logo: 'https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg' },
];
const PartnersTrust = () => (
  <section className="partners-trust py-20 bg-gradient-to-br from-[#f3fff7] via-[#fcfcfd] to-[#ece9f7] relative overflow-hidden">
    {/* Decorative blobs for harmony */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute top-14 left-1/3 w-44 h-44 bg-[#3ec9a7]/15 rounded-full blur-3xl"></div>
      <div className="absolute top-28 right-1/3 w-48 h-48 bg-[#bca8f3]/14 rounded-full blur-3xl"></div>
      <div className="absolute bottom-8 left-16 w-36 h-36 bg-[#4d21b9]/12 rounded-full blur-2xl"></div>
    </div>

    <div className="max-w-5xl mx-auto px-4 relative z-10">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#2e1967]">
          Trusted by Partners
        </h2>
        <p className="text-xl text-[#3b1769]/85 max-w-2xl mx-auto">
          We're proud to be trusted by leading businesses and thousands of happy customers.
        </p>
      </div>

      {/* Partner Logos */}
      <div className="flex flex-wrap justify-center gap-12 items-center">
        {partners.map((p, i) => (
          <div key={i} className="flex flex-col items-center group">
            <div
              className="bg-white/95 rounded-3xl shadow-xl border border-[#d0c3f5]/40 p-6 mb-4 flex items-center justify-center
                transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              style={{
                height: '110px',
                width: '110px',
                background: 'rgba(255,255,255,0.96)',
                backdropFilter: 'blur(2px)'
              }}
            >
              <img
                src={p.logo}
                alt={p.name}
                className="max-w-[90px] max-h-14 object-contain transition duration-500 group-hover:scale-105"
                loading="lazy"
                draggable={false}
              />
            </div>
            <span className="text-base sm:text-lg font-semibold text-[#4d21b9] tracking-wide group-hover:text-[#3ec9a7] transition-colors duration-300">
              {p.name}
            </span>
          </div>
        ))}
      </div>

      {/* Trust Statement */}
      <div className="text-center mt-12">
        <p className="text-[#3b1769]/85 text-lg font-medium">
          Your trust is our greatest asset.<br className="hidden sm:inline" /> 
          We use secure technology and verified partners for every move.
        </p>
      </div>
    </div>
  </section>
);

export default PartnersTrust;
