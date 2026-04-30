import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useI18n } from '../../i18n/I18nContext';
import styles from './ChatBot.module.css';

export default function ChatBot({ onActionClick }) {
  const { language, t } = useI18n();
  const isEn = language === 'en';

  const getWelcome = (en) => ({
    role: 'assistant',
    content: en
      ? 'Hello! I am the Impact Asia assistant. How can I help you today?'
      : '您好！我是亞洲論壇影響力中心的小助手，請問有什麼我可以協助您的嗎？',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chat_history');
    return saved ? JSON.parse(saved) : [getWelcome(isEn)];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const prevLangRef = useRef(language);

  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  const clearChat = () => {
    setMessages([getWelcome(isEn)]);
    setSuggestions([]);
    localStorage.removeItem('chat_history');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  const handleActionTrigger = (triggerId) => {
    if (onActionClick) {
      onActionClick(triggerId);
    }
  };

  const QUICK_ACTIONS = isEn 
    ? [ { label: '📅 Schedule', q: 'What is the schedule?' }, { label: '🎤 Speakers', q: 'Who are the speakers?' }, { label: '📍 Location', q: 'Where is it?' }, { label: '📝 Register', q: 'How to register?' } ]
    : [ { label: '📅 年會時間表', q: '這次年會的議程是什麼？' }, { label: '🎤 講員名單', q: '有哪些講員會出席？' }, { label: '📍 舉辦地點', q: '年會在美國哪裡舉辦？' }, { label: '📝 如何報名', q: '如何報名年會？' } ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const chatOpened = localStorage.getItem('chat_opened');
      if (!isOpen && !chatOpened) setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (prevLangRef.current === language) return;
    
    if (messages.length === 1) {
      setMessages([getWelcome(isEn)]);
    } else {
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: isEn ? '--- Language switched to English ---' : '--- 語系已切換為繁體中文 ---' 
      }]);
    }
    setSuggestions([]); 
    prevLangRef.current = language;
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
    localStorage.setItem('chat_opened', 'true');
    
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          history: messages.filter(m => m.role !== 'system'), 
          language 
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let currentFullText = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        currentFullText += chunkValue;
        
        let displayContent = currentFullText;
        if (currentFullText.includes('[SUGGESTIONS]')) {
          displayContent = currentFullText.split('[SUGGESTIONS]')[0].trim();
        }

        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = displayContent;
          return newMessages;
        });
      } 

      if (currentFullText.includes('[SUGGESTIONS]')) {
        const parts = currentFullText.split('[SUGGESTIONS]');
        if (parts[1]) {
          const rawSuggestions = parts[1]
            .split(/[,\n，*]/)
            .map(s => s.trim().replace(/^[0-9.]+\s*/, '')) 
            .filter(s => s && s.length > 2);
          setSuggestions(rawSuggestions);
        }
      }
    } catch (error) {
      console.error('Error calling chat function:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        const errorContent = isEn 
          ? `The AI is currently busy or experiencing connection issues. Please try again later.`
          : `AI 小助手目前忙碌中或連線不穩定，請稍後再試。`;
        newMessages[newMessages.length - 1].content = errorContent;
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showTooltip && !isOpen && (
        <div className={styles.tooltip} onClick={toggleChat}>
          <div className={styles.tooltipText}>
            {isEn ? 'Ask me anything!' : '有問題可以問我喔！'}
            <div className={styles.tooltipArrow}></div>
          </div>
          <button 
            className={styles.tooltipClose}
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
          >✕</button>
        </div>
      )}

      <button
        onClick={toggleChat}
        className={styles.floatingBtn}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dialog}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <span>{isEn ? 'AI Assistant' : 'AI 小助手'}</span>
              <button onClick={clearChat} className={styles.clearBtn}>
                {isEn ? 'Clear' : '清除'}
              </button>
            </div>
            <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className={styles.messagesArea}>
            {messages.map((msg, index) => {
              if (msg.role === 'system') {
                return (
                  <div key={index} className={styles.systemNotice}>
                    {msg.content}
                  </div>
                );
              }
              
              const triggerMatches = Array.from(msg.content.matchAll(/\[TRIGGER:(.*?)\]/g));
              const cleanContent = msg.content.replace(/\[TRIGGER:.*?\]/g, '').replace(/\*\*\s*(.*?)\s*\*\*/g, '**$1**');
              
              return (
                <div 
                  key={index} 
                  className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.userMessageWrapper : styles.assistantMessageWrapper}`}
                >
                  <div className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.assistantMessage}`}>
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown 
                        components={{
                          a: ({ node, ...props }) => (
                            <a {...props} target="_blank" rel="noopener noreferrer" style={{ color: '#ff7a3d', textDecoration: 'underline' }}>
                              {props.children}
                            </a>
                          )
                        }}
                      >
                        {cleanContent}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                  
                  {msg.role === 'assistant' && triggerMatches.length > 0 && (
                    <div className={styles.triggerButtons}>
                      {triggerMatches.map((match, i) => {
                        const triggerId = match[1];
                        const themes = t('themes') || [];
                        const theme = Array.isArray(themes) ? themes.find(th => th.id === triggerId) : null;
                        const btnLabel = theme ? theme.title : (isEn ? 'View Details' : '查看詳細介紹');
                        
                        return (
                          <button key={i} onClick={() => handleActionTrigger(triggerId)} className={styles.triggerBtn}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="16" x2="12" y2="12"></line>
                              <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                            {btnLabel}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {!isLoading && suggestions.length > 0 && (
              <div className={styles.suggestions}>
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => handleSubmit(null, s)} className={styles.suggestionBtn}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <div className={styles.quickActions}>
              {QUICK_ACTIONS.map((action, i) => (
                <button key={i} onClick={() => handleSubmit(null, action.q)} className={styles.actionBtn}>
                  {action.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className={styles.inputForm}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isEn ? 'Ask a question...' : '輸入您的問題...'}
                className={styles.input}
                disabled={isLoading}
              />
              <button type="submit" disabled={!input.trim() || isLoading} className={styles.sendBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
