
import React from 'react';
import { Lightbulb, X } from 'lucide-react';
import { Fact } from '../types';

interface FactCardProps {
  fact: Fact;
  onClose: () => void;
}

export const FactCard: React.FC<FactCardProps> = ({ fact, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-800 border-2 border-cyan-500/50 rounded-2xl max-w-lg w-full shadow-[0_0_50px_rgba(6,182,212,0.3)] relative overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="bg-slate-900/50 p-4 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2 text-cyan-400">
                <Lightbulb className="w-5 h-5 fill-cyan-400/20" />
                <span className="font-mono uppercase tracking-widest font-bold text-sm">Faktabank</span>
            </div>
            <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors"
            >
                <X className="w-6 h-6" />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-white mb-4">{fact.title}</h3>
            <div className="text-slate-300 leading-relaxed space-y-4">
                {fact.content.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                ))}
            </div>
        </div>

        {/* Decorative footer line */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
      </div>
    </div>
  );
};
