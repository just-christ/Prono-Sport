
import { useEffect, useState } from 'react';
import { Gift, TrendingUp } from 'lucide-react';
import { Coupon, apiService } from '@/services/apiService';
import { useTelegramInvite } from '@/hooks/useTelegramInvite';
import CarouselCoupons from '@/components/coupons/CarouselCoupons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Coupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [todayCoupon, setTodayCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(true);
  const { openTelegramInvite } = useTelegramInvite();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [couponsData, todayCouponData] = await Promise.all([
          apiService.getCoupons(),
          apiService.getTodayCoupon()
        ]);
        setCoupons(couponsData);
        setTodayCoupon(todayCouponData);
      } catch (error) {
        console.error('Erreur lors du chargement des coupons:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Chargement des coupons...</p>
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
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Vos coupons gratuits & validés
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Découvrez nos derniers coupons validés et récupérez le coupon gratuit du jour
            </p>
          </div>

          {/* Coupon du jour */}
          {todayCoupon && (
            <section className="mb-16">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-3xl p-8 border border-blue-500/20">
                <div className="flex items-center justify-center space-x-3 mb-8">
                  <Gift className="text-blue-400" size={32} />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Coupon gratuit du jour
                  </h2>
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                    {todayCoupon.image && (
                      <img 
                        src={todayCoupon.image}
                        alt={todayCoupon.title}
                        className="w-full h-48 object-cover rounded-xl mb-6"
                      />
                    )}
                    
                    <h3 className="text-xl font-bold text-white mb-4">{todayCoupon.title}</h3>
                    
                    <div className="space-y-3 mb-6">
                      {todayCoupon.matches.map((match) => (
                        <div key={match.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <img src={match.homeTeamLogo} alt={match.homeTeam} className="w-6 h-6 rounded-full" />
                            <span className="text-sm font-medium text-white">
                              {match.homeTeam} vs {match.awayTeam}
                            </span>
                            <img src={match.awayTeamLogo} alt={match.awayTeam} className="w-6 h-6 rounded-full" />
                          </div>
                          <div className="text-right">
                            <p className="text-blue-400 font-semibold">{match.odds}</p>
                            <p className="text-xs text-gray-400">{match.prediction}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-700">
                      <span className="text-gray-400">Cote totale:</span>
                      <span className="text-2xl font-bold text-blue-400">{todayCoupon.totalOdds}</span>
                    </div>

                    <button 
                      onClick={() => openTelegramInvite('free')}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover-scale"
                    >
                      Rejoindre le canal Telegram Gratuit
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Coupons validés */}
          <section>
            <div className="flex items-center space-x-3 mb-8">
              <TrendingUp className="text-green-400" size={32} />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Nos derniers coupons validés
              </h2>
            </div>

            {coupons.length > 0 ? (
              <CarouselCoupons coupons={coupons} />
            ) : (
              <div className="text-center py-12 bg-gray-800 rounded-2xl border border-gray-700">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Aucun coupon disponible</h3>
                <p className="text-gray-400 mb-6">
                  Les coupons validés apparaîtront ici prochainement
                </p>
                <button
                  onClick={() => openTelegramInvite('free')}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Rejoindre Telegram
                </button>
              </div>
            )}
          </section>

          {/* Call to action */}
          <section className="mt-16 text-center">
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">
                Vous voulez plus de pronostics ?
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Accédez à nos analyses VIP avec plusieurs pronostics quotidiens, 
                des statistiques détaillées et un support prioritaire.
              </p>
              <button
                onClick={() => openTelegramInvite('vip')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 hover-scale"
              >
                Découvrir l'accès VIP
              </button>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Coupons;
