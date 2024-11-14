import React from 'react';
import { Message } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface ChatMessageProps {
  message: Message;
  userPicture?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, userPicture }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start max-w-[80%]`}>
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={isUser ? userPicture : 'https://api.dicebear.com/7.x/bottts/svg?seed=bot'}
            alt={isUser ? 'Usuario' : 'Bot'}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className={`mx-2 px-4 py-2 rounded-lg ${
            isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
          }`}
        >
          <p className="text-sm">{message.content}</p>
          <span className="text-xs opacity-75 mt-1 block">
            {formatDistanceToNow(message.timestamp, { 
              addSuffix: true,
              locale: es 
            })}
          </span>
        </div>
      </div>
    </div>
  );
};