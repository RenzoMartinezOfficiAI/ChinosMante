import React from 'react';
import Button from './Button';

const Hero: React.FC = () => {
  return (
    <section className="text-center pt-20">
      <div className="relative isolate">
        <div 
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_50%_50%,#2D0F4F_0%,rgba(18,9,38,0)_100%)] opacity-60"
          aria-hidden="true"
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-extrabold tracking-tight">
          <span className="block">Turn Impact-Ready Deals</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B5CFF] to-[#FF4FD8] mt-2">
            Into Stable Futures
          </span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-[#B3A8D6] leading-8">
          We turn distressed real estate into opportunities for both financial returns and genuine human stability. If your deal fits, we move fast. If not, we'll guide you to the right place.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            href="https://calendly.com/thechinomante/zoom-meeting-with-chino"
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Schedule a Meeting
          </Button>
          <Button href="#deal-scorecard" variant="secondary">Score Your Deal</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;