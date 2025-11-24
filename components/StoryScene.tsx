

import React, { useEffect, useState } from 'react';
import { GameState, GameStage, DialogueLine, Speaker } from '../types';
import { DialogueBox } from './DialogueBox';
import { Mission1 } from './missions/Mission1';
import { Mission2 } from './missions/Mission2';
import { Mission3 } from './missions/Mission3';
import { Mission4 } from './missions/Mission4';
import { Mission5 } from './missions/Mission5';
import { Finale } from './Finale';

// Scripts for each stage
const SCRIPTS: Record<GameStage, DialogueLine[]> = {
    [GameStage.MENU]: [], // No dialogue in menu
    [GameStage.INTRO]: [
        { speaker: Speaker.TEACHER, text: "Velkommen til AI-prosjektet! I dag skal dere ikke bare bruke AI, dere skal bygge en." },
        { speaker: Speaker.AIKI, text: "Bygge? Jeg trodde AI bare var magi i en boks." },
        { speaker: Speaker.GLITCH, text: "Pøh. Det er bare matte og sannsynlighet, AIKI. Jeg kaller prosjektet 'Skolehjernen'." },
        { speaker: Speaker.TEACHER, text: "Dere er et team. Glitch kan kodingen, AIKI forstår menneskene. Sett i gang!" }
    ],
    [GameStage.MISSION_1]: [
        { speaker: Speaker.TEACHER, text: "Før dere begynner å trykke, må dere forstå verktøyet. Hva er egentlig forskjellen på et vanlig dataprogram og AI?" },
        { speaker: Speaker.AIKI, text: "Er ikke alt bare kode da?" },
        { speaker: Speaker.TEACHER, text: "Både ja og nei. Tenk på vanlig programmering som en bakeoppskrift. En 'Algoritme' er strenge regler: 'HVIS du trykker A, SÅ hopp'." },
        { speaker: Speaker.TEACHER, text: "En kalkulator følger bare regler. Den lærer ingenting nytt. Den gjør nøyaktig det du sier." },
        { speaker: Speaker.GLITCH, text: "Men det tar jo år å skrive regler for alt i hele verden! Skal jeg skrive en regel for hver eneste setning?" },
        { speaker: Speaker.TEACHER, text: "Nettopp! Derfor har vi Maskinlæring. I stedet for regler, gir vi datamaskinen tusenvis av eksempler." },
        { speaker: Speaker.TEACHER, text: "Vi viser den bilder av katter og hunder, og så finner den MØNSTERET selv. Dette kaller vi en 'Modell'." },
        { speaker: Speaker.AIKI, text: "Så... Oppskrift = Regler. AI = Mønstre?" },
        { speaker: Speaker.TEACHER, text: "Korrekt! Prøv å huske det når dere skal sortere oppgavene nå." }
    ],
    [GameStage.MISSION_2]: [
        { speaker: Speaker.TEACHER, text: "Nå som dere vet at AI lærer av eksempler, må vi snakke om MATEN vi gir den. Vi kaller det 'Treningsdata'." },
        { speaker: Speaker.GLITCH, text: "Jeg har skrapt hele internett! Jeg har lastet ned navnelister, Wikipedia, Facebook-kommentarer... Alt!" },
        { speaker: Speaker.TEACHER, text: "Vent litt! To ting er farlige her. Nummer 1: Personvern. Vi kan ikke lære AI-en ekte navn og adresser. Det er ulovlig." },
        { speaker: Speaker.AIKI, text: "Ok, så vi må fjerne personlig info. Hva er nummer 2?" },
        { speaker: Speaker.TEACHER, text: "Nummer 2 er BIAS, eller skjevhet. Hvis du bare viser AI-en bilder av mannlige sjefer, vil den tro at damer ikke kan være sjef." },
        { speaker: Speaker.TEACHER, text: "Og husk 'Garbage In, Garbage Out'. Dårlige data (søppel) gir en dum AI. Gode kilder (fakta) gir en smart AI." },
        { speaker: Speaker.AIKI, text: "Så vi må være redaktører. Fjerne navn, og fjerne fordommer." }
    ],
    [GameStage.MISSION_3]: [
        { speaker: Speaker.GLITCH, text: "Dataene er rene! Nå skal vi bygge hjernen (Nevrale Nettverk). Jeg ser masse knapper her... 'Learning Rate', 'Epochs', 'Temperature'..." },
        { speaker: Speaker.TEACHER, text: "Ikke få panikk. Tenk på det som å lære å sykle. 'Epochs' er bare hvor mange ganger du øver. Flere epochs = mer øving." },
        { speaker: Speaker.AIKI, text: "Hva med 'Learning Rate'?" },
        { speaker: Speaker.TEACHER, text: "Det er hvor fort du prøver å lære. Hvis Learning Rate er for høy, raser du gjennom stoffet og glemmer alt. Hvis den er for lav, tar det 100 år." },
        { speaker: Speaker.GLITCH, text: "Aha. Og 'Temperature'?" },
        { speaker: Speaker.TEACHER, text: "Det er kreativiteten. Lav temperatur = kjedelig og forutsigbar. Høy temperatur = sprø og fantasifull." },
        { speaker: Speaker.AIKI, text: "Så vi må finne balansen. Ikke for fort, ikke for sakte. Ikke for kjedelig, ikke for gal." }
    ],
    [GameStage.MISSION_4]: [
        { speaker: Speaker.AIKI, text: "Wow, den virker! Jeg spurte om hovedstaden i Frankrike, og den svarte Paris! Den er supersmart!" },
        { speaker: Speaker.TEACHER, text: "Pass på nå. Den er ikke smart, den er en 'Sannsynlighetsmaskin'. Den vet ikke hva Paris er." },
        { speaker: Speaker.GLITCH, text: "Hva mener du? Svaret var jo rett?" },
        { speaker: Speaker.TEACHER, text: "Den regnet bare ut at ordet 'Paris' ofte kommer etter 'hovedstad i Frankrike'. Det er bare statistikk." },
        { speaker: Speaker.TEACHER, text: "Noen ganger finner den på ting som SER riktig ut, men som er feil. Vi kaller det 'Hallusinasjoner'." },
        { speaker: Speaker.AIKI, text: "Så den kan lyve?" },
        { speaker: Speaker.TEACHER, text: "Den lyver ikke med vilje, for den har ingen samvittighet. Men den dikter opp fakta. Dere må alltid sjekke kildene!" }
    ],
    [GameStage.MISSION_5]: [
        { speaker: Speaker.RECTOR, text: "Denne 'Skolehjernen' er fantastisk! Vi kan spare penger! La oss bruke den til å overvåke elevene og rette alle prøver!" },
        { speaker: Speaker.AIKI, text: "Vent litt, Rektor. Er det rettferdig? Hva om den gjør feil? Og er det lov å overvåke oss?" },
        { speaker: Speaker.TEACHER, text: "Aiki treffer spikeren på hodet. Selv om teknologien KAN gjøre det, betyr det ikke at den BØR gjøre det." },
        { speaker: Speaker.TEACHER, text: "Vi trenger 'Guardrails' – sikkerhetsregler. AI-en skal ikke hjelpe til med kriminalitet, og den skal ikke gjøre jobben FOR elevene." },
        { speaker: Speaker.GLITCH, text: "Så den skal være en 'Tutor' (hjelper), ikke en fasit?" },
        { speaker: Speaker.TEACHER, text: "Nettopp. Dere bestemmer de etiske reglene nå. Vær strenge, men rettferdige." }
    ],
    [GameStage.FINALE]: []
};

interface StorySceneProps {
    state: GameState;
    onMissionComplete: (k: number, e: number, h: string) => void;
    onIntroComplete: () => void;
    onReset: () => void;
}

export const StoryScene: React.FC<StorySceneProps> = ({ state, onMissionComplete, onIntroComplete, onReset }) => {
    const [showDialogue, setShowDialogue] = useState(true);

    // Reset dialogue visibility when stage changes
    useEffect(() => {
        if (state.currentStage !== GameStage.FINALE && state.currentStage !== GameStage.MENU) {
            setShowDialogue(true);
        } else {
            setShowDialogue(false);
        }
    }, [state.currentStage]);

    // Handle what happens when dialogue finishes
    const handleDialogueComplete = () => {
        if (state.currentStage === GameStage.INTRO) {
            onIntroComplete();
        } else {
            setShowDialogue(false);
        }
    };

    if (state.currentStage === GameStage.FINALE) {
        return <Finale state={state} onReset={onReset} />;
    }

    const script = SCRIPTS[state.currentStage] || [];

    return (
        <div className="relative h-full w-full flex flex-col items-center justify-center min-h-[60vh]">
            
            {/* Mission Content */}
            {!showDialogue && state.currentStage !== GameStage.MENU && (
                <div className="relative z-10 w-full animate-fade-in-up h-full">
                    {state.currentStage === GameStage.MISSION_1 && <Mission1 onComplete={onMissionComplete} />}
                    {state.currentStage === GameStage.MISSION_2 && <Mission2 onComplete={onMissionComplete} />}
                    {state.currentStage === GameStage.MISSION_3 && <Mission3 onComplete={onMissionComplete} />}
                    {state.currentStage === GameStage.MISSION_4 && <Mission4 onComplete={onMissionComplete} />}
                    {state.currentStage === GameStage.MISSION_5 && <Mission5 onComplete={onMissionComplete} />}
                </div>
            )}

            {/* Dialogue Overlay */}
            {showDialogue && script.length > 0 && (
                <DialogueBox 
                    key={state.currentStage} // Force remount on stage change
                    dialogue={script} 
                    onComplete={handleDialogueComplete} 
                />
            )}
        </div>
    );
};
