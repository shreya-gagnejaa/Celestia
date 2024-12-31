import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Payment from './components/Payment';
import About from './components/About';
import Login from './components/Login';
import Step from './components/Step';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="payment" element={<Payment />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="step" element={<Step />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
