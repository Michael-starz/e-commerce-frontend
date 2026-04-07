import { useState } from 'react';

const PaymentSection = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    cardType: 'visa',
    cardNumber: '',
    name: '',
    expiryMonth: 'Month',
    expiryYear: 'Year',
    cvc: '',
    saveCard: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <>
      <h3 className="mb-5">Payment Method</h3>
      <div className="row g-4 mb-5">
        <div className="col-12">
          <div className="payment-options">
            {/* Credit Card Option */}
            <div className="payment-option mb-2">
              <div className="form-check d-flex align-items-center">
                <input 
                  className="form-check-input" 
                  id="creditCard" 
                  type="radio" 
                  name="paymentMethod" 
                  checked={paymentMethod === 'creditCard'}
                  onChange={() => setPaymentMethod('creditCard')}
                />
                <label
                  className="form-check-label checkout-payment-label d-flex align-items-center gap-2 flex-wrap"
                  htmlFor="creditCard"
                >
                  Credit card
                  <span className="d-flex align-items-center gap-2">
                    <img className="payment-image" src="/images/visa-svgrepo-com.svg" alt="Visa" />
                    <img className="payment-image" src="/images/discover-svgrepo-com.svg" alt="Discover" />
                    <img className="payment-image" src="/images/mastercard-svgrepo-com.svg" alt="Mastercard" />
                    <img className="payment-image" src="/images/amex-svgrepo-com.svg" alt="American Express" />
                  </span>
                </label>
              </div>
            </div>
            
            {/* PayPal Option */}
            <div className="payment-option mb-2">
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  id="paypal" 
                  type="radio" 
                  name="paymentMethod"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                />
                <label className="form-check-label checkout-payment-label" htmlFor="paypal">
                  Paypal
                </label>
              </div>
            </div>
            
            {/* Coupon Option */}
            <div className="payment-option">
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  id="coupon" 
                  type="radio" 
                  name="paymentMethod"
                  checked={paymentMethod === 'coupon'}
                  onChange={() => setPaymentMethod('coupon')}
                />
                <label className="form-check-label checkout-payment-label" htmlFor="coupon">
                  Coupon
                </label>
              </div>
            </div>
          </div>
        </div>

        {paymentMethod === 'creditCard' && (
          <>
            <div className="col-md-6">
              <label className="form-label" htmlFor="selectCard">Select card</label>
              <select 
                className="form-select" 
                id="selectCard"
                name="cardType"
                value={cardDetails.cardType}
                onChange={handleInputChange}
              >
                <option value="visa">Visa</option>
                <option value="discover">Discover</option>
                <option value="mastercard">Mastercard</option>
                <option value="american-express">American Express</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="inputCardNumber">Card number</label>
              <input 
                className="form-control" 
                id="inputCardNumber" 
                type="number"
                name="cardNumber"
                placeholder="Enter card number"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="inputName">Full name</label>
              <input 
                className="form-control" 
                id="inputName" 
                type="text"
                name="name"
                placeholder="Ansolo Lazinatov"
                value={cardDetails.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Expires on</label>
              <div className="d-flex">
                <select 
                  className="form-select me-3"
                  name="expiryMonth"
                  value={cardDetails.expiryMonth}
                  onChange={handleInputChange}
                >
                  <option value="Month">Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                </select>
                <select 
                  className="form-select"
                  name="expiryYear"
                  value={cardDetails.expiryYear}
                  onChange={handleInputChange}
                >
                  <option value="Year">Year</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="inputCardCVC">CVC</label>
              <input 
                className="form-control" 
                id="inputCardCVC" 
                type="number"
                name="cvc"
                placeholder="Enter a valid CVC"
                value={cardDetails.cvc}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  id="gridCheck" 
                  type="checkbox"
                  name="saveCard"
                  checked={cardDetails.saveCard}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="gridCheck">
                  Save Card Details
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PaymentSection;