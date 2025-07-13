import React, { useState } from 'react';
import { HeartIcon, EyeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ 
  imageSrc, 
  title, 
  colors = [], 
  category, 
  price,
  onViewProduct,
  onAddToCart
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="relative w-64 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-80 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/256x320?text=No+Image'; }}
        />
        {hovered && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center space-x-6">
            <button aria-label="Add to wishlist" className="p-2 rounded-full bg-white shadow hover:bg-gray-100">
              <HeartIcon className="h-6 w-6 text-gray-700" />
            </button>
            <button aria-label="Add to cart" className="p-2 rounded-full bg-white shadow hover:bg-gray-100" onClick={onAddToCart}>
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
            </button>
            <button
              aria-label="View product"
              className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
              onClick={onViewProduct}
            >
              <EyeIcon className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        )}
        {hovered && (
          <button 
            className="absolute text-sm bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-brown-500 font-semibold px-4 py-2 rounded-full shadow hover:bg-brown-100 transition"
            style={{ color: '#b87e4a' }}
            onClick={onAddToCart}
          >
            ADD TO CART
          </button>
        )}
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-gray-700 font-semibold">{title}</h3>
        <div className="flex justify-center space-x-2 mt-2">
          {colors.map((color, idx) => (
            <span 
              key={idx} 
              className={`w-4 h-4 rounded-full border border-gray-300`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <p className="mt-2 text-gray-600">
          {category.name} / <span className="font-semibold" style={{ color: '#b87e4a' }}>${price}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
