import React from 'react';
import {
  XMarkIcon,
  ShoppingCartIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Cart = ({ items = [], onRemove, onViewCart }) => {
  const subTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const ecoTax = items.length > 0 ? 7.0 : 0;
  const vat = subTotal * 0.2;
  const total = subTotal + ecoTax + vat;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl border border-gray-200 rounded-lg p-4 z-50">
      <div className="max-h-80 overflow-y-auto space-y-4">
        {items.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <ShoppingCartIcon className="h-10 w-10 mx-auto text-gray-300" />
            <p className="mt-3 text-sm font-medium">
              Your cart is empty. Add something that suits you.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.images && item.images.length > 0 ? item.images[0] : ''}
                alt={item.title}
                className="w-14 h-14 object-cover rounded"
              />
              <div className="flex-1 text-right">
                <h3 className="text-gray-800 font-semibold text-sm">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="text-gray-400 hover:text-red-600"
                aria-label="Remove item"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <>
          <div className="border-t border-gray-200 mt-4 pt-4 text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Sub-Total:</span>
              <span className="font-medium">${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Eco Tax:</span>
              <span className="text-orange-500 font-medium">${ecoTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (20%):</span>
              <span className="text-orange-500 font-medium">${vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-orange-600">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={onViewCart}
              className="flex items-center justify-center gap-2 text-white py-2 rounded hover:bg-gray-900"
              style={{ backgroundColor: 'rgb(184, 126, 74)' }}
            >
              <ShoppingCartIcon className="w-5 h-5" />
              <span>View Cart</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Checkout</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
