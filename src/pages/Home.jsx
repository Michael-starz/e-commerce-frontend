import { useState } from 'react';
// import Navbar from '../components/Navbar';
import MenuSection from '../components/MenuSection';
import HeroSection from '../components/HeroSection';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import UserForm from '../components/UserForm';
// import '../styles/App.css'

const Home = () => {

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {/* <Navbar setShowForm={setShowForm} /> */}
      <MenuSection />
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
      <Footer />
      <UserForm showForm={showForm} setShowForm={setShowForm} />
    </>
  );
};

export default Home;