export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  token?: string; // Token de sesión
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  user: User | null;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setTyping: (typing: boolean) => void;
  setUser: (user: User | null) => void;
}

export interface ApiError {
  error: string;
}