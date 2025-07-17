import React from 'react';

function IntroModalFixed({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#161b22] p-6 rounded-xl shadow-lg max-w-lg w-full border border-gray-700">
        <h2 className="text-xl font-bold mb-3 text-white">Better UX, GitHub-style ✨</h2>
        <p className="text-sm text-gray-300 mb-4">
          On the original GitHub contribution calendar, switching years adds a new browser history entry every time.
          This means you have to hit <code>← Back</code> multiple times just to return to where you started.
        </p>
        <p className="text-sm text-gray-300 mb-4">
          This version fixes that. I've modified the behavior so switching years doesn't flood your browser history.
          The experience is smoother and still looks and feels exactly like GitHub.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 rounded-md bg-green-500 text-black hover:bg-green-400 transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default IntroModalFixed;
