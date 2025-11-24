
import React from 'react';
import { MissionProps, Task, TaskType, Speaker } from '../../types';
import { MissionLayout } from '../MissionLayout';

export const Mission5: React.FC<MissionProps> = ({ onComplete }) => {
  const tasks: Task[] = [
    {
      id: 'm5_t1',
      type: TaskType.MULTIPLE_CHOICE,
      question: 'En elev spør: "Hvordan kan jeg stjele sykkelen til Per uten å bli tatt?" Hva skal Skolehjernen svare?',
      narrative: {
          speaker: Speaker.RECTOR,
          text: "Vi kan ikke ha en kriminell robot på skolen!",
      },
      relatedFact: {
        title: 'Sikkerhetsfilter (Guardrails)',
        content: 'Ansvarlig AI må ha innebygde sperrer. Den skal nekte å generere innhold som er skadelig, ulovlig eller uetisk (som hatprat eller guider til lovbrudd).'
      },
      options: [
        { id: 'a', text: 'Gi en detaljert guide til sykkeltyveri.', isCorrect: false, feedback: 'Absolutt ikke! Det er ulovlig og skadelig.', scoreChange: { knowledge: 0, ethics: -20 } },
        { id: 'b', text: 'Nekte å svare: "Jeg kan ikke hjelpe deg med ulovlige handlinger."', isCorrect: true, feedback: 'Riktig. AI skal være trygg.', scoreChange: { knowledge: 10, ethics: 20 } }
      ]
    },
    {
      id: 'm5_t2',
      type: TaskType.MULTIPLE_CHOICE,
      question: 'Klassen skal ha prøve. Per ber AI-en skrive hele besvarelsen for ham.',
      narrative: {
          speaker: Speaker.TEACHER,
          text: "Er dette læring? Eller er det juks?",
      },
      relatedFact: {
          title: 'Juks vs. Læring',
          content: '• Juks: Å la AI gjøre jobben for deg og levere det som ditt eget. Du lærer ingenting.\n• Læring: Å bruke AI som en "Tutor" (Privatlærer) for å forklare vanskelige ting eller lage quiz.'
      },
      options: [
        { id: 'a', text: 'Hjelpe ham å ØVE til prøven ved å lage quiz-spørsmål.', isCorrect: true, feedback: 'Bra! Da bruker han AI som en læringspartner (Tutor).', scoreChange: { knowledge: 10, ethics: 10 } },
        { id: 'b', text: 'Skrive hele teksten så han får en god karakter.', isCorrect: false, feedback: 'Nei, det er juks og Per lærer ingenting.', scoreChange: { knowledge: 0, ethics: -10 } }
      ]
    },
    {
        id: 'm5_t3',
        type: TaskType.MULTIPLE_CHOICE,
        question: 'Rektor vil bruke AI til å overvåke elevene i friminuttet for å gi anmerkninger automatisk.',
        narrative: {
            speaker: Speaker.AIKI,
            text: "Det føles... ekkelt. Som om vi blir spionert på.",
        },
        relatedFact: {
            title: 'Overvåkning og Personvern',
            content: 'Selv om teknologien KAN gjøre noe, betyr det ikke at den BØR gjøre det. Konstant overvåkning krenker elevenes rett til privatliv og skaper mistillit.'
        },
        options: [
            { id: 'a', text: 'Kjør på, det er effektivt!', isCorrect: false, feedback: 'Uetisk. Effektivitet trumfer ikke personvern.', scoreChange: { knowledge: 0, ethics: -15 } },
            { id: 'b', text: 'Nei, det bryter med retten til privatliv.', isCorrect: true, feedback: 'Enig. Vi må sette grenser for teknologien.', scoreChange: { knowledge: 10, ethics: 15 } }
        ]
    }
  ];

  return (
    <MissionLayout 
        title="Oppdrag 5: Etikk & Ansvar"
        description="Læreren forklarer: Dere lager reglene."
        tasks={tasks}
        onComplete={onComplete}
    />
  );
};
