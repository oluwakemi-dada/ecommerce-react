import { Routes, Route, BrowserRouter } from 'react-router';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useGetPayPalClientIdQuery } from '../slices/ordersApiSlice.ts';

import App from '../App.tsx';
import PrivateRoute from '../components/PrivateRoute.tsx';
import HomeScreen from '../screens/HomeScreen.tsx';
import ProductScreen from '../screens/ProductScreen.tsx';
import CartScreen from '../screens/CartScreen.tsx';
import LoginScreen from '../screens/LoginScreen.tsx';
import RegisterScreen from '../screens/RegisterScreen.tsx';
import ShippingScreen from '../screens/ShippingScreen.tsx';
import PaymentScreen from '../screens/PaymentScreen.tsx';
import PlaceOrderScreen from '../screens/PlaceOrderScreen.tsx';
import OrderScreen from '../screens/OrderScreen.tsx';

const AppRoutes = () => {
  const { data } = useGetPayPalClientIdQuery();
  
  if (data)
    return (
      <PayPalScriptProvider
        deferLoading={true}
        options={{ 'client-id': data.clientId }}
      >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index={true} element={<HomeScreen />} />
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />

              <Route path='' element={<PrivateRoute />}>
                <Route path='/shipping' element={<ShippingScreen />} />
                <Route path='/payment' element={<PaymentScreen />} />
                <Route path='/placeorder' element={<PlaceOrderScreen />} />
                <Route path='/order/:id' element={<OrderScreen />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PayPalScriptProvider>
    );
};

export default AppRoutes;
