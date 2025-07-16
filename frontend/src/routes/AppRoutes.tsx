import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useGetPayPalClientIdQuery } from '../slices/ordersApiSlice.ts';

import App from '../App.tsx';
import PrivateRoute from '../components/PrivateRoute.tsx';
import HomeScreen from '../screens/HomeScreen.tsx';
import ProductScreen from '../screens/ProductScreen.tsx';
import CartScreen from '../screens/CartScreen.tsx';
import LoginScreen from '../screens/LoginScreen.tsx';
import RegisterScreen from '../screens/RegisterScreen.tsx';
import ShippingScreen from '../screens/private/ShippingScreen.tsx';
import PaymentScreen from '../screens/private/PaymentScreen.tsx';
import PlaceOrderScreen from '../screens/private/PlaceOrderScreen.tsx';
import OrderScreen from '../screens/private/OrderScreen.tsx';
import ProfileScreen from '../screens/private/ProfileScreen.tsx';
import AdminRoute from '../components/AdminRoute.tsx';
import OrderListScreen from '../screens/admin/OrderListScreen.tsx';
import ProductListScreen from '../screens/admin/ProductListScreen.tsx';
import ProductEditScreen from '../screens/admin/ProductEditScreen.tsx';
import UserListScreen from '../screens/admin/UserListScreen.tsx';
import UserEditScreen from '../screens/admin/UserEditScreen.tsx';

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
              <Route index element={<HomeScreen />} />
              <Route path='/search/:keyword' element={<HomeScreen />} />
              <Route path='/page/:pageNumber' element={<HomeScreen />} />
              <Route
                path='/search/:keyword/page/:pageNumber'
                element={<HomeScreen />}
              />
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />

              <Route path='' element={<PrivateRoute />}>
                <Route path='/shipping' element={<ShippingScreen />} />
                <Route path='/payment' element={<PaymentScreen />} />
                <Route path='/placeorder' element={<PlaceOrderScreen />} />
                <Route path='/order/:id' element={<OrderScreen />} />
                <Route path='/profile' element={<ProfileScreen />} />
                <Route
                  path='/profile/page/:pageNumber'
                  element={<ProfileScreen />}
                />
              </Route>

              <Route path='' element={<AdminRoute />}>
                <Route path='/admin/orderlist' element={<OrderListScreen />} />
                <Route
                  path='/admin/orderlist/page/:pageNumber'
                  element={<OrderListScreen />}
                />
                <Route
                  path='/admin/productlist'
                  element={<ProductListScreen />}
                />
                <Route
                  path='/admin/productlist/page/:pageNumber'
                  element={<ProductListScreen />}
                />
                <Route
                  path='/admin/product/:id/edit'
                  element={<ProductEditScreen />}
                />
                <Route path='/admin/userlist' element={<UserListScreen />} />
                <Route
                  path='/admin/userlist/page/:pageNumber'
                  element={<UserListScreen />}
                />
                <Route
                  path='/admin/user/:id/edit'
                  element={<UserEditScreen />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PayPalScriptProvider>
    );
};

export default AppRoutes;
