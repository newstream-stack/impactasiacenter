import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useI18n } from '../../i18n/I18nContext';

export default function ChatBot() {
  const { language } = useI18n();
  const isEn = language === 'en';
  
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: isEn 
        ? 'Hello! I am the Impact Asia assistant. How can I help you today?' 
        : '您好！我是亞洲論壇影響力中心的小助手，請問有什麼我可以協助您的嗎？' 
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  // Show tooltip after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Sync welcome message and insert system notice when language changes
  useEffect(() => {
    if (messages.length === 1) {
      // If only welcome message, replace it
      setMessages([{ 
        role: 'assistant', 
        content: isEn 
          ? 'Hello! I am the Impact Asia assistant. How can I help you today?' 
          : '您好！我是亞洲論壇影響力中心的小助手，請問有什麼我可以協助您的嗎？' 
      }]);
    } else {
      // If conversation exists, add a system notice
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: isEn ? '--- Language switched to English ---' : '--- 語系已切換為繁體中文 ---' 
      }]);
    }
    setSuggestions([]); // Clear suggestions to avoid language mismatch
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, suggestions]);

  const handleSubmit = async (e, suggestedMessage = null) => {
    if (e) e.preventDefault();
    const userMessage = suggestedMessage || input.trim();
    
    if (!userMessage || isLoading) return;

    setInput('');
    setSuggestions([]);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage, language }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let currentFullText = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        currentFullText += chunkValue;
        
        let displayContent = currentFullText;
        if (currentFullText.includes('[SUGGESTIONS]')) {
          const parts = currentFullText.split('[SUGGESTIONS]');
          displayContent = parts[0].trim();
          
          if (done) {
            const rawSuggestions = parts[1].split(',').map(s => s.trim()).filter(s => s);
            setSuggestions(rawSuggestions);
          }
        }

        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = displayContent;
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error calling chat function:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = isEn 
          ? 'Sorry, there was an error connecting to the AI. Please check your connection.'
          : '抱歉，連線至 AI 助手時出現錯誤，請確認網路連線。';
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Tooltip Reminder */}
      {showTooltip && !isOpen && (
        <div className="fixed bottom-24 right-6 bg-[#FF5E00] text-white px-4 py-2 rounded-2xl shadow-xl z-50 animate-bounce-subtle cursor-pointer" onClick={toggleChat}>
          <div className="relative text-sm font-semibold">
            {isEn ? 'Ask me anything!' : '有問題可以問我喔！'}
            {/* Triangle indicator */}
            <div className="absolute -bottom-4 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#FF5E00]"></div>
          </div>
          <button 
            className="absolute -top-2 -right-2 bg-slate-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] border border-slate-700"
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
          >✕</button>
        </div>
      )}

      {/* Floating Button - Brand Orange */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-[#FF5E00] rounded-full flex items-center justify-center shadow-lg hover:brightness-110 transition-all z-50 ${isOpen ? 'hidden' : ''}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Chat Dialog */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[32rem] bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-slate-700 font-sans animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
            <h3 className="text-white font-semibold">{isEn ? 'AI Assistant' : 'AI 小助手'}</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.map((msg, index) => {
              if (msg.role === 'system') {
                return (
                  <div key={index} className="flex justify-center">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">
                      {msg.content}
                    </span>
                  </div>
                );
              }
              
              return (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2 break-words ${
                      msg.role === 'user' 
                        ? 'bg-[#FF5E00] text-white rounded-br-none whitespace-pre-wrap' 
                        : 'bg-slate-700 text-slate-100 rounded-bl-none prose prose-invert prose-sm'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              );
            })}

            {/* Suggestions */}
            {!isLoading && suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-start mt-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSubmit(null, s)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-[#FF5E00] border border-[#FF5E00]/30 rounded-full px-3 py-1.5 transition-colors text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-800 border-t border-slate-700">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isEn ? 'Ask a question...' : '輸入您的問題...'}
                className="flex-1 bg-slate-900 text-white rounded-lg px-4 py-2 border border-slate-700 focus:outline-none focus:border-[#FF5E00] placeholder-slate-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-[#FF5E00] text-white rounded-lg px-4 py-2 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #475569;
          border-radius: 10px;
        }
        .prose p { margin: 0; }
        .prose strong { color: #fff; font-weight: 700; }
        .prose ul, .prose ol { margin: 0.5rem 0; padding-left: 1.25rem; }
        .prose li { margin: 0.25rem 0; }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
      `}} />
    </>
  );
}
