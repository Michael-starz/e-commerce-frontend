// import Navbar from '../components/Navbar';
import MenuSection from '../components/MenuSection';
import Footer from '../components/Footer';
import ProfileHeader from '../components/ProfileHeader';
import ProfileCard from '../components/ProfileCard';
import AddressCard from '../components/AddressCard';
import OrdersTable from '../components/OrdersTable';

const Profile = () => {
  return (
    <>
      {/* <Navbar /> */}
      <MenuSection />
      
      <div className="container py-4">
        <ProfileHeader />
      </div>

      <div className="container mb-5">
        <div className="row g-3 mb-6">
          <div className="col-12 col-lg-8">
            <ProfileCard />
          </div>
          <div className="col-12 col-lg-4">
            <AddressCard />
          </div>
        </div>
      </div>

      <div className="order-container">
        <OrdersTable />
      </div>

      <Footer />
    </>
  );
};

export default Profile;