import { Navigate, useRoutes } from 'react-router-dom';
import Basket from './components/Basket/Basket';
import ContextFilter from './components/Context/ContextFilter';
import ContextProvider from './components/Context/ContextProvider';
import Details from './components/Details/Details';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import ScrollToTop from './ScrollToTop';



function App() {
  let router = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/products', element: <Products /> },
    { path: '/:id', element: <Details /> },
    { path: '/basket', element: <Basket /> },
    { path: '/checkout', element: <Checkout /> },
    { path: '*', element: <Navigate to={'/'} /> },
  ])
  return (
    <ContextProvider>
      <ContextFilter>
        <Header />
        <ScrollToTop>
          {router}
        </ScrollToTop>
      </ContextFilter>
    </ContextProvider>
  );
}

export default App;
