import React, { useState, useEffect } from 'react';
import './EmiCalculator.css';

const EmiCalculator = ({ defaultPrice = 1000000 }) => {
  const [loanAmount, setLoanAmount] = useState(defaultPrice * 0.8);
  const [interestRate, setInterestRate] = useState(7.5);
  const [tenure, setTenure] = useState(20);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseInt(tenure) * 12;

    if (p > 0 && r > 0 && n > 0) {
      const emiVal = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      setEmi(Math.round(emiVal));
    } else if (p > 0 && n > 0) {
      setEmi(Math.round(p / n));
    } else {
      setEmi(0);
    }
  }, [loanAmount, interestRate, tenure]);

  return (
    <div className="emi-calculator widget-card">
      <h4 className="widget-title">EMI Calculator</h4>
      <div className="emi-result">
        <span className="emi-amount">${emi.toLocaleString()}</span>
        <span className="emi-duration">/ month</span>
      </div>
      
      <div className="emi-inputs">
        <div className="form-group">
          <label>Loan Amount ($)</label>
          <input 
            type="number" 
            value={loanAmount} 
            onChange={(e) => setLoanAmount(e.target.value)} 
            className="widget-input"
          />
        </div>
        
        <div className="form-group">
          <label>Interest Rate (%)</label>
          <input 
            type="number" 
            step="0.1" 
            value={interestRate} 
            onChange={(e) => setInterestRate(e.target.value)} 
            className="widget-input"
          />
        </div>
        
        <div className="form-group">
          <label>Tenure (Years)</label>
          <input 
            type="number" 
            value={tenure} 
            onChange={(e) => setTenure(e.target.value)} 
            className="widget-input"
          />
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
