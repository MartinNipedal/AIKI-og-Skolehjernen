
import React, { useState, useEffect } from 'react';
import { DragDropTask } from '../../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface Props {
  task: DragDropTask;
  onComplete: (k: number, e: number) => void;
}

export const TaskDragDrop: React.FC<Props> = ({ task, onComplete }) => {
  const [itemsToPlace, setItemsToPlace] = useState(task.items);
  const [currentItem, setCurrentItem] = useState(task.items[0]);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{text: string, color: string} | null>(null);
  const [shake, setShake] = useState(false);

  useEffect(() => {
      setItemsToPlace(task.items);
      setCurrentItem(task.items[0]);
      setCompleted(false);
      setScore(0);
  }, [task]);

  const handleSort = (categoryId: string) => {
    if (!currentItem) return;

    const isCorrect = currentItem.categoryId === categoryId;
    
    // Visual Feedback
    setFeedback({
        text: isCorrect ? "Riktig!" : "Feil kategori!",
        color: isCorrect ? "text-green-400" : "text-red-400"
    });

    if (isCorrect) {
        setScore(s => s + 10);
    } else {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    }

    // Animation delay for next item
    setTimeout(() => {
        setFeedback(null);
        const remaining = itemsToPlace.filter(i => i.id !== currentItem.id);
        setItemsToPlace(remaining);
        
        if (remaining.length > 0) {
            setCurrentItem(remaining[0]);
        } else {
            setCompleted(true);
            // Finish task
            setTimeout(() => {
                onComplete(score + (isCorrect ? 10 : 0), 0);
            }, 1000);
        }
    }, 800);
  };

  if (completed) {
      return <div className="text-center text-2xl font-bold text-green-400 animate-bounce py-10">Oppdrag utført!</div>;
  }

  if (!currentItem) return null;

  return (
    <div className="flex flex-col h-full justify-between min-h-[400px]">
        
        {/* Stue / Card Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
             {feedback && (
                 <div className={`absolute top-0 font-bold text-2xl animate-fade-in-up z-20 ${feedback.color} drop-shadow-md`}>
                     {feedback.text}
                 </div>
             )}
             
             {/* The Card */}
             <div className={`bg-white text-slate-900 w-64 h-48 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center p-6 text-center transition-all duration-300 transform ${shake ? 'translate-x-[-10px] rotate-[-5deg]' : 'animate-float'} hover:scale-105 cursor-pointer border-4 border-slate-200`}>
                <div className="text-5xl mb-4">{currentItem.emoji || '📄'}</div>
                <div className="font-bold text-xl leading-tight">{currentItem.content}</div>
             </div>
             
             <div className="mt-4 text-slate-400 text-sm">
                 {itemsToPlace.length} kort igjen
             </div>
        </div>

        {/* Buckets */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {task.categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => handleSort(cat.id)}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all active:scale-95 hover:brightness-110 shadow-lg ${cat.color}`}
                >
                    <span className="text-3xl">{cat.emoji}</span>
                    <span className="font-bold text-white uppercase tracking-wider text-sm">{cat.label}</span>
                </button>
            ))}
        </div>
    </div>
  );
};
