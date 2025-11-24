import React from 'react';
import { Brain, ShieldCheck, Zap, Lock, Unlock } from 'lucide-react';
import { GameState } from '../types';
import { SceneBackground } from './SceneBackground';

interface LayoutProps {
  state: GameState;
  children: React.ReactNode;
  title: string;
  adminMode: boolean;
  onToggleAdmin: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ state, children, title, adminMode, onToggleAdmin }) => {
  return (
    <div className="h-screen w-screen bg-slate-900 text-slate-100 flex flex-col font-sans relative overflow-hidden">
      
      {/* Immersive Background Layer - Covers everything */}
      <div className="absolute inset-0 z-0">
         <SceneBackground stage={state.currentStage} />
      </div>

      {/* Header / HUD */}
      <header className="absolute top-0 w-full z-40 bg-slate-900/60 backdrop-blur-md border-b border-white/5 px-4 py-3 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-aiki-blue to-cyan-500 p-2 rounded-lg shadow-lg shadow-cyan-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight leading-none text-white drop-shadow-md">
                AIKI
              </h1>
              <span className="text-xs text-cyan-300 font-mono tracking-wider uppercase opacity-80">{title}</span>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 text-cyan-100 bg-cyan-900/40 px-3 py-1.5 rounded-full border border-cyan-500/20 backdrop-blur-sm">
              <Zap className="w-4 h-4 fill-cyan-400 text-cyan-400" />
              <div className="flex flex-col leading-none">
                 <span className="text-[10px] uppercase opacity-70">Kunnskap</span>
                 <span className="font-bold font-mono">{state.scores.knowledge}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-purple-100 bg-purple-900/40 px-3 py-1.5 rounded-full border border-purple-500/20 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 fill-purple-400 text-purple-400" />
              <div className="flex flex-col leading-none">
                 <span className="text-[10px] uppercase opacity-70">Etikk</span>
                 <span className="font-bold font-mono">{state.scores.ethics}</span>
              </div>
            </div>
            
            {/* Admin Toggle */}
            <button 
                onClick={onToggleAdmin}
                className={`p-2 rounded-full border transition-all ${adminMode ? 'bg-red-900/50 border-red-500 text-red-400' : 'bg-slate-800/50 border-slate-700 text-slate-600 hover:text-slate-400'}`}
                title="Admin Mode: Unlock All"
            >
                {adminMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto p-4 md:p-6 flex flex-col pt-24 pb-48 overflow-y-auto custom-scrollbar">
        {children}
      </main>

      {/* Overlay Gradient at bottom for text readability if dialogue is missing */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none z-0"></div>
    </div>
  );
};