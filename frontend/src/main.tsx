import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

import App from './App.tsx';
import HomeScreen from './screens/HomeScreen.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index={true} element={<HomeScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
