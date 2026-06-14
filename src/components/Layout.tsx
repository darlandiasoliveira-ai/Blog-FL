import { Link, Outlet, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import { Home as HomeIcon, MessageSquare, BookOpen, ShoppingBag, Menu, X, Info, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Início', path: '/', icon: HomeIcon },
    { name: 'Sobre', path: '/sobre', icon: Info },
    { name: 'Nossos Links', path: '/links', icon: LinkIcon },
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
      <header className="bg-brand-900 border-b border-brand-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                {SITE_CONFIG.logoUrl ? (
                  <div className="relative h-12 flex items-center justify-center overflow-hidden">
                     <img src={SITE_CONFIG.logoUrl} alt={SITE_CONFIG.salesSiteName} className="h-10 object-contain drop-shadow-sm" />
                  </div>
                ) : (
                  <>
                    <div className="bg-brand-800 text-accent-400 font-bold text-xl h-10 w-10 flex items-center justify-center rounded-lg shadow-sm group-hover:bg-brand-700 transition-colors border border-brand-700">
                      FL
                    </div>
                    <span className="font-bold text-xl text-white tracking-tight">{SITE_CONFIG.salesSiteName}</span>
                  </>
                )}
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
                        ? 'text-accent-400'
                        : 'text-brand-100 hover:text-accent-400'
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
            <div className="flex items-center gap-2 md:hidden">
              <a
                href={SITE_CONFIG.salesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-accent-400 hover:bg-accent-500 text-brand-900 px-3 py-1.5 rounded-md text-xs font-bold transition-colors shadow-sm"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Visitar Loja
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center gap-1 text-brand-100 hover:text-accent-400 px-2 py-1.5 bg-brand-800 hover:bg-brand-700 rounded-md transition-colors"
              >
                <span className="text-xs font-bold uppercase tracking-wider">{isMobileMenuOpen ? 'Fechar' : 'Menu'}</span>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-brand-900 border-t border-brand-800">
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
                        ? 'bg-brand-800 text-accent-400'
                        : 'text-brand-100 hover:bg-brand-800 hover:text-accent-400'
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
      <footer className="bg-brand-900 border-t border-brand-800 mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              {SITE_CONFIG.logoUrl ? (
                <div className="relative h-10 flex items-center justify-center overflow-hidden">
                   <img src={SITE_CONFIG.logoUrl} alt={SITE_CONFIG.salesSiteName} className="h-8 object-contain" />
                </div>
              ) : (
                <>
                  <div className="bg-brand-800 text-accent-400 font-bold text-lg h-8 w-8 flex items-center justify-center rounded-lg border border-brand-700">
                    FL
                  </div>
                  <span className="font-bold text-lg text-white">{SITE_CONFIG.salesSiteName}</span>
                </>
              )}
            </div>
            <p className="text-brand-200 text-sm text-center md:text-left">
              © {new Date().getFullYear()} {SITE_CONFIG.siteName}. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <a href={SITE_CONFIG.salesUrl} className="text-brand-100 hover:text-accent-400 text-sm font-medium">
                Visitar Loja
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
