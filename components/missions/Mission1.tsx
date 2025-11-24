
import React from 'react';
import { MissionProps, Task, TaskType, Speaker } from '../../types';
import { MissionLayout } from '../MissionLayout';

export const Mission1: React.FC<MissionProps> = ({ onComplete }) => {
  const tasks: Task[] = [
    {
        id: 'm1_t0',
        type: TaskType.MULTIPLE_CHOICE,
        question: 'HJELP GLITCH Å KODE: Vi trenger en enkel regel for chatboten først.',
        narrative: {
            speaker: Speaker.GLITCH,
            text: "Okei, jeg prøver å lage en 'Oppskrift' som læreren sa. Jeg vil at boten skal si 'Ha det bra' når noen sier 'Hade'. Hva mangler?",
            mood: 'concerned'
        },
        options: [
            { 
                id: 'a', 
                text: 'ELSE IF (input == "Hade") PRINT "Ha det bra!"', 
                isCorrect: true, 
                feedback: 'Perfekt! Dette er en fast regel (Algoritme).',
                scoreChange: { knowledge: 20, ethics: 0 }
            },
            { 
                id: 'b', 
                text: 'PRINT "Jeg liker pizza"', 
                isCorrect: false, 
                feedback: 'Nei, det følger ikke regelen vi ville lage.',
                scoreChange: { knowledge: -5, ethics: 0 }
            },
            { 
                id: 'c', 
                text: 'DELETE SYSTEM32', 
                isCorrect: false, 
                feedback: 'NEI! Det ødelegger maskinen!',
                scoreChange: { knowledge: -10, ethics: 0 }
            }
        ],
        relatedFact: {
            title: 'Hvordan koder vi regler?',
            content: 'Når vi programmerer "oppskrifter" (Algoritmer), bruker vi ofte disse ordene:\n\n• INPUT: Det brukeren skriver (f.eks "Hade").\n• IF / ELSE IF: Betyr "HVIS" eller "ELLERS HVIS". Sjekker om input stemmer med regelen.\n• PRINT: Betyr "SKRIV UT". Det datamaskinen svarer tilbake.'
        }
    },
    {
      id: 'm1_t1',
      type: TaskType.DRAG_DROP,
      question: 'Sorter teknologien! Hva er en fast OPPSKRIFT (Regel) og hva er AI (Lærer selv)?',
      narrative: {
          speaker: Speaker.AIKI,
          text: "Som læreren sa: Noen ting følger bare regler, mens AI finner mønstre selv. La oss sortere.",
          mood: 'excited'
      },
      items: [
          { id: 'i1', content: 'Kalkulator', categoryId: 'rule', emoji: '🧮' },
          { id: 'i2', content: 'Spotify (Musikk-anbefaling)', categoryId: 'ai', emoji: '🎧' },
          { id: 'i3', content: 'ChatGPT', categoryId: 'ai', emoji: '🤖' },
          { id: 'i4', content: 'Stoppeklokke', categoryId: 'rule', emoji: '⏱️' },
      ],
      categories: [
          { id: 'rule', label: 'Oppskrift / Regler', color: 'bg-blue-900/50 border-blue-500 hover:bg-blue-800', emoji: '📜' },
          { id: 'ai', label: 'AI / Mønstre', color: 'bg-purple-900/50 border-purple-500 hover:bg-purple-800', emoji: '🧠' }
      ],
      relatedFact: {
        title: 'Regler vs. Mønstre',
        content: 'En kalkulator gjør alltid det samme (2+2=4). Dette er regelstyrt.\n\nEn musikkanbefaling ser på hva du har hørt på før, og gjetter hva du liker nå. Det er mønstergjenkjenning (AI).'
      }
    },
    {
        id: 'm1_t3',
        type: TaskType.MULTIPLE_CHOICE,
        question: 'Skolehjernen er en LLM. Hva har den gjort for å bli smart?',
        narrative: {
            speaker: Speaker.TEACHER,
            text: "Skolehjernen er ikke programmert med regler for grammatikk. Den har lært språk på en annen måte. Hvordan?",
        },
        options: [
            { id: 'a', text: 'Den har lest enorme mengder tekst og funnet mønstre.', isCorrect: true, feedback: 'Riktig! Den gjetter neste ord basert på sannsynlighet.' },
            { id: 'b', text: 'Noen har skrevet inn alle ordene i ordboka manuelt.', isCorrect: false, feedback: 'Nei, det ville tatt for lang tid.' },
            { id: 'c', text: 'Den googler svarene hver gang.', isCorrect: false, feedback: 'Nei, den bruker sin egen "hjerne" (modell).' }
        ],
        relatedFact: {
            title: 'Store Språkmodeller (LLM)',
            content: 'LLM står for Large Language Model. De trenes på milliarder av setninger for å lære strukturen i språket. De forstår ikke tekst slik vi gjør, men de kan beregne hvilket ord som sannsynligvis kommer etter det forrige.'
        }
    }
  ];

  return (
    <MissionLayout 
        title="Oppdrag 1: Hva er AI?"
        description="Læreren forklarer: Oppskrifter vs Mønstre."
        tasks={tasks}
        onComplete={onComplete}
    />
  );
};
