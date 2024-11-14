import React from 'react';
import { MessageCircle } from 'lucide-react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LoginButton } from './components/LoginButton';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Header } from './components/Header';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useChatStore } from './store/chatStore';
import { config } from './config';
import { chatApi } from './services/api';

function App() {
  const { messages, isTyping, user, addMessage, setTyping, setUser } = useChatStore();

  const handleSendMessage = async (content: string) => {
    if (!user) return;

    try {
      addMessage({ content, sender: 'user' });
      setTyping(true);

      const history = messages.map(msg => ({
        content: msg.content,
        role: msg.sender === 'user' ? 'user' : 'assistant'
      }));

      const response = await chatApi.sendMessage(content, history);

      if (response && response.reply) {
        addMessage({ content: response.reply, sender: 'bot' });
      }
    } catch (error: any) {
      addMessage({
        content: `Error: ${error.message}`,
        sender: 'bot'
      });
    } finally {
      setTyping(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    useChatStore.setState({ messages: [] });
  };

  return (
    <GoogleOAuthProvider clientId={config.googleClientId}>
      <div className="flex flex-col h-screen bg-gray-100">
        {!user ? (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="flex items-center justify-center mb-6">
                <MessageCircle size={32} className="text-blue-600" />
                <h1 className="text-2xl font-bold ml-2">Asistente de Chat IA</h1>
              </div>
              <LoginButton onLogin={setUser} />
            </div>
          </div>
        ) : (
          <>
            <Header user={user} onLogout={handleLogout} />

            <main className="flex-1 overflow-y-auto p-4">
              <div className="max-w-4xl mx-auto">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    userPicture={user.picture}
                  />
                ))}
                {isTyping && (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                )}
              </div>
            </main>

            <footer className="bg-white border-t border-gray-200 p-4">
              <div className="max-w-4xl mx-auto">
                <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
              </div>
            </footer>
          </>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}