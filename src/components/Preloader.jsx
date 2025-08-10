'use client';
import { useState } from 'react';
import Confetti from 'react-confetti';

export default function Preloader({ onComplete }) {
  const [opened, setOpened] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const handleGiftClick = () => {
    setOpened(true);
  };

  const handleAnswer = (answer) => {
    if (answer === 'yes') {
      setAnswered(true);
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      setWrongAnswer(true);
      setTimeout(() => setWrongAnswer(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      {!opened ? (
        <div
          onClick={handleGiftClick}
          className="cursor-pointer animate-bounce transition-transform hover:scale-105"
        >
          🎁
        </div>
      ) : !answered ? (
        <div className="text-center animate-fade-in">
          <Confetti numberOfPieces={150} recycle={false} />
          <p className="text-2xl font-semibold mb-4 mt-2">“Raneh is the best!”</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleAnswer('yes')}
              className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600"
            >
              Absolutely 💖
            </button>
            <button
              onClick={() => handleAnswer('no')}
              className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400"
            >
              Nope 😶
            </button>
          </div>
          {wrongAnswer && <p className="mt-4 text-sm text-red-600">Try again 😏</p>}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg">Loading your awesome experience... 🚀</p>
        </div>
      )}
    </div>
  );
}

