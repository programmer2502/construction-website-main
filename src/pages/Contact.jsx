import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Button from '../components/ui/Button';

const Contact = () => {
  return (
    <div className="contact-page animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '5rem' }}>
      <div className="container">

        <div className="text-center mb-5" style={{ marginBottom: '4rem' }}>
          <h1 className="display-2 font-serif mb-3">Get in Touch</h1>
          <p className="text-muted lead">We're here to help you find your perfect space. Reach out to our team today.</p>
        </div>

        <div className="contact-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'start' }}>

          <div className="contact-info bg-secondary" style={{ padding: '3rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <h3 className="font-serif mb-4" style={{ marginBottom: '2rem' }}>Contact Information</h3>

            <div className="info-item mb-4" style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', flexShrink: 0 }}>
                <MapPin size={24} />
              </div>
              <div>
                <h5 style={{ marginBottom: '0.25rem' }}>Our Office</h5>
                <p className="text-muted" style={{ margin: 0 }}>Panathur, Bangalore 560087</p>
              </div>
            </div>

            <div className="info-item mb-4" style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', flexShrink: 0 }}>
                <Phone size={24} />
              </div>
              <div>
                <h5 style={{ marginBottom: '0.25rem' }}>Phone</h5>
                <p className="text-muted" style={{ margin: 0 }}>+91 9880345558<br />+91 9880345558</p>
              </div>
            </div>

            <div className="info-item mb-4" style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', flexShrink: 0 }}>
                <Mail size={24} />
              </div>
              <div>
                <h5 style={{ marginBottom: '0.25rem' }}>Email</h5>
                <p className="text-muted" style={{ margin: 0 }}>info@Land24.com<br />support@Land24.com</p>
              </div>
            </div>

            <div className="info-item" style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', flexShrink: 0 }}>
                <Clock size={24} />
              </div>
              <div>
                <h5 style={{ marginBottom: '0.25rem' }}>Working Hours</h5>
                <p className="text-muted" style={{ margin: 0 }}>Monday - Friday: 9am - 6pm<br />Saturday: 10am - 4pm</p>
              </div>
            </div>

            <div className="mt-5" style={{ marginTop: '3rem' }}>
              <a href="https://wa.me/9880345558" target="_blank" rel="noreferrer" className="btn w-100" style={{ backgroundColor: '#25D366', color: '#fff', width: '100%', display: 'flex', justifyContent: 'center' }}>Chat on WhatsApp</a>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h3 className="font-serif mb-4" style={{ marginBottom: '2rem' }}>Send a Message</h3>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-light)' }}>First Name</label>
                  <input type="text" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }} required />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-light)' }}>Last Name</label>
                  <input type="text" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }} required />
                </div>
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-light)' }}>Email Address</label>
                <input type="email" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }} required />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-light)' }}>Subject / Property Interest</label>
                <select style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }} required>
                  <option value="" disabled selected>Select an option</option>
                  <option value="buy">Buying a property</option>
                  <option value="rent">Renting a property</option>
                  <option value="sell">Selling my property</option>
                  <option value="other">Other inquiry</option>
                </select>
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-light)' }}>Message</label>
                <textarea rows="5" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text)', fontFamily: 'var(--font-sans)', resize: 'vertical' }} required></textarea>
              </div>

              <Button type="submit" size="lg" style={{ width: '100%' }}>
                <Send size={18} /> Send Message
              </Button>
            </form>
          </div>

        </div>

        {/* Map Embed */}
        <div className="map-embed-section mt-5" style={{ marginTop: '5rem', height: '400px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
          <div style={{ width: '100%', height: '100%', background: 'var(--color-bg-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-light)' }}>
            <MapPin size={40} style={{ marginBottom: '1rem', color: 'var(--color-accent)' }} />
            <p>Interactive Map Embed</p>
          </div>
        </div>

      </div>

      {/* Responsive adjustments for Contact */}
      <style>{`
        @media (max-width: 992px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
