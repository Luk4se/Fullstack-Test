import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import CartSidebar from './Components/CartSidebar/CartSidebar';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from './Utils/GraphQL/Queries';

const App = () => {
  const [categories, setCategories] = useState([]);
  const { data } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
    }
  }, [data]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='/all' />} />
        {categories.map((category) => (
          <Route
            key={category.name}
            path={`/${category.name}`}
            element={<ShopCategory category={category.name} />}
          />
        ))}
        <Route path='product'>
          <Route path=':productId' element={<Product />} />
        </Route>
      </Routes>
      <CartSidebar />
    </BrowserRouter>
  );
};

export default App;
