import React, { useState, useMemo } from 'react';
import { SCORECARD_DATA } from '../constants';
import { ScorecardScores } from '../types';
import { InfoIcon } from './Icons';
import Button from './Button';

const DealScorecard: React.FC = () => {
  const initialScores: ScorecardScores = {
    balloonPayment: -1,
    asIsValue: -1,
    ltrCashFlow: -1,
    rehabNeeded: -1,
    entryFee: -1,
    interestRate: -1,
  };

  const [scores, setScores] = useState<ScorecardScores>(initialScores);

  const handleScoreChange = (id: keyof ScorecardScores, value: number) => {
    setScores(prev => ({ ...prev, [id]: value }));
  };

  const { averageScore, isComplete, resultText, scoreColor, progress } = useMemo(() => {
    const validScores = Object.values(scores).filter(s => s !== -1);
    if (validScores.length !== 6) {
      return { averageScore: 0, isComplete: false, resultText: 'Complete all fields to see your score.', scoreColor: 'text-[#7A6F9A]', progress: 0 };
    }

    // Fix: Explicitly providing the generic type to `reduce` ensures that the
    // accumulator (`acc`) is correctly typed as a number, resolving the arithmetic error.
    const total = validScores.reduce<number>((acc, curr) => acc + Number(curr), 0);
    const average = total / 6;
    const isGoodDeal = average >= 6;
    
    return {
      averageScore: average,
      isComplete: true,
      resultText: isGoodDeal ? 'This looks like a good deal!' : 'This deal may need a closer look.',
      scoreColor: isGoodDeal ? 'text-[#C5FF3A]' : 'text-[#FF4FD8]',
      progress: (average / 10) * 100,
    };
  }, [scores]);

  return (
    <section id="deal-scorecard" className="mt-20 sm:mt-32">
      <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-center mb-4">
        Is This A Good Deal?
      </h2>
      <p className="text-center text-lg text-[#B3A8D6] max-w-3xl mx-auto mb-12">
        Use our rubric to get a quick read on your deal's strength. Select an option from each category to see how it scores.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scorecard Inputs */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCORECARD_DATA.map(({ id, title, subtitle, Icon, options, tooltip }) => (
            <div key={id} className="bg-[#120926]/50 border border-[#39E2FF]/20 rounded-xl p-6 shadow-lg h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <Icon className="w-8 h-8 text-[#9B5CFF] mr-3"/>
                  <div>
                      <h4 className="text-lg font-bold text-white">{title}</h4>
                      {subtitle && <p className="text-xs text-[#7A6F9A]">{subtitle}</p>}
                  </div>
                </div>
                <div className="relative group flex-shrink-0">
                  <InfoIcon className="w-5 h-5 text-[#7A6F9A] cursor-pointer hover:text-white transition-colors" />
                  <div className="absolute bottom-full right-0 mb-2 w-64 bg-[#05020B] border border-[#9B5CFF]/50 text-[#B3A8D6] text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 p-3">
                      {tooltip}
                  </div>
                </div>
              </div>
              <div className="relative">
                <select
                  onChange={(e) => handleScoreChange(id, Number(e.target.value))}
                  value={scores[id]}
                  className="w-full bg-[#05020B] border border-[#7A6F9A]/50 rounded-md py-3 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#9B5CFF] transition-all"
                >
                  {options.map(opt => (
                    <option key={opt.label} value={opt.value} disabled={opt.value === -1}>{opt.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#9B5CFF]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scorecard Result */}
        <div className="bg-gradient-to-b from-[#120926] to-[#05020B] border border-[#9B5CFF]/30 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_25px_rgba(155,92,255,0.2)]">
            <h3 className="text-2xl font-orbitron font-bold mb-2">Deal Score</h3>
            <p className="text-[#B3A8D6] text-sm mb-6">Average score based on your inputs.</p>
            <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-[#05020B]" strokeWidth="8" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" />
                    <circle 
                        className={isComplete ? (averageScore >=6 ? 'text-[#C5FF3A]' : 'text-[#FF4FD8]') : 'text-[#39E2FF]'}
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 42}
                        strokeDashoffset={2 * Math.PI * 42 * (1 - (isComplete ? progress : 0) / 100)}
                        strokeLinecap="round"
                        stroke="currentColor" 
                        fill="transparent" 
                        r="42" cx="50" cy="50"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s ease-out' }}
                    />
                </svg>
                <span className={`font-orbitron text-4xl font-bold transition-colors duration-500 ${isComplete ? scoreColor : 'text-white'}`}>
                    {isComplete ? averageScore.toFixed(1) : '-'}
                </span>
            </div>
            <p className="mt-6 text-lg font-semibold h-12 flex items-center justify-center">{resultText}</p>
            
            <div className="mt-6 pt-6 w-full border-t border-[#7A6F9A]/30">
                <h4 className="text-xl font-bold text-white">Ready to Submit?</h4>
                <p className="text-[#B3A8D6] text-sm mt-2 mb-4 max-w-xs mx-auto">
                  Attach all the good stuff–photos, address, purchase price, and why you think it’s a winner.
                </p>
                <Button
                  href="mailto:deals@chinomante.com"
                  variant="primary"
                  className="w-full"
                >
                  deals@chinomante.com
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default DealScorecard;