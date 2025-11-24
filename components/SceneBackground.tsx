import React from 'react';
import { GameStage } from '../types';
import { Binary, Network, Lock, Search, Zap } from 'lucide-react';

interface SceneBackgroundProps {
  stage: GameStage;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({ stage }) => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-900">
      {/* Base Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"></div>

      {/* Stage Specific Props */}
      {renderStageContent(stage)}

      {/* Global Atmosphere Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_#0f172a_100%)] opacity-60"></div>
    </div>
  );
};

const renderStageContent = (stage: GameStage) => {
    switch(stage) {
        case GameStage.INTRO:
            return (
                <>
                   {/* Classroom Atmosphere */}
                   <div className="absolute inset-0 bg-amber-900/20"></div>
                   <div className="absolute top-10 left-10 w-64 h-40 bg-green-900/40 border-4 border-amber-800/50 rounded-lg transform -rotate-2"></div> {/* Blackboard */}
                   <div className="absolute top-20 right-20 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div> {/* Light */}
                   
                   {/* Abstract Desks */}
                   <div className="absolute bottom-0 w-full flex justify-around opacity-30">
                       <div className="w-40 h-20 bg-amber-800/40 rounded-t-xl transform translate-y-10"></div>
                       <div className="w-40 h-20 bg-amber-800/40 rounded-t-xl transform translate-y-10"></div>
                       <div className="w-40 h-20 bg-amber-800/40 rounded-t-xl transform translate-y-10"></div>
                   </div>
                   
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <h1 className="text-9xl font-black text-white/5 uppercase tracking-widest">Klasserom</h1>
                   </div>
                </>
            );
        case GameStage.MISSION_1:
             return (
                 <>
                    <div className="absolute inset-0 bg-blue-900/30"></div>
                    {/* Digital Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom opacity-50"></div>
                    
                    {/* Floating Categories */}
                    <div className="absolute top-1/4 left-1/4 animate-bounce"><div className="bg-cyan-500/20 p-4 rounded border border-cyan-500/50 text-cyan-200 text-xs">PROGRAM</div></div>
                    <div className="absolute top-1/3 right-1/4 animate-bounce animation-delay-2000"><div className="bg-purple-500/20 p-4 rounded border border-purple-500/50 text-purple-200 text-xs">AI</div></div>
                    
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-900/50 to-transparent"></div>
                 </>
             );
        case GameStage.MISSION_2:
            return (
                <>
                   <div className="absolute inset-0 bg-green-900/20"></div>
                   {/* Matrix Rain Effect Simulator */}
                   <div className="absolute inset-0 flex justify-between px-10 opacity-20">
                       {[...Array(10)].map((_, i) => (
                           <div key={i} className="h-full w-px bg-gradient-to-b from-transparent via-green-500 to-transparent animate-pulse" style={{ animationDuration: `${Math.random() * 2 + 1}s` }}></div>
                       ))}
                   </div>
                   <div className="absolute top-10 right-10 opacity-30 animate-pulse">
                       <Binary className="w-32 h-32 text-green-500" />
                   </div>
                   <div className="absolute bottom-10 left-10 opacity-30 animate-pulse">
                       <Binary className="w-24 h-24 text-green-500" />
                   </div>
                </>
            );
        case GameStage.MISSION_3:
             return (
                 <>
                    <div className="absolute inset-0 bg-purple-900/30"></div>
                    {/* Neural Network Nodes */}
                    <div className="absolute inset-0">
                        <Network className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] text-purple-500/10 animate-spin-slow" />
                        
                        <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-purple-400 rounded-full animate-ping"></div>
                        <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s'}}></div>
                        <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.5s'}}></div>
                    </div>
                 </>
             );
        case GameStage.MISSION_4:
            return (
                <>
                   <div className="absolute inset-0 bg-red-900/10"></div>
                   {/* Distortion / Glitch vibe */}
                   <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]"></div>
                   
                   <Search className="absolute top-20 right-20 w-48 h-48 text-yellow-500/10 rotate-12" />
                   <div className="absolute bottom-20 left-20 text-9xl font-bold text-white/5 select-none">???</div>
                   
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900"></div>
                </>
            );
        case GameStage.MISSION_5:
            return (
                <>
                   <div className="absolute inset-0 bg-indigo-900/30"></div>
                   {/* Scales of Justice / Shield vibe */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[20px] border-white/5 rounded-full"></div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-[20px] border-white/5 rounded-full"></div>
                   
                   <Lock className="absolute top-10 left-10 w-24 h-24 text-green-400/20" />
                   <Zap className="absolute bottom-10 right-10 w-24 h-24 text-yellow-400/20" />
                </>
            );
        case GameStage.FINALE:
            return (
                <>
                   <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-blue-900/40 to-slate-900"></div>
                   {/* Confetti / Stars */}
                   {[...Array(30)].map((_, i) => (
                       <div key={i} className="absolute bg-white rounded-full animate-float"
                            style={{
                                width: Math.random() * 6 + 'px',
                                height: Math.random() * 6 + 'px',
                                top: Math.random() * 100 + '%',
                                left: Math.random() * 100 + '%',
                                opacity: Math.random() * 0.5 + 0.2,
                                animationDuration: Math.random() * 5 + 3 + 's'
                            }}
                       ></div>
                   ))}
                </>
            );
        default:
            return null;
    }
}