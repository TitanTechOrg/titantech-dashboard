import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import './index.css';
import ErrorBoundary from './pages/error-boundary/ErrorBoundary.tsx';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </React.StrictMode>
);
