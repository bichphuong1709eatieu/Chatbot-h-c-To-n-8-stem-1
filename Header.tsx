
import React from 'react';
import { View } from './types';

interface Props {
  currentView: View;
  setView: (view: View) => void;
}

const Header: React.FC<Props> = ({ currentView, setView }) => {
  return (
    <header className="px-4 py-4 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center bg-white border-4 border-black rounded-2xl p-3 neo-card">
        <button onClick={() => setView(View.HOME)} className="flex items-center space-x-3 group">
          <div className="bg-pink-500 p-2 rounded-xl border-2 border-black group-hover:rotate-12 transition-transform">
            <span className="text-2xl">📐</span>
          </div>
          <span className="text-2xl font-black uppercase italic hidden sm:block tracking-tighter">Toán 8 Chill</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setView(View.TUTOR)}
            className={`px-4 py-2 rounded-xl font-black text-xs uppercase border-2 border-black transition-all ${currentView === View.TUTOR ? 'bg-black text-white' : 'bg-white hover:bg-pink-100'}`}
          >
            Hỏi Thầy Pi 🤖
          </button>
          <button 
            onClick={() => setView(View.SETTINGS)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 border-black transition-all ${currentView === View.SETTINGS ? 'bg-black text-white' : 'bg-yellow-300'}`}
          >
            ⚙️
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
