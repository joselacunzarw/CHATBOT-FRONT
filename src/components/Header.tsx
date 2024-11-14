import React from 'react';
import { MessageCircle, LogOut } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageCircle size={24} className="text-blue-600" />
          <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img
              src={user.picture}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">{user.name}</span>
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Cerrar sesión"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};