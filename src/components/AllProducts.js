import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductView from './ProductView';
import products from '../data/products.json';

const AllProducts = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Add default colors array for products
  const defaultColors = ['#d0d900', '#3ad900', '#d9003a', '#3a3a3a'];

  // Generate categories dynamically from products using category names
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category.name)))];

  // Filter products based on selected category using category name
  const filteredProducts = selectedCategory === 'All' ? products : products.filter(p => p.category.name === selectedCategory);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseView = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-center text-3xl font-extrabold mb-6">
        <span className="text-brown-500">WELCOME TO </span>PRODUCT
      </h2>
      <div className="flex justify-center space-x-8 mb-8 text-gray-700 font-semibold">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`hover:text-brown-500 px-3 py-1 rounded ${
              selectedCategory === category ? 'text-brown-500' : ''
            }`}
            style={selectedCategory === category ? { backgroundColor: 'rgb(228, 237, 238)' } : {}}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            imageSrc={product.images && product.images.length > 0 ? product.images[0] : ''}
            title={product.title}
            colors={defaultColors}
            category={product.category}
            price={product.price}
            onViewProduct={() => handleViewProduct(product)}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </div>
      {selectedProduct && (
        <ProductView
          product={selectedProduct}
          colors={defaultColors}
          onClose={handleCloseView}
          addToCart={addToCart}
        />
      )}
    </section>
  );
};

export default AllProducts;
