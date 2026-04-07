// import Navbar from '../components/Navbar';
import MenuSection from '../components/MenuSection';
import Footer from '../components/Footer';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummaryCard from '../components/OrderSummaryCard';

const Checkout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <MenuSection />
      
      <div className="container py-3">
        <h2 className="mb-4">Check out</h2>
        <div className="row justify-content-between">
          <div className="col-lg-7 col-xl-7">
            <CheckoutForm />
          </div>
          
          <div className="col-lg-5 col-xl-4">
            <OrderSummaryCard />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;