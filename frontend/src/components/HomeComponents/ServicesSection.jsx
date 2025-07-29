import React, { useState, useEffect } from 'react';
import SectionHeading from '../SectionHeading';
import { useNavigate } from "react-router-dom";
import { Bike, Truck, Boxes, PackageSearch, Building2, Zap, Users, CreditCard } from 'lucide-react';

const services = [
  {
    tag: 'Porter Enterprise',
    title: 'Streamlining operations to drive business growth',
    gradient: 'bg-gradient-to-br from-[#2e1967] via-[#42c1f5] to-[#bce9da]',
    icon: <Building2 className="w-12 h-12" />,
    description: 'Enterprise solutions for seamless logistics',
    features: ['API Integration', 'Real-time Tracking', 'Analytics Dashboard']
  },
  {
    tag: 'API Integration',
    title: 'Automate the transportation of your goods by integrating our APIs',
    gradient: 'bg-gradient-to-br from-[#11998e] via-[#38ef7d] to-[#43cea2]',
    icon: <Zap className="w-12 h-12" />,
    description: 'Seamless integration for your business',
    features: ['RESTful APIs', 'Webhooks', 'SDK Support']
  },
  {
    tag: 'Two Wheelers',
    title: 'Reliable goods transportation services for up to 20 kg',
    gradient: 'bg-gradient-to-br from-[#2e1967] via-[#42c1f5] to-[#bce9da]',
    icon: <Bike className="w-12 h-12" />,
    description: 'Quick and efficient delivery',
    features: ['Same Day Delivery', 'Live Tracking', 'Instant Booking']
  },
  {
    tag: 'Trucks',
    title: 'Hassle-free goods transportation up to 2500 kg',
    gradient: 'bg-gradient-to-br from-[#2193b0] via-[#6dd5ed] to-[#2e1967]',
    icon: <Truck className="w-12 h-12" />,
    description: 'Heavy load transportation',
    features: ['Heavy Loads', 'Multiple Stops', 'Professional Drivers']
  },
  {
    tag: 'Packers & Movers',
    title: 'House shifting hai? Ho Jayega!',
    gradient: 'bg-gradient-to-br from-[#2e1967] via-[#42c1f5] to-[#bce9da]',
    icon: <Boxes className="w-12 h-12" />,
    description: 'Complete relocation services',
    features: ['Packing Service', 'Insurance', 'Storage Solutions']
  },
  {
    tag: 'Intercity Courier',
    title: 'Send parcels across India to 19000+ pincodes',
    gradient: 'bg-gradient-to-br from-[#43cea2] via-[#185a9d] to-[#2e1967]',
    icon: <PackageSearch className="w-12 h-12" />,
    description: 'Nationwide delivery network',
    features: ['Pan India', 'COD Available', 'Express Delivery']
  },
  {
    tag: 'Bulk Orders',
    title: 'Smart solutions for bulk transportation and distribution',
    gradient: 'bg-gradient-to-br from-[#ff512f] via-[#dd2476] to-[#2e1967]',
    icon: <Users className="w-12 h-12" />,
    description: 'Large scale logistics',
    features: ['Volume Discounts', 'Dedicated Fleet', 'Custom Solutions']
  },
  {
    tag: 'Express Delivery',
    title: 'Fastest delivery for urgent consignments',
    gradient: 'bg-gradient-to-br from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb]',
    icon: <CreditCard className="w-12 h-12" />,
    description: 'Priority delivery service',
    features: ['Same Day', 'Priority Handling', 'Guaranteed Delivery']
  },
];

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const element = document.querySelector('.services-section');
    if (element) observer.observe(element);
    return () => { if (element) observer.unobserve(element); };
  }, []);

  return (
    <section className="services-section w-full min-h-[100vh] bg-gradient-to-br from-[#e1e6f7] via-[#f3fff7] to-[#cbb2f5] py-20 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-[#9687d6]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-[#90f3e0]/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1.7s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#bce9da]/20 rounded-full blur-3xl animate-float" style={{animationDelay: '3.3s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-[#bcb4e3]/30 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-6 left-1/5 w-32 h-32 bg-[#ffe7e7]/30 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-in-up' : ''}`}>
          <SectionHeading className="text-4xl md:text-5xl font-bold mb-6 text-[#2e1967]">
            Our Services
          </SectionHeading>
          <p className="text-xl text-[#3b1769]/80 max-w-3xl mx-auto leading-relaxed font-medium">
            Comprehensive logistics solutions tailored to meet all your transportation needs.<br />
            From small packages to enterprise solutions, we've got you covered.
          </p>
        </div>
        
        {/* Cards */}
        <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-thin scrollbar-thumb-[#9687d6] scrollbar-track-[#e1e6f7]">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`min-w-[380px] max-w-sm h-[430px] rounded-3xl p-8 flex flex-col justify-between shadow-2xl text-white relative ${service.gradient} card-hover group ${
                isVisible ? 'animate-slide-in-up' : ''
              }`}
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              {/* Floating icon */}
              <div className="absolute top-6 right-6 opacity-30 group-hover:opacity-70 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                {service.icon}
              </div>
              {/* Tag bubble */}
              <span className="absolute top-4 left-4 bg-white/35 text-[#2e1967] font-bold text-xs px-4 py-2 rounded-full backdrop-blur-md border border-white/30 group-hover:bg-white/45 transition-all shadow-md">
                {service.tag}
              </span>
              <div className="mt-16 mb-8 flex-1">
                <h3 className="text-2xl font-bold leading-tight whitespace-pre-line mb-4 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg text-[#fff]">
                  {service.title}
                </h3>
                <p className="text-zinc-50/90 text-sm leading-relaxed mb-4">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-center gap-2 text-zinc-50/70 text-xs">
                      <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Explore Service Button */}
              <button className="mt-auto bg-white/15 text-white rounded-full px-8 py-4 flex items-center justify-between font-bold backdrop-blur-lg w-full group/btn border border-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg">
                <span>Explore Service</span>
                <span className="text-xl ml-1 transition group-hover/btn:translate-x-2 group-hover/btn:rotate-12">→</span>
              </button>
              {/* Hover glow & overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/20 to-transparent blur-2xl"></div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 text-[#2e1967]/70 text-sm bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-[#9687d6]/20">
            <span className="font-medium">Scroll to explore more services</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-[#4d21b9] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#4d21b9] rounded-full animate-bounce" style={{animationDelay: '0.12s'}}></div>
              <div className="w-2 h-2 bg-[#4d21b9] rounded-full animate-bounce" style={{animationDelay: '0.22s'}}></div>
            </div>
          </div>
        </div>
        {/* CTA Button */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-[#4d21b9] to-[#3ec9a7] text-white px-8 py-4 rounded-full inline-flex items-center gap-3 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#4d21b9]/30"
          >
            <span>Ready to get started?</span>
            <span className="text-2xl">🚀</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
