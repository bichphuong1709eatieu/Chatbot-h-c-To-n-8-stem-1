
import React, { useState, useRef, useEffect } from 'react';
import { getTutorResponse } from './gemini';
import { View } from './types';

interface Message { role: 'user' | 'model'; text: string; }

const TutorView: React.FC<{setView: (view: View) => void}> = ({ setView }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Chào con! Thầy là Pi 🤖. Cần thầy giải đáp nhanh hằng đẳng thức nào không? Hỏi thầy ngay nhé! 🥧' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if ((window as any).MathJax) {
      (window as any).MathJax.typesetPromise();
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim(); 
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setLoading(true);

    const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    const response = await getTutorResponse(msg, history);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-180px)] max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl neo-card flex-1 flex flex-col overflow-hidden border-4 border-black">
        {/* Chat Header */}
        <div className="bg-pink-500 p-4 border-b-4 border-black flex items-center space-x-3">
           <div className="w-10 h-10 bg-white rounded-full border-2 border-black flex items-center justify-center text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">🥧</div>
           <h3 className="font-black text-white uppercase italic tracking-tighter">Chat với Thầy Pi</h3>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fffdfa]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 px-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                m.role === 'user' ? 'bg-cyan-200 font-bold' : 'bg-white'
              }`}>
                <div className="whitespace-pre-wrap text-lg leading-relaxed">{m.text}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
               <div className="bg-white p-2 px-4 rounded-xl border-2 border-black italic text-sm font-bold animate-pulse">Thầy đang gõ...</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t-4 border-black bg-white">
          <div className="flex space-x-2">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyPress={e => e.key === 'Enter' && handleSend()} 
              className="flex-1 p-3 border-4 border-black rounded-xl font-bold focus:outline-none focus:bg-yellow-50 text-base" 
              placeholder="Hỏi công thức, bài tập..." 
            />
            <button 
              onClick={handleSend} 
              disabled={loading} 
              className="bg-pink-500 p-3 px-5 rounded-xl border-4 border-black neo-btn text-xl text-white font-black"
            >
              GỬI
            </button>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
            <QuickAsk label="HĐT số 1" onClick={() => setInput("Nhắc lại cho con hằng đẳng thức số 1 với ạ")} />
            <QuickAsk label="Mẹo nhớ" onClick={() => setInput("Có mẹo nào nhớ 7 hằng đẳng thức nhanh không thầy?")} />
            <QuickAsk label="Làm bài tập" onClick={() => setInput("Thầy cho con 1 ví dụ về (a-b)^2")} />
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickAsk: React.FC<{label: string, onClick: () => void}> = ({ label, onClick }) => (
  <button onClick={onClick} className="whitespace-nowrap bg-white border-2 border-black px-3 py-1 rounded-full text-xs font-black hover:bg-black hover:text-white transition-colors uppercase">
    {label}
  </button>
);

export default TutorView;
