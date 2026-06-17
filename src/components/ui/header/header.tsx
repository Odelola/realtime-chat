import { Button } from '@/components';
import useAuthStore from '@/store/auth-store';

export default function Header() {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore(
    (state) => state
  );

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <button type="button" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">
                  Header
                </span>
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3 ">
            {isAuthenticated && (
              <Button
                onClick={() => {
                  setIsAuthenticated(false);
                }}
              >
              Logout
          </Button>
            )}
      </div>
      <div className="md:hidden flex items-center">
        <button className="outline-none mobile-menu-button">
          <svg
            className=" w-6 h-6 text-gray-500 hover:text-blue-500 "
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
    </div >
    </nav >
  );
}
