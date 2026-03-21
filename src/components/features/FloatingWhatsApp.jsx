import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import './FloatingWhatsApp.css';

const FloatingWhatsApp = ({ phoneNumber }) => {
  const { companyInfo } = useData();
  const displayPhone = phoneNumber || companyInfo?.whatsapp || '9880345558';
  return (
    <a
      href={`https://wa.me/${displayPhone}`}
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
