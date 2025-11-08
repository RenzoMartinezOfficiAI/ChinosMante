import React from 'react';
import Button from './Button';

const Header: React.FC = () => {
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-orbitron font-bold tracking-wider">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B5CFF] to-[#39E2FF]">
              CHINO MANTE
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#buy-box" onClick={(e) => handleNavClick(e, '#buy-box')} className="text-sm font-medium text-[#B3A8D6] hover:text-white transition-colors">Buy Box</a>
            <a href="#deal-scorecard" onClick={(e) => handleNavClick(e, '#deal-scorecard')} className="text-sm font-medium text-[#B3A8D6] hover:text-white transition-colors">Creative Scorecard</a>
            <a href="#fix-and-flip-scorecard" onClick={(e) => handleNavClick(e, '#fix-and-flip-scorecard')} className="text-sm font-medium text-[#B3A8D6] hover:text-white transition-colors">Fix &amp; Flip Scorecard</a>
            <a href="#scorecard-faq" onClick={(e) => handleNavClick(e, '#scorecard-faq')} className="text-sm font-medium text-[#B3A8D6] hover:text-white transition-colors">FAQ</a>
            <Button
              href="https://calendly.com/thechinomante/zoom-meeting-with-chino"
              variant="secondary"
              className="py-2 px-5 text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a Meeting
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;