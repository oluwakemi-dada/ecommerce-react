import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import store from './store.ts';

import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

import App from './App.tsx';
import HomeScreen from './screens/HomeScreen.tsx';
import ProductScreen from './screens/ProductScreen.tsx';
import CartScreen from './screens/CartScreen.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index={true} element={<HomeScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
