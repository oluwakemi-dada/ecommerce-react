import { type FC } from 'react';
import { Outlet } from 'react-router';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';

const App: FC = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
