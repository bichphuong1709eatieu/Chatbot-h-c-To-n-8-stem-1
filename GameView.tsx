
import React, { useState, useEffect } from 'react';

const GameView: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  useEffect(() => {
    if ((window as any).MathJax) {
      (window as any).MathJax.typesetPromise();
    }
  }, [activeGame]);

  const renderGame = () => {
    switch (activeGame) {
      case 'drag': return <DragDropGame onBack={() => setActiveGame(null)} />;
      case 'fast': return <FastMathGame onBack={() => setActiveGame(null)} />;
      default: return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <GameCard title="Ghép đôi Hoàn hảo" desc="Nối vế trái và vế phải chính xác." icon="🧩" color="bg-pink-500" onClick={() => setActiveGame('drag')} />
          <GameCard title="Ai nhanh hơn?" desc="Trả lời 5 câu hỏi thần tốc trong 30s." icon="⚡" color="bg-orange-500" onClick={() => setActiveGame('fast')} />
        </div>
      );
    }
  };

  return (
    <div className="py-8">
      <h2 className="text-4xl font-black text-center text-black mb-12 uppercase italic">Khu Vui Chơi Toán Học</h2>
      {renderGame()}
    </div>
  );
};

const GameCard: React.FC<{ title: string, desc: string, icon: string, color: string, onClick: () => void }> = ({ title, desc, icon, color, onClick }) => (
  <button onClick={onClick} className={`${color} text-white p-10 rounded-3xl neo-card text-center flex flex-col items-center justify-center group`}>
    <span className="text-7xl mb-4 group-hover:scale-110 transition-transform">{icon}</span>
    <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">{title}</h3>
    <p className="font-bold opacity-90">{desc}</p>
  </button>
);

const DragDropGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const pairs = [
    { l: "$(a+b)^2$", r: "$a^2+2ab+b^2$" },
    { l: "$(a-b)^2$", r: "$a^2-2ab+b^2$" },
    { l: "$a^2-b^2$", r: "$(a-b)(a+b)$" },
    { l: "$(a+b)^3$", r: "$a^3+3a^2b+3ab^2+b^3$" }
  ];

  const [shuffledL, setShuffledL] = useState([...pairs].sort(() => Math.random() - 0.5));
  const [shuffledR, setShuffledR] = useState([...pairs].sort(() => Math.random() - 0.5));
  const [selectedL, setSelectedL] = useState<number | null>(null);
  const [matches, setMatches] = useState<number[]>([]);
  const [msg, setMsg] = useState("Chọn vế trái rồi vế phải tương ứng nè!");

  useEffect(() => { if ((window as any).MathJax) (window as any).MathJax.typesetPromise(); }, [shuffledL, matches]);

  const handleMatch = (ridx: number) => {
    if (selectedL === null) return;
    if (shuffledL[selectedL].r === shuffledR[ridx].r) {
      setMatches([...matches, selectedL]);
      setSelectedL(null);
      setMsg("Quá chuẩn con ơi! 🎉");
    } else {
      setMsg("Sai rồi, bình tĩnh nhìn kỹ lại nhé! ❌");
      setSelectedL(null);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl neo-card max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="bg-black text-white px-4 py-2 rounded-xl font-black text-xs uppercase neo-btn">← Quay lại</button>
        <span className="font-black text-gray-500 uppercase tracking-widest">Ghép đôi HĐT</span>
      </div>
      <p className="text-center text-xl font-black text-pink-600 mb-8 h-8">{msg}</p>
      <div className="flex justify-around gap-8">
        <div className="flex flex-col gap-4 w-1/2">
          {shuffledL.map((p, i) => (
            <button key={i} onClick={() => !matches.includes(i) && setSelectedL(i)} className={`p-4 rounded-xl border-4 font-black text-xl transition-all ${matches.includes(i) ? 'bg-green-100 border-green-500 text-green-700 opacity-50' : selectedL === i ? 'bg-cyan-300 border-black' : 'bg-white border-black hover:bg-yellow-100'}`}>
              {p.l}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-4 w-1/2">
          {shuffledR.map((p, i) => (
            <button key={i} onClick={() => handleMatch(i)} className="p-4 rounded-xl border-4 border-black font-black text-xl transition-all bg-white hover:bg-cyan-100">
              {p.r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const FastMathGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQ, setCurrentQ] = useState<{ q: string, opts: string[], c: number } | null>(null);

  const generateQ = () => {
    const list = [
      { q: "$(x+y)^2$", opts: ["$x^2+2xy+y^2$", "$x^2+xy+y^2$", "$x^2-2xy+y^2$"], c: 0 },
      { q: "$x^2-16$", opts: ["$(x-4)(x+4)$", "$(x-4)^2$", "$(x-8)(x+8)$"], c: 0 },
      { q: "$(2x-1)^2$", opts: ["$4x^2-4x+1$", "$4x^2-1$", "$2x^2-4x+1$"], c: 0 },
      { q: "$x^3+1$", opts: ["$(x+1)(x^2-x+1)$", "$(x+1)^3$", "$(x-1)(x^2+x+1)$"], c: 0 }
    ];
    setCurrentQ(list[Math.floor(Math.random() * list.length)]);
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(t);
    } else if (timeLeft === 0) setIsPlaying(false);
  }, [isPlaying, timeLeft]);

  useEffect(() => { if ((window as any).MathJax) (window as any).MathJax.typesetPromise(); }, [currentQ, isPlaying]);

  const startGame = () => { setScore(0); setTimeLeft(30); setIsPlaying(true); generateQ(); };

  const handleAns = (i: number) => { if (i === currentQ?.c) setScore(score + 10); generateQ(); };

  return (
    <div className="bg-white p-8 rounded-3xl neo-card max-w-2xl mx-auto text-center">
      {!isPlaying ? (
        <div>
          <h3 className="text-3xl font-black mb-6 uppercase">{timeLeft === 0 ? "Hết giờ!" : "Thử thách 30s"}</h3>
          {timeLeft === 0 && <p className="text-2xl mb-6 font-black">Score: <span className="text-pink-500 font-black">{score}</span></p>}
          <button onClick={startGame} className="px-12 py-4 bg-orange-400 text-black rounded-2xl font-black text-xl neo-btn uppercase italic">Bắt đầu 🚀</button>
          <button onClick={onBack} className="block mx-auto mt-4 text-xs font-black uppercase opacity-50 underline">Thoát</button>
        </div>
      ) : currentQ && (
        <div>
          <div className="flex justify-between mb-8 font-black"><span>⏱️ {timeLeft}s</span><span>⭐ {score}</span></div>
          <h3 className="text-3xl font-black mb-10 italic">Khai triển: {currentQ.q}</h3>
          <div className="grid grid-cols-1 gap-4">
            {currentQ.opts.map((o, i) => (
              <button key={i} onClick={() => handleAns(i)} className="p-4 bg-white border-4 border-black rounded-2xl font-black text-xl hover:bg-cyan-100 transition-all">{o}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameView;
