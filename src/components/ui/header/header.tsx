import { useState } from 'react';
import { Button } from '@/components';
import useAuthStore from '@/store/auth-store';
import { Menu, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@/routes';
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated, logout } = useAuthStore((state) => state);

  const navigate = useNavigate()

  return (
    <nav className="bg-black/50 h-20 shadow-lg w-full sticky top-0 z-50">
      <div className="px-4 md:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo + Menu */}
          <div className="flex items-center gap-8">
            <a href="#" className="text-white text-2xl md:text-3xl font-semibold">
              Nexus Slate
            </a>

          
            <div className="hidden md:flex items-center space-x-6">
              <a className="text-gray-300 hover:text-blue-500">Features</a>
              <a className="text-gray-300 hover:text-blue-500">Solutions</a>
              <a className="text-gray-300 hover:text-blue-500">Security</a>
              <a className="text-gray-300 hover:text-blue-500">Enterprise</a>
            </div>
          </div>

          
          <div className="hidden md:flex items-center space-x-3">
            {!isAuthenticated ? (
              <>
                <Button onClick={() => navigate(APP_ROUTES.LOGIN)}>Log in</Button>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2" onClick={() => navigate(APP_ROUTES.SIGNUP)}>
                  Get Started
                </Button>
              </>
            ) : (
              <Button onClick={() => logout()}>
                Logout
              </Button>
            )}
          </div>

          {/* Hamburger */}
          <div className="md:hidden flex items-center">
           <button onClick={() => setIsOpen(!isOpen)}>
  {isOpen ? <X className="w-6 h-6 text-gray-300" /> : <Menu className="w-6 h-6 text-gray-300" />}
</button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 px-6 py-4 space-y-4">

          <a className="block text-gray-300">Features</a>
          <a className="block text-gray-300">Solutions</a>
          <a className="block text-gray-300">Security</a>
          <a className="block text-gray-300">Enterprise</a>

          <div className="pt-4 border-t border-gray-800">
            {!isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <Button onClick={() => navigate(APP_ROUTES.LOGIN)}>Log in</Button>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white" onClick={() => navigate(APP_ROUTES.SIGNUP)}>
                  Get Started
                </Button>
              </div>
            ) : (
              <Button onClick={() => logout()}>
                Logout
              </Button>
            )}
          </div>

        </div>
      )}
    </nav>
  );
}