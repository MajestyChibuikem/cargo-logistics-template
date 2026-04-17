import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { NAVIGATION } from '../../config/site';

export default function MobileMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('jago_auth') === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jago_auth');
    window.location.href = '/login';
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 lg:hidden" />
        <Dialog.Content className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 lg:hidden max-h-[85vh] overflow-y-auto">
          <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>
          <Dialog.Description className="sr-only">Main navigation menu</Dialog.Description>
          <div className="container mx-auto px-4 py-6 space-y-2">
            {NAVIGATION.map((item) => (
              <Dialog.Close asChild key={item.href}>
                <a
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-[#f97316] hover:bg-orange-50 rounded-lg transition-all"
                >
                  {item.name}
                </a>
              </Dialog.Close>
            ))}

            {/* Auth link */}
            <div className="border-t border-slate-100 pt-2 mt-2">
              {isLoggedIn ? (
                <Dialog.Close asChild>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </Dialog.Close>
              ) : (
                <Dialog.Close asChild>
                  <a
                    href="/login"
                    className="flex items-center gap-2 px-4 py-3 text-base font-medium text-slate-700 hover:text-[#f97316] hover:bg-orange-50 rounded-lg transition-all"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </a>
                </Dialog.Close>
              )}
            </div>

            <div className="pt-2">
              <Dialog.Close asChild>
                <a
                  href="/rfq"
                  className="block text-center px-6 py-3 text-sm font-semibold text-white bg-[#f97316] hover:bg-[#ea6c0a] rounded-lg shadow-sm transition-all"
                >
                  Request Quote
                </a>
              </Dialog.Close>
            </div>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
