import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Facebook,
  Twitter,
  Instagram,
} from 'lucide-react'; // ✅ Import Lucide icons

const SignupModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!email) {
      setError('Email is required.');
      setSuccess('');
      return;
    }
    if (!otp) {
      setError('OTP is required.');
      setSuccess('');
      return;
    }
    if (otp !== '22222') {
      setError('Invalid OTP. Please enter 22222.');
      setSuccess('');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/save-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setError('');
        setSuccess('Login data saved successfully.');
        onClose();
      } else {
        setError(data.error || 'Failed to save login data.');
        setSuccess('');
      }
    } catch (error) {
      setError('Error connecting to server.');
      setSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 flex overflow-hidden relative">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80"
            alt="Signup"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <div className="text-center">
            <p className="text-sm text-gray-500 uppercase mb-2">UP TO <span className="text-red-600 font-bold">30% OFF</span></p>
            <h2 className="text-3xl font-extrabold mb-4">
              Sign in to <span className="text-red-600">ShopNow</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Subscribe to the ShopNow eCommerce newsletter to receive timely updates from your favorite products.
            </p>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              placeholder="Enter OTP 22222"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">{success}</p>}
            <button
              onClick={handleSubmit}
              className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
            >
              SUBMIT
            </button>

            {/* ✅ Social Icons */}
            <div className="flex justify-center space-x-6 mt-6 text-gray-700 text-xl">
              <a href="#" aria-label="Facebook" className="hover:text-red-600"><Facebook className="w-5 h-5" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-red-600"><Twitter className="w-5 h-5" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-red-600"><Instagram className="w-5 h-5" /></a>
            </div>

            <div className="flex items-center justify-center mt-6 space-x-2 text-gray-600">
              <input type="checkbox" id="noThanks" />
              <label htmlFor="noThanks" className="text-sm">No, Thanks</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
