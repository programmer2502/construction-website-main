import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Heart, Share2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isSaved = isInWishlist(property.id);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/property/${property.id}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        console.error("Failed to copy link:", err);
      });
    } else {
      // Fallback for browsers that don't support navigator.clipboard or non-secure contexts
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="property-card">
      <div className="property-image-wrapper">
        <Link to={`/property/${property.id}`}>
          <img src={property.image} alt={property.title} className="property-image" />
        </Link>
        <div className="property-card-actions">
          <button 
            className={`action-btn share-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopyLink}
            aria-label="Copy link"
          >
            <Share2 size={18} />
            {copied && <span className="tooltip-text">Copied!</span>}
          </button>
          <button 
            className={`action-btn wishlist-btn ${isSaved ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(property.id);
            }}
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={18} className={isSaved ? "fill-current" : ""} />
          </button>
        </div>
        {(property.type || property.category) && (
          <div className="property-badge">{property.type || property.category}</div>
        )}
      </div>
      
      <div className="property-content">
        <div className="property-price">{property.price}</div>
        <Link to={`/property/${property.id}`}>
          <h3 className="property-title">{property.title}</h3>
        </Link>
        <p className="property-location">
          <MapPin size={14} /> {property.location}
        </p>
        
        <div className="property-features">
          <div className="feature"><Bed size={16} /> <span>{property.beds} Beds</span></div>
          <div className="feature"><Bath size={16} /> <span>{property.baths} Baths</span></div>
          <div className="feature"><Square size={16} /> <span>{property.area} sqft</span></div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
