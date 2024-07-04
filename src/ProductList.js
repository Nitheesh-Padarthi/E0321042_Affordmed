import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://example.com/api/products'); // Replace with actual API URL
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleFilter = () => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    if (company) {
      filtered = filtered.filter(product => product.company === company);
    }
    if (sort) {
      filtered.sort((a, b) => {
        if (sort === 'price') return a.price - b.price;
        if (sort === 'rating') return b.rating - a.rating;
        if (sort === 'discount') return b.discount - a.discount;
        return 0;
      });
    }
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [category, company, sort]);

  return (
    <div>
      <h1>Product List</h1>
      <div>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Company:
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
        <label>
          Sort by:
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="discount">Discount</option>
          </select>
        </label>
      </div>
      <div>
        {filteredProducts.map(product => (
          <div key={product.id}>
            <Link to={`/product/${product.id}`}>
              <h2>{product.name}</h2>
            </Link>
            <p>Company: {product.company}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
