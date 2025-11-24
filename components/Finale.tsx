

import React, { useEffect, useState } from 'react';
import { GameState, FinaleProps } from '../types';
import { generateFinaleFeedback } from '../services/geminiService';
import { Award, RefreshCcw, Brain, AlertTriangle } from 'lucide-react';

export const Finale: React.FC<FinaleProps> = ({ state, onReset }) => {
    const [feedback, setFeedback] = useState<string>("Genererer din personlige evaluering...");

    useEffect(() => {
        let mounted = true;
        generateFinaleFeedback(state.scores.knowledge, state.scores.ethics, state.history)
            .then(text => {
                if (mounted) setFeedback(text);
            });
        return () => { mounted = false; };
    }, []);

    const kScore = state.scores.knowledge;
    const eScore = state.scores.ethics;

    // Determine Brain Appearance based on scores
    const getBrainStatus = () => {
        if (eScore < 30) return 'evil';
        if (kScore < 30) return 'dumb';
        if (eScore >= 50 && kScore >= 50) return 'god';
        return 'normal';
    };

    const status = getBrainStatus();

    const BrainVisual = () => {
        switch (status) {
            case 'evil': // Low Ethics
                return (
                    <div className="relative group">
                         <Brain className="w-48 h-48 text-red-600 animate-pulse drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]" />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <AlertTriangle className="w-20 h-20 text-yellow-400 animate-bounce" />
                         </div>
                         <div className="text-red-400 font-mono mt-4 font-bold tracking-widest">SKOLEHJERNEN ER USTABIL</div>
                         <p className="text-xs text-red-300">Fare: Høy bias, lav etikk.</p>
                    </div>
                );
            case 'dumb': // Low Knowledge
                return (
                    <div className="relative">
                         <Brain className="w-32 h-32 text-slate-600 animate-pulse-slow" />
                         <div className="text-slate-400 font-mono mt-4 font-bold tracking-widest">SKOLEHJERNEN ER SVAK</div>
                         <p className="text-xs text-slate-500">Mangler data og trening.</p>
                    </div>
                );
            case 'god': // High Both
                return (
                    <div className="relative">
                         <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-yellow-400 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                         <Brain className="w-64 h-64 text-transparent bg-clip-text bg-gradient-to-br from-cyan-100 to-white drop-shadow-[0_0_50px_rgba(255,255,255,0.5)] animate-float" style={{ fill: 'url(#grad1)' }} />
                         <svg width="0" height="0">
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                              <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
                            </linearGradient>
                         </svg>
                         <div className="text-cyan-300 font-mono mt-6 text-xl font-bold tracking-[0.2em] uppercase drop-shadow-lg">SKOLEHJERNEN ER OPTIMAL</div>
                         <p className="text-sm text-cyan-100">Etisk, kunnskapsrik og trygg.</p>
                    </div>
                );
            default: // Normal
                return (
                    <div className="relative">
                         <Brain className="w-48 h-48 text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-float" />
                         <div className="text-blue-300 font-mono mt-4 font-bold tracking-widest">SKOLEHJERNEN ER OPERATIV</div>
                         <p className="text-xs text-blue-200">En god start, men kan forbedres.</p>
                    </div>
                );
        }
    };

    return (
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up py-8 pb-32">
            <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-md relative overflow-hidden">
                
                {/* Visualizer Section */}
                <div className="mb-12 flex justify-center py-10 relative">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-50"></div>
                    <BrainVisual />
                </div>

                <div className="flex flex-col items-center gap-4 mb-8">
                     <Award className="w-12 h-12 text-yellow-400" />
                     <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">EKSAMEN BESTÅTT</h1>
                     <p className="text-slate-400 text-lg">Du har fullført utviklingen.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <div className="text-4xl font-black text-cyan-400 mb-1">{state.scores.knowledge}</div>
                        <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Kunnskap</div>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <div className="text-4xl font-black text-purple-400 mb-1">{state.scores.ethics}</div>
                        <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Etikk</div>
                    </div>
                </div>

                <div className="text-left bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700/50 shadow-inner">
                    <h3 className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-4">Lærerens Evaluering</h3>
                    <p className="text-slate-200 leading-relaxed text-lg italic font-serif">
                        "{feedback}"
                    </p>
                </div>

                <div className="mt-12">
                    <p className="text-sm text-slate-500 mb-6">
                        Tips: Ta et skjermbilde av din Skolehjerne og vis til læreren!
                    </p>
                    <button 
                        onClick={onReset}
                        className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full transition-all font-bold border border-white/10 hover:scale-105"
                    >
                        <RefreshCcw className="w-5 h-5" /> Start på nytt
                    </button>
                </div>
            </div>
        </div>
    );
};
