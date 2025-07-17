import React, { useState, useRef, useEffect } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  UserIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import Cart from './Cart';
import SignupModal from './SignupModal'; // ✅ Add import

const categories = [
  'All Categories',
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports',
  'Toys',
];

const menuItems = [
  { label: 'Popular', href: 'javascript:void(0)' },
  { label: 'Shop', href: 'javascript:void(0)' },
  { label: 'Contact', href: 'javascript:void(0)' },
  { label: 'Pages', href: 'javascript:void(0)', submenu: ['About Us', 'FAQ', 'Terms'] },
  { label: 'Blogs', href: 'javascript:void(0)', submenu: ['Blog List', 'Blog Single'] },
];

function Header({ cartItems, removeItem, onViewCart }) {
  const [category, setCategory] = useState(categories[0]);
  const [submenuOpenIndex, setSubmenuOpenIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false); // ✅ Signup modal toggle

  const cartRef = useRef(null);
  const cartIconRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        !cartIconRef.current.contains(event.target)
      ) {
        setCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [cartOpen]);

  const toggleSubmenu = (index) => {
    setSubmenuOpenIndex(submenuOpenIndex === index ? null : index);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <header className="w-full border-b" style={{ backgroundColor: '#e4edee' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between relative">
        {/* Logo + Mobile Toggle */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center space-x-2">
           <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: 'rgb(184, 126, 74)' }}>SN</div>
 <span className="text-2xl font-extrabold text-gray-900">ShopNow</span>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-l-md px-3 py-2 bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="I am shopping for..."
            className="flex-grow border-t border-b border-gray-300 px-3 py-2 focus:outline-none"
          />
          <button className="bg-white border border-l-0 border-gray-300 rounded-r-md px-4 py-2">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <PhoneIcon className="w-5 h-5" style={{ color: 'rgb(184, 126, 74)' }}/>
            <div className="text-sm text-gray-700">
              <div className="font-bold">(+91) 7492347799</div>
            </div>
          </div>

          {/* ✅ Sign In opens modal */}
          <div
            className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer"
            onClick={() => setIsSignupOpen(true)}
          >
            <UserIcon className="w-5 h-5 hover:text-blue-600" style={{ color: 'rgb(184, 126, 74)' }}/>
            <span className="text-sm font-bold hover:text-blue-600">Sign In</span>
          </div>

          {/* Cart */}
          <div className="relative" ref={cartRef}>
            <div
              className="flex items-center hover:text-blue-600 cursor-pointer relative"
              onClick={toggleCart}
              ref={cartIconRef}
            >
              <ShoppingCartIcon className="w-6 h-6" style={{ color: 'rgb(184, 126, 74)' }}/>
              <span className="absolute -top-2 right-9 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center" style={{ backgroundColor: 'rgb(184, 126, 74)' }}>
                {cartItems.length}
              </span>
              <span className="ml-1 text-sm font-bold">
                ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
              </span>
            </div>
            {cartOpen && (
              <div className="absolute right-0 top-full mt-2 z-50">
                <Cart items={cartItems} onRemove={removeItem} onViewCart={onViewCart} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search + Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 space-y-4 pb-4">
          <div className="flex">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-l-md px-3 py-2"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="I am shopping for..."
              className="flex-grow border-t border-b border-gray-300 px-3 py-2"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <ul className="space-y-2 text-sm font-semibold text-gray-900">
            {menuItems.map((item, index) => (
              <li key={item.label}>
                <div className="flex justify-between items-center" onClick={() => toggleSubmenu(index)}>
                  <span className="hover:text-blue-600">{item.label}</span>
                  {item.submenu && <ChevronDownIcon className="w-4 h-4" />}
                </div>
                {item.submenu && submenuOpenIndex === index && (
                  <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                    {item.submenu.map((subitem) => (
                      <li key={subitem}>
                        <a href="javascript:void(0)" className="block py-1 hover:text-blue-600">{subitem}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden md:block border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex space-x-6 py-3 text-sm font-semibold text-gray-900">
            {menuItems.map((item, index) => (
              <li key={item.label} className="relative group">
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.submenu) {
                      e.preventDefault();
                      toggleSubmenu(index);
                    }
                  }}
                  className="flex items-center hover:text-blue-600"
                >
                  {item.label}
                  {item.submenu && <ChevronDownIcon className="ml-1 h-4 w-4" />}
                </a>
                {item.submenu && submenuOpenIndex === index && (
                  <ul className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 w-40">
                    {item.submenu.map((subitem) => (
                      <li key={subitem}>
                        <a href="javascript:void(0)" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                          {subitem}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ✅ Signup Modal */}
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </header>
  );
}

export default Header;
