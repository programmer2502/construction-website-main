import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Star } from 'lucide-react';
import './AgentCard.css';

const AgentCard = ({ agent }) => {
  return (
    <div className="agent-card">
      <div className="agent-image-wrapper">
        <img src={agent.image} alt={agent.name} className="agent-image" />
      </div>
      <div className="agent-content">
        <h3 className="agent-name">{agent.name}</h3>
        <p className="agent-title">{agent.title}</p>
        
        <div className="agent-stats">
          <div className="agent-stat">
            <span className="stat-value">{agent.listings}</span>
            <span className="stat-label">Listings</span>
          </div>
          <div className="agent-stat">
            <span className="stat-value flex-center"><Star size={14} className="star-icon" fill="currentColor" /> {agent.rating}</span>
            <span className="stat-label">Rating</span>
          </div>
        </div>
        
        <div className="agent-contact">
          <a href={`tel:${agent.phone}`} className="contact-icon" aria-label="Call Agent"><Phone size={18} /></a>
          <a href={`mailto:${agent.email}`} className="contact-icon" aria-label="Email Agent"><Mail size={18} /></a>
          <Link to={`/agents/${agent.id}`} className="btn btn-primary btn-sm agent-btn">View Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
