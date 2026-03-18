import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Plus, Edit2, Trash2, Save, X, Lock, LogOut } from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const { properties, setProperties, agents, setAgents, testimonials, setTestimonials, categories, setCategories, hero, setHero } = useData();
  const [activeTab, setActiveTab] = useState('properties');

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('siteAdminAuth') === 'true';
  });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('siteAdminAuth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('siteAdminAuth');
  };
  
  // Form States
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const startEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Property Handlers
  const saveProperty = (e) => {
    e.preventDefault();
    if (editingId === 'new') {
      const newProp = { ...formData, id: `prop-${Date.now()}` };
      setProperties([...properties, newProp]);
    } else {
      setProperties(properties.map(p => p.id === editingId ? formData : p));
    }
    cancelEdit();
  };

  const deleteProperty = (id) => {
    if(window.confirm('Delete this property?')) {
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  // Agent Handlers
  const saveAgent = (e) => {
    e.preventDefault();
    if (editingId === 'new') {
      const newAgent = { ...formData, id: `agent-${Date.now()}` };
      setAgents([...agents, newAgent]);
    } else {
      setAgents(agents.map(a => a.id === editingId ? formData : a));
    }
    cancelEdit();
  };

  const deleteAgent = (id) => {
    if(window.confirm('Delete this agent?')) {
      setAgents(agents.filter(a => a.id !== id));
    }
  };

  // Testimonial Handlers
  const saveTestimonial = (e) => {
    e.preventDefault();
    if (editingId === 'new') {
      const newTest = { ...formData, id: Date.now() }; // Testimonial ids are numbers in mockData
      setTestimonials([...testimonials, newTest]);
    } else {
      setTestimonials(testimonials.map(t => t.id === editingId ? formData : t));
    }
    cancelEdit();
  };

  const deleteTestimonial = (id) => {
    if(window.confirm('Delete this testimonial?')) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  // Category Handlers
  const saveCategory = (e) => {
    e.preventDefault();
    if (editingId === 'new') {
      const newCat = { ...formData, id: `cat-${Date.now()}` };
      setCategories([...categories, newCat]);
    } else {
      setCategories(categories.map(c => c.id === editingId ? formData : c));
    }
    cancelEdit();
  };

  const deleteCategory = (id) => {
    if(window.confirm('Delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  // Hero Handlers
  const saveHero = (e) => {
    e.preventDefault();
    setHero(formData);
    alert('Hero settings saved!');
  };

  const renderContent = () => {
    if (activeTab === 'properties') {
      return (
        <div className="admin-glass-panel animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Manage Properties (Villas & Others)</h2>
            <button className="admin-btn admin-btn-primary" onClick={() => startEdit({ id: 'new', type: 'Buy', beds: 0, baths: 0, area: 0 })}>
              <Plus size={18} /> Add Property
            </button>
          </div>
          
          {editingId && (
            <form onSubmit={saveProperty} style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>{editingId === 'new' ? 'New Property' : 'Edit Property'}</h3>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Title</label>
                  <input className="admin-input" name="title" value={formData.title || ''} onChange={handleInputChange} required />
                </div>
                <div className="admin-form-group">
                  <label>Price</label>
                  <input className="admin-input" name="price" value={formData.price || ''} onChange={handleInputChange} required />
                </div>
                <div className="admin-form-group">
                  <label>Location</label>
                  <input className="admin-input" name="location" value={formData.location || ''} onChange={handleInputChange} required />
                </div>
                <div className="admin-form-group">
                  <label>Type</label>
                  <select className="admin-input" name="type" value={formData.type || 'Buy'} onChange={handleInputChange}>
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Beds</label>
                  <input className="admin-input" type="number" name="beds" value={formData.beds || 0} onChange={handleInputChange} />
                </div>
                <div className="admin-form-group">
                  <label>Baths</label>
                  <input className="admin-input" type="number" step="0.5" name="baths" value={formData.baths || 0} onChange={handleInputChange} />
                </div>
                <div className="admin-form-group">
                  <label>Area (sqft)</label>
                  <input className="admin-input" type="number" name="area" value={formData.area || 0} onChange={handleInputChange} />
                </div>
                <div className="admin-form-group">
                  <label>Image URL</label>
                  <input className="admin-input" name="image" value={formData.image || ''} onChange={handleInputChange} required placeholder="https://..." />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="admin-btn admin-btn-primary"><Save size={18}/> Save</button>
                <button type="button" className="admin-btn admin-btn-danger" onClick={cancelEdit}><X size={18}/> Cancel</button>
              </div>
            </form>
          )}

          <div className="admin-list">
            {properties.map(p => (
              <div key={p.id} className="admin-list-item">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {p.image && <img src={p.image} alt={p.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />}
                  <div className="admin-item-content">
                    <h4>{p.title} <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px', marginLeft: '8px' }}>{p.type}</span></h4>
                    <p>{p.price} • {p.location}</p>
                  </div>
                </div>
                <div className="admin-item-actions">
                  <button className="admin-btn-edit" onClick={() => startEdit(p)}><Edit2 size={16}/></button>
                  <button className="admin-btn-edit admin-btn-danger" onClick={() => deleteProperty(p.id)}><Trash2 size={16} color="currentColor"/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'agents') {
      return (
        <div className="admin-glass-panel animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Manage Agents</h2>
            <button className="admin-btn admin-btn-primary" onClick={() => startEdit({ id: 'new', listings: 0, rating: 5.0 })}>
              <Plus size={18} /> Add Agent
            </button>
          </div>
          
          {editingId && (
            <form onSubmit={saveAgent} style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>{editingId === 'new' ? 'New Agent' : 'Edit Agent'}</h3>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Name</label>
                  <input className="admin-input" name="name" value={formData.name || ''} onChange={handleInputChange} required />
                </div>
                <div className="admin-form-group">
                  <label>Title</label>
                  <input className="admin-input" name="title" value={formData.title || ''} onChange={handleInputChange} required />
                </div>
                <div className="admin-form-group">
                  <label>Email</label>
                  <input className="admin-input" type="email" name="email" value={formData.email || ''} onChange={handleInputChange} required />
                </div>
                <div className="admin-form-group">
                  <label>Phone</label>
                  <input className="admin-input" name="phone" value={formData.phone || ''} onChange={handleInputChange} required />
                </div>
                <div className="admin-form-group">
                  <label>Rating</label>
                  <input className="admin-input" type="number" step="0.1" name="rating" value={formData.rating || 5} onChange={handleInputChange} />
                </div>
                <div className="admin-form-group">
                  <label>Listings Count</label>
                  <input className="admin-input" type="number" name="listings" value={formData.listings || 0} onChange={handleInputChange} />
                </div>
                <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Image URL</label>
                  <input className="admin-input" name="image" value={formData.image || ''} onChange={handleInputChange} required placeholder="https://..." />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="admin-btn admin-btn-primary"><Save size={18}/> Save</button>
                <button type="button" className="admin-btn admin-btn-danger" onClick={cancelEdit}><X size={18}/> Cancel</button>
              </div>
            </form>
          )}

          <div className="admin-list">
            {agents.map(a => (
              <div key={a.id} className="admin-list-item">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {a.image && <img src={a.image} alt={a.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />}
                  <div className="admin-item-content">
                    <h4>{a.name}</h4>
                    <p>{a.title} • {a.email}</p>
                  </div>
                </div>
                <div className="admin-item-actions">
                  <button className="admin-btn-edit" onClick={() => startEdit(a)}><Edit2 size={16}/></button>
                  <button className="admin-btn-edit admin-btn-danger" onClick={() => deleteAgent(a.id)}><Trash2 size={16} color="currentColor"/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'testimonials') {
      return (
        <div className="admin-glass-panel animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Manage Testimonials</h2>
            <button className="admin-btn admin-btn-primary" onClick={() => startEdit({ id: 'new' })}>
              <Plus size={18} /> Add Testimonial
            </button>
          </div>
          
          {editingId && (
            <form onSubmit={saveTestimonial} style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>{editingId === 'new' ? 'New Testimonial' : 'Edit Testimonial'}</h3>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Name</label>
                  <input className="admin-input" name="name" value={formData.name || ''} onChange={handleInputChange} required />
                </div>
                <div className="admin-form-group">
                  <label>Role</label>
                  <input className="admin-input" name="role" value={formData.role || ''} onChange={handleInputChange} required />
                </div>
                <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Quote</label>
                  <textarea className="admin-input" name="quote" value={formData.quote || ''} onChange={handleInputChange} required rows="3" />
                </div>
                <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Image URL</label>
                  <input className="admin-input" name="image" value={formData.image || ''} onChange={handleInputChange} required placeholder="https://..." />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="admin-btn admin-btn-primary"><Save size={18}/> Save</button>
                <button type="button" className="admin-btn admin-btn-danger" onClick={cancelEdit}><X size={18}/> Cancel</button>
              </div>
            </form>
          )}

          <div className="admin-list">
            {testimonials.map(t => (
              <div key={t.id} className="admin-list-item">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {t.image && <img src={t.image} alt={t.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />}
                  <div className="admin-item-content">
                    <h4>{t.name} - <span style={{fontSize: '0.85rem', fontWeight:'normal', color: '#94a3b8'}}>{t.role}</span></h4>
                    <p style={{ maxWidth: '600px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>"{t.quote}"</p>
                  </div>
                </div>
                <div className="admin-item-actions">
                  <button className="admin-btn-edit" onClick={() => startEdit(t)}><Edit2 size={16}/></button>
                  <button className="admin-btn-edit admin-btn-danger" onClick={() => deleteTestimonial(t.id)}><Trash2 size={16} color="currentColor"/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'categories') {
      return (
        <div className="admin-glass-panel animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Manage Categories</h2>
            <button className="admin-btn admin-btn-primary" onClick={() => startEdit({ id: 'new', className: '' })}>
              <Plus size={18} /> Add Category
            </button>
          </div>
          
          {editingId && (
            <form onSubmit={saveCategory} style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>{editingId === 'new' ? 'New Category' : 'Edit Category'}</h3>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Title</label>
                  <input className="admin-input" name="title" value={formData.title || ''} onChange={handleInputChange} required />
                </div>
                <div className="admin-form-group">
                  <label>Count Text</label>
                  <input className="admin-input" name="count" value={formData.count || ''} onChange={handleInputChange} placeholder="e.g. 124 Properties" required />
                </div>
                <div className="admin-form-group">
                  <label>Link Route</label>
                  <input className="admin-input" name="link" value={formData.link || ''} onChange={handleInputChange} placeholder="e.g. /listings?cat=apartments" required />
                </div>
                <div className="admin-form-group">
                  <label>Layout Style (CSS Class)</label>
                  <select className="admin-input" name="className" value={formData.className || ''} onChange={handleInputChange}>
                    <option value="">Standard Mode</option>
                    <option value="tall-tile">Tall Mode</option>
                    <option value="wide-tile">Wide Mode</option>
                  </select>
                </div>
                <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Image URL</label>
                  <input className="admin-input" name="image" value={formData.image || ''} onChange={handleInputChange} required placeholder="https://..." />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="admin-btn admin-btn-primary"><Save size={18}/> Save</button>
                <button type="button" className="admin-btn admin-btn-danger" onClick={cancelEdit}><X size={18}/> Cancel</button>
              </div>
            </form>
          )}

          <div className="admin-list">
            {categories.map(c => (
              <div key={c.id} className="admin-list-item">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {c.image && <img src={c.image} alt={c.title} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />}
                  <div className="admin-item-content">
                    <h4>{c.title} - <span style={{fontSize: '0.85rem', fontWeight:'normal', color: '#94a3b8'}}>{c.className === 'tall-tile' ? 'Tall' : c.className === 'wide-tile' ? 'Wide' : 'Standard'}</span></h4>
                    <p>{c.count} • {c.link}</p>
                  </div>
                </div>
                <div className="admin-item-actions">
                  <button className="admin-btn-edit" onClick={() => startEdit(c)}><Edit2 size={16}/></button>
                  <button className="admin-btn-edit admin-btn-danger" onClick={() => deleteCategory(c.id)}><Trash2 size={16} color="currentColor"/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'hero') {
      return (
        <div className="admin-glass-panel animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Manage Hero Section</h2>
          </div>
          
          <form onSubmit={saveHero} style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
            <div className="admin-form-group">
              <label>Hero Title</label>
              <input 
                className="admin-input" 
                name="title" 
                value={formData.title !== undefined ? formData.title : hero.title} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="admin-form-group">
              <label>Hero Subtitle</label>
              <textarea 
                className="admin-input" 
                name="subtitle" 
                value={formData.subtitle !== undefined ? formData.subtitle : hero.subtitle} 
                onChange={handleInputChange} 
                required 
                rows="3"
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="admin-btn admin-btn-primary"><Save size={18}/> Save Changes</button>
            </div>
          </form>
        </div>
      );
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        {!isAuthenticated ? (
          <div className="admin-glass-panel" style={{ maxWidth: '400px', margin: '4rem auto', textAlign: 'center' }}>
            <Lock size={48} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ marginBottom: '1.5rem' }}>Admin Login</h2>
            {loginError && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{loginError}</p>}
            <form onSubmit={handleLogin}>
              <div className="admin-form-group" style={{ textAlign: 'left' }}>
                <label>Username</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  required 
                />
              </div>
              <div className="admin-form-group" style={{ textAlign: 'left' }}>
                <label>Password</label>
                <input 
                  type="password" 
                  className="admin-input" 
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required 
                />
              </div>
              <button type="submit" className="admin-btn admin-btn-primary w-100 mt-2" style={{ justifyContent: 'center' }}>
                Login
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="admin-header" style={{ position: 'relative' }}>
              <h1>PropVista Admin Console</h1>
              <p style={{ color: '#94a3b8' }}>Manage your website content in real-time.</p>
              <button 
                onClick={handleLogout} 
                className="admin-btn admin-btn-danger" 
                style={{ position: 'absolute', top: '0', right: '0' }}
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
            
            <div className="admin-tabs">
              <button 
                className={`admin-tab ${activeTab === 'properties' ? 'active' : ''}`}
                onClick={() => { setActiveTab('properties'); cancelEdit(); }}
              >
                Properties (Villas/Buy/Rent)
              </button>
              <button 
                className={`admin-tab ${activeTab === 'agents' ? 'active' : ''}`}
                onClick={() => { setActiveTab('agents'); cancelEdit(); }}
              >
                Agents
              </button>
              <button 
                className={`admin-tab ${activeTab === 'testimonials' ? 'active' : ''}`}
                onClick={() => { setActiveTab('testimonials'); cancelEdit(); }}
              >
                Testimonials
              </button>
              <button 
                className={`admin-tab ${activeTab === 'categories' ? 'active' : ''}`}
                onClick={() => { setActiveTab('categories'); cancelEdit(); }}
              >
                Categories
              </button>
              <button 
                className={`admin-tab ${activeTab === 'hero' ? 'active' : ''}`}
                onClick={() => { setActiveTab('hero'); setFormData(hero); }}
              >
                Hero Section
              </button>
            </div>

            {renderContent()}
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
