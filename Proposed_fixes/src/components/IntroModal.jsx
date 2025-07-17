import React from 'react';

function IntroModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-[#161b22] border border-gray-600 rounded-xl p-6 max-w-lg shadow-xl text-white relative">
        <h2 className="text-xl font-bold mb-4">UX Bug Showcase</h2>
        <p className="mb-3">
          This project demonstrates a subtle UX issue on GitHub’s contribution calendar: 
          when you switch between years, it updates the URL parameters (like <code>?from=&to=</code>), 
          which adds extra entries to your browser history.
        </p>
        <p className="mb-3">
          That means if you switch 3 years and then hit the back button, you have to go back 3 times 
          to leave the page — not ideal for user flow.
        </p>
        <p className="mb-4">
          I’ve added a toggle below so you can switch between GitHub's behavior and the improved UX fix.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-green-500 text-black rounded hover:bg-green-400"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default IntroModal;
