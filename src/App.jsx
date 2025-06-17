import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import ProtectedRoutes from '../public/components/ProtectedRoutes';
import Header from "../public/components/Header";
import Home from '../public/pages/Home';
import Dress from '../public/pages/Dress';
import Electronics from '../public/pages/Electronics';
import Jewelry from '../public/pages/Jewelry';
import Detail from '../public/components/Detail';
import Login from '../public/pages/Login';
import Admin from '../public/pages/Admin';
import Profile from '../public/pages/Profile';
import Cart from '../public/pages/Cart';
import Footer from '../public/components/Footer';
import { AuthProvider } from '../public/contexts/AuthContext';
import { CartProvider } from '../public/contexts/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dress" element={<Dress />} />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/jewelry" element={<Jewelry />} />
            <Route path="/login" element={<Login />} />       
            <Route path="/cart" element={<Cart />} />        
            <Route path="/profile/" element={
              <ProtectedRoutes><Profile /></ProtectedRoutes>
            } />
            <Route path="/admin" element={
              <ProtectedRoutes><Admin /></ProtectedRoutes>
            } />
            <Route path="/detail/:id" element={<Detail/>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
