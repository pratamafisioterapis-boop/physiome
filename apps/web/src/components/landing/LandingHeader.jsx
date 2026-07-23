
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher.jsx';
import { PhysiomeMark } from '@/components/Logo.jsx';

const LandingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.features'), href: '#features' },
    { name: t('nav.howItWorks'), href: '#how-it-works' },
    { name: t('nav.pricing'), href: '#pricing' },
    { name: t('nav.about'), href: '#about' },
  ];

  const handleNavClick = (e, href) => {
    if (href.startsWith('#') && location.pathname === '/') {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <PhysiomeMark className="w-10 h-10 transition-transform duration-300 group-hover:scale-105" />
            <span className="text-2xl font-extrabold text-foreground tracking-tight">Physiome</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <Button onClick={() => navigate('/dashboard')} className="rounded-full px-6 font-semibold shadow-glow-primary">
                {t('nav.dashboard')}
              </Button>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-secondary hover:text-primary transition-colors px-2">
                  {t('nav.login')}
                </Link>
                <Button onClick={() => navigate('/register')} className="rounded-full px-6 font-semibold shadow-glow-primary hover:bg-primary/90 transition-all">
                  {t('nav.signup')}
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button 
              className="p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-border/50 p-5 flex flex-col gap-4 shadow-soft-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-base font-semibold text-foreground p-3 hover:bg-primary/10 rounded-xl transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            {isAuthenticated ? (
              <Button onClick={() => navigate('/dashboard')} className="w-full rounded-xl h-12 font-semibold">
                {t('nav.dashboard')}
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate('/login')} className="w-full rounded-xl h-12 font-semibold border-secondary text-secondary">
                  {t('nav.login')}
                </Button>
                <Button onClick={() => navigate('/register')} className="w-full rounded-xl h-12 font-semibold shadow-glow-primary">
                  {t('nav.signup')}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;
