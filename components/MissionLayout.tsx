
import React, { useState } from 'react';
import { Task, TaskType, Speaker } from '../types';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { FactCard } from './FactCard';
import { TaskMultipleChoice } from './tasks/TaskMultipleChoice';
import { TaskDragDrop } from './tasks/TaskDragDrop';
import { TaskConnect } from './tasks/TaskConnect';
import { CharacterPortrait } from './CharacterPortrait';

interface MissionLayoutProps {
  title: string;
  description: string;
  tasks: Task[];
  onComplete: (k: number, e: number, summary: string) => void;
}

export const MissionLayout: React.FC<MissionLayoutProps> = ({ title, description, tasks, onComplete }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [showFact, setShowFact] = useState(false);
  
  // Scoring accumulation
  const [totalKnowledge, setTotalKnowledge] = useState(0);
  const [totalEthics, setTotalEthics] = useState(0);

  const currentTask = tasks[currentTaskIndex];
  const progress = ((currentTaskIndex) / tasks.length) * 100;

  const handleTaskComplete = (k: number, e: number) => {
      const newK = totalKnowledge + k;
      const newE = totalEthics + e;
      setTotalKnowledge(newK);
      setTotalEthics(newE);

      if (currentTaskIndex < tasks.length - 1) {
          setCurrentTaskIndex(prev => prev + 1);
      } else {
          onComplete(newK, newE, `Fullførte ${title}.`);
      }
  };

  const renderTaskComponent = () => {
      switch(currentTask.type) {
          case TaskType.MULTIPLE_CHOICE:
              return <TaskMultipleChoice key={currentTask.id} task={currentTask as any} onComplete={handleTaskComplete} />;
          case TaskType.DRAG_DROP:
              return <TaskDragDrop key={currentTask.id} task={currentTask as any} onComplete={handleTaskComplete} />;
          case TaskType.CONNECT:
              return <TaskConnect key={currentTask.id} task={currentTask as any} onComplete={handleTaskComplete} />;
          default:
              return <div>Ukjent oppgavetype</div>;
      }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-full relative pb-10">
      {showFact && currentTask.relatedFact && (
          <FactCard fact={currentTask.relatedFact} onClose={() => setShowFact(false)} />
      )}

      {/* Mission Header */}
      <div className="text-center mb-6 animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight drop-shadow-lg">{title}</h2>
        <p className="text-cyan-200 text-lg font-medium">{description}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800/50 border border-slate-700 rounded-full h-3 mb-8 overflow-hidden backdrop-blur-sm">
          <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Narrative Context Bubble */}
      {currentTask.narrative && (
          <div className="mb-6 flex items-start gap-4 animate-fade-in">
              <div className="hidden md:block transform scale-75 -ml-4 -mt-4">
                  <CharacterPortrait speaker={currentTask.narrative.speaker} speaking={true} />
              </div>
              <div className="bg-slate-800/90 border-l-4 border-cyan-400 p-4 rounded-r-xl rounded-bl-xl shadow-lg flex-1">
                  <p className="text-cyan-400 font-bold text-xs uppercase mb-1">{currentTask.narrative.speaker} sier:</p>
                  <p className="text-white italic">"{currentTask.narrative.text}"</p>
              </div>
          </div>
      )}

      {/* Main Task Container */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 md:p-10 shadow-2xl flex-1 flex flex-col animate-fade-in">
          
          <div className="mb-8 flex justify-between items-start gap-4 border-b border-white/5 pb-6">
                 <h3 className="text-xl md:text-3xl font-bold text-white leading-snug">
                     {currentTask.question}
                 </h3>
                 {currentTask.relatedFact && (
                     <button 
                        onClick={() => setShowFact(true)}
                        className="flex-shrink-0 group flex items-center gap-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-white px-4 py-2 rounded-full border border-indigo-500/30 transition-all text-sm font-bold uppercase tracking-wide"
                     >
                         <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                         <span className="hidden md:inline">Læringskort</span>
                     </button>
                 )}
          </div>

          <div className="flex-1">
            {renderTaskComponent()}
          </div>
      </div>

      <div className="text-center mt-6 text-slate-500 text-xs font-mono uppercase tracking-widest">
          Oppgave {currentTaskIndex + 1} / {tasks.length}
      </div>
    </div>
  );
};
