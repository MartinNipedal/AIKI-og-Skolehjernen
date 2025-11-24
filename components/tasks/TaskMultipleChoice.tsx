
import React, { useState, useEffect } from 'react';
import { MultipleChoiceTask } from '../../types';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  task: MultipleChoiceTask;
  onComplete: (k: number, e: number) => void;
}

export const TaskMultipleChoice: React.FC<Props> = ({ task, onComplete }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; isPositive: boolean } | null>(null);

  useEffect(() => {
    setSelectedOptionId(null);
    setFeedback(null);
  }, [task.id]);

  const handleOptionSelect = (option: typeof task.options[0]) => {
    if (selectedOptionId) return; 
    
    setSelectedOptionId(option.id);
    
    const kGain = option.scoreChange?.knowledge ?? (option.isCorrect ? 10 : 0);
    const eGain = option.scoreChange?.ethics ?? 0;
    const isPositive = option.isCorrect;

    setFeedback({
        text: option.feedback,
        isPositive
    });

    setTimeout(() => {
        onComplete(kGain, eGain);
    }, isPositive ? 2000 : 3500);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
          {task.options.map((opt) => {
              let buttonStyle = "bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-200";
              
              if (selectedOptionId === opt.id) {
                  if (opt.isCorrect) buttonStyle = "bg-green-900/50 border-green-500 text-white ring-2 ring-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
                  else buttonStyle = "bg-red-900/50 border-red-500 text-white ring-2 ring-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
              } else if (selectedOptionId) {
                  buttonStyle = "opacity-50 grayscale bg-slate-800 border-slate-700";
              }

              return (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionSelect(opt)}
                    disabled={!!selectedOptionId}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${buttonStyle}`}
                  >
                      <span className="font-medium text-lg">{opt.text}</span>
                      {selectedOptionId === opt.id && (
                          opt.isCorrect ? <CheckCircle2 className="text-green-400 w-6 h-6 animate-bounce" /> : <AlertCircle className="text-red-400 w-6 h-6 animate-pulse" />
                      )}
                      {!selectedOptionId && <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />}
                  </button>
              );
          })}
      </div>

      {feedback && (
          <div className="animate-fade-in-up p-4 rounded-xl bg-slate-800/90 border border-slate-600 shadow-lg">
              <p className={`text-lg font-bold ${feedback.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {feedback.text}
              </p>
          </div>
      )}
    </div>
  );
};
