
import { useEffect, useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import { Match, apiService } from '@/services/apiService';
import { useTelegramInvite } from '@/hooks/useTelegramInvite';
import MatchCard from '@/components/match/MatchCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [championships, setChampionships] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    championship: '',
    date: '',
    isVip: undefined as boolean | undefined
  });
  const { openTelegramInvite } = useTelegramInvite();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [matchesData, championshipsData] = await Promise.all([
          apiService.getMatches(filters),
          apiService.getChampionships()
        ]);
        setMatches(matchesData);
        setChampionships(championshipsData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      championship: '',
      date: '',
      isVip: undefined
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Chargement des matchs...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tous les matchs
            </h1>
            <p className="text-xl text-gray-400">
              Découvrez nos pronostics pour plus de 200 championnats
            </p>
          </div>

          {/* Filtres */}
          <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
            <div className="flex items-center space-x-4 mb-4">
              <Filter className="text-gray-400" size={20} />
              <h3 className="text-lg font-semibold text-white">Filtres</h3>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {/* Championnat */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Championnat
                </label>
                <select
                  value={filters.championship}
                  onChange={(e) => handleFilterChange({ championship: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tous les championnats</option>
                  {championships.map((championship) => (
                    <option key={championship} value={championship}>
                      {championship}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={filters.date}
                    onChange={(e) => handleFilterChange({ date: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Calendar className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Type
                </label>
                <select
                  value={filters.isVip === undefined ? '' : filters.isVip ? 'vip' : 'free'}
                  onChange={(e) => handleFilterChange({ 
                    isVip: e.target.value === '' ? undefined : e.target.value === 'vip' 
                  })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tous</option>
                  <option value="free">Gratuit</option>
                  <option value="vip">VIP</option>
                </select>
              </div>

              {/* Reset */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>

          {/* Résultats */}
          <div className="mb-6">
            <p className="text-gray-400">
              {matches.length} match{matches.length > 1 ? 's' : ''} trouvé{matches.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Liste des matchs */}
          {matches.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match) => (
                <MatchCard 
                  key={match.id} 
                  match={match}
                  onViewDetails={() => openTelegramInvite(match.isVip ? 'vip' : 'free')}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Aucun match trouvé</h3>
              <p className="text-gray-400 mb-6">
                Essayez de modifier vos filtres ou revenez plus tard
              </p>
              <button
                onClick={clearFilters}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Voir tous les matchs
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Matches;
