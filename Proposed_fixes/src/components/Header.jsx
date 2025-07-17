import React from 'react';

function Header({ user }) {
  if (!user) return null;

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-800 text-white">
      <img src={user.avatarUrl} alt="avatar" className="w-10 h-10 rounded-full" />
      <h1 className="text-xl font-semibold">@{user.login}</h1>
    </div>
  );
}

export default Header;
