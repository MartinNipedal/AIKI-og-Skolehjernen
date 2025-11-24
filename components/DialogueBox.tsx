
import React, { useEffect, useState, useRef } from 'react';
import { DialogueLine, Speaker } from '../types';
import { CharacterPortrait } from './CharacterPortrait';
import { ArrowRight } from 'lucide-react';

interface DialogueBoxProps {
  dialogue: DialogueLine[];
  onComplete: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ dialogue, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef<number | null>(null);

  // Safety check
  const currentLine = dialogue && dialogue.length > 0 ? dialogue[index] : null;

  // Reset text when line changes
  useEffect(() => {
    if (!currentLine) return;

    setIsTyping(true);
    setDisplayedText(""); // Start empty
    
    let charIndex = 0;
    const fullText = currentLine.text;
    
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    typingIntervalRef.current = window.setInterval(() => {
        charIndex++;
        // Using slice ensures we get the string from 0 to current index correctly
        setDisplayedText(fullText.slice(0, charIndex));

        if (charIndex >= fullText.length) {
            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
            setIsTyping(false);
        }
    }, 25); // Typing speed

    return () => {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [index, currentLine]);

  const handleNext = () => {
    if (isTyping && currentLine) {
        // Complete text instantly if clicked while typing
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setDisplayedText(currentLine.text);
        setIsTyping(false);
        return;
    }

    if (index < dialogue.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, dialogue, isTyping]);

  if (!currentLine) return null;

  const getSpeakerColor = (s: Speaker) => {
      switch(s) {
          case Speaker.AIKI: return "border-blue-500 bg-blue-950/90";
          case Speaker.GLITCH: return "border-green-500 bg-green-950/90";
          case Speaker.TEACHER: return "border-yellow-500 bg-yellow-950/90";
          case Speaker.RECTOR: return "border-slate-500 bg-slate-800/95";
          case Speaker.SKOLEHJERNEN: return "border-purple-500 bg-purple-950/90";
          default: return "border-slate-500 bg-slate-900/90";
      }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 px-4 pb-4 md:pb-8 flex justify-center pointer-events-none">
       {/* Character Portrait Container - Absolute positioning to pop out */}
       <div className="absolute bottom-[160px] md:bottom-[180px] left-0 right-0 max-w-4xl mx-auto flex justify-between px-8 pointer-events-none">
          {/* Left Side Speaker (AIKI) */}
          <div className={`transition-opacity duration-300 origin-bottom-left ${currentLine.speaker === Speaker.AIKI ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
             <CharacterPortrait speaker={Speaker.AIKI} speaking={isTyping && currentLine.speaker === Speaker.AIKI} />
          </div>

          {/* Right/Center Speakers */}
          <div className={`transition-opacity duration-300 origin-bottom-right ${currentLine.speaker !== Speaker.AIKI ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
             <CharacterPortrait speaker={currentLine.speaker} speaking={isTyping && currentLine.speaker !== Speaker.AIKI} />
          </div>
       </div>

       {/* Text Box */}
       <div className={`pointer-events-auto w-full max-w-4xl relative rounded-2xl border-4 shadow-2xl backdrop-blur-md p-6 md:p-8 flex flex-col gap-2 transition-colors duration-500 ${getSpeakerColor(currentLine.speaker)}`}>
           <div className="flex justify-between items-center mb-1">
               <span className="font-bold text-lg md:text-xl uppercase tracking-widest text-white drop-shadow-md">
                   {currentLine.speaker}
               </span>
               <span className="text-xs text-white/50 uppercase animate-pulse">
                   {isTyping ? '...' : 'Trykk mellomrom'}
               </span>
           </div>
           
           <p className="text-lg md:text-2xl text-white font-medium leading-relaxed drop-shadow-sm min-h-[4rem]">
               {displayedText}{isTyping && <span className="animate-pulse">|</span>}
           </p>

           <div className="absolute bottom-4 right-4">
              <button 
                onClick={handleNext}
                className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all hover:scale-110 active:scale-95 border border-white/20"
              >
                 <ArrowRight className={`w-6 h-6 ${!isTyping ? 'animate-bounce-x' : ''}`} />
              </button>
           </div>
       </div>
    </div>
  );
};