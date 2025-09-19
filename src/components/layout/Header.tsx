import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../common/Toast';
import Icon from '../common/IconProvider';

export default function Header() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      showToast('Logged out successfully', 'success');
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
      showToast('Failed to logout. Please try again.', 'error');
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}

        {/* User profile and menu */}
        <div className="relative">
          <button 
            onClick={toggleMenu}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
              {user?.profile_image ? (
                <img 
                  src={user.profile_image} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon icon={"user" as const} className="text-primary" />
              )}
            </div>
            <span className="hidden md:block text-sm font-medium">{user?.name}</span>
            <span className="text-neutral text-xs">▼</span>
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
              <a 
                href="/profile" 
                className="block px-4 py-2 text-sm text-neutral hover:bg-light hover:text-primary flex items-center"
              >
                <Icon icon={"user" as const} className="mr-2" />
                Profile
              </a>
              <a 
                href="/saved-trips" 
                className="block px-4 py-2 text-sm text-neutral hover:bg-light hover:text-primary flex items-center"
              >
                <Icon icon={"star" as const} className="mr-2" />
                Saved Trips
              </a>
              <button 
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 text-sm text-neutral hover:bg-light hover:text-error flex items-center"
              >
                <span className="mr-2">→</span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
