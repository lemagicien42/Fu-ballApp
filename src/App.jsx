import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './componente/Header';;
import Home from './componente/Home';
import CategoryPage from './componente/CategoryPage';
import Footer from './componente/Footer';

function App() {
  return (
   
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
    </Routes>
    <Footer />
  </div>
  );
}

export default App;
