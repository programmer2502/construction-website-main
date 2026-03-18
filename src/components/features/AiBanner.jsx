import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AiBanner.css';

const AiBanner = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if(query.trim()) {
      navigate('/listings');
    }
  };

  return (
    <div className="ai-banner">
      <div className="container ai-banner-container">
        <div className="ai-banner-content">
          <div className="ai-icon-wrapper">
            <Sparkles size={24} color="var(--color-primary-dark)" />
          </div>
          <div className="ai-text">
            <h3>AI Property Matchmaker</h3>
            <p>Tell us what you're looking for, and our AI will find the perfect matches.</p>
          </div>
        </div>
        <form className="ai-search-form" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="e.g. '3 bedroom apartment downtown under $5k'" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" aria-label="Search with AI">
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiBanner;
