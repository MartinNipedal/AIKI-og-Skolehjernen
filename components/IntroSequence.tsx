
import React, { useState, useEffect } from 'react';
import { CharacterPortrait } from './CharacterPortrait';
import { Speaker } from '../types';
import { ArrowRight, Brain, ShieldCheck, Zap, SkipForward } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [animateOut, setAnimateOut] = useState(false);

  const handleNext = () => {
    setAnimateOut(true);
    setTimeout(() => {
      if (step < slides.length - 1) {
        setStep(s => s + 1);
        setAnimateOut(false);
      } else {
        onComplete();
      }
    }, 500);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  const slides = [
    {
      id: 'intro',
      content: (
        <div className="text-center space-y-6">
          <div className="relative inline-block">
             <div className="absolute inset-0 bg-cyan-500/30 blur-3xl rounded-full animate-pulse"></div>
             <Brain className="w-32 h-32 text-cyan-400 relative z-10 animate-float" />
          </div>
          <h2 className="text-5xl font-black text-white tracking-tight">SKOLEHJERNEN</h2>
          <p className="text-xl text-cyan-200 max-w-lg mx-auto">
            Skolen trenger en oppgradering. <br/>
            En AI skal lages. <br/>
            <span className="text-white font-bold">Du</span> bestemmer hvordan.
          </p>
        </div>
      ),
      bg: "bg-slate-900"
    },
    {
        id: 'rector',
        content: (
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
            <div className="scale-150 transform transition-transform">
              <CharacterPortrait speaker={Speaker.RECTOR} speaking={true} />
            </div>
            <div className="space-y-4 max-w-md text-center md:text-right">
               <div className="inline-block bg-slate-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2">Oppdragsgiver</div>
               <h2 className="text-4xl font-bold text-white">REKTOR</h2>
               <p className="text-slate-300 text-lg leading-relaxed">
                 "Vi må henge med i tiden! Jeg har bevilget penger til en kunstig intelligens for skolen vår. Den skal være effektiv, smart og billig!"
               </p>
               <p className="text-slate-400 italic">Han vet ikke helt hva AI er, men han vil ha det.</p>
            </div>
          </div>
        ),
        bg: "bg-gradient-to-br from-slate-800 to-gray-900"
      },
      {
        id: 'teacher',
        content: (
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="scale-150 transform transition-transform">
              <CharacterPortrait speaker={Speaker.TEACHER} speaking={true} />
            </div>
            <div className="space-y-4 max-w-md text-center md:text-left">
               <div className="inline-block bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2">Veileder</div>
               <h2 className="text-4xl font-bold text-white">LÆREREN</h2>
               <p className="text-slate-300 text-lg leading-relaxed">
                 "AI er spennende, men vi kan ikke la den gjøre alt for oss. Dere skal lære å bygge den ansvarlig."
               </p>
               <p className="text-orange-400 font-bold">Hun passer på at dere faktisk lærer noe.</p>
            </div>
          </div>
        ),
        bg: "bg-gradient-to-tr from-orange-950 to-slate-900"
      },
    {
      id: 'aiki',
      content: (
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="scale-150 transform transition-transform">
            <CharacterPortrait speaker={Speaker.AIKI} speaking={true} />
          </div>
          <div className="space-y-4 max-w-md text-center md:text-left">
             <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2">Deg (Spilleren)</div>
             <h2 className="text-4xl font-bold text-white">AIKI</h2>
             <p className="text-slate-300 text-lg leading-relaxed">
               Du går på <span className="text-blue-400 font-bold">ungdomsskolen</span>. Du er ikke en super-koder, men du er god på mennesker, etikk og sunn fornuft.
             </p>
             <p className="text-blue-300 font-bold">Din jobb: Sørg for at Skolehjernen ikke går amok.</p>
          </div>
        </div>
      ),
      bg: "bg-gradient-to-br from-slate-900 to-blue-950"
    },
    {
      id: 'glitch',
      content: (
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
          <div className="scale-150 transform transition-transform">
            <CharacterPortrait speaker={Speaker.GLITCH} speaking={true} />
          </div>
          <div className="space-y-4 max-w-md text-center md:text-right">
             <div className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2">Partneren</div>
             <h2 className="text-4xl font-bold text-white">GLITCH</h2>
             <p className="text-slate-300 text-lg leading-relaxed">
               Din partner i prosjektet. Glitch elsker koding og vil at alt skal gå fort. Trenger av og til hjelp med koden.
             </p>
             <p className="text-green-400 font-bold">Glitch skriver koden. Du styrer retningen.</p>
          </div>
        </div>
      ),
      bg: "bg-gradient-to-bl from-slate-900 to-green-950"
    },
    {
      id: 'gameplay',
      content: (
        <div className="text-center space-y-8 max-w-4xl">
          <h2 className="text-3xl font-bold text-white">Slik spiller du</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-slate-800/50 p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-sm hover:scale-105 transition-transform">
                <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Kunnskap</h3>
                <p className="text-slate-400 text-sm">
                  Hjelp Glitch med koding og forstå AI-begreper.
                </p>
             </div>
             <div className="bg-slate-800/50 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform">
                <ShieldCheck className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Etikk</h3>
                <p className="text-slate-400 text-sm">
                  Ta ansvarlige valg. Ikke la AI-en jukse eller mobbe.
                </p>
             </div>
          </div>

          <p className="text-white text-lg bg-slate-800/80 inline-block px-6 py-3 rounded-full border border-white/10">
            Målet: Bygg den <span className="text-yellow-400 font-bold">perfekte Skolehjernen</span> før eksamen.
          </p>
        </div>
      ),
      bg: "bg-slate-900"
    }
  ];

  const currentSlide = slides[step];

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 transition-colors duration-1000 ${currentSlide.bg}`}>
       {/* Background Elements */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] opacity-40"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
       </div>

       {/* Main Content */}
       <div className={`relative z-10 transition-all duration-500 transform ${animateOut ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
          {currentSlide.content}
       </div>

       {/* Controls */}
       <div className="absolute bottom-10 w-full max-w-md flex justify-between items-center px-8 z-20">
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${idx === step ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="group flex items-center gap-3 bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-cyan-400 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
          >
            {step === slides.length - 1 ? 'Start Oppdrag' : 'Neste'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
       </div>

       <button 
         onClick={onComplete}
         className="absolute top-6 right-6 text-slate-500 hover:text-white flex items-center gap-1 text-sm font-mono uppercase tracking-widest transition-colors z-20"
       >
         Hopp over <SkipForward className="w-4 h-4" />
       </button>
    </div>
  );
};