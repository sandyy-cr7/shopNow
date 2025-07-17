import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ProductView = ({ product, colors, onClose, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState('1');
  const [selectedColor, setSelectedColor] = useState(colors[0] || '#d0d900');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images && product.images.length > 0 ? product.images[0] : '');

  const sizes = ['1', '2', '3', '4', '5'];

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const newQty = prev + delta;
      return newQty < 1 ? 1 : newQty;
    });
  };

  const thumbnails = product.images || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-full overflow-auto flex flex-col md:flex-row p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Close product view"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Left: Main Image and Thumbnails */}
        <div className="md:w-1/2 flex flex-col">
          <img
            src={mainImage}
            alt={product.title}
            className="w-full max-w-md object-contain rounded-lg"
          />
          <div className="flex space-x-4 mt-4 overflow-x-auto">
            {thumbnails.map((thumb, idx) => (
              <img
                key={idx}
                src={thumb}
                alt={`${product.title} thumbnail ${idx + 1}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                  mainImage === thumb ? 'border-brown-500' : 'border-transparent'
                }`}
                onClick={() => setMainImage(thumb)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 mt-6 md:mt-0 md:pl-10 flex flex-col text-left">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-lg font-semibold mb-4">Price : ${product.price}</p>

          {/* Size selector */}
          <div className="mb-4 flex gap-2">
            <label htmlFor="size" className="block font-medium mb-1">
              Size :
            </label>
            <select
              id="size"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1"
            >
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Color selector */}
          <div className="mb-6 flex gap-2">
            <span className="block font-medium mb-1">Color :</span>
            <div className="flex space-x-3">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color ? 'border-gray-900' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center mb-6">
            <div className="flex border border-gray-300 rounded overflow-hidden">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <div className="px-6 py-2 border-l border-r border-gray-300">{quantity}</div>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              className="ml-6 bg-brown-500 text-white px-6 py-3 rounded hover:bg-brown-600 flex items-center space-x-2"
              style={{ backgroundColor: '#b87e4a' }}
              aria-label="Add to cart"
              onClick={() => addToCart({ ...product, quantity, size: selectedSize, color: selectedColor })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 1.293a1 1 0 001.414 1.414L7 13zm0 0v6a1 1 0 001 1h10a1 1 0 001-1v-6H7z"
                />
              </svg>
              <span>Add to Cart</span>
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            {product.description ||
              'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account, and expound the actual teachings of the great explorer of human happiness. No one rejects, dislikes, or avoids.'}
          </p>

          {/* Share icons */}
          <div className="flex items-center space-x-4 text-gray-700 font-semibold">
            <span>Share :</span>
            <a href="javascript:void(0)" aria-label="Share on Facebook" className="hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="javascript:void(0)" aria-label="Share on Twitter" className="hover:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="javascript:void(0)" aria-label="Share on Instagram" className="hover:text-pink-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.5-3a1 1 0 110 2 1 1 0 010-2z" />
              </svg>
            </a>
            <a href="javascript:void(0)" aria-label="Share on LinkedIn" className="hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 3a2 2 0 110 4 2 2 0 010-4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
