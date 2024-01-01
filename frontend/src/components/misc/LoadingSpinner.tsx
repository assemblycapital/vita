import React from 'react';

export function LoadingSpinner() {
  return (
    <div>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .spinner {
            animation: spin 1s linear infinite;
          }
        `}
      </style>
      <svg 
        className="spinner"
        viewBox="0 0 50 50" 
        xmlns="http://www.w3.org/2000/svg" 
        style={{ width: '1rem', height: '1rem' }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="black"
          strokeWidth="5"
          strokeDasharray="170"
          strokeDashoffset="75"
        />
      </svg>
    </div>
  );
}
