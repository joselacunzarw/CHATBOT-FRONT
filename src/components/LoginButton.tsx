import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { User } from '../types';
import { AlertCircle } from 'lucide-react';
import { config } from '../config';

interface LoginButtonProps {
  onLogin: (user: User) => void;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ onLogin }) => {
  const [error, setError] = useState<string>('');

  const handleDevLogin = () => {
    const mockUser = {
      id: 'dev-user-id',
      name: 'Development User',
      email: 'dev@example.com',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev',
      token: 'dev-token',
    };
    onLogin(mockUser);
  };

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });
        
        if (!userInfoResponse.ok) {
          throw new Error('Failed to get user info');
        }

        const userInfo = await userInfoResponse.json();
        
        onLogin({
          id: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
          token: response.access_token,
        });
      } catch (error) {
        setError('Error durante el inicio de sesión. Por favor, intente nuevamente.');
        console.error('Error during login:', error);
      }
    },
    onError: () => {
      setError('No se pudo iniciar sesión con Google. Por favor, intente nuevamente.');
    },
  });

  return (
    <div className="space-y-4">
      {config.isDevelopment && (
        <button
          onClick={handleDevLogin}
          className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-700 flex items-center justify-center space-x-2 w-full"
        >
          <span>Iniciar sesión (Modo Desarrollo)</span>
        </button>
      )}
      
      <button
        onClick={() => {
          setError('');
          login();
        }}
        className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-sm hover:bg-gray-50 flex items-center justify-center space-x-2 w-full"
      >
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google"
          className="w-5 h-5"
        />
        <span>Iniciar sesión con Google</span>
      </button>

      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle size={20} />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};