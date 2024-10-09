import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/Login';
import SignupForm from './components/Signup';
import Products from './Pages/products';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/' element={<SignupForm />} />
        <Route path='/products' element={<Products />} />
      </Routes>
    </>
  );
};

export default App;
