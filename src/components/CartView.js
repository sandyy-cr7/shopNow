import React from 'react';

const CartView = ({ cartItems, removeItem, onClose }) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-10 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl p-6 mx-4 md:mx-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
            aria-label="Close cart view"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border rounded-lg p-4">
                  <img src={item.images && item.images.length > 0 ? item.images[0] : ''} alt={item.title} className="w-16 h-16 object-contain" />
                  <div className="flex-1 px-4 text-left">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-500 text-sm">${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="border px-2">-</button>
                    <span>{item.quantity}</span>
                    <button className="border px-2">+</button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 font-bold text-xl"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right: Summary */}
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Total:</span>
              <span className="font-semibold text-lg">${totalPrice.toFixed(2)}</span>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Additional Comments <span className="ml-1 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">Note</span>
              </label>
              <textarea className="w-full border rounded px-3 py-2 text-sm" rows="3" placeholder="Enter comments..." />
            </div>

            <div className="flex flex-col space-y-2">
              <input
                type="text"
                className="border rounded px-3 py-2 text-sm"
                placeholder="Voucher"
              />
              <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded px-3 py-2 text-sm">
                Apply Voucher
              </button>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-gray-700">Shipping Estimates</p>
              <select className="w-full border px-3 py-2 rounded text-sm">
                <option>Country</option>
                <option>USA</option>
                <option>India</option>
              </select>
              <select className="w-full border px-3 py-2 rounded text-sm">
                <option>State</option>
                <option>New York</option>
                <option>California</option>
              </select>
              <input type="text" className="w-full border px-3 py-2 rounded text-sm" placeholder="Zip Code" />
              <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded px-3 py-2 text-sm">
                Calculate Shipping
              </button>
            </div>

            <button className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition font-semibold mt-4">
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;