import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`header ${isScrolled || !isHome ? 'header-solid' : 'header-transparent'}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <Building2 className="logo-icon" />
          <span className="logo-text">Land24</span>
        </Link>

        <nav className={`nav-links ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/listings?type=Buy" className={`nav-link ${location.pathname.includes('/listings') ? 'active' : ''}`}>Buy</Link>
          <Link to="/listings?type=Rent" className="nav-link">Rent</Link>
          <Link to="/listings?type=Commercial" className="nav-link">Commercial</Link>
          <Link to="/agents" className={`nav-link ${location.pathname === '/agents' ? 'active' : ''}`}>Agents</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>

          <div className="nav-actions-mobile">
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Dark Mode">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/contact" className="btn btn-primary btn-sm">List Your Property</Link>
          </div>
        </nav>

        <div className="nav-actions-desktop">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Dark Mode">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/contact" className="btn btn-primary btn-sm">List Your Property</Link>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
