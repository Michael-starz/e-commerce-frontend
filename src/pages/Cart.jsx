// import Navbar from '../components/Navbar';
import MenuSection from '../components/MenuSection';
import Footer from '../components/Footer';
import CartTable from '../components/CartTable';
import OrderSummary from '../components/OrderSummary';

const Cart = () => {
  return (
    <>
      {/* <Navbar /> */}
      <MenuSection />
      
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-12 col-lg-8 table-wrapper">
              <CartTable />
            </div>
            
            <div className="col-12 col-lg-4">
              <OrderSummary />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Cart;