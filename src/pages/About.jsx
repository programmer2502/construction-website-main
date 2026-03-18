import React from 'react';
import { Award, TrendingUp, Users, Target } from 'lucide-react';
import { useData } from '../context/DataContext';
import AgentCard from '../components/ui/AgentCard';

const About = () => {
  const { teamAgents } = useData();
  return (
    <div className="about-page animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '5rem' }}>
      <div className="container">
        
        {/* Brand Story */}
        <div className="row text-center mb-5 section">
          <div className="mx-auto" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="display-2 font-serif mb-4">Redefining Real Estate</h1>
            <p className="lead text-muted" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
              PropVista was founded on a simple principle: buying a home should be as beautiful as the home itself. We combine world-class technology with elite agents to deliver an unparalleled real estate experience for discerning clients worldwide.
            </p>
          </div>
        </div>
        
        {/* Stats/Mission */}
        <div className="grid-4 mb-5 pb-5 text-center" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', borderBottom: '1px solid var(--color-border)' }}>
          <div>
             <Target size={40} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
             <h3 className="font-serif mb-2">Our Mission</h3>
             <p className="text-muted">To bring transparency and ease to the luxury property market.</p>
          </div>
          <div>
             <Users size={40} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
             <h3 className="font-serif mb-2">Client First</h3>
             <p className="text-muted">Over 5,000 satisfied clients who found their dream homes.</p>
          </div>
          <div>
             <TrendingUp size={40} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
             <h3 className="font-serif mb-2">₹2B+ Sales</h3>
             <p className="text-muted">Total transaction volume processed through our platform.</p>
          </div>
          <div>
             <Award size={40} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
             <h3 className="font-serif mb-2">Top Agency</h3>
             <p className="text-muted">Voted #1 Luxury Real Estate tech platform in 2023.</p>
          </div>
        </div>

        {/* Our Process Timeline */}
        <div className="section mb-5 bg-secondary" style={{ padding: '4rem 2rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          <h2 className="display-2 font-serif text-center mb-5" style={{ marginBottom: '3rem' }}>Our Proven Process</h2>
          <div className="timeline" style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div className="timeline-step text-center" style={{ flex: '1', minWidth: '150px' }}>
               <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-accent)', color: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1rem' }}>1</div>
               <h4>Search</h4>
               <p className="text-muted" style={{ fontSize: '0.9rem' }}>Use our AI tools to find matches.</p>
            </div>
            <div className="timeline-step text-center" style={{ flex: '1', minWidth: '150px' }}>
               <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-accent)', color: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1rem' }}>2</div>
               <h4>Shortlist</h4>
               <p className="text-muted" style={{ fontSize: '0.9rem' }}>Save favorites and compare.</p>
            </div>
            <div className="timeline-step text-center" style={{ flex: '1', minWidth: '150px' }}>
               <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-accent)', color: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1rem' }}>3</div>
               <h4>Visit</h4>
               <p className="text-muted" style={{ fontSize: '0.9rem' }}>Schedule private tours.</p>
            </div>
            <div className="timeline-step text-center" style={{ flex: '1', minWidth: '150px' }}>
               <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-accent)', color: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1rem' }}>4</div>
               <h4>Negotiate</h4>
               <p className="text-muted" style={{ fontSize: '0.9rem' }}>Our agents secure the best deal.</p>
            </div>
            <div className="timeline-step text-center" style={{ flex: '1', minWidth: '150px' }}>
               <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-accent)', color: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1rem' }}>5</div>
               <h4>Close</h4>
               <p className="text-muted" style={{ fontSize: '0.9rem' }}>Seamless closing process.</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="section mt-5 pt-5">
          <div className="text-center mb-5">
            <h2 className="display-2 font-serif text-center mb-2">Leadership Team</h2>
            <p className="text-muted text-center" style={{ marginBottom: '3rem' }}>The visionaries behind PropVista.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {teamAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
