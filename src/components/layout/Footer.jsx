import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="logo footer-logo">
              <Building2 className="logo-icon" />
              <span className="logo-text">Land24</span>
            </Link>
            <p className="footer-desc">
              Discover properties that define your lifestyle. We provide a premium real estate experience with transparent pricing and expert guidance.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/agents">Our Agents</Link></li>
              <li><Link to="#">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Properties</h4>
            <ul className="footer-links">
              <li><Link to="/listings?type=Buy">Buy a Home</Link></li>
              <li><Link to="/listings?type=Rent">Rent a Home</Link></li>
              <li><Link to="/listings?type=Commercial">Commercial</Link></li>
              <li><Link to="#">List Your Property</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4 className="footer-title">Newsletter</h4>
            <p className="footer-newsletter-desc">Get new listings delivered to your inbox.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" aria-label="Subscribe">
                <ArrowRight size={20} />
              </button>
            </form>
            <div className="footer-contact-info">
              <p><Mail size={16} /> info@Land24.com</p>
              <p><Phone size={16} /> +91 9880345558</p>
              <p><MapPin size={16} /> Panathur, Bangalore 560087</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Land24. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
