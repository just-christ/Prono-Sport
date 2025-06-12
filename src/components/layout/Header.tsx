import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import UserMenu from '@/components/auth/UserMenu';
import ProfileModal from '@/components/auth/ProfileModal';
import icon from '../../assets/icon.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { name: 'ACCUEIL', path: '/' },
    { name: 'NOS MATCHS', path: '/matches' },
    { name: 'COUPONS', path: '/coupons' },
    { name: 'CONTACT', path: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src={icon} alt="Logo" className="w-8 h-8 rounded-lg" />
              <span className="text-white font-bold text-xl">PronoSports</span>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                    isActive(item.path) 
                      ? 'text-blue-400 border-b-2 border-blue-400 pb-1' 
                      : 'text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Section Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <UserMenu onOpenProfile={() => setIsProfileModalOpen(true)} />
              ) : (
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => handleAuthClick('login')}
                    className="text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    Connexion
                  </button>
                  <button 
                    onClick={() => handleAuthClick('register')}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    Inscription
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-medium transition-colors px-2 py-1 ${
                      isActive(item.path) ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile User Section */}
                <div className="border-t border-gray-800 pt-3 mt-3">
                  {user ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 px-2 py-1">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          {user.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt={user.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <User className="text-white" size={16} />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setIsProfileModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left text-sm text-gray-300 hover:text-white px-2 py-1"
                      >
                        Mon profil
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button 
                        onClick={() => {
                          handleAuthClick('login');
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left text-sm text-gray-300 hover:text-white px-2 py-1"
                      >
                        Connexion
                      </button>
                      <button 
                        onClick={() => {
                          handleAuthClick('register');
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left text-sm text-blue-400 hover:text-blue-300 px-2 py-1"
                      >
                        Inscription
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
      
      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};

export default Header;