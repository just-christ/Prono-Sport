import { Link } from 'react-router-dom';
import icon from '/src/assets/icon.png'; // Assure-toi que ce chemin est correct

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={icon} alt="Logo PronoSports" className="w-8 h-8 rounded-lg" />
              <span className="text-white font-bold text-xl">PronoSports</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre plateforme de confiance pour des pronostics sportifs de qualité. 
              Plus de 200 championnats couverts avec des analyses expertes.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liens rapides</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Accueil
              </Link>
              <Link to="/matches" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Nos matchs
              </Link>
              <Link to="/coupons" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Coupons
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Email: contact@pronosports.fr</p>
              <p>Telegram: @PronoSports</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 PronoSports. Tous droits réservés. | 
            <span className="ml-1">Jouez responsable - 18+</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
