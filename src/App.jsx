import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/features/FloatingWhatsApp';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import './App.css';

import { DataProvider } from './context/DataContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Critical Runtime Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Oops! Something went wrong.</h2>
          <p>{this.state.error.toString()}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary mt-3">Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Pages
import Home from './pages/Home';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Agents from './pages/Agents';
import Admin from './pages/Admin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <DataProvider>
          <ErrorBoundary>
            <Router>
              <ScrollToTop />
              <div className="app-wrapper">
                <Header />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/listings" element={<Listings />} />
                    <Route path="/property/:id" element={<PropertyDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/agents" element={<Agents />} />
                    <Route path="/admin" element={<Admin />} />
                  </Routes>
                </main>
                <Footer />
                <FloatingWhatsApp />
              </div>
            </Router>
          </ErrorBoundary>
        </DataProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
