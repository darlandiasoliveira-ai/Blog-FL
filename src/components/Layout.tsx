import { Link, Outlet, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import { Home as HomeIcon, MessageSquare, BookOpen, ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Início', path: '/', icon: HomeIcon },
    { name: 'Artigos', path: '/blog', icon: BookOpen },
    { name: 'Assistente IA', path: '/assistente', icon: MessageSquare },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                {/* CSS Logo mimicking the FL brand */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-brand-500 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-300 to-brand-500 opacity-80"></div>
                  <span className="relative z-10 font-sans font-black text-xl text-accent-400 tracking-tighter" style={{ textShadow: '1px 1px 0px #b38f2d' }}>
                    FL
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-black text-[17px] text-brand-600 leading-none tracking-tight uppercase">
                    FL
                  </span>
                  <span className="font-sans font-bold text-[9px] text-brand-600 leading-none tracking-[0.15em] uppercase mt-0.5">
                    Móveis e Colchões
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'text-brand-600'
                        : 'text-gray-600 hover:text-brand-600'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                );
              })}
              <a
                href={SITE_CONFIG.salesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-accent-400 hover:bg-accent-500 text-brand-900 px-5 py-2.5 rounded-full text-sm font-bold transition-colors shadow-sm"
              >
                <ShoppingBag className="h-4 w-4" />
                {SITE_CONFIG.ctaText}
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-900 p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${
                      isActive(link.path)
                        ? 'bg-brand-50 text-brand-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-brand-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {link.name}
                  </Link>
                );
              })}
              <a
                href={SITE_CONFIG.salesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-3 mt-4 rounded-md text-base font-bold bg-accent-400 text-brand-900"
              >
                <ShoppingBag className="h-5 w-5" />
                {SITE_CONFIG.ctaText}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-brand-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-300 to-brand-500 opacity-80"></div>
                <span className="relative z-10 font-sans font-black text-base text-accent-400 tracking-tighter" style={{ textShadow: '1px 1px 0px #b38f2d' }}>
                  FL
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-black text-sm text-brand-600 leading-none tracking-tight uppercase">
                  FL
                </span>
                <span className="font-sans font-bold text-[7px] text-brand-600 leading-none tracking-[0.15em] uppercase mt-0.5">
                  Móveis e Colchões
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} {SITE_CONFIG.siteName}. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <a href={SITE_CONFIG.salesUrl} className="text-brand-600 hover:text-brand-800 text-sm font-medium">
                Visitar Loja
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
