import { useState, useRef, useEffect } from 'react';
import { SITE_CONFIG } from '../config';
import { askExpert } from '../services/gemini';
import { ChatMessage } from '../types';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';

export default function Assistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Olá! Sou o assistente especialista em **${SITE_CONFIG.niche}**. Como posso ajudar você hoje? Pode me perguntar sobre produtos, dicas ou recomendações!`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // In a real app, you might want to send the conversation history.
      // For simplicity, we are sending the current question.
      const responseText = await askExpert(userMessage.content);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Desculpe, tive um problema ao processar sua resposta. Tente novamente.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-brand-100 rounded-full mb-4 text-brand-600">
          <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Assistente Especialista</h1>
        <p className="text-gray-600">Tire suas dúvidas sobre {SITE_CONFIG.niche.toLowerCase()} e encontre os melhores produtos.</p>
      </div>

      <div className="flex-grow bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((message) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={message.id} 
              className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                  <Bot className="h-6 w-6" />
                </div>
              )}
              
              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 ${
                message.role === 'user' 
                  ? 'bg-gray-900 text-white rounded-tr-none' 
                  : 'bg-gray-50 border border-gray-100 text-gray-800 rounded-tl-none'
              }`}>
                {message.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <div className="markdown-body text-sm sm:text-base">
                    <Markdown>{message.content}</Markdown>
                  </div>
                )}
              </div>

              {message.role === 'user' && (
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  <User className="h-6 w-6" />
                </div>
              )}
            </motion.div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                <Bot className="h-6 w-6" />
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-none px-5 py-4 flex items-center gap-2 text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm font-medium">Pensando...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua pergunta aqui..."
              disabled={isLoading}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-full focus:ring-brand-500 focus:border-brand-500 block pl-6 pr-14 py-4 disabled:opacity-50 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2.5 bg-brand-600 text-white rounded-full hover:bg-brand-700 disabled:opacity-50 disabled:hover:bg-brand-600 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-3">
            A IA pode cometer erros. Considere verificar informações importantes.
          </p>
        </div>
      </div>
    </div>
  );
}
