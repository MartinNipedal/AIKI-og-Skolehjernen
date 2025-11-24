
import React from 'react';
import { MissionProps, Task, TaskType, Speaker } from '../../types';
import { MissionLayout } from '../MissionLayout';

export const Mission3: React.FC<MissionProps> = ({ onComplete }) => {
  const tasks: Task[] = [
    {
      id: 'm3_t1',
      type: TaskType.CONNECT,
      question: 'Koble sammen lagene i det nevrale nettverket!',
      narrative: {
          speaker: Speaker.TEACHER,
          text: "Husk fabrikk-analogien. Råvarer inn, behandling i midten, produkt ut.",
      },
      pairs: [
          { id: 'p1', left: 'Input Lag', right: 'Ser dataene (Øynene)' },
          { id: 'p2', left: 'Skjulte Lag', right: 'Finner mønstre (Hjernen)' },
          { id: 'p3', left: 'Output Lag', right: 'Gir svaret (Munnen)' },
      ],
      relatedFact: {
        title: 'Nevrale Nettverk',
        content: 'Kunstige nevroner er inspirert av biologiske hjerneceller. De sender signaler til hverandre. Jo sterkere koblingen er, jo viktigere er signalet.'
      }
    },
    {
        id: 'm3_t2',
        type: TaskType.MULTIPLE_CHOICE,
        question: 'KONFIGURER BOTEN: Hva betyr "Learning Rate"?',
        narrative: {
            speaker: Speaker.GLITCH,
            text: "Jeg kan skru på denne knotten som heter 'Learning Rate'. Skal jeg sette den på maks?",
            mood: 'excited'
        },
        options: [
            { id: 'a', text: 'Sett den på maks! Da lærer den alt på ett sekund!', isCorrect: false, feedback: 'Nei, da "løper" den forbi svaret og lærer ingenting.', scoreChange: { knowledge: -5, ethics: 0 } },
            { id: 'b', text: 'Sett den lavt og la den øve mange ganger (Epochs).', isCorrect: true, feedback: 'Riktig! Læring tar tid og gjentagelse.', scoreChange: { knowledge: 20, ethics: 0 } }
        ],
        relatedFact: {
            title: 'Learning Rate & Epochs',
            content: '• Learning Rate: Hvor fort modellen endrer seg når den gjør feil. For raskt = Glemmer. For sakte = Tar evigheter.\n• Epochs: Antall ganger modellen går gjennom hele pensum (treningsdataene). Mer øving (flere epochs) er som regel bra.'
        }
    },
    {
        id: 'm3_t3',
        type: TaskType.MULTIPLE_CHOICE,
        question: 'Hvordan gjør vi modellen mer "kreativ" og mindre kjedelig?',
        narrative: {
            speaker: Speaker.AIKI,
            text: "Den svarer nøyaktig det samme hver gang. Det er kjedelig.",
        },
        options: [
            { id: 'a', text: 'Øk "Temperaturen" (Tilfeldighet).', isCorrect: true, feedback: 'Jepp! Høyere temperatur gjør den mer uforutsigbar og fantasifull.' },
            { id: 'b', text: 'Gi den mer strøm.', isCorrect: false, feedback: 'Datamaskiner blir ikke kreative av strøm.' }
        ],
        relatedFact: {
            title: 'Hva er Temperatur?',
            content: 'Temperatur er en innstilling som styrer hvor "gal" AI-en får lov til å være.\n• Lav temperatur (0.1): Velger alltid det mest sannsynlige ordet. Kjedelig, men trygt.\n• Høy temperatur (0.9): Tar sjanser. Mer kreativt, men kan også bli rart.'
        }
    }
  ];

  return (
    <MissionLayout 
        title="Oppdrag 3: Dyp Læring"
        description="Læreren forklarer: Nevrale lag og parametere."
        tasks={tasks}
        onComplete={onComplete}
    />
  );
};
