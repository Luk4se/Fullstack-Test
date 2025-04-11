import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import CartSidebar from "./Components/CartSidebar/CartSidebar";


const App = () => {

  return <div>    
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path= '/all' element = {<ShopCategory category = "all"/>} />
        <Route path="/" element={<Navigate to="/all" />} />
        <Route path= '/clothes' element = {<ShopCategory category = "clothes"/>} />
        <Route path= '/tech' element = {<ShopCategory category = "tech"/>} />
        <Route path = "product" element = {<Product />}>
          <Route path= ':productId' element ={<Product />}></Route>
        </Route>
      </Routes>
      <CartSidebar/>
    </BrowserRouter>        
    </div>
  
}

export default App