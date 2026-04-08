import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, List, Map, SlidersHorizontal, ChevronDown } from 'lucide-react';
import PropertyCard from '../components/ui/PropertyCard';
import { useData } from '../context/DataContext';
import './Listings.css';

const Listings = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'map'
  const [showFilters, setShowFilters] = useState(false);
  const { featuredProperties, propertyTypes, priceRanges } = useData();
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const typeParam = searchParams.get('type') || 'All';
  const catParam = searchParams.get('cat') || 'All';
  const locParam = searchParams.get('location') || '';
  const priceParam = searchParams.get('price') || '';

  const [filters, setFilters] = useState({
    location: locParam,
    types: typeParam !== 'All' ? [typeParam] : [],
    maxPrice: priceParam 
      ? (priceParam.includes('-') ? parseInt(priceParam.split('-')[1]) : parseInt(priceParam) || 10000000) 
      : 10000000,
    beds: 'Any',
    amenities: []
  });

  // Sync with URL params if they change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      location: locParam,
      types: typeParam !== 'All' ? [typeParam] : prev.types,
    }));
  }, [locParam, typeParam]);

  const handleTypeChange = (type) => {
    setFilters(prev => {
      if (prev.types.includes(type)) {
        return { ...prev, types: prev.types.filter(t => t !== type) };
      } else {
        return { ...prev, types: [...prev.types, type] };
      }
    });
  };

  const parsePrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    let val = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    if (priceStr.toLowerCase().includes('cr')) val *= 10000000;
    else if (priceStr.toLowerCase().includes('m')) val *= 1000000;
    else if (priceStr.toLowerCase().includes('l')) val *= 100000;
    else if (priceStr.toLowerCase().includes('k')) val *= 1000;
    return val;
  };

  let displayedProperties = featuredProperties.filter(p => {
    // Location Filter
    if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Property Type Filter
    if (filters.types.length > 0 && !filters.types.includes(p.type)) {
      return false;
    }

    // Price Filter
    const numericPrice = parsePrice(p.price);
    if (numericPrice > filters.maxPrice && filters.maxPrice < 10000000) {
      return false;
    }

    // Bedrooms Filter
    if (filters.beds !== 'Any') {
      const minBeds = parseInt(filters.beds);
      if (p.beds < minBeds) return false;
    }

    // URL Category Filter (Legacy support/Direct links)
    if (catParam !== 'All') {
      const term = catParam.toLowerCase();
      const typeLow = p.type.toLowerCase();
      const titleLow = p.title.toLowerCase();
      
      if (term === 'commercial') {
        if (typeLow !== 'commercial') return false;
      } else if (term === 'apartments') {
        if (!titleLow.includes('apartment') && typeLow !== 'apartment') return false;
      } else if (term === 'villas') {
        if (!titleLow.includes('villa') && typeLow !== 'villa') return false;
      } else if (term === 'plots') {
        if (!titleLow.includes('plot') && !titleLow.includes('land')) return false;
      } else {
        if (!typeLow.includes(term) && !titleLow.includes(term)) return false;
      }
    }

    return true;
  });

  // Determine the title to display
  let pageTitle = typeParam === 'All' ? 'Sale & Rent' : typeParam;
  if (catParam !== 'All') {
    pageTitle = catParam.charAt(0).toUpperCase() + catParam.slice(1);
  } else if (filters.types.length === 1) {
    pageTitle = filters.types[0];
  }


  return (
    <div className="listings-page">
      <div className="container">
        <div className="listings-header">
          <div>
            <h1 className="font-serif">Properties for {pageTitle}</h1>
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
              <div className="d-flex justify-content-between align-items-center">
                <h4>Location</h4>
                {filters.location && (
                  <button 
                    className="btn btn-link btn-sm p-0 text-decoration-none"
                    onClick={() => setFilters(prev => ({ ...prev, location: '' }))}
                  >
                    Clear
                  </button>
                )}
              </div>
              <input 
                type="text" 
                placeholder="City, neighborhood, or zip" 
                className="filter-input"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            
            <div className="filter-group">
              <h4>Property Type</h4>
              <div className="checkbox-group">
                {propertyTypes.length > 0 ? (
                  propertyTypes.map(pt => (
                    <label key={pt.id}>
                      <input 
                        type="checkbox" 
                        checked={filters.types.includes(pt.name)}
                        onChange={() => handleTypeChange(pt.name)}
                      /> {pt.name}
                    </label>
                  ))
                ) : (
                  <p className="text-muted small">No property types defined in Admin.</p>
                )}
              </div>
            </div>
            
            <div className="filter-group">
              <h4>Max Price</h4>
              <input 
                type="range" 
                className="price-slider" 
                min="0" 
                max="10000000" 
                step="100000"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
              />
              <div className="price-labels">
                <span>₹0</span>
                <span>₹{(filters.maxPrice / 100000).toFixed(0)}L{filters.maxPrice >= 10000000 ? '+' : ''}</span>
              </div>
            </div>
            
            <div className="filter-group">
              <h4>Bedrooms</h4>
              <div className="pill-group">
                {['Any', '1', '2', '3+', '4+'].map(val => (
                  <button 
                    key={val}
                    className={`filter-pill ${filters.beds === val ? 'active' : ''}`}
                    onClick={() => setFilters(prev => ({ ...prev, beds: val }))}
                  >
                    {val}
                  </button>
                ))}
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
            
            <button 
              className="btn btn-outline w-100 mt-4"
              onClick={() => setFilters({
                location: '',
                types: [],
                maxPrice: 10000000,
                beds: 'Any',
                amenities: []
              })}
            >
              Clear All Filters
            </button>
            <button className="btn btn-primary w-100 mt-2 d-lg-none" onClick={() => setShowFilters(false)}>Show Results</button>

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
