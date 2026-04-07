import React, { useState } from "react";

const Newsletter = () => {
    const [email, setEmail] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle newsletter subscription logic here
      console.log('Subscribed with:', email);
      setEmail('');
    };
  
    return (
      <section className="newsletter-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h2 className="mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-muted mb-4">Get updates about new products and special offers!</p>
              <form className="d-flex gap-2 justify-content-center" onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  className="form-control w-50" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Newsletter;