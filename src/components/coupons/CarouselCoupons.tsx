
import { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Coupon } from '@/services/apiService';

interface CarouselCouponsProps {
  coupons: Coupon[];
}

const CarouselCoupons = ({ coupons }: CarouselCouponsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % coupons.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + coupons.length) % coupons.length);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (coupons.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        Aucun coupon disponible pour le moment
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation arrows */}
      {coupons.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Carousel content */}
      <div className="overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {coupons.map((coupon) => (
            <div key={coupon.id} className="w-full flex-shrink-0">
              <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{coupon.title}</h3>
                    <p className="text-gray-400 text-sm">{formatDate(coupon.date)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {coupon.result === 'win' && <TrendingUp className="text-green-400" size={20} />}
                    {coupon.result === 'loss' && <TrendingDown className="text-red-400" size={20} />}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      coupon.result === 'win' ? 'bg-green-500/20 text-green-400' :
                      coupon.result === 'loss' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {coupon.result === 'win' ? 'Gagné' : 
                       coupon.result === 'loss' ? 'Perdu' : 'En cours'}
                    </span>
                  </div>
                </div>

                {/* Image */}
                {coupon.image && (
                  <div className="mb-4">
                    <img 
                      src={coupon.image} 
                      alt={coupon.title}
                      className="w-full h-40 object-cover rounded-xl"
                    />
                  </div>
                )}

                {/* Matches */}
                <div className="space-y-3 mb-4">
                  {coupon.matches.map((match) => (
                    <div key={match.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <img src={match.homeTeamLogo} alt={match.homeTeam} className="w-6 h-6 rounded-full" />
                          <span className="text-sm font-medium">{match.homeTeam}</span>
                        </div>
                        <span className="text-gray-400 text-xs">vs</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{match.awayTeam}</span>
                          <img src={match.awayTeamLogo} alt={match.awayTeam} className="w-6 h-6 rounded-full" />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-400 font-semibold">{match.odds}</p>
                        <p className="text-xs text-gray-400">{match.prediction}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total odds */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <span className="text-gray-400">Cote totale:</span>
                  <span className="text-2xl font-bold text-blue-400">{coupon.totalOdds}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      {coupons.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {coupons.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselCoupons;
