
import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from './constants';

const QuizView: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if ((window as any).MathJax) (window as any).MathJax.typesetPromise();
  }, [started, currentIdx, submitted]);

  if (!started) return (
    <div className="flex flex-col items-center justify-center py-20 px-4"><div className="bg-white p-10 rounded-3xl neo-card max-w-2xl w-full text-center">
      <span className="text-6xl mb-6 block">📝</span>
      <h2 className="text-3xl font-black mb-4 uppercase italic tracking-tighter">Luyện Tập Hằng Đẳng Thức</h2>
      <p className="font-bold text-gray-700 mb-8">Thử tài với bộ câu hỏi sát thực tế. Cố gắng đạt 10/10 nhé!</p>
      <button onClick={() => {setStarted(true); setUserAnswers(new Array(QUIZ_QUESTIONS.length).fill(-1));}} className="px-12 py-4 bg-yellow-400 text-black text-xl font-black rounded-2xl neo-btn uppercase">Bắt đầu 🚀</button>
    </div></div>
  );

  const question = QUIZ_QUESTIONS[currentIdx];

  return (
    <div className="p-4 max-w-4xl mx-auto"><div className="bg-white rounded-3xl neo-card p-6 md:p-10">
      <div className="flex justify-between mb-6 font-black uppercase text-xs tracking-widest opacity-50"><span>Câu {currentIdx+1}/{QUIZ_QUESTIONS.length}</span></div>
      <h3 className="text-2xl font-black mb-10 leading-tight italic">{question.question}</h3>
      <div className="grid gap-4 mb-10">
        {question.options.map((opt, i) => (
          <button key={i} onClick={() => { if (!submitted) { const n = [...userAnswers]; n[currentIdx] = i; setUserAnswers(n); } }} className={`p-5 rounded-2xl text-left font-black text-lg border-4 border-black neo-btn transition-all ${userAnswers[currentIdx] === i ? 'bg-cyan-300' : 'bg-white'}`}>
            <span className="mr-3 bg-black text-white px-2 py-0.5 rounded text-xs uppercase">{String.fromCharCode(65+i)}</span> ${opt}$
          </button>
        ))}
      </div>
      {submitted && (
        <div className="bg-yellow-100 p-6 rounded-2xl border-4 border-black mb-8 border-dashed">
          <p className="font-black text-sm uppercase mb-2">Lời giải:</p>
          <p className="font-bold italic text-gray-800">{question.explanation}</p>
        </div>
      )}
      <div className="flex justify-between">
        <button onClick={() => setCurrentIdx(c => Math.max(0, c-1))} className="px-8 py-3 bg-white border-4 border-black rounded-xl font-black neo-btn uppercase text-xs">Quay lại</button>
        {currentIdx === QUIZ_QUESTIONS.length - 1 ? 
          <button onClick={() => setSubmitted(true)} className="px-10 py-3 bg-pink-500 text-white border-4 border-black rounded-xl font-black neo-btn uppercase text-xs">Nộp bài 🏁</button> :
          <button onClick={() => setCurrentIdx(c => c+1)} className="px-10 py-3 bg-black text-white border-4 border-black rounded-xl font-black neo-btn uppercase text-xs">Tiếp theo</button>
        }
      </div>
      {submitted && (
        <button onClick={() => {setStarted(false); setSubmitted(false);}} className="w-full mt-6 py-3 font-black underline uppercase text-xs">Làm lại bài khác</button>
      )}
    </div></div>
  );
};

export default QuizView;
