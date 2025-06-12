
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "Comment fonctionne votre service de pronostics ?",
    answer: "Nous analysons plus de 200 championnats avec nos experts. Chaque jour, vous recevez un coupon gratuit sur notre canal Telegram, plus des analyses VIP pour les membres premium."
  },
  {
    question: "Vos pronostics sont-ils fiables ?",
    answer: "Nos pronostics sont basés sur des analyses statistiques approfondies et l'expertise de notre équipe. Cependant, le sport reste imprévisible et nous ne garantissons pas 100% de réussite."
  },
  {
    question: "Comment rejoindre le canal Telegram gratuit ?",
    answer: "Cliquez simplement sur le bouton 'Nous rejoindre' sur notre site. Vous serez redirigé vers notre canal Telegram gratuit où vous recevrez quotidiennement nos pronostics."
  },
  {
    question: "Quelle est la différence entre gratuit et VIP ?",
    answer: "Le canal gratuit propose un pronostic par jour. L'accès VIP inclut plusieurs pronostics quotidiens, des analyses détaillées et un support prioritaire."
  },
  {
    question: "Puis-je annuler mon abonnement VIP ?",
    answer: "Oui, vous pouvez annuler votre abonnement VIP à tout moment. L'accès reste actif jusqu'à la fin de la période payée."
  }
];

const FaqAccordion = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-6">Questions fréquentes</h3>
      
      {faqData.map((item, index) => (
        <div key={index} className="bg-gray-800 rounded-xl border border-gray-700">
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-750 transition-colors rounded-xl"
          >
            <span className="font-medium text-white pr-4">{item.question}</span>
            {openItems.includes(index) ? (
              <ChevronUp className="text-gray-400 flex-shrink-0" size={20} />
            ) : (
              <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
            )}
          </button>
          
          {openItems.includes(index) && (
            <div className="px-4 pb-4">
              <div className="pt-2 border-t border-gray-700">
                <p className="text-gray-300 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
