import React from 'react';
import './ProgressBar.css';

const ProgressBar = () => {
  const steps = [
    { label: 'Planning', status: 'completed' },
    { label: 'Development', status: 'in-progress' },
    { label: 'Construction', status: 'pending' },
    { label: 'Operation', status: 'pending' },
  ];

  return (
    <div className="progress-container">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`progress-step ${step.status}`}
        >
          <span className="step-number">{index + 1}</span>
          <span className="step-label">{step.label}</span>
        </div>
      ))}
    </div>
    
  );
};

export default ProgressBar;
