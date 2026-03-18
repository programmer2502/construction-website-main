import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, List, Map, SlidersHorizontal, ChevronDown } from 'lucide-react';
import PropertyCard from '../components/ui/PropertyCard';
import { useData } from '../context/DataContext';
import './Listings.css';

const Listings = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'map'
  const [showFilters, setShowFilters] = useState(false);
  const { featuredProperties } = useData();
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const typeParam = searchParams.get('type') || 'All';

  // For demo, just duplicating mock data or filtering it
  let displayedProperties = [...featuredProperties, ...featuredProperties];
  if (typeParam !== 'All') {
    displayedProperties = displayedProperties.filter(p => p.type === typeParam);
  }

  return (
    <div className="listings-page">
      <div className="container">
        <div className="listings-header">
          <div>
            <h1 className="font-serif">Properties for {typeParam === 'All' ? 'Sale & Rent' : typeParam}</h1>
            <p className="text-muted">Showing {displayedProperties.length} results</p>
          </div>
          
          <div className="listings-controls">
            <button 
              className="btn btn-outline d-lg-none" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={18} /> Filters
            </button>
            
            <div className="sort-dropdown">
              <span className="text-muted">Sort by:</span>
              <button className="sort-btn">Newest <ChevronDown size={16} /></button>
            </div>
            
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
              >
                <Grid size={20} />
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List View"
              >
                <List size={20} />
              </button>
              <button 
                className={`view-btn ${viewMode === 'map' ? 'active' : ''}`}
                onClick={() => setViewMode('map')}
                aria-label="Map View"
              >
                <Map size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="listings-layout">
          {/* Sidebar Filters */}
          <aside className={`listings-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="sidebar-header d-lg-none">
              <h3>Filters</h3>
              <button className="close-filters" onClick={() => setShowFilters(false)}>×</button>
            </div>
            
            <div className="filter-group">
              <h4>Location</h4>
              <input type="text" placeholder="City, neighborhood, or zip" className="filter-input" />
            </div>
            
            <div className="filter-group">
              <h4>Property Type</h4>
              <div className="checkbox-group">
                <label><input type="checkbox" defaultChecked /> House</label>
                <label><input type="checkbox" defaultChecked /> Apartment</label>
                <label><input type="checkbox" /> Villa</label>
                <label><input type="checkbox" /> Commercial</label>
              </div>
            </div>
            
            <div className="filter-group">
              <h4>Price Range</h4>
              <input type="range" className="price-slider" min="0" max="10000000" />
              <div className="price-labels">
                <span>$0</span>
                <span>$10M+</span>
              </div>
            </div>
            
            <div className="filter-group">
              <h4>Bedrooms</h4>
              <div className="pill-group">
                <button className="filter-pill">Any</button>
                <button className="filter-pill">1</button>
                <button className="filter-pill">2</button>
                <button className="filter-pill active">3+</button>
                <button className="filter-pill">4+</button>
              </div>
            </div>

            <div className="filter-group">
              <h4>Amenities</h4>
              <div className="checkbox-group">
                <label><input type="checkbox" /> Swimming Pool</label>
                <label><input type="checkbox" /> Gym / Fitness</label>
                <label><input type="checkbox" /> Parking</label>
                <label><input type="checkbox" /> Security System</label>
              </div>
            </div>
            
            <button className="btn btn-primary w-100 mt-4">Apply Filters</button>
          </aside>

          {/* Main Content */}
          <main className="listings-main">
            {viewMode === 'map' ? (
              <div className="map-placeholder">
                <p>Interactive Map View Loading...</p>
                <span>(Google Maps Embed Integration)</span>
              </div>
            ) : (
              <div className={`properties-${viewMode}`}>
                {displayedProperties.length > 0 ? (
                  displayedProperties.map((prop, idx) => (
                    <PropertyCard key={`${prop.id}-${idx}`} property={prop} />
                  ))
                ) : (
                  <div className="no-results">
                    <h3>No properties found</h3>
                    <p>Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            )}
            
            {displayedProperties.length > 0 && viewMode !== 'map' && (
              <div className="pagination">
                <button className="page-btn" disabled>Prev</button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">Next</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Listings;
