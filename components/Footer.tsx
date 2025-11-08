import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pb-8">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-semibold text-white">Have additional questions?</h3>
        <p className="text-[#B3A8D6] mt-2 text-lg">
          Email us at <a href="mailto:support@chinomante.com" className="font-medium text-[#39E2FF] hover:underline transition-colors">support@chinomante.com</a>
        </p>
      </div>
      <div className="border-t border-[#7A6F9A]/30 pt-8 text-center text-[#7A6F9A]">
        <p>&copy; {new Date().getFullYear()} Chino Mante. All rights reserved.</p>
        <p className="text-sm mt-1">Creating stability through real estate.</p>
      </div>
    </footer>
  );
};

export default Footer;