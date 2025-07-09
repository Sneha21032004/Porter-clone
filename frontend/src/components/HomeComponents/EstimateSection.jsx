import React, { useState, useEffect } from 'react';
import SectionHeading from '../SectionHeading';
import EstimateModal from './EstimateModal';
import { useNavigate } from 'react-router-dom';
import { Bike, Car, Truck } from 'lucide-react';

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
  'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara'
];

const EstimateSection = ({login}) => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [isVisible, setIsVisible] = useState(false);
  const [isEstimating, setIsEstimating] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.estimate-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Dummy distance for price calculation
  const dummyDistance = 12; // in km
  const vehicleRates = {
    two_wheelers: 10, // per km
    trucks: 30,
    packers_movers: 25,
    intercity_courier: 15
  };

  const handleEstimate = () => {
    if(login){
      setModalOpen(true);
    }else{
      navigate('/login');
    }
  };

  const handleModalSubmit = (form) => {
    // form.service, form.pickup, form.drop, etc.
    const rate = vehicleRates[form.service] || 10;
    const calculatedPrice = dummyDistance * rate;
    navigate('/estimate/confirm', {
      state: {
        pickup: form.pickup,
        drop: form.drop,
        vehicle: form.service,
        price: calculatedPrice,
        distance: dummyDistance,
        name: form.name,
        phone: form.phone,
        userType: form.userType
      }
    });
  };

  return (
    <section className="estimate-section w-full bg-gradient-to-br from-[var(--primary-bg)] via-[var(--white)] to-[var(--secondary-bg)] py-20 relative overflow-hidden">
      <EstimateModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleModalSubmit} />
      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[var(--primary-color)]/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[var(--secondary-color)]/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[var(--primary-color)]/5 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-[var(--secondary-color)]/15 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-in-up' : ''}`}>
          <SectionHeading className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Get Your Free Estimate
          </SectionHeading>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Get an instant quote for your transportation needs. Quick, accurate, and completely free!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Estimate Card */}
          <div className={`${isVisible ? 'animate-slide-in-up' : ''}`} style={{animationDelay: '0.2s'}}>
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl text-[var(--text-primary)] p-8 border border-[var(--primary-color)]/20 relative overflow-hidden">

              {/* Enhanced City Selector */}
              <div className="flex items-center space-x-4 border-b border-[var(--primary-color)]/20 pb-6 mb-8">
                <div className="p-3 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Select Your City</label>
                  <select
                    className="w-full font-bold text-lg focus:outline-none hover:text-[var(--primary-color)] transition-colors duration-200 bg-transparent border-none"
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vehicle Images with Lucide Icons */}
              <div className="flex justify-center space-x-8 mb-8">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Bike className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-[var(--text-secondary)]">Bike</span>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Car className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-[var(--text-secondary)]">Car</span>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Truck className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-[var(--text-secondary)]">Truck</span>
                </div>
              </div>

              {/* Enhanced Estimate Button - Made Smaller */}
              <div className="space-y-6">
                <button 
                  onClick={handleEstimate}
                  disabled={isEstimating}
                  className="relative bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white rounded-xl px-8 py-3 flex items-center justify-center shadow-lg hover:shadow-xl transition-all w-full hover:scale-105 button-glow overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isEstimating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      <span className="font-semibold text-base">Processing...</span>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-base relative z-10">Get Free Estimate</span>
                      <span className="text-2xl ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </>
                  )}
                </button>

                {/* Enhanced Quick Stats */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[var(--primary-color)]/20">
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-[var(--primary-color)] group-hover:scale-110 transition-transform duration-300">21+</div>
                    <div className="text-sm text-[var(--text-secondary)] font-medium">Cities</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-[var(--primary-color)] group-hover:scale-110 transition-transform duration-300">7.5L+</div>
                    <div className="text-sm text-[var(--text-secondary)] font-medium">Drivers</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-[var(--primary-color)] group-hover:scale-110 transition-transform duration-300">24/7</div>
                    <div className="text-sm text-[var(--text-secondary)] font-medium">Support</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Floating elements */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-[var(--primary-color)]/20 rounded-full animate-float shadow-lg"></div>
              <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[var(--secondary-color)]/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
            </div>
          </div>

          {/* Enhanced Features Section */}
          <div className={`space-y-8 ${isVisible ? 'animate-slide-in-up' : ''}`} style={{animationDelay: '0.4s'}}>
            <div>
              <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
                Why Choose Our Estimate Service?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2">Instant Quotes</h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed">Get accurate estimates within minutes, not hours or days.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2">No Hidden Costs</h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed">Transparent pricing with no surprise charges or hidden fees.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2">Fast Service</h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed">Quick response times and efficient service delivery.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-[var(--primary-color)]/10">
              <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">Trusted by Millions</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--primary-color)]">4.8★</div>
                  <div className="text-sm text-[var(--text-secondary)]">Customer Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--primary-color)]">10M+</div>
                  <div className="text-sm text-[var(--text-secondary)]">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstimateSection; 