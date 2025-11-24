import React, { useState } from 'react';
import { GameState, GameStage } from './types';
import { Layout } from './components/Layout';
import { StoryScene } from './components/StoryScene';
import { MenuHub } from './components/MenuHub';
import { IntroSequence } from './components/IntroSequence';
import { Play, Brain } from 'lucide-react';

const getInitialGameState = (): GameState => ({
    currentStage: GameStage.INTRO,
    unlockedStages: [GameStage.MISSION_1],
    scores: { knowledge: 0, ethics: 0 },
    history: [],
    missionComplete: false
});

export default function App() {
  const [started, setStarted] = useState(false); // "Landing Page" -> "Intro"
  const [introComplete, setIntroComplete] = useState(false); // "Intro" -> "Menu"
  const [adminMode, setAdminMode] = useState(false); // Unlock all modules
  
  const [gameState, setGameState] = useState<GameState>(getInitialGameState());

  const [inMenu, setInMenu] = useState(false);

  const getNextStage = (current: GameStage): GameStage => {
    switch(current) {
        case GameStage.MISSION_1: return GameStage.MISSION_2;
        case GameStage.MISSION_2: return GameStage.MISSION_3;
        case GameStage.MISSION_3: return GameStage.MISSION_4;
        case GameStage.MISSION_4: return GameStage.MISSION_5;
        case GameStage.MISSION_5: return GameStage.FINALE;
        default: return GameStage.FINALE;
    }
  };

  const resetGame = () => {
      setStarted(false);
      setIntroComplete(false);
      setInMenu(false);
      setGameState(getInitialGameState());
  };

  const handleMissionComplete = (knowledgeGain: number, ethicsGain: number, historyLog: string) => {
    setGameState(prev => {
        const nextStageUnlock = getNextStage(prev.currentStage);
        const newUnlocked = [...prev.unlockedStages];
        
        if (!newUnlocked.includes(nextStageUnlock)) {
            newUnlocked.push(nextStageUnlock);
        }

        return {
            ...prev,
            scores: {
                knowledge: prev.scores.knowledge + knowledgeGain,
                ethics: prev.scores.ethics + ethicsGain
            },
            history: [...prev.history, historyLog],
            unlockedStages: newUnlocked,
            currentStage: prev.currentStage // Stay on current stage context until user goes to menu
        };
    });
    
    // After mission complete, go to menu
    setTimeout(() => {
        setInMenu(true);
    }, 1500);
  };

  const handleIntroDialogueComplete = () => {
      setInMenu(true);
  };

  const handleIntroSequenceComplete = () => {
      setIntroComplete(true);
      setInMenu(true);
  };

  const handleMenuSelect = (stage: GameStage) => {
      setInMenu(false);
      setGameState(prev => ({
          ...prev,
          currentStage: stage
      }));
  };

  // Determine effective unlocked stages (Real progress OR all if admin)
  const effectiveUnlockedStages = adminMode 
    ? Object.values(GameStage) 
    : gameState.unlockedStages;

  if (!started) {
      return (
          <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden font-sans">
             <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-blob"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
             <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

             <div className="z-10 max-w-4xl space-y-16 backdrop-blur-sm bg-slate-900/40 p-8 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl animate-fade-in-up">
                 <div className="relative inline-block transform transition-transform hover:scale-105 duration-500">
                    <div className="absolute -inset-2 bg-gradient-to-r from-aiki-blue via-purple-500 to-glitch-green rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-1000 animate-pulse-slow"></div>
                    <div className="relative bg-slate-900/80 p-6 rounded-xl border border-white/10">
                        <div className="flex justify-center mb-4">
                            <Brain className="w-16 h-16 text-cyan-400 animate-float" />
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-tighter">
                            AIKI
                        </h1>
                        <p className="text-xl md:text-3xl text-purple-200 font-light tracking-widest uppercase mt-2">
                            & Skolehjernen
                        </p>
                    </div>
                 </div>
                 
                 <div className="space-y-6">
                     <p className="text-slate-200 text-xl md:text-2xl leading-relaxed font-light max-w-2xl mx-auto">
                         Bli med Aiki og Glitch på oppdraget: <br/>
                         <span className="text-white font-bold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-2 py-1 rounded">Bygg fremtidens skole-AI.</span>
                     </p>
                 </div>
                 
                 <div className="flex justify-center pt-8">
                    <button 
                        onClick={() => setStarted(true)}
                        className="group relative bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xl md:text-2xl font-bold py-6 px-20 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] flex items-center gap-4 mx-auto overflow-hidden ring-4 ring-cyan-900/50 shadow-xl"
                    >
                        <span className="relative z-10 flex items-center gap-3 tracking-wide">
                            START SPILLET <Play className="fill-current w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
                    </button>
                 </div>
             </div>
          </div>
      );
  }

  if (!introComplete) {
      return <IntroSequence onComplete={handleIntroSequenceComplete} />;
  }

  // Determine Title
  const getTitle = () => {
      if (inMenu) return "Oversikt";
      if (adminMode) return "ADMIN MODE";
      switch(gameState.currentStage) {
          case GameStage.INTRO: return "Starten";
          case GameStage.MISSION_1: return "1. Hva er AI?";
          case GameStage.MISSION_2: return "2. Treningsdata";
          case GameStage.MISSION_3: return "3. Dyp Læring";
          case GameStage.MISSION_4: return "4. Hallusinasjoner";
          case GameStage.MISSION_5: return "5. Etikk & Ansvar";
          case GameStage.FINALE: return "Eksamen";
          default: return "";
      }
  };

  return (
    <Layout 
        state={gameState} 
        title={getTitle()}
        adminMode={adminMode}
        onToggleAdmin={() => setAdminMode(!adminMode)}
    >
        {inMenu ? (
            <MenuHub 
                unlockedStages={effectiveUnlockedStages} 
                onSelectStage={handleMenuSelect}
                scores={gameState.scores}
            />
        ) : (
            <StoryScene 
                state={gameState} 
                onMissionComplete={handleMissionComplete} 
                onIntroComplete={handleIntroDialogueComplete}
                onReset={resetGame}
            />
        )}
    </Layout>
  );
}