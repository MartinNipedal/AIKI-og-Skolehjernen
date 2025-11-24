
import React, { useState, useEffect } from 'react';
import { ConnectTask } from '../../types';
import { Check } from 'lucide-react';

interface Props {
  task: ConnectTask;
  onComplete: (k: number, e: number) => void;
}

export const TaskConnect: React.FC<Props> = ({ task, onComplete }) => {
  const [leftSelected, setLeftSelected] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]); // Array of pair IDs
  const [shuffledRight, setShuffledRight] = useState<any[]>([]);

  useEffect(() => {
      // Shuffle right side on mount
      const rightItems = task.pairs.map(p => ({ id: p.id, text: p.right }));
      setShuffledRight(rightItems.sort(() => Math.random() - 0.5));
      setMatchedPairs([]);
  }, [task]);

  const handleLeftClick = (id: string) => {
      if (matchedPairs.includes(id)) return;
      setLeftSelected(id);
  };

  const handleRightClick = (pairId: string) => {
      if (!leftSelected || matchedPairs.includes(pairId)) return;

      if (leftSelected === pairId) {
          // Match!
          const newMatches = [...matchedPairs, pairId];
          setMatchedPairs(newMatches);
          setLeftSelected(null);

          if (newMatches.length === task.pairs.length) {
              setTimeout(() => onComplete(20, 0), 1000);
          }
      } else {
          // No match
          const el = document.getElementById(`right-${pairId}`);
          el?.classList.add('animate-shake');
          setTimeout(() => el?.classList.remove('animate-shake'), 500);
          setLeftSelected(null);
      }
  };

  return (
    <div className="flex gap-4 md:gap-8 h-full min-h-[400px] items-center">
        
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4">
            {task.pairs.map(pair => {
                const isMatched = matchedPairs.includes(pair.id);
                const isSelected = leftSelected === pair.id;
                
                let style = "bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700";
                if (isMatched) style = "bg-green-900/40 border-green-500 text-green-200";
                else if (isSelected) style = "bg-cyan-900/60 border-cyan-400 text-white ring-2 ring-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]";

                return (
                    <button
                        key={pair.id}
                        onClick={() => handleLeftClick(pair.id)}
                        disabled={isMatched}
                        className={`p-4 rounded-xl border-2 font-bold text-left transition-all relative ${style} ${isMatched ? 'opacity-50' : 'opacity-100'}`}
                    >
                        {pair.left}
                        {isMatched && <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />}
                    </button>
                );
            })}
        </div>

        {/* Connector Visual */}
        <div className="w-8 md:w-12 flex flex-col items-center justify-center opacity-20">
            <div className="w-1 h-full border-r-2 border-dashed border-white"></div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-4">
            {shuffledRight.map((item: any) => {
                 const isMatched = matchedPairs.includes(item.id);
                 let style = "bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700";
                 if (isMatched) style = "bg-green-900/40 border-green-500 text-green-200";
 
                 return (
                     <button
                         key={item.id}
                         id={`right-${item.id}`}
                         onClick={() => handleRightClick(item.id)}
                         disabled={isMatched}
                         className={`p-4 rounded-xl border-2 font-medium text-right transition-all relative ${style} ${isMatched ? 'opacity-50' : 'opacity-100'}`}
                     >
                         {item.text}
                         {isMatched && <Check className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />}
                     </button>
                 );
            })}
        </div>

        <style>{`
            .animate-shake {
                animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            }
            @keyframes shake {
                10%, 90% { transform: translate3d(-1px, 0, 0); }
                20%, 80% { transform: translate3d(2px, 0, 0); }
                30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                40%, 60% { transform: translate3d(4px, 0, 0); }
            }
        `}</style>
    </div>
  );
};
