import { useState } from 'react';
import { User, Settings, LogOut, Crown, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface UserMenuProps {
  onOpenProfile: () => void;
}

const UserMenu = ({ onOpenProfile }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
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
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-white">{user.name}</p>
          {user.isVip && (
            <div className="flex items-center space-x-1">
              <Crown className="text-yellow-400" size={12} />
              <span className="text-xs text-yellow-400">VIP</span>
            </div>
          )}
        </div>
        <ChevronDown className="text-gray-400" size={16} />
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-gray-800 rounded-xl border border-gray-700 shadow-xl z-20">
            {/* User info */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <User className="text-white" size={20} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  {user.isVip && (
                    <div className="flex items-center space-x-1 mt-1">
                      <Crown className="text-yellow-400" size={14} />
                      <span className="text-xs text-yellow-400 font-medium">Membre VIP</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="p-2">
              <button
                onClick={() => {
                  onOpenProfile();
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors text-left"
              >
                <Settings className="text-gray-400" size={18} />
                <span className="text-white">Profil & Paramètres</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors text-left"
              >
                <LogOut className="text-gray-400" size={18} />
                <span className="text-white">Se déconnecter</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;