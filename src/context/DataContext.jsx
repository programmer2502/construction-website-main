import React, { createContext, useContext, useState, useEffect } from 'react';
import { featuredProperties as initialProperties, teamAgents as initialAgents, testimonials as initialTestimonials } from '../data/mockData';

const initialCategories = [
  { id: 'cat-1', title: 'Apartments', count: '124 Properties', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80', link: '/listings?cat=apartments', className: '' },
  { id: 'cat-2', title: 'Luxury Villas', count: '86 Properties', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80', link: '/listings?cat=villas', className: 'tall-tile' },
  { id: 'cat-3', title: 'Commercial Space', count: '45 Properties', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80', link: '/listings?cat=commercial', className: '' },
  { id: 'cat-4', title: 'Plots & Land', count: '32 Properties', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', link: '/listings?cat=plots', className: 'wide-tile' },
];

const initialHero = {
  title: 'Discover Properties That Define Your Lifestyle',
  subtitle: 'Premium real estate curated for discerning buyers and investors.'
};

const initialLocations = [
  { id: 'loc-1', name: 'New York' },
  { id: 'loc-2', name: 'Beverly Hills' },
  { id: 'loc-3', name: 'Seattle' },
  { id: 'loc-4', name: 'Chicago' }
];

const initialPropertyTypes = [
  { id: 'pt-1', name: 'Buy' },
  { id: 'pt-2', name: 'Rent' },
  { id: 'pt-3', name: 'Commercial' }
];

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('siteProperties');
    return saved ? JSON.parse(saved) : initialProperties;
  });

  const [agents, setAgents] = useState(() => {
    const saved = localStorage.getItem('siteAgents');
    return saved ? JSON.parse(saved) : initialAgents;
  });

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('siteTestimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('siteCategories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [hero, setHero] = useState(() => {
    const saved = localStorage.getItem('siteHero');
    return saved ? JSON.parse(saved) : initialHero;
  });

  const [locations, setLocations] = useState(() => {
    const saved = localStorage.getItem('siteLocations');
    return saved ? JSON.parse(saved) : initialLocations;
  });

  const [propertyTypes, setPropertyTypes] = useState(() => {
    const saved = localStorage.getItem('sitePropertyTypes');
    return saved ? JSON.parse(saved) : initialPropertyTypes;
  });

  useEffect(() => {
    localStorage.setItem('siteProperties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('siteAgents', JSON.stringify(agents));
  }, [agents]);

  useEffect(() => {
    localStorage.setItem('siteTestimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('siteCategories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('siteHero', JSON.stringify(hero));
  }, [hero]);

  useEffect(() => {
    localStorage.setItem('siteLocations', JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem('sitePropertyTypes', JSON.stringify(propertyTypes));
  }, [propertyTypes]);

  const value = {
    properties,
    setProperties,
    agents,
    setAgents,
    testimonials,
    setTestimonials,
    categories,
    setCategories,
    hero,
    setHero,
    locations,
    setLocations,
    propertyTypes,
    setPropertyTypes,
    featuredProperties: properties, // alias for existing uses
    teamAgents: agents // alias for existing uses
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
