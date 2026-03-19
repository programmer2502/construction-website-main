import React from 'react';
import { Search } from 'lucide-react';
import AgentCard from '../components/ui/AgentCard';
import { useData } from '../context/DataContext';

const Agents = () => {
  const { teamAgents } = useData();
  // Mock duplicating agents for a fuller grid
  const allAgents = [...teamAgents, ...teamAgents, ...teamAgents];

  return (
    <div className="agents-page animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '5rem' }}>
      <div className="container">

        <div className="agents-header mb-5" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h1 className="display-2 font-serif">Our Agents</h1>
            <p className="text-muted lead mb-0">Partner with our elite team of real estate professionals.</p>
          </div>

          <div className="search-agents" style={{ position: 'relative', width: '300px', maxWidth: '100%' }}>
            <input
              type="text"
              placeholder="Search by name or location..."
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text)' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
          </div>
        </div>

        <div className="agents-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {allAgents.map((agent, index) => (
            <AgentCard key={`${agent.id}-${index}`} agent={agent} />
          ))}
        </div>

        <div className="text-center mt-5 pt-4 border-top" style={{ borderTop: '1px solid var(--color-border)', marginTop: '4rem', paddingTop: '4rem' }}>
          <h3 className="font-serif mb-3">Join Our Elite Team</h3>
          <p className="text-muted mb-4" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>We are always looking for driven, experienced professionals to join Land24. If you have what it takes to deliver premium service, we want to hear from you.</p>
          <a href="/contact" className="btn btn-outline">Apply Now</a>
        </div>

      </div>
    </div>
  );
};

export default Agents;
