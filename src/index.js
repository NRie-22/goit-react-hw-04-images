import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

const Root = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<Root />);
