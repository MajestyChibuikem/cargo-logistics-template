import { useState, useEffect } from 'react';
import { LogIn, LogOut } from 'lucide-react';

export default function HeaderAuthControls() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('jago_auth') === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jago_auth');
    window.location.href = '/login';
  };

  if (!isLoggedIn) {
    return (
      <a
        href="/login"
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 border border-slate-300 hover:border-slate-400 rounded-lg transition"
      >
        <LogIn className="w-4 h-4" />
        Login
      </a>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600 rounded-lg transition cursor-pointer"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
}
