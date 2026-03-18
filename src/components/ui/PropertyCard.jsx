import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isSaved = isInWishlist(property.id);

  return (
    <div className="property-card">
      <div className="property-image-wrapper">
        <Link to={`/property/${property.id}`}>
          <img src={property.image} alt={property.title} className="property-image" />
        </Link>
        <button 
          className={`wishlist-btn ${isSaved ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(property.id);
          }}
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={20} className={isSaved ? "fill-current" : ""} />
        </button>
        <div className="property-badge">{property.type}</div>
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
