
import React from 'react';
import { GameStage } from '../types';
import { Lock, Play, CheckCircle, Brain, Target, Shield, Zap, Search } from 'lucide-react';

interface MenuHubProps {
  unlockedStages: GameStage[];
  onSelectStage: (stage: GameStage) => void;
  scores: { knowledge: number; ethics: number };
}

export const MenuHub: React.FC<MenuHubProps> = ({ unlockedStages, onSelectStage, scores }) => {
  
  const missions = [
    { 
        id: GameStage.MISSION_1, 
        title: "1. Hva er AI?", 
        desc: "Lær forskjellen på koding og maskinlæring.",
        icon: Brain,
        color: "bg-cyan-500"
    },
    { 
        id: GameStage.MISSION_2, 
        title: "2. Treningsdata", 
        desc: "Rens dataene før Skolehjernen spiser dem.",
        icon: Target,
        color: "bg-green-500"
    },
    { 
        id: GameStage.MISSION_3, 
        title: "3. Dyp Læring", 
        desc: "Koble sammen nevrale nettverk.",
        icon: Zap,
        color: "bg-purple-500"
    },
    { 
        id: GameStage.MISSION_4, 
        title: "4. Hallusinasjoner", 
        desc: "Avslør når AI-en lyver.",
        icon: Search,
        color: "bg-red-500"
    },
    { 
        id: GameStage.MISSION_5, 
        title: "5. Etikk & Ansvar", 
        desc: "Lag reglene for rettferdig bruk.",
        icon: Shield,
        color: "bg-yellow-500"
    }
  ];

  const isUnlocked = (stage: GameStage) => unlockedStages.includes(stage);
  const isCompleted = (stage: GameStage) => {
      const idx = unlockedStages.indexOf(stage);
      // Simple logic: if next stage is unlocked, this one is done. 
      // Or if finale is unlocked, all missions are done.
      if (unlockedStages.includes(GameStage.FINALE)) return true;
      // In a real app we might track 'completed' separate from 'unlocked'
      // For now, if current mission is NOT the last unlocked one, it's considered done
      return unlockedStages.indexOf(stage) < unlockedStages.length - 1;
  };

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center animate-fade-in">
        <div className="text-center mb-10 space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                KONTROLLSENTER
            </h1>
            <p className="text-xl text-slate-400">Velg neste modul for å oppgradere Skolehjernen</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {missions.map((m) => {
                const unlocked = isUnlocked(m.id);
                const completed = isCompleted(m.id);
                const Icon = m.icon;

                return (
                    <button
                        key={m.id}
                        disabled={!unlocked}
                        onClick={() => onSelectStage(m.id)}
                        className={`
                            relative overflow-hidden group rounded-2xl p-6 text-left border-2 transition-all duration-300
                            ${unlocked 
                                ? 'bg-slate-800 border-slate-600 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:-translate-y-1' 
                                : 'bg-slate-900/50 border-slate-800 opacity-60 cursor-not-allowed'}
                        `}
                    >
                        {/* Background Decoration */}
                        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity ${m.color}`}></div>

                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${unlocked ? 'bg-slate-700' : 'bg-slate-800'}`}>
                                <Icon className={`w-8 h-8 ${unlocked ? 'text-white' : 'text-slate-600'}`} />
                            </div>
                            {completed && <CheckCircle className="text-green-500 w-6 h-6" />}
                            {!unlocked && <Lock className="text-slate-600 w-6 h-6" />}
                        </div>

                        <h3 className={`text-xl font-bold mb-2 ${unlocked ? 'text-white' : 'text-slate-500'}`}>{m.title}</h3>
                        <p className={`text-sm ${unlocked ? 'text-slate-300' : 'text-slate-600'}`}>{m.desc}</p>
                        
                        {unlocked && (
                            <div className="mt-4 inline-flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">
                                Start Oppdrag <Play className="w-4 h-4 fill-current" />
                            </div>
                        )}
                    </button>
                );
            })}
            
            {/* Finale Button */}
             <button
                disabled={!isUnlocked(GameStage.FINALE)}
                onClick={() => onSelectStage(GameStage.FINALE)}
                className={`
                    relative overflow-hidden group rounded-2xl p-6 text-center border-2 transition-all duration-300 flex flex-col items-center justify-center
                    ${isUnlocked(GameStage.FINALE)
                        ? 'bg-gradient-to-br from-indigo-900 to-purple-900 border-purple-400 hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:scale-105' 
                        : 'bg-slate-900/50 border-slate-800 opacity-40 cursor-not-allowed'}
                `}
            >
                <div className="mb-2">
                    <Brain className="w-12 h-12 text-purple-300 mx-auto animate-pulse" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-widest">EKSAMEN</h3>
                {!isUnlocked(GameStage.FINALE) && <span className="text-xs text-slate-500 mt-2">Fullfør alle oppdrag først</span>}
            </button>
        </div>
    </div>
  );
};
