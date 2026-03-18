import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Shield, Zap, Users, BarChart } from 'lucide-react';
import PropertyCard from '../components/ui/PropertyCard';
import AgentCard from '../components/ui/AgentCard';
import Button from '../components/ui/Button';
import { useData } from '../context/DataContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { featuredProperties, teamAgents, testimonials, categories, hero, locations, propertyTypes } = useData();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/listings');
  };

  return (
    <div className="home-page animate-fade-in">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content container text-center">
          <h1 className="display-1 hero-title">{hero.title}</h1>
          <p className="hero-subtitle">{hero.subtitle}</p>
          
          <div className="search-bar-wrapper">
            <form className="search-bar" onSubmit={handleSearch}>
              <div className="search-input-group">
                <label>Location</label>
                <select defaultValue="">
                  <option value="" disabled>City, neighborhood</option>
                  <option value="Any">Any Location</option>
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.name}>{loc.name}</option>
                  ))}
                </select>
              </div>
              <div className="search-divider"></div>
              <div className="search-input-group">
                <label>Property Type</label>
                <select defaultValue="">
                  <option value="" disabled>Select type</option>
                  <option value="All">All Types</option>
                  {propertyTypes.map(pt => (
                    <option key={pt.id} value={pt.name}>{pt.name}</option>
                  ))}
                </select>
              </div>
              <div className="search-divider"></div>
              <div className="search-input-group">
                <label>Price Range</label>
                <select defaultValue="">
                  <option value="" disabled>Any price</option>
                  <option value="1">Under ₹1M</option>
                  <option value="2">₹1M - ₹3M</option>
                  <option value="3">₹3M - ₹5M</option>
                  <option value="4">₹5M+</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary search-submit">
                <Search size={20} /> <span className="search-submit-text">Search</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="display-2 font-serif">Featured Listings</h2>
              <p>Explore our hand-picked selection of premium properties.</p>
            </div>
            <Link to="/listings" className="btn btn-outline">View All Listings</Link>
          </div>
          
          <div className="property-grid">
            {featuredProperties.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY PROPVISTA */}
      <section className="section bg-primary">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="display-2 font-serif">Why PropVista?</h2>
            <p>Elevating the real estate experience through technology and expertise.</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper"><Shield size={32} /></div>
              <h3>Verified Listings</h3>
              <p>Every property is thoroughly vetted by our expert team for authenticity and quality.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper"><Zap size={32} /></div>
              <h3>AI-Powered Search</h3>
              <p>Our advanced algorithms match you with properties that perfectly fit your lifestyle.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper"><Users size={32} /></div>
              <h3>Expert Agents</h3>
              <p>Partner with top-tier professionals who understand the nuances of luxury real estate.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper"><BarChart size={32} /></div>
              <h3>Transparent Data</h3>
              <p>Access comprehensive market data and pricing trends to make informed decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BROWSE BY CATEGORY */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="display-2 font-serif">Browse by Category</h2>
            <p>Find what you're looking for by exploring our curated collections.</p>
          </div>
          
          <div className="categories-grid">
            {categories.map(cat => (
              <Link key={cat.id} to={cat.link} className={`category-tile ${cat.className || ''}`}>
                <img src={cat.image} alt={cat.title} />
                <div className="category-overlay">
                  <h3>{cat.title}</h3>
                  <span>{cat.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-item">
            <h3 className="stat-number">10,000+</h3>
            <p className="stat-label">Active Listings</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">5,000+</h3>
            <p className="stat-label">Happy Clients</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">200+</h3>
            <p className="stat-label">Cities Covered</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">98%</h3>
            <p className="stat-label">Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* MEET OUR AGENTS */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="display-2 font-serif">Meet Our Experts</h2>
              <p>Work with the best in the business.</p>
            </div>
            <Link to="/agents" className="btn btn-outline">View All Agents</Link>
          </div>
          
          <div className="agents-grid">
            {teamAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>
      
      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container text-center">
          <h2 className="display-2 font-serif mb-4">What Our Clients Say</h2>
          <div className="testimonials-grid">
             {testimonials.map(t => (
               <div key={t.id} className="testimonial-card">
                 <div className="quote-marks">"</div>
                 <p className="testimonial-quote">{t.quote}</p>
                 <div className="testimonial-author">
                   <img src={t.image} alt={t.name} />
                   <div>
                     <h4>{t.name}</h4>
                     <span>{t.role}</span>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
