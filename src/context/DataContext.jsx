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
  const [properties, setProperties] = useState(initialProperties);
  const [agents, setAgents] = useState(initialAgents);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [categories, setCategories] = useState(initialCategories);
  const [hero, setHero] = useState(initialHero);
  const [locations, setLocations] = useState(initialLocations);
  const [propertyTypes, setPropertyTypes] = useState(initialPropertyTypes);
  
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch from DB on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          if (data.properties?.length) setProperties(data.properties);
          if (data.agents?.length) setAgents(data.agents);
          if (data.testimonials?.length) setTestimonials(data.testimonials);
          if (data.categories?.length) setCategories(data.categories);
          if (data.hero && Object.keys(data.hero).length > 0) setHero(data.hero);
          if (data.locations?.length) setLocations(data.locations);
          if (data.propertyTypes?.length) setPropertyTypes(data.propertyTypes);
        }
      })
      .catch(err => console.error("Error loading data from DB:", err))
      .finally(() => {
        setTimeout(() => setIsInitialized(true), 100);
      });
  }, []);

  // Save to DB on any data change (debounced)
  useEffect(() => {
    if (!isInitialized) return;

    // Optional: save to local storage as fallback/buffer
    localStorage.setItem('siteProperties', JSON.stringify(properties));
    localStorage.setItem('siteAgents', JSON.stringify(agents));
    localStorage.setItem('siteTestimonials', JSON.stringify(testimonials));
    localStorage.setItem('siteCategories', JSON.stringify(categories));
    localStorage.setItem('siteHero', JSON.stringify(hero));
    localStorage.setItem('siteLocations', JSON.stringify(locations));
    localStorage.setItem('sitePropertyTypes', JSON.stringify(propertyTypes));

    const timeoutId = setTimeout(() => {
      fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          properties, agents, testimonials, categories, hero, locations, propertyTypes
        })
      }).catch(err => console.error("Error saving data to DB:", err));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [properties, agents, testimonials, categories, hero, locations, propertyTypes, isInitialized]);

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
    featuredProperties: properties,
    teamAgents: agents
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
