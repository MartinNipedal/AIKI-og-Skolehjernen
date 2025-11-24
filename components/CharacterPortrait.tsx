
import React from 'react';
import { Speaker } from '../types';

interface CharacterPortraitProps {
  speaker: Speaker;
  speaking: boolean;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ speaker, speaking }) => {
  const bounceClass = speaking ? 'animate-bounce' : '';
  const pulseClass = speaking ? 'animate-pulse' : '';

  switch (speaker) {
    case Speaker.AIKI:
      return (
        <div className={`relative w-48 h-48 transition-all duration-500 transform translate-y-4`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Background Aura */}
            <circle cx="100" cy="100" r="95" className="fill-blue-500/10 animate-pulse-slow" />
            
            {/* Body/Jacket */}
            <path d="M30,180 Q100,220 170,180 V200 H30 Z" className="fill-blue-600" />
            <path d="M70,180 L70,200 M130,180 L130,200" className="stroke-blue-800 stroke-2" /> {/* Backpack straps */}
            
            {/* Neck/Shirt */}
            <path d="M80,180 Q100,200 120,180 L120,160 L80,160 Z" className="fill-white" />
            <path d="M80,150 L80,170 Q100,185 120,170 L120,150" className="fill-amber-200" /> {/* Neck skin */}

            {/* Headphones (Around neck) */}
            <path d="M50,170 Q100,210 150,170" className="fill-none stroke-slate-800 stroke-[12]" />
            <rect x="40" y="160" width="20" height="30" rx="5" className="fill-slate-900" />
            <rect x="140" y="160" width="20" height="30" rx="5" className="fill-slate-900" />

            {/* Head Shape */}
            <ellipse cx="100" cy="110" rx="40" ry="50" className="fill-amber-200" />
            
            {/* Hair - Short/Messy/Modern - No Hood */}
            <path d="M50,110 C50,60 60,40 100,40 C140,40 150,60 150,110 L150,120 L140,100" className="fill-slate-800" />
            <path d="M50,110 Q40,130 60,110" className="fill-slate-800" />
            <path d="M150,110 Q160,130 140,110" className="fill-slate-800" />
            <path d="M60,60 Q80,30 110,50 Q130,30 140,70" className="fill-slate-800" /> {/* Top spikes */}
            
            {/* Face Features */}
            <g className={speaking ? "animate-tattle" : ""}>
                 {/* Eyes */}
                <ellipse cx="85" cy="110" rx="5" ry="7" className="fill-slate-900" />
                <ellipse cx="115" cy="110" rx="5" ry="7" className="fill-slate-900" />
                <circle cx="87" cy="108" r="2" className="fill-white" />
                <circle cx="117" cy="108" r="2" className="fill-white" />
                
                {/* Mouth */}
                {speaking ? (
                   <path d="M90,140 Q100,150 110,140" className="fill-slate-800" />
                ) : (
                   <path d="M92,142 Q100,145 108,142" className="fill-none stroke-slate-800 stroke-2" />
                )}
                
                {/* Freckles */}
                <circle cx="75" cy="125" r="1" className="fill-amber-600 opacity-50" />
                <circle cx="125" cy="125" r="1" className="fill-amber-600 opacity-50" />
            </g>

          </svg>
        </div>
      );

    case Speaker.GLITCH:
      return (
        <div className={`relative w-48 h-48 transition-all duration-500 transform translate-y-4`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
             <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
             </defs>
             
             <rect x="20" y="20" width="160" height="160" rx="80" className="fill-green-900/20 animate-pulse" />
             
             <path d="M50,180 Q100,210 150,180 V200 H50 Z" className="fill-slate-900" />
             <path d="M60,180 L60,200 M140,180 L140,200" className="stroke-green-500 stroke-2 opacity-50" />

             <path d="M60,130 Q100,60 140,130 L140,180 H60 Z" className="fill-slate-800" />

             <path d="M70,90 Q100,80 130,90 L130,130 Q100,140 70,130 Z" className="fill-black stroke-green-500 stroke-2" filter="url(#glow)" />
             
             <g className={speaking ? "animate-pulse" : ""}>
                 <text x="78" y="118" className="fill-green-400 text-2xl font-mono font-bold">&gt;</text>
                 <text x="110" y="118" className="fill-green-400 text-2xl font-mono font-bold">&lt;</text>
             </g>
             
             <rect x="140" y="70" width="15" height="5" className="fill-green-400 opacity-60 animate-ping" />
             <rect x="45" y="140" width="10" height="10" className="fill-green-400 opacity-40 animate-bounce" />
          </svg>
        </div>
      );

    case Speaker.TEACHER:
      return (
        <div className={`relative w-48 h-48 transition-all duration-500 transform translate-y-4`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
             <circle cx="100" cy="100" r="90" className="fill-orange-100/30" />
             
             <path d="M40,190 Q100,230 160,190 V200 H40 Z" className="fill-orange-800" />
             <path d="M100,190 L100,200" className="stroke-orange-900 stroke-1" />
             <path d="M80,160 L100,200 L120,160" className="fill-white" /> 
             
             <ellipse cx="100" cy="110" rx="42" ry="52" className="fill-amber-300" />
             
             <path d="M55,110 Q50,50 100,50 Q150,50 145,110" className="fill-slate-800" />
             <circle cx="100" cy="45" r="20" className="fill-slate-800" />
             
             <g className={speaking ? "animate-bounce" : ""}>
                 <circle cx="82" cy="105" r="14" className="fill-white/30 stroke-black stroke-2" />
                 <circle cx="118" cy="105" r="14" className="fill-white/30 stroke-black stroke-2" />
                 <line x1="96" y1="105" x2="104" y2="105" className="stroke-black stroke-2" />
             </g>

             <circle cx="82" cy="105" r="3" className="fill-black" />
             <circle cx="118" cy="105" r="3" className="fill-black" />

             {speaking ? (
                 <path d="M90,135 Q100,145 110,135" className="fill-none stroke-black stroke-2" />
             ) : (
                 <path d="M92,140 Q100,142 108,140" className="fill-none stroke-black stroke-2" />
             )}
          </svg>
        </div>
      );

    case Speaker.RECTOR:
        return (
            <div className={`relative w-48 h-48 transition-all duration-500 transform translate-y-4`}>
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                    {/* Stern Aura */}
                    <circle cx="100" cy="100" r="90" className="fill-slate-100/10" />
                    
                    {/* Suit */}
                    <path d="M30,190 Q100,230 170,190 V200 H30 Z" className="fill-slate-800" />
                    <path d="M100,190 L100,200" className="stroke-black stroke-1" />
                    <path d="M90,160 L100,200 L110,160" className="fill-white" /> {/* Shirt */}
                    <path d="M95,170 L100,190 L105,170" className="fill-red-700" /> {/* Tie */}
                    
                    {/* Head - Bald/Grey */}
                    <ellipse cx="100" cy="110" rx="45" ry="55" className="fill-amber-200" />
                    <path d="M55,100 Q50,80 55,70 Q100,60 145,70 Q150,80 145,100" className="fill-slate-400 opacity-50" /> {/* Thin grey hair */}

                    {/* Face */}
                    <path d="M80,90 Q100,95 120,90" className="fill-none stroke-slate-600 stroke-2" /> {/* Furrowed brow */}
                    
                    <circle cx="85" cy="105" r="4" className="fill-black" />
                    <circle cx="115" cy="105" r="4" className="fill-black" />
                    
                    {/* Mustache? No, let's keep him clean shaven but stern */}
                    {speaking ? (
                        <rect x="90" y="140" width="20" height="5" rx="2" className="fill-slate-700" />
                    ) : (
                        <line x1="90" y1="140" x2="110" y2="140" className="stroke-slate-700 stroke-2" />
                    )}
                </svg>
            </div>
        );

    case Speaker.SKOLEHJERNEN:
      return (
        <div className={`relative w-48 h-48 transition-all duration-500 transform translate-y-4`}>
           <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl animate-float">
              <defs>
                  <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#581c87" />
                  </radialGradient>
              </defs>

              <circle cx="100" cy="100" r="90" className="fill-none stroke-purple-500/20 stroke-1 animate-spin-slow" strokeDasharray="10 10" />
              <circle cx="100" cy="100" r="70" className="fill-none stroke-cyan-500/30 stroke-1 animate-spin-reverse-slow" strokeDasharray="20 10" />
              
              <path d="M70,100 L100,50 L130,100 L100,150 Z" fill="url(#coreGradient)" className="opacity-90 animate-pulse" />
              <path d="M100,50 L130,100 L100,150 L70,100 Z" className="stroke-cyan-400 stroke-2 fill-none opacity-50" />
              
              <circle cx="70" cy="100" r="5" className="fill-cyan-400 animate-ping" style={{animationDuration: '3s'}} />
              <circle cx="130" cy="100" r="5" className="fill-cyan-400 animate-ping" style={{animationDelay: '1s', animationDuration: '3s'}} />
              <circle cx="100" cy="50" r="5" className="fill-cyan-400 animate-ping" style={{animationDelay: '2s', animationDuration: '3s'}} />
              <circle cx="100" cy="150" r="5" className="fill-cyan-400 animate-ping" style={{animationDelay: '1.5s', animationDuration: '3s'}} />
           </svg>
        </div>
      );

    default:
      return null;
  }
};