const Categories = () => {
    const categories = [
      {
        id: 1,
        name: "Electronics",
        description: "Latest gadgets and devices",
        image: "/images/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg"
      },
      {
        id: 2,
        name: "Fashion",
        description: "Trendy clothing and accessories",
        image: "/images/pexels-kseniachernaya-3965545.jpg"
      },
      {
        id: 3,
        name: "Home & Living",
        description: "Furniture and home decor",
        image: "/images/pexels-heyho-6933776.jpg"
      }
    ];
  
    return (
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Shop by Category</h2>
          <div className="row g-4">
            {categories.map(category => (
              <div key={category.id} className="col-md-4">
                <div className="category-card card h-100">
                  <img src={category.image} className="card-img-top" alt={category.name} />
                  <div className="card-body text-center">
                    <h5 className="card-title">{category.name}</h5>
                    <p className="card-text">{category.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Categories;