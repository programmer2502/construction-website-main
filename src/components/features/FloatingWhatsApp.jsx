import React from 'react';
import { MessageCircle } from 'lucide-react';
import './FloatingWhatsApp.css';

const FloatingWhatsApp = ({ phoneNumber = "15551234567" }) => {
  return (
    <a 
      href={`https://wa.me/${phoneNumber}`} 
      target="_blank" 
      rel="noreferrer" 
      className="floating-whatsapp"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default FloatingWhatsApp;
