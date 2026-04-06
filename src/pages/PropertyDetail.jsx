import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Calendar, Heart, Share2, Check, Info, Map as MapIcon, Image as ImageIcon, ChevronLeft, ChevronRight, User, Loader } from 'lucide-react';
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
  const { featuredProperties, teamAgents, companyInfo, isInitialized } = useData();
  const isSaved = isInWishlist(id);

  const property = featuredProperties.find(p => p.id === id);

  if (!isInitialized) {
    return (
      <div className="container mt-5 pt-5 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <Loader size={48} className="animate-spin text-accent" />
        <p className="mt-3 text-muted">Fetching property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mt-5 pt-5 text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="error-card p-5 shadow-lg rounded-lg bg-white" style={{ maxWidth: '500px', border: '1px solid var(--color-border)' }}>
          <h2 className="mb-3 text-dark">Property Not Found</h2>
          <p className="text-muted mb-4">The property you are looking for does not exist or has been removed. Check the link or explore our recent listings.</p>
          <Link to="/listings" className="btn btn-primary">Browse All Properties</Link>
        </div>
      </div>
    );
  }

  const agent = property.agentId ? teamAgents.find(a => a.id === property.agentId) || teamAgents[0] || {} : teamAgents[0] || {};

  // Handle dynamic amenities or fallback to empty array
  const amenitiesList = property.amenities ? property.amenities.split(',').map(a => a.trim()) : [];

  // Animated Slider Logic
  const images = property.images || (property.image ? [property.image] : []);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const nextImage = () => setCurrentImgIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(nextImage, 4000); // Auto-play every 4 seconds
    return () => clearInterval(timer);
  }, []);

  // Contact Form State
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    language: '',
    message: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const waText = `*New Property Inquiry*\n\n*Property:* ${property.title} (${property.location})\n*Name:* ${contactData.name}\n*Email:* ${contactData.email}\n*Phone:* ${contactData.phone}\n*Language:* ${contactData.language}\n\n*Message:*\n${contactData.message}`;
    
    // Clean target number and ensure country code
    let targetNumber = (companyInfo?.whatsapp || '9880345558').replace(/[^0-9]/g, '');
    if (targetNumber.length === 10) targetNumber = '91' + targetNumber;

    window.open(`https://wa.me/${targetNumber}?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <div className="property-detail-page animate-fade-in">
      {/* Gallery Header */}
      <div className="property-gallery" style={{ position: 'relative' }}>
        <div className="gallery-main" style={{ position: 'relative', overflow: 'hidden' }}>
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${property.title} - Slide ${idx + 1}`}
              style={{
                position: idx === 0 ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: idx === currentImgIndex ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
                zIndex: idx === currentImgIndex ? 1 : 0
              }}
            />
          ))}
          <div className="gallery-badges" style={{ zIndex: 10 }}>
            <span className="badge badge-primary">{property.type}</span>
            <span className="badge badge-featured">Featured</span>
          </div>
          <div className="gallery-actions" style={{ zIndex: 10 }}>
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

          {/* Slider Controls */}
          <button className="slider-nav-btn prev-btn" onClick={prevImage} aria-label="Previous Slide">
            <ChevronLeft size={24} />
          </button>
          <button className="slider-nav-btn next-btn" onClick={nextImage} aria-label="Next Slide">
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="gallery-thumbs d-none d-md-grid">
          {images.slice(1, 3).map((img, idx) => (
            <img
              key={`thumb-${idx}`}
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              onClick={() => setCurrentImgIndex(idx + 1)}
              style={{
                cursor: 'pointer',
                opacity: currentImgIndex === (idx + 1) ? 1 : 0.6,
                transition: 'opacity 0.3s ease',
                border: currentImgIndex === (idx + 1) ? '3px solid var(--color-accent)' : '3px solid transparent'
              }}
            />
          ))}
          <div className="gallery-more" onClick={() => setCurrentImgIndex(images.length > 3 ? 3 : 0)} style={{ cursor: 'pointer' }}>
            <ImageIcon size={24} />
            <span>View All {images.length} Photos</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .slider-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.2s ease;
          backdrop-filter: blur(4px);
        }
        .slider-nav-btn:hover {
          background: var(--color-accent);
          border-color: var(--color-accent);
          transform: translateY(-50%) scale(1.1);
        }
        .slider-nav-btn.prev-btn { left: 20px; }
        .slider-nav-btn.next-btn { right: 20px; }
      `}} />

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
                  <span className="stat-value">{property.built || '2021'}</span>
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
                  {property.overview ? (
                    <p style={{ whiteSpace: 'pre-line' }}>{property.overview}</p>
                  ) : (
                    <>
                      <p>Experience the pinnacle of luxury living in this exquisite property located in the heart of {property.location}. Boasting {property.area} square feet of meticulously designed living space, this home features {property.beds} generously sized bedrooms and {property.baths} spa-like bathrooms.</p>
                      <p>The open-concept floor plan seamlessly integrates indoor and outdoor living areas, perfect for entertaining guests or enjoying quiet family evenings. High-end finishes throughout include custom cabinetry, premium hardwood flooring, and state-of-the-art smart home integration.</p>
                      <p>Residents will appreciate the breathtaking city views, the private landscaped garden, and the unparalleled access to top-tier dining, shopping, and entertainment options just steps away.</p>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'amenities' && (
                <div className="tab-pane animate-fade-in">
                  <h3>Features & Amenities</h3>
                  <div className="amenities-grid">
                    {amenitiesList.length > 0 ? (
                      amenitiesList.map((item, idx) => (
                        <div key={idx} className="amenity-item">
                          <Check size={18} className="text-secondary" color="var(--color-accent)" />
                          <span>{item}</span>
                        </div>
                      ))
                    ) : (
                      <p>No amenities listed.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'map' && (
                <div className="tab-pane animate-fade-in">
                  <h3>Location Map</h3>
                  <div className="map-embed" style={{ borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                    {property.mapView && property.mapView.startsWith('<iframe') ? (
                      <div dangerouslySetInnerHTML={{ __html: property.mapView }} className="iframe-container" style={{ width: '100%', height: '400px' }} />
                    ) : property.mapView && property.mapView.includes('/maps/embed') ? (
                      <iframe title="Property Location" width="100%" height="400" style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" src={property.mapView}></iframe>
                    ) : (
                      <>
                        <iframe
                          title="Property Location"
                          width="100%"
                          height="400"
                          style={{ border: 0 }}
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                        ></iframe>
                        {property.mapView && property.mapView.startsWith('http') && (
                          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                            <a href={property.mapView} target="_blank" rel="noopener noreferrer" className="btn btn-primary shadow-lg border-0" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                              <MapPin size={18} style={{ marginRight: '8px' }} />
                              Open in Google Maps
                            </a>
                          </div>
                        )}
                      </>
                    )}
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
                  {agent.image ? (
                    <img src={agent.image} alt={agent.name || 'Agent'} />
                  ) : (
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-light)' }}>
                      <User size={24} />
                    </div>
                  )}
                  <div>
                    <h5>{agent.name || 'Our Agent'}</h5>
                    <span>{agent.title || 'Property Consultant'}</span>
                  </div>
                </div>

                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <input type="text" placeholder="Your Name" className="widget-input" required value={contactData.name} onChange={e => setContactData({...contactData, name: e.target.value})} />
                  <input type="email" placeholder="Your Email" className="widget-input" required value={contactData.email} onChange={e => setContactData({...contactData, email: e.target.value})} />
                  <input type="tel" placeholder="Your Phone" className="widget-input" required value={contactData.phone} onChange={e => setContactData({...contactData, phone: e.target.value})} />
                  <select className="widget-input" required value={contactData.language} onChange={e => setContactData({...contactData, language: e.target.value})}>
                    <option value="" disabled>Select Language</option>
                    <option value="English">English</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                  <textarea placeholder="I'm interested in this property..." className="widget-input" rows="3" required value={contactData.message} onChange={e => setContactData({...contactData, message: e.target.value})}></textarea>

                  <Button type="submit" className="w-100 mt-2">Send Message</Button>
                </form>

                <div className="quick-contact">
                  <a href={`tel:${agent.phone || companyInfo?.phone || '+91 9880345558'}`} className="btn btn-outline w-100 mb-2 mt-2">Call Person</a>
                  <a href={`https://wa.me/${companyInfo?.whatsapp || (agent.phone ? agent.phone.replace(/[^0-9]/g, '') : '919880345558')}`} target="_blank" rel="noreferrer" className="btn btn-primary whatsapp-btn w-100">
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
