import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Calendar, Heart, Share2, Check, Info, Map as MapIcon, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import PropertyCard from '../components/ui/PropertyCard';
import Button from '../components/ui/Button';
import EmiCalculator from '../components/features/EmiCalculator';
import { useWishlist } from '../context/WishlistContext';
import { useData } from '../context/DataContext';
import './PropertyDetail.css';

const PropertyDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { featuredProperties, teamAgents } = useData();
  const isSaved = isInWishlist(id);

  // Find property from mock data, default to first if not found
  const property = featuredProperties.find(p => p.id === id) || featuredProperties[0];
  const agent = teamAgents[0]; // Assign random agent

  const amenities = [
    'Swimming Pool', 'Smart Home System', 'Home Theater', 'Wine Cellar',
    'Gym / Fitness', 'Outdoor Kitchen', '3-Car Garage', 'Ocean View'
  ];

  return (
    <div className="property-detail-page animate-fade-in">
      {/* Gallery Header */}
      <div className="property-gallery">
        <div className="gallery-main">
          <img src={property.image} alt={property.title} />
          <div className="gallery-badges">
            <span className="badge badge-primary">{property.type}</span>
            <span className="badge badge-featured">Featured</span>
          </div>
          <div className="gallery-actions">
            <button className="gallery-action-btn" aria-label="Share">
              <Share2 size={20} />
            </button>
            <button
              className={`gallery-action-btn ${isSaved ? 'text-red' : ''}`}
              onClick={() => toggleWishlist(property.id)}
              aria-label="Save"
            >
              <Heart size={20} className={isSaved ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
        <div className="gallery-thumbs d-none d-md-grid">
          <img src="https://images.unsplash.com/photo-1628102491629-77858abdd15d?auto=format&fit=crop&w=600&q=80" alt="thumb 1" />
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" alt="thumb 2" />
          <div className="gallery-more">
            <ImageIcon size={24} />
            <span>View All 24 Photos</span>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <Link to="/listings" className="back-link"><ChevronLeft size={16} /> Back to Listings</Link>

        <div className="property-layout">
          {/* Main Info */}
          <div className="property-main-content">
            <div className="property-header">
              <div className="title-section">
                <h1 className="display-2 font-serif">{property.title}</h1>
                <p className="property-location-lg">
                  <MapPin size={18} /> {property.location}
                </p>
              </div>
              <div className="price-section">
                <h2>{property.price}</h2>
                <span className="price-label">Estimated Value</span>
              </div>
            </div>

            <div className="property-key-stats">
              <div className="stat-box">
                <Bed size={24} className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-value">{property.beds}</span>
                  <span className="stat-name">Beds</span>
                </div>
              </div>
              <div className="stat-box">
                <Bath size={24} className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-value">{property.baths}</span>
                  <span className="stat-name">Baths</span>
                </div>
              </div>
              <div className="stat-box">
                <Square size={24} className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-value">{property.area}</span>
                  <span className="stat-name">Sqft</span>
                </div>
              </div>
              <div className="stat-box">
                <Calendar size={24} className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-value">2021</span>
                  <span className="stat-name">Built</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="property-tabs">
              <button
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <Info size={16} /> Overview
              </button>
              <button
                className={`tab-btn ${activeTab === 'amenities' ? 'active' : ''}`}
                onClick={() => setActiveTab('amenities')}
              >
                <Check size={16} /> Amenities
              </button>
              <button
                className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`}
                onClick={() => setActiveTab('map')}
              >
                <MapIcon size={16} /> Map View
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="tab-pane animate-fade-in">
                  <h3>Property Description</h3>
                  <p>Experience the pinnacle of luxury living in this exquisite property located in the heart of {property.location}. Boasting {property.area} square feet of meticulously designed living space, this home features {property.beds} generously sized bedrooms and {property.baths} spa-like bathrooms.</p>
                  <p>The open-concept floor plan seamlessly integrates indoor and outdoor living areas, perfect for entertaining guests or enjoying quiet family evenings. High-end finishes throughout include custom cabinetry, premium hardwood flooring, and state-of-the-art smart home integration.</p>
                  <p>Residents will appreciate the breathtaking city views, the private landscaped garden, and the unparalleled access to top-tier dining, shopping, and entertainment options just steps away.</p>
                </div>
              )}

              {activeTab === 'amenities' && (
                <div className="tab-pane animate-fade-in">
                  <h3>Features & Amenities</h3>
                  <div className="amenities-grid">
                    {amenities.map((item, idx) => (
                      <div key={idx} className="amenity-item">
                        <Check size={18} className="text-secondary" color="var(--color-accent)" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'map' && (
                <div className="tab-pane animate-fade-in">
                  <h3>Location Map</h3>
                  <div className="map-embed">
                    {/* Fake Google Maps Embed */}
                    <img
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                      alt="Map View"
                      className="fake-map"
                    />
                    <div className="map-marker-fake">
                      <MapPin size={32} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <hr className="divider" />

            {/* Similar Properties */}
            <div className="similar-properties">
              <h3>Similar Properties</h3>
              <div className="similar-grid">
                {featuredProperties.slice(1, 3).map(prop => (
                  <PropertyCard key={`similar-${prop.id}`} property={prop} />
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Sidebar */}
          <aside className="property-sidebar">
            <div className="sidebar-sticky">
              <div className="contact-card widget-card">
                <h4 className="widget-title">Contact Person</h4>
                <div className="agent-profile-sm">
                  <img src={agent.image} alt={agent.name} />
                  <div>
                    <h5>{agent.name}</h5>
                    <span>{agent.title}</span>
                  </div>
                </div>

                <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Your Name" className="widget-input" required />
                  <input type="email" placeholder="Your Email" className="widget-input" required />
                  <input type="tel" placeholder="Your Phone" className="widget-input" required />
                  <textarea placeholder="I'm interested in this property..." className="widget-input" rows="3" required></textarea>

                  <Button type="submit" className="w-100 mt-2">Send Message</Button>
                </form>

                <div className="quick-contact">
                  <a href={`tel:${agent.phone}`} className="btn btn-outline w-100 mb-2 mt-2">Call Agent</a>
                  <a href={`https://wa.me/${agent.phone.replace('+', '')}`} target="_blank" rel="noreferrer" className="btn btn-primary whatsapp-btn w-100">
                    WhatsApp
                  </a>
                </div>
              </div>

              {property.type === 'Buy' && <EmiCalculator defaultPrice={parseInt(property.price.replace(/[^0-9]/g, '')) || 1000000} />}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
