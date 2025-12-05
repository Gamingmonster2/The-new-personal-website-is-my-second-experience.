export interface BioInputs {
  name: string;
  role: string;
  skills: string;
  hobby: string;
  tone: 'professional' | 'witty' | 'casual' | 'pirate';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export enum SectionId {
  HERO = 'hero',
  BIO = 'bio',
  CONTACT = 'contact',
}
