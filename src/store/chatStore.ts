import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatState, Message, User } from '../types';

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isTyping: false,
      user: null,
      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: crypto.randomUUID(),
              timestamp: new Date(),
            },
          ],
        })),
      setTyping: (typing) => set({ isTyping: typing }),
      setUser: (user) => {
        if (user) {
          localStorage.setItem('chatUser', JSON.stringify(user));
        } else {
          localStorage.removeItem('chatUser');
        }
        set({ user });
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);