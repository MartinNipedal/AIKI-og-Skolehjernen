
import React from 'react';
import { MissionProps, Task, TaskType, Speaker } from '../../types';
import { MissionLayout } from '../MissionLayout';

export const Mission4: React.FC<MissionProps> = ({ onComplete }) => {
  const tasks: Task[] = [
    {
      id: 'm4_t1',
      type: TaskType.MULTIPLE_CHOICE,
      question: 'Skolehjernen påstår: "Henrik Ibsen oppfant iPhone i 1890". Hva har skjedd?',
      narrative: {
          speaker: Speaker.AIKI,
          text: "Hahaha, se hva den skrev! Den høres så selvsikker ut!",
      },
      relatedFact: {
        title: 'Hallusinasjoner',
        content: 'Når en AI ikke vet svaret, kan den finne på noe som høres logisk ut grammatisk, men som er faktabasert feil. Den vet ikke hva "Ibsen" eller "iPhone" er i virkeligheten, den bare gjetter ord.'
      },
      options: [
        { id: 'a', text: 'Den lyver med vilje for å lure oss.', isCorrect: false, feedback: 'AI har ikke intensjoner eller følelser.' },
        { id: 'b', text: 'Den hallusinerer (dikter opp fakta).', isCorrect: true, feedback: 'Korrekt. Den setter sammen ord som statistisk sett KUNNE fulgt hverandre.', scoreChange: { knowledge: 10, ethics: 0 } }
      ]
    },
    {
      id: 'm4_t2',
      type: TaskType.DRAG_DROP,
      question: 'Sannsynlighet vs Fakta: Hva er AI-en god på?',
      narrative: {
          speaker: Speaker.TEACHER,
          text: "AI er en språkmaskin, ikke en sannhetsmaskin. Sorter oppgavene.",
      },
      items: [
          { id: 'i1', content: 'Skrive et kreativt dikt om våren', categoryId: 'good', emoji: '🎨' },
          { id: 'i2', content: 'Gi korrekte medisinske råd', categoryId: 'bad', emoji: '🚑' },
          { id: 'i3', content: 'Oppsummere en lang tekst', categoryId: 'good', emoji: '📝' },
          { id: 'i4', content: 'Vite hva som skjedde i nyhetene i dag (uten søk)', categoryId: 'bad', emoji: '📰' },
      ],
      categories: [
          { id: 'good', label: 'AI er god på dette', color: 'bg-green-900/50 border-green-500', emoji: '👍' },
          { id: 'bad', label: 'AI kan gjøre feil her', color: 'bg-red-900/50 border-red-500', emoji: '⚠️' }
      ],
      relatedFact: {
          title: 'Styrker og Svakheter',
          content: '• GOD PÅ: Strukturere tekst, oppsummere, være kreativ, oversette språk.\n• DÅRLIG PÅ: Fakta (uten søk), logikk, medisinske råd, sanntidsinformasjon.'
      }
    },
    {
        id: 'm4_t3',
        type: TaskType.MULTIPLE_CHOICE,
        question: 'En elev ber Skolehjernen om kilder til en oppgave. Den lister opp tre bøker.',
        narrative: {
            speaker: Speaker.GLITCH,
            text: "Disse boktitlene ser ekte ut, men jeg finner dem ikke på biblioteket.",
        },
        options: [
            { id: 'a', text: 'Stol på AI-en, biblioteket har nok rotet dem bort.', isCorrect: false, feedback: 'Farlig! AI finner ofte opp kilder.' },
            { id: 'b', text: 'Dobbeltsjekk om bøkene faktisk eksisterer.', isCorrect: true, feedback: 'Smart. AI kan sette sammen "kjente forfatternavn" med "logiske titler" som ikke finnes.', scoreChange: { knowledge: 10, ethics: 10 } }
        ]
    }
  ];

  return (
    <MissionLayout 
        title="Oppdrag 4: Hallusinasjoner"
        description="Læreren forklarer: Sannsynlighet er ikke Sannhet."
        tasks={tasks}
        onComplete={onComplete}
    />
  );
};
