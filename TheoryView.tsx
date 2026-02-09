
import React, { useState, useEffect } from 'react';
import { IDENTITIES } from './constants';

const TheoryView: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [showExample, setShowExample] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);

  const identity = IDENTITIES.find(i => i.id === selectedId) || IDENTITIES[0];

  useEffect(() => {
    if ((window as any).MathJax) {
      (window as any).MathJax.typesetPromise();
    }
  }, [selectedId, showExample, showMnemonic]);

  const resetStates = () => { setShowExample(false); setShowMnemonic(false); };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-10 flex flex-wrap gap-3 justify-center">
        {IDENTITIES.map(i => (
          <button key={i.id} onClick={() => { setSelectedId(i.id); resetStates(); }} className={`w-12 h-12 rounded-xl font-black transition-all neo-btn ${selectedId === i.id ? 'bg-pink-500 text-white' : 'bg-white text-black'}`}>
            {i.id}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-3xl neo-card p-6 md:p-10 relative overflow-hidden">
        <div className="inline-block bg-yellow-300 border-2 border-black px-4 py-1 rounded-full font-black text-sm mb-6 uppercase tracking-widest">HĐT số {selectedId}</div>
        <h2 className="text-4xl font-black text-black mb-8 italic uppercase">{identity.title}</h2>
        <div className="bg-cyan-100 p-8 rounded-2xl border-4 border-black mb-8 flex justify-center items-center neo-card rotate-[0.5deg]">
          <span className="text-3xl md:text-5xl text-black font-black tracking-tighter">${identity.formula}$</span>
        </div>
        <div className="flex flex-wrap gap-4 mb-8">
          <button onClick={() => setShowExample(!showExample)} className="px-8 py-4 bg-green-400 text-black rounded-xl font-black neo-btn uppercase text-sm tracking-wider">{showExample ? 'Đóng ví dụ' : 'Xem ví dụ 📚'}</button>
          <button onClick={() => setShowMnemonic(!showMnemonic)} className="px-8 py-4 bg-orange-400 text-black rounded-xl font-black neo-btn uppercase text-sm tracking-wider">Mẹo ghi nhớ 🧠</button>
        </div>
        {showExample && (
          <div className="bg-white p-6 rounded-2xl border-4 border-black neo-card mb-6">
            <h4 className="font-black text-black mb-4 uppercase text-lg underline">Từng bước giải:</h4>
            <ul className="space-y-4 mb-6">
              {identity.example.steps.map((step, idx) => (
                <li key={idx} className="flex items-start font-bold text-lg"><span className="bg-black text-white w-7 h-7 flex items-center justify-center rounded-lg text-xs font-black mr-4 mt-1 shrink-0">{idx + 1}</span>{step}</li>
              ))}
            </ul>
            <p className="text-2xl font-black text-black">KẾT QUẢ: <span className="bg-green-100 px-2 rounded">${identity.example.result}$</span></p>
          </div>
        )}
        {showMnemonic && (
          <div className="bg-orange-100 p-6 rounded-2xl border-4 border-black border-dotted">
            <p className="text-xl font-black text-orange-900 leading-tight italic">"{identity.mnemonic}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TheoryView;
