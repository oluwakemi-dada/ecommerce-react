import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import { resetCart } from '../slices/cartSlice';

import logo from '../assets/logo.png';
import type { AppDispatch, RootState } from '../types';

const Header = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            <img src={logo} alt='ProShop' />
            ProShop
          </Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox placeholder='Search products...' redirectPath='/' />
              <Nav.Link as={Link} to='/cart'>
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                    {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item as={Link} to='/profile'>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <FaUser /> Sign In
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <NavDropdown.Item as={Link} to='/admin/productlist'>
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/userlist'>
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/orderlist'>
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
