import React from 'react';
import qr from '../assets/qr.png';

const companyLinks = ['About Us', 'Careers', 'Blog'];
const quickLinks = [
  'API Integrations', 'InterCity Courier', 'Packers & Movers', 'Two Wheelers', 'Trucks', 'Porter Enterprise'
];
const supportLinks = [
  'Contact Us', 'Privacy Policy', 'Terms of Service', 'Terms of Service - SSI', 'Insurance FAQs',
  'Driver Partner Terms & Conditions', 'Zero Tolerance Policy'
];
const countries = ['United Arab Emirates', 'Turkey', 'Bangladesh'];
const domesticCities = [
  'Delhi NCR', 'Chandigarh', 'Ahmedabad', 'Coimbatore', 'Visakhapatnam', 'Hyderabad', 'Jaipur', 'Surat', 'Ludhiana', 'Trivandrum',
  'Bangalore', 'Chennai', 'Nagpur', 'Kochi', 'Mumbai', 'Kolkata', 'Lucknow', 'Nashik', 'Vadodara', 'Indore', 'Pune', 'Kanpur'
];

const socialIcons = [
  { icon: '📘', name: 'Facebook', link: '#' },
  { icon: '🐦', name: 'Twitter', link: '#' },
  { icon: '📷', name: 'Instagram', link: '#' },
  { icon: '💼', name: 'LinkedIn', link: '#' },
  { icon: '📺', name: 'YouTube', link: '#' },
];
export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#ece9f7] via-[#fcfcfd] to-[#f3fff7] text-[#2e1967] pt-16 pb-8 relative overflow-hidden">
      {/* Decorative blurred blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-36 h-36 bg-[#bca8f3]/25 rounded-full blur-3xl"></div>
        <div className="absolute bottom-12 right-16 w-48 h-48 bg-[#3ec9a7]/18 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#4d21b9]/14 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Logo + Social + QR */}
          <div className="lg:w-1/3 flex flex-col items-start">
            <div className="mb-7">
              <h2 className="text-3xl font-extrabold text-[#4d21b9] mb-1 tracking-tight">MoveEase</h2>
              <p className="text-[#3b1769]/90 text-sm leading-relaxed font-medium">
                India's most delightful way to move. Fast, friendly, and always reliable.
              </p>
            </div>
            <div className="mb-8 w-full">
              <h3 className="font-semibold mb-4 text-base text-[#4d21b9]">Follow us on</h3>
              <div className="flex gap-4">
                {socialIcons.map((social, i) => (
                  <a 
                    key={i} 
                    href={social.link} 
                    className="w-12 h-12 bg-gradient-to-br from-[#4d21b9] to-[#3ec9a7] rounded-full flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-300 group"
                    title={social.name}
                  >
                    <span className="text-xl group-hover:rotate-12 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <div className="w-full">
              <h3 className="font-semibold mb-4 text-base text-[#4d21b9]">Download our app</h3>
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 border border-[#d0c3f5]/30 shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4d21b9] to-[#3ec9a7] rounded-xl flex items-center justify-center">
                    <span className="text-white text-2xl">📱</span>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-[#2e1967]">MoveEase App</div>
                    <div className="text-xs text-[#3b1769]/80">Get instant delivery estimates</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={qr}
                    alt="QR Code"
                    className="w-20 h-20 bg-white p-2 rounded-lg shadow-md"
                  />
                  <div className="text-xs text-[#3b1769]/80">
                    Scan QR code to download<br />
                    <span className="text-[#4d21b9] font-bold">Available on iOS &amp; Android</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h3 className="font-semibold text-base text-[#4d21b9]">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-[#3b1769]/80 hover:text-[#4d21b9] transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="font-semibold text-base text-[#4d21b9]">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-[#3b1769]/80 hover:text-[#4d21b9] transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="font-semibold text-base text-[#4d21b9]">Support</h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-[#3b1769]/80 hover:text-[#4d21b9] transition-colors duration-200 hover:translate-x-1 inline-block text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Countries Section */}
        <div className="mt-12 pt-8 border-t border-[#bca8f3]/30">
          <h3 className="font-semibold mb-4 text-base text-[#4d21b9]">International Presence</h3>
          <div className="flex flex-wrap gap-3">
            {countries.map((country) => (
              <span 
                key={country}
                className="px-4 py-2 bg-[#4d21b9]/10 backdrop-blur-md rounded-full text-sm border border-[#4d21b9]/20 hover:bg-[#3ec9a7]/15 transition-all duration-200 cursor-pointer font-medium text-[#2e1967]"
              >
                {country}
              </span>
            ))}
          </div>
        </div>

        {/* Domestic Cities "Cloud" */}
        <div className="mt-8">
          <h3 className="font-semibold mb-4 text-base text-[#4d21b9]">Serving Indian Cities</h3>
          <div className="flex flex-wrap gap-2">
            {domesticCities.map(city => (
              <span
                key={city}
                className="px-3 py-1 bg-[#3ec9a7]/9 rounded-full border border-[#4d21b9]/12 
                  text-xs md:text-sm text-[#2e1967] font-medium hover:bg-[#bca8f3]/15
                  transition-all duration-200"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 pt-8 border-t border-[#bca8f3]/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-[#3b1769]/65 text-xs mb-2">
              &copy; {new Date().getFullYear()} MoveEase. All rights reserved.
            </p>
            <p className="text-[#4d21b9] text-xs font-bold">
              Built with ❤️ for a better moving experience
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
