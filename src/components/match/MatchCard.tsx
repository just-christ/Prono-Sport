
import { ArrowRight } from 'lucide-react';
import { Match } from '@/services/apiService';
import StatsBadge from './StatsBadge';

interface MatchCardProps {
  match: Match;
  onViewDetails?: (matchId: string) => void;
}

const MatchCard = ({ match, onViewDetails }: MatchCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/api/placeholder/40/40';
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-750 border border-gray-700">
      {/* Header avec championnat et statut VIP */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          {match.championship}
        </span>
        {match.isVip && (
          <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold rounded-full">
            VIP
          </span>
        )}
      </div>

      {/* Équipes et logos */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full p-1 flex items-center justify-center">
            <img 
              src={match.homeTeamLogo} 
              alt={match.homeTeam}
              className="w-8 h-8 object-contain"
              onError={handleImageError}
            />
          </div>
          <span className="font-semibold text-white text-sm">{match.homeTeam}</span>
        </div>
        
        <div className="text-center px-3">
          <span className="text-gray-400 font-medium">VS</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-white text-sm">{match.awayTeam}</span>
          <div className="w-10 h-10 bg-gray-700 rounded-full p-1 flex items-center justify-center">
            <img 
              src={match.awayTeamLogo} 
              alt={match.awayTeam}
              className="w-8 h-8 object-contain"
              onError={handleImageError}
            />
          </div>
        </div>
      </div>

      {/* Date, heure et cote */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Date</p>
          <p className="text-sm font-medium text-white">{formatDate(match.date)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Heure</p>
          <p className="text-sm font-medium text-white">{match.time}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Cote</p>
          <p className="text-lg font-bold text-blue-400">{match.odds}</p>
        </div>
      </div>

      {/* Forme des équipes */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-1">
          {match.form.home.map((result, index) => (
            <StatsBadge key={`home-${index}`} result={result} />
          ))}
        </div>
        <div className="flex space-x-1">
          {match.form.away.map((result, index) => (
            <StatsBadge key={`away-${index}`} result={result} />
          ))}
        </div>
      </div>

      {/* Prédiction et confiance */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">Prono:</span>
          <span className="font-bold text-blue-400">{match.prediction}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">Confiance:</span>
          <span className={`text-xs font-medium ${
            match.confidence === 'high' ? 'text-green-400' :
            match.confidence === 'medium' ? 'text-yellow-400' : 'text-orange-400'
          }`}>
            {match.confidence === 'high' ? 'Élevée' : 
             match.confidence === 'medium' ? 'Moyenne' : 'Faible'}
          </span>
        </div>
      </div>

      {/* Bouton d'action */}
      <button 
        onClick={() => onViewDetails?.(match.id)}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
      >
        <span>Voir le pronostic</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default MatchCard;
