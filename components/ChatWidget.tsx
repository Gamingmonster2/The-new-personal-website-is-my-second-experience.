import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { createChatSession } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Chat, GenerateContentResponse } from '@google/genai';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm the One Website AI assistant. Ask me anything about this site or its creator.", timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Ref for the chat session
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatSessionRef.current) {
      try {
        chatSessionRef.current = createChatSession();
      } catch (e) {
        console.error("Failed to init chat session", e);
      }
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || !chatSessionRef.current) return;

    const userMsg: ChatMessage = { role: 'user', text: inputText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const resultStream = await chatSessionRef.current.sendMessageStream({ message: userMsg.text });
      
      let fullResponseText = '';
      
      // Add a placeholder message for the model that we will update
      const modelMsgId = Date.now();
      setMessages(prev => [...prev, { role: 'model', text: '', timestamp: new Date() }]);

      for await (const chunk of resultStream) {
        const responseChunk = chunk as GenerateContentResponse;
        const text = responseChunk.text;
        if (text) {
           fullResponseText += text;
           // Update the last message (model's response) with accumulated text
           setMessages(prev => {
             const newMessages = [...prev];
             const lastMsg = newMessages[newMessages.length - 1];
             if (lastMsg.role === 'model') {
               lastMsg.text = fullResponseText;
             }
             return newMessages;
           });
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to my brain right now. Please try again later.", timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden transition-all duration-300 origin-bottom-right pointer-events-auto flex flex-col ${
          isOpen ? 'opacity-100 scale-100 translate-y-0 h-[500px]' : 'opacity-0 scale-95 translate-y-10 h-0'
        }`}
      >
        {/* Header */}
        <div className="bg-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <h3 className="font-semibold text-white">AI Assistant</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/50">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-brand-600' : 'bg-slate-700'
                }`}
              >
                {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-brand-400" />}
              </div>
              <div 
                className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-600 text-white rounded-tr-none' 
                    : 'bg-slate-700 text-slate-200 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
             <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-brand-400" />
               </div>
               <div className="bg-slate-700 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                 <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-0"></div>
                 <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                 <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-300"></div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-700 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-500 transition-colors placeholder:text-slate-500"
          />
          <button 
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-2 bg-brand-600 text-white rounded-full hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </form>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
          isOpen ? 'bg-slate-700 text-white rotate-90' : 'bg-brand-600 text-white hover:bg-brand-500'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};
