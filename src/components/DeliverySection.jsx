// ✅ Updated DeliverySection.jsx
const DeliverySection = ({ selectedShipping, setSelectedShipping }) => {
  const shippingOptions = [
    {
      id: 'free_shipping',
      label: 'Free Shipping',
      price: '$0.00',
      estDelivery: 'Jun 21 – Jul 20',
      description: 'Get Free Shipped products in Time!'
    },
    {
      id: 'two_days_shipping',
      label: 'Two days Shipping',
      price: '$20.00',
      estDelivery: 'Jun 21 – Jul 20',
      description: 'Everything faster with minimum shipping fee.'
    },
    {
      id: 'standard_shipping',
      label: 'Standard Shipping',
      price: '$10.00',
      estDelivery: 'Jun 21 – Jul 20',
      description: 'Get timely delivery with economy shipping.'
    },
    {
      id: 'one_day_shipping',
      label: 'One day Shipping',
      price: '$30.00',
      estDelivery: 'Jun 21 – Jul 20',
      description: 'Highest priority shipping at the lowest cost.',
      isPopular: true
    }
  ];

  return (
    <>
      <h3 className="mb-5">Delivery Type</h3>
      <div className="row gy-4">
        {shippingOptions.map(option => (
          <div key={option.id} className="col-12 col-md-6">
            <div className="d-flex flex-wrap align-items-center mb-3">
              <div className="form-check mb-0">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="shippingRadio"
                  id={option.id}
                  checked={selectedShipping === option.id}
                  onChange={() => setSelectedShipping(option.id)}
                />
                <label className="form-check-label checkout-payment-label" htmlFor={option.id}>
                  {option.label}
                </label>
              </div>
              <span className="d-inline-block fw-bold ms-2">{option.price}</span>
              {option.isPopular && (
                <span className="badge bg-warning checkout-badge-popular ms-2">Popular</span>
              )}
            </div>
            <div className="ps-4">
              <h6 className="text-muted mb-2">Est. delivery: {option.estDelivery}</h6>
              <h6 className="text-info mb-0">{option.description}</h6>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DeliverySection;





// import { useState } from 'react';

// const DeliverySection = () => {
//   const [selectedShipping, setSelectedShipping] = useState('one_day_shipping');

//   const shippingOptions = [
//     {
//       id: 'free_shipping',
//       label: 'Free Shipping',
//       price: '$0.00',
//       estDelivery: 'Jun 21 – Jul 20',
//       description: 'Get Free Shipped products in Time!'
//     },
//     {
//       id: 'two_days_shipping',
//       label: 'Two days Shipping',
//       price: '$20.00',
//       estDelivery: 'Jun 21 – Jul 20',
//       description: 'Everything faster with minimum shipping fee.'
//     },
//     {
//       id: 'standard_shipping',
//       label: 'Standard Shipping',
//       price: '$10.00',
//       estDelivery: 'Jun 21 – Jul 20',
//       description: 'Get timely delivery with economy shipping.'
//     },
//     {
//       id: 'one_day_shipping',
//       label: 'One day Shipping',
//       price: '$30.00',
//       estDelivery: 'Jun 21 – Jul 20',
//       description: 'Highest priority shipping at the lowest cost.',
//       isPopular: true
//     }
//   ];

//   return (
//     <>
//       <h3 className="mb-5">Delivery Type</h3>
//       <div className="row gy-4">
//         {shippingOptions.map(option => (
//           <div key={option.id} className="col-12 col-md-6">
//             <div className="d-flex flex-wrap align-items-center mb-3">
//               <div className="form-check mb-0">
//                 <input 
//                   className="form-check-input" 
//                   type="radio" 
//                   name="shippingRadio"
//                   id={option.id}
//                   checked={selectedShipping === option.id}
//                   onChange={() => setSelectedShipping(option.id)}
//                 />
//                 <label className="form-check-label checkout-payment-label" htmlFor={option.id}>
//                   {option.label}
//                 </label>
//               </div>
//               <span className="d-inline-block fw-bold ms-2">{option.price}</span>
//               {option.isPopular && (
//                 <span className="badge bg-warning checkout-badge-popular ms-2">Popular</span>
//               )}
//             </div>
//             <div className="ps-4">
//               <h6 className="text-muted mb-2">Est. delivery: {option.estDelivery}</h6>
//               <h6 className="text-info mb-0">{option.description}</h6>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default DeliverySection;