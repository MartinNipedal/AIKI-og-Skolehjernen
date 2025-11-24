

export enum GameStage {
  MENU = 'MENU',
  INTRO = 'INTRO',
  MISSION_1 = 'MISSION_1',
  MISSION_2 = 'MISSION_2',
  MISSION_3 = 'MISSION_3',
  MISSION_4 = 'MISSION_4',
  MISSION_5 = 'MISSION_5',
  FINALE = 'FINALE'
}

export enum Speaker {
  AIKI = 'AIKI',
  GLITCH = 'GLITCH',
  TEACHER = 'LÆRER',
  RECTOR = 'REKTOR',
  SKOLEHJERNEN = 'SKOLEHJERNEN',
  SYSTEM = 'SYSTEM'
}

export interface DialogueLine {
  speaker: Speaker;
  text: string;
}

export interface Fact {
  title: string;
  content: string;
}

export enum TaskType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  DRAG_DROP = 'DRAG_DROP',
  CONNECT = 'CONNECT'
}

export interface BaseTask {
  id: string;
  type: TaskType;
  question: string;
  narrative?: { // Story context appearing before/during task
      speaker: Speaker;
      text: string;
      mood?: 'neutral' | 'happy' | 'concerned' | 'excited';
  };
  relatedFact?: Fact;
}

export interface MultipleChoiceTask extends BaseTask {
  type: TaskType.MULTIPLE_CHOICE;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
    scoreChange?: { knowledge: number; ethics: number };
  }[];
}

export interface DragDropTask extends BaseTask {
  type: TaskType.DRAG_DROP;
  items: { id: string; content: string; categoryId: string; emoji?: string }[];
  categories: { id: string; label: string; color: string; emoji?: string }[];
}

export interface ConnectTask extends BaseTask {
  type: TaskType.CONNECT;
  pairs: { id: string; left: string; right: string }[];
}

export type Task = MultipleChoiceTask | DragDropTask | ConnectTask;

export interface GameState {
  currentStage: GameStage;
  unlockedStages: GameStage[];
  scores: {
    knowledge: number;
    ethics: number;
  };
  history: string[]; 
  missionComplete: boolean;
}

export interface MissionProps {
  onComplete: (knowledgeGain: number, ethicsGain: number, summary?: string) => void;
}

export interface FinaleProps {
    state: GameState;
    onReset: () => void;
}
