import React, { createContext, useContext, useState, useEffect } from 'react';
import { featuredProperties as initialProperties, teamAgents as initialAgents, testimonials as initialTestimonials } from '../data/mockData';

const initialCategories = [];

const initialHero = {
  title: 'Discover Properties That Define Your Lifestyle',
  subtitle: 'Premium real estate curated for discerning buyers and investors.'
};

const initialLocations = [];

const initialPropertyTypes = [];

const initialSiteStats = {
  listings: '0',
  clients: '0',
  cities: '0',
  satisfaction: '0%'
};

const initialCompanyInfo = {
  whatsapp: '9880345558',
  phone: '+91 9880345558',
  email: 'info@Land24.com',
  address: 'Panathur, Bangalore 560087'
};

const initialPriceRanges = [];

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const loadState = (key, initial) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch {
      return initial;
    }
  };

  const [properties, setProperties] = useState(() => loadState('siteProperties', initialProperties));
  const [agents, setAgents] = useState(() => loadState('siteAgents', initialAgents));
  const [testimonials, setTestimonials] = useState(() => loadState('siteTestimonials', initialTestimonials));
  const [categories, setCategories] = useState(() => loadState('siteCategories', initialCategories));
  const [hero, setHero] = useState(() => loadState('siteHero', initialHero));
  const [locations, setLocations] = useState(() => loadState('siteLocations', initialLocations));
  const [propertyTypes, setPropertyTypes] = useState(() => loadState('sitePropertyTypes', initialPropertyTypes));
  const [siteStats, setSiteStats] = useState(() => loadState('siteStats', initialSiteStats));
  const [companyInfo, setCompanyInfo] = useState(() => loadState('companyInfo', initialCompanyInfo));
  const [priceRanges, setPriceRanges] = useState(() => loadState('priceRanges', initialPriceRanges));
  
  const [isInitialized, setIsInitialized] = useState(false);

  const isFirstRender = React.useRef(true);

  const skipNextSave = React.useRef(false);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/data?t=${Date.now()}`, { cache: 'no-store' });
      const data = await res.json();
      if (data && !data.error) {
        skipNextSave.current = true; // Mark the upcoming state changes as originating from the server
        
        if (data.properties && Array.isArray(data.properties)) setProperties(data.properties);
        if (data.agents && Array.isArray(data.agents)) setAgents(data.agents);
        if (data.testimonials && Array.isArray(data.testimonials)) setTestimonials(data.testimonials);
        if (data.categories && Array.isArray(data.categories)) setCategories(data.categories);
        if (data.hero && Object.keys(data.hero).length > 0) setHero(data.hero);
        if (data.locations && Array.isArray(data.locations)) setLocations(data.locations);
        if (data.propertyTypes && Array.isArray(data.propertyTypes)) setPropertyTypes(data.propertyTypes);
        if (data.siteStats && Object.keys(data.siteStats).length > 0) setSiteStats(data.siteStats);
        if (data.companyInfo && Object.keys(data.companyInfo).length > 0) setCompanyInfo(data.companyInfo);
        if (data.priceRanges && Array.isArray(data.priceRanges)) setPriceRanges(data.priceRanges);
      }
    } catch (err) {
      console.error("Error loading data from DB:", err);
    }
  };

  // Fetch from DB on mount
  useEffect(() => {
    fetchData().finally(() => {
      setTimeout(() => setIsInitialized(true), 100);
    });
  }, []);

  // Sync data in background periodically and on window focus
  useEffect(() => {
    if (!isInitialized) return;

    const intervalId = setInterval(fetchData, 15000);
    const handleFocus = () => fetchData();
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isInitialized]);

  // Save to DB on any data change (debounced)
  useEffect(() => {
    if (!isInitialized) return;
    
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    // Optional: save to local storage as fallback/buffer
    localStorage.setItem('siteProperties', JSON.stringify(properties));
    localStorage.setItem('siteAgents', JSON.stringify(agents));
    localStorage.setItem('siteTestimonials', JSON.stringify(testimonials));
    localStorage.setItem('siteCategories', JSON.stringify(categories));
    localStorage.setItem('siteHero', JSON.stringify(hero));
    localStorage.setItem('siteLocations', JSON.stringify(locations));
    localStorage.setItem('sitePropertyTypes', JSON.stringify(propertyTypes));
    localStorage.setItem('siteStats', JSON.stringify(siteStats));
    localStorage.setItem('companyInfo', JSON.stringify(companyInfo));
    localStorage.setItem('priceRanges', JSON.stringify(priceRanges));

    const timeoutId = setTimeout(() => {
      fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          properties, agents, testimonials, categories, hero, locations, propertyTypes, siteStats, companyInfo, priceRanges
        })
      }).catch(err => console.error("Error saving data to DB:", err));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [properties, agents, testimonials, categories, hero, locations, propertyTypes, siteStats, companyInfo, priceRanges, isInitialized]);

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
    siteStats,
    setSiteStats,
    companyInfo,
    setCompanyInfo,
    priceRanges,
    setPriceRanges,
    featuredProperties: properties,
    teamAgents: agents,
    refreshData: fetchData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
