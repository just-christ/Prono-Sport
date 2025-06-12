import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { login, register, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === 'register') {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Erreur",
            description: "Les mots de passe ne correspondent pas",
            variant: "destructive"
          });
          return;
        }
        await register(formData.name, formData.email, formData.password);
        toast({
          title: "Compte créé !",
          description: "Bienvenue sur PronoSports !"
        });
      } else {
        await login(formData.email, formData.password);
        toast({
          title: "Connexion réussie !",
          description: "Bon retour sur PronoSports !"
        });
      }
      onClose();
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-800 rounded-2xl p-8 w-full max-w-md mx-4 border border-gray-700">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {mode === 'login' ? 'Connexion' : 'Inscription'}
          </h2>
          <p className="text-gray-400">
            {mode === 'login' 
              ? 'Connectez-vous à votre compte' 
              : 'Créez votre compte PronoSports'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Votre nom"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              mode === 'login' ? 'Se connecter' : 'Créer le compte'
            )}
          </button>
        </form>

        {/* Switch mode */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            {mode === 'login' ? "Pas encore de compte ?" : "Déjà un compte ?"}
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-blue-400 hover:text-blue-300 font-medium ml-2 transition-colors"
            >
              {mode === 'login' ? 'Créer un compte' : 'Se connecter'}
            </button>
          </p>
        </div>

        {/* Demo credentials */}
        {mode === 'login' && (
          <div className="mt-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
            <p className="text-xs text-gray-400 mb-2">Compte de démonstration :</p>
            <p className="text-xs text-gray-300">Email: admin@pronosports.fr</p>
            <p className="text-xs text-gray-300">Mot de passe: admin123</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;