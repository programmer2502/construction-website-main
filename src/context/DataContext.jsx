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
  listings: '500+',
  clients: '1,200+',
  cities: '15+',
  satisfaction: '98%'
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
  const [properties, setProperties] = useState(initialProperties);
  const [agents, setAgents] = useState(initialAgents);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [categories, setCategories] = useState(initialCategories);
  const [hero, setHero] = useState(initialHero);
  const [locations, setLocations] = useState(initialLocations);
  const [propertyTypes, setPropertyTypes] = useState(initialPropertyTypes);
  const [siteStats, setSiteStats] = useState(initialSiteStats);
  const [companyInfo, setCompanyInfo] = useState(initialCompanyInfo);
  const [priceRanges, setPriceRanges] = useState(initialPriceRanges);
  
  const dataRef = React.useRef({
    properties, agents, testimonials, categories, hero, locations, propertyTypes, siteStats, companyInfo, priceRanges
  });

  // Keep ref in sync with latest state
  useEffect(() => {
    dataRef.current = {
      properties, agents, testimonials, categories, hero, locations, propertyTypes, siteStats, companyInfo, priceRanges
    };
  }, [properties, agents, testimonials, categories, hero, locations, propertyTypes, siteStats, companyInfo, priceRanges]);

  const [isInitialized, setIsInitialized] = useState(false);
  const isDataLoaded = React.useRef(false);

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

        isDataLoaded.current = true;
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

  // Removed aggressive background sync periodically to prevent state reverted issues

  const saveData = async (manualData) => {
    const dataToSave = manualData || dataRef.current;
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave)
      });
    } catch (err) {
      console.error("Error saving data to DB:", err);
    }
  };

  // Save to DB on any data change (debounced)
  useEffect(() => {
    if (!isInitialized || !isDataLoaded.current) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      saveData();
    }, 500);

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
    saveData,
    featuredProperties: properties,
    teamAgents: agents,
    refreshData: fetchData,
    isInitialized
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
