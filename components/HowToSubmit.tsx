import React, { useState, useMemo } from 'react';
import { FIX_AND_FLIP_SUBMISSION_DATA, FIX_AND_FLIP_DEAL_RATING_DATA } from '../constants';
import { FixAndFlipSectionData, FixAndFlipChecklistSection, FixAndFlipChecklistItem } from '../types';
import { InfoIcon } from './Icons';

const ChecklistItem: React.FC<{ item: FixAndFlipChecklistItem; isChecked: boolean; onCheck: (id: string) => void; }> = ({ item, isChecked, onCheck }) => {
  const Tag: React.FC<{ type: 'REQUIRED' | 'IDEAL' }> = ({ type }) => {
    const baseClasses = 'text-xs font-bold px-3 py-1 rounded-full';
    const typeClasses = type === 'REQUIRED' ? 'bg-blue-500/20 text-blue-300' : 'bg-teal-500/20 text-teal-300';
    const pointsText = type === 'IDEAL' ? '+1 point if data given' : '';
    return (
      <div className="flex items-center gap-4">
        <span className={`${baseClasses} ${typeClasses}`}>{type}</span>
        {pointsText && <span className="text-xs text-gray-400 hidden sm:block">{pointsText}</span>}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-white/5 transition-colors">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={item.id}
          checked={isChecked}
          onChange={() => onCheck(item.id)}
          className="h-6 w-6 flex-shrink-0 rounded bg-transparent border-2 border-[#7A6F9A] text-[#9B5CFF] focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-[#9B5CFF] cursor-pointer"
        />
        <label htmlFor={item.id} className="ml-4 text-[#B3A8D6] cursor-pointer">
          {item.label}
          {item.subLabel && <span className="text-sm text-[#7A6F9A] block">{item.subLabel}</span>}
        </label>
      </div>
      <Tag type={item.type} />
    </div>
  );
};

const Section: React.FC<{ section: FixAndFlipChecklistSection; checkedItems: { [key: string]: boolean }; onCheck: (id: string) => void; score: number }> = ({ section, checkedItems, onCheck, score }) => (
  <div className="bg-[#05020B]/50 border border-[#39E2FF]/10 rounded-xl p-4 sm:p-6">
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-bold text-white text-lg">{section.title}</h4>
      <span className="text-xs text-[#7A6F9A] font-medium">REQUIRED/IDEAL</span>
    </div>
    <div className="divide-y divide-[#7A6F9A]/20">
      {section.items.map(item => (
        <ChecklistItem key={item.id} item={item} isChecked={!!checkedItems[item.id]} onCheck={onCheck} />
      ))}
    </div>
    {section.scoreLabel && (
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#7A6F9A]/20">
        <span className="font-bold text-white">{section.scoreLabel}</span>
        <span className="font-orbitron text-2xl font-bold text-[#39E2FF]">{score}</span>
      </div>
    )}
  </div>
);

const Checklist: React.FC<{ data: FixAndFlipSectionData; checkedItems: { [key: string]: boolean }; onCheck: (id: string) => void; scores: { [key: string]: number } }> = ({ data, checkedItems, onCheck, scores }) => {
  const sidebarStyles = {
    CRITICAL: 'bg-red-800/80 border-red-500',
    WARNING: 'bg-yellow-800/80 border-yellow-500',
    INFO: 'bg-gray-800/80 border-gray-500',
  };

  return (
    <div className="mt-8">
      <h3 className="font-orbitron text-2xl sm:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-4">
        <InfoIcon className="w-8 h-8 text-[#39E2FF]" /> {data.heading}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.sections.map((section, index) => (
          <div key={section.title} className="flex flex-col gap-4">
            {section.sidebarNote && (
              <div className={`p-4 rounded-lg text-center text-white font-semibold border-2 ${sidebarStyles[section.sidebarNote.level]}`}>
                {section.sidebarNote.text}
              </div>
            )}
            <Section section={section} checkedItems={checkedItems} onCheck={onCheck} score={scores[section.title] || 0} />
          </div>
        ))}
      </div>
    </div>
  );
};

const FixAndFlipScorecard: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const handleCheckChange = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const calculateScore = (sections: FixAndFlipChecklistSection[]) => {
    return sections.reduce((total, section) => {
      const sectionScore = section.items.reduce((acc, item) => {
        if (item.type === 'IDEAL' && checkedItems[item.id]) {
          return acc + 1;
        }
        return acc;
      }, 0);
      return total + sectionScore;
    }, 0);
  };

  const scores = useMemo(() => {
    const submissionIdealSections = FIX_AND_FLIP_SUBMISSION_DATA.sections.filter(s => s.scoreLabel || s.items.some(i => i.type === 'IDEAL'));
    const submissionScore = calculateScore(submissionIdealSections);

    const compsSection = FIX_AND_FLIP_DEAL_RATING_DATA.sections.find(s => s.title === 'COMPS');
    const compsScore = compsSection ? calculateScore([compsSection]) : 0;

    const arvSection = FIX_AND_FLIP_DEAL_RATING_DATA.sections.find(s => s.title === 'ARV');
    const arvScore = arvSection ? calculateScore([arvSection]) : 0;
    
    return {
      'PROPERTY DETAILS': submissionScore,
      'COMPS': compsScore,
      'ARV': arvScore,
    };
  }, [checkedItems]);
  
  const isDealKiller = useMemo(() => {
     const buyboxSection = FIX_AND_FLIP_DEAL_RATING_DATA.sections.find(s => s.dealKiller);
     if (!buyboxSection) return false;
     return buyboxSection.items.some(item => checkedItems[item.id]);
  }, [checkedItems]);

  return (
    <section id="fix-and-flip-scorecard" className="mt-20 sm:mt-32">
      <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-center mb-4">
        Submission & Deal Rating for Fix & Flips
      </h2>
      <p className="text-center text-lg text-[#B3A8D6] max-w-3xl mx-auto mb-4">
        Use this checklist to evaluate your fix and flip deal. The more items checked, the better the deal.
      </p>
      <p className="text-center text-lg text-[#B3A8D6] max-w-3xl mx-auto mb-12">
        If the deal fits the Fix and Flip buybox, please email <a href="mailto:fixandflip@chinomante.com" className="font-medium text-[#39E2FF] hover:underline transition-colors">fixandflip@chinomante.com</a>.
      </p>

      <Checklist data={FIX_AND_FLIP_SUBMISSION_DATA} checkedItems={checkedItems} onCheck={handleCheckChange} scores={scores} />
      <Checklist data={FIX_AND_FLIP_DEAL_RATING_DATA} checkedItems={checkedItems} onCheck={handleCheckChange} scores={scores} />
      
      {isDealKiller && (
        <div className="mt-8 text-center p-6 rounded-lg border-2 border-red-500 bg-red-800/80 max-w-3xl mx-auto">
          <h3 className="font-orbitron text-2xl font-bold text-white">NOT A GOOD DEAL</h3>
          <p className="text-red-200 mt-2">Based on your selections in the 'BUYBOX' section, this deal does not meet our minimum criteria.</p>
        </div>
      )}
    </section>
  );
};

export default FixAndFlipScorecard;