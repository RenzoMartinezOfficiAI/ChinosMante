import React, { useState, useEffect, useRef } from 'react';
import { CheckCircleIcon } from './Icons';

interface BuyBoxCardProps {
  title: string;
  description: string;
  bullets: string[];
  ctaText: string;
}

const BuyBoxCard: React.FC<BuyBoxCardProps> = ({ title, description, bullets, ctaText }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-opacity transition-transform duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="bg-[#120926]/50 border border-[#39E2FF]/30 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden h-full flex flex-col
                      shadow-[0_0_15px_rgba(57,226,255,0.1),0_0_25px_rgba(155,92,255,0.08)]
                      hover:border-[#39E2FF]/60 
                      hover:shadow-[0_0_25px_rgba(57,226,255,0.25),0_0_45px_rgba(155,92,255,0.2)]
                      hover:-translate-y-2
                      transition-all duration-300 ease-in-out">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#9B5CFF] to-transparent"></div>
        <h3 className="text-2xl font-orbitron font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#F7F5FF] to-[#B3A8D6]">{title}</h3>
        <p className="text-[#B3A8D6] mb-6 flex-grow-0">{description}</p>
        
        <ul className="space-y-3 mb-6 flex-grow">
          {bullets.map((bullet, index) => {
              const parts = bullet.split(':');
              const label = parts[0];
              const content = parts.slice(1).join(':');

              return (
                   <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-[#C5FF3A] mr-3 flex-shrink-0" />
                      <span>
                        <strong className="text-white">{label}:</strong>
                        <span className="text-[#B3A8D6]">{content}</span>
                      </span>
                  </li>
              );
          })}
        </ul>

        <p className="mt-auto text-sm bg-[#05020B] border border-[#7A6F9A]/30 rounded-md p-3 text-[#B3A8D6] italic">
          {ctaText}
        </p>
      </div>
    </div>
  );
};

export default BuyBoxCard;