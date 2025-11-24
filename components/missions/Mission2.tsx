
import React from 'react';
import { MissionProps, Task, TaskType, Speaker } from '../../types';
import { MissionLayout } from '../MissionLayout';

export const Mission2: React.FC<MissionProps> = ({ onComplete }) => {
  const tasks: Task[] = [
    {
        id: 'm2_t0',
        type: TaskType.MULTIPLE_CHOICE,
        question: 'Dilemma: Skal vi bruke denne listen med personopplysninger?',
        narrative: {
            speaker: Speaker.GLITCH,
            text: "Sjekk her! Jeg fant en fil med alle elevenes navn, adresser og karakterer. Skal jeg legge den inn i treningsdataene?",
            mood: 'concerned'
        },
        options: [
            { 
                id: 'a', 
                text: 'Ja, kjør på! Jo mer data, jo bedre blir modellen.', 
                isCorrect: false, 
                feedback: 'STOPP! Det er ulovlig å dele andres personopplysninger (GDPR).', 
                scoreChange: { knowledge: -5, ethics: -20 } 
            },
            { 
                id: 'b', 
                text: 'Nei! Vi må slette eller anonymisere sensitiv info først.', 
                isCorrect: true, 
                feedback: 'Veldig bra. Vi må vaske bort navn og adresser før trening.', 
                scoreChange: { knowledge: 10, ethics: 20 } 
            }
        ],
        relatedFact: {
            title: 'Personvern & GDPR',
            content: 'Språkmodeller glemmer ikke. Hvis du trener den på naboens hemmelighet, kan den fortelle det til hele verden senere. \n\nDerfor må vi vaske bort navn, adresser og helseinfo (Anonymisering) før vi trener modellen.'
        }
    },
    {
      id: 'm2_t1',
      type: TaskType.DRAG_DROP,
      question: 'Kildekritikk: Sorter datasettene! Hva er trygt å lære bort?',
      narrative: {
          speaker: Speaker.TEACHER,
          text: "Husk regelen 'Garbage In, Garbage Out'. Hvilke kilder gjør modellen smart, og hvilke gjør den dum?",
      },
      items: [
          { id: 'i1', content: 'Lærebok i Naturfag 2024', categoryId: 'keep', emoji: '📚' },
          { id: 'i2', content: 'Sint kommentar på Facebook', categoryId: 'trash', emoji: '😡' },
          { id: 'i3', content: 'Reklame for slankepiller', categoryId: 'trash', emoji: '💊' },
          { id: 'i4', content: 'Artikkel fra Store Norske Leksikon', categoryId: 'keep', emoji: '📖' },
      ],
      categories: [
          { id: 'trash', label: 'Søppel (Støy)', color: 'bg-red-900/50 border-red-500 hover:bg-red-800', emoji: '🗑️' },
          { id: 'keep', label: 'Kvalitet (Fakta)', color: 'bg-green-900/50 border-green-500 hover:bg-green-800', emoji: '✅' }
      ],
      relatedFact: {
        title: 'Datakvalitet',
        content: 'Hvis du trener en modell på internett-kommentarer, lærer den å snakke stygt (Bias). Hvis du trener den på kvalitetssikrede tekster, lærer den kunnskap.'
      }
    },
    {
      id: 'm2_t3',
      type: TaskType.MULTIPLE_CHOICE,
      question: 'Test for BIAS: Hva lærer modellen av disse bildene?',
      narrative: {
          speaker: Speaker.AIKI,
          text: "Glitch, du har lastet ned 10 000 bilder av sjefer... men alle er menn i dress. Er det så lurt?",
      },
      options: [
        { id: 'a', text: 'Ingenting, den skjønner av seg selv at damer også kan være sjefer.', isCorrect: false, feedback: 'Feil. En AI vet BARE det den har sett i treningsdataene.' },
        { id: 'b', text: 'Den vil tro at ordet "Sjef" betyr "Mann".', isCorrect: true, feedback: 'Riktig. Dette kalles bias (skjevhet). Modellen arver våre fordommer.', scoreChange: { knowledge: 15, ethics: 10 } },
      ],
      relatedFact: {
        title: 'Algoritmisk Skjevhet (Bias)',
        content: 'En modell arver fordommene i dataene sine. Hvis den mangler data om visse grupper, vil den fungere dårligere for dem eller diskriminere dem.'
      }
    }
  ];

  return (
    <MissionLayout 
        title="Oppdrag 2: Treningsdata"
        description="Læreren forklarer: Søppel inn = Søppel ut."
        tasks={tasks}
        onComplete={onComplete}
    />
  );
};
