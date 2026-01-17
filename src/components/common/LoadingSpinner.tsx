import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  fullScreen = false 
}) => {
  const containerClass = fullScreen ? 'spinner-container-fullscreen' : 'spinner-container';

  return (
    <div className={containerClass}>
      <div className={`spinner spinner-${size}`}></div>
    </div>
  );
};

export default LoadingSpinner;