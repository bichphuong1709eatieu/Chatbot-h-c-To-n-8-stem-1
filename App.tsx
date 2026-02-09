
import React, { useState } from 'react';
import { View } from './types';
import Header from './Header';
import TheoryView from './TheoryView';
import GameView from './GameView';
import QuizView from './QuizView';
import TutorView from './TutorView';
import SettingsView from './SettingsView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);

  const renderContent = () => {
    switch (currentView) {
      case View.THEORY: return <TheoryView />;
      case View.GAMES: return <GameView />;
      case View.QUIZ: return <QuizView />;
      case View.TUTOR: return <TutorView setView={setCurrentView} />;
      case View.SETTINGS: return <SettingsView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center space-y-12 py-12 px-4 text-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Capybara" alt="Mascot" className="relative w-40 h-40 rounded-full border-4 border-black bg-white neo-card" />
            </div>
            
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-4 uppercase italic">Toán 8 <span className="text-pink-500">Chill</span> Phết!</h1>
              <p className="text-2xl font-bold text-gray-800 bg-white border-2 border-black inline-block px-4 py-2 rotate-[-1deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Học Hằng Đẳng Thức không khó 🤟</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-5xl">
              <MenuCard title="HỌC BÀI" desc="Lý thuyết dễ hiểu" icon="📘" color="bg-cyan-300" onClick={() => setCurrentView(View.THEORY)} />
              <MenuCard title="PHÁ ĐẢO" desc="Game giải trí" icon="🎮" color="bg-purple-400" onClick={() => setCurrentView(View.GAMES)} />
              <MenuCard title="THỬ THÁCH" desc="Luyện tập 10/10" icon="📝" color="bg-yellow-300" onClick={() => setCurrentView(View.QUIZ)} />
              <MenuCard title="THẦY PI" desc="Chatbot hỗ trợ 24/7" icon="🤖" color="bg-pink-400" onClick={() => setCurrentView(View.TUTOR)} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <Header currentView={currentView} setView={setCurrentView} />
      <main className="container mx-auto max-w-6xl pt-6">{renderContent()}</main>
    </div>
  );
};

const MenuCard: React.FC<{ title: string, desc: string, icon: string, color: string, onClick: () => void }> = ({ title, desc, icon, color, onClick }) => (
  <button onClick={onClick} className={`${color} text-black p-8 rounded-2xl neo-card text-left flex items-center space-x-6 group border-4 border-black transition-all hover:scale-[1.02]`}>
    <span className="text-6xl group-hover:scale-110 transition-transform">{icon}</span>
    <div>
      <h3 className="text-3xl font-black uppercase tracking-tight">{title}</h3>
      <p className="font-bold opacity-80">{desc}</p>
    </div>
  </button>
);

export default App;
