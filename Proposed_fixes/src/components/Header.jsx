import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ user }) {
  const location = useLocation();
  const isDefault = location.pathname === '/';

  if (!user) return null;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center gap-3">
        <img src={user.avatarUrl} alt="avatar" className="w-10 h-10 rounded-full" />
        <h1 className="text-xl font-semibold">@{user.login}</h1>
      </div>

      <Link
        to={isDefault ? '/fixed' : '/'}
        className={`px-3 py-1 rounded-md text-sm transition ${
          isDefault ? 'bg-green-500 text-black' : 'bg-gray-700 hover:bg-gray-600'
        }`}
      >
        {isDefault ? 'Switch to: (Modified Behaviour)' : 'Switch to: GitHub (Default Behaviour)'}
      </Link>
    </div>
  );
}

export default Header;
