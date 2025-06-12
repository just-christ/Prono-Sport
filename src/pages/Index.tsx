
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, Shield, Star } from 'lucide-react';
import { Match, Coupon, apiService, getTeamLogosGrid } from '@/services/apiService';
import { useTelegramInvite } from '@/hooks/useTelegramInvite';
import MatchCard from '@/components/match/MatchCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Index = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [todayCoupon, setTodayCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(true);
  const { openTelegramInvite } = useTelegramInvite();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [matchesData, couponData] = await Promise.all([
          apiService.getMatches(),
          apiService.getTodayCoupon()
        ]);
        setMatches(matchesData.slice(0, 6)); // Afficher seulement 6 matchs sur l'accueil
        setTodayCoupon(couponData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const teamLogos = getTeamLogosGrid();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Chargement...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                +200 championnats
              </span>
              <br />
              couverts
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Recevez chaque jour votre coupon gratuit !
            </p>
            
            {/* Grille de logos d'équipes */}
            <div className="grid grid-cols-5 md:grid-cols-10 gap-4 mb-12 max-w-3xl mx-auto">
              {teamLogos.map((logo, index) => (
                <div key={index} className="hover-scale">
                  <img 
                    src={logo} 
                    alt={`Team ${index + 1}`}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-contain bg-gray-700 p-1 border-2 border-gray-600 hover:border-blue-400 transition-colors"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/60/60';
                    }}
                  />
                </div>
              ))}
            </div>

            <button 
              onClick={() => openTelegramInvite('free')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 hover-scale inline-flex items-center space-x-2"
            >
              <span>Nous rejoindre</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">10k+</h3>
              <p className="text-gray-400">Membres actifs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">87%</h3>
              <p className="text-gray-400">Taux de réussite</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">200+</h3>
              <p className="text-gray-400">Championnats</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">5/5</h3>
              <p className="text-gray-400">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Matches Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Nos matchs</h2>
            <Link 
              to="/matches"
              className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center space-x-2 transition-colors"
            >
              <span>Voir plus</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <MatchCard 
                key={match.id} 
                match={match}
                onViewDetails={() => openTelegramInvite(match.isVip ? 'vip' : 'free')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Coupon du jour Section */}
      {todayCoupon && (
        <section className="py-16 bg-gray-800/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Coupon gratuit du jour
            </h2>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700 shadow-2xl">
                {todayCoupon.image && (
                  <img 
                    src={todayCoupon.image}
                    alt={todayCoupon.title}
                    className="w-full h-48 object-cover rounded-2xl mb-6"
                  />
                )}
                
                <h3 className="text-2xl font-bold text-white mb-4">{todayCoupon.title}</h3>
                
                <div className="space-y-4 mb-6">
                  {todayCoupon.matches.map((match) => (
                    <div key={match.id} className="flex justify-between items-center bg-gray-700/50 p-4 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-600 rounded-full p-0.5 flex items-center justify-center">
                          <img src={match.homeTeamLogo} alt={match.homeTeam} className="w-7 h-7 rounded-full object-contain" />
                        </div>
                        <span className="font-medium text-white">{match.homeTeam} vs {match.awayTeam}</span>
                        <div className="w-8 h-8 bg-gray-600 rounded-full p-0.5 flex items-center justify-center">
                          <img src={match.awayTeamLogo} alt={match.awayTeam} className="w-7 h-7 rounded-full object-contain" />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-400 font-bold text-lg">{match.odds}</p>
                        <p className="text-xs text-gray-400">{match.prediction}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-700">
                  <span className="text-gray-400 text-lg">Cote totale:</span>
                  <span className="text-3xl font-bold text-blue-400">{todayCoupon.totalOdds}</span>
                </div>

                <button 
                  onClick={() => openTelegramInvite('free')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover-scale"
                >
                  Rejoindre le canal Telegram Gratuit
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Index;
