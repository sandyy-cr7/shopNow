import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    title: 'Sale Discount Off 50%!',
    description: 'Here is just a small selection of the work we do, demonstrating how we deliver results for businesses from every sector.',
    buttonText: 'SHOPPING NOW',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80',
    title: 'New Arrivals',
    description: 'Check out the latest trends and styles in our new collection.',
    buttonText: 'SHOP NOW',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    title: 'Exclusive Offers',
    description: 'Don’t miss out on our exclusive deals and discounts.',
    buttonText: 'VIEW OFFERS',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    title: 'Best Sellers',
    description: 'Explore our most popular products loved by customers.',
    buttonText: 'SHOP BESTSELLERS',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    title: 'Limited Time Sale',
    description: 'Grab your favorites before the sale ends!',
    buttonText: 'SHOP NOW',
  },
];

const HeroBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500000,
    arrows: true,
  };

  return (
    <div className="mx-auto">
      <Slider {...settings}>
        {slides.map((slide) => (
  <div key={slide.id} className="relative bg-gray-100 rounded-lg overflow-hidden">
    <div className="flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 h-64 md:h-full">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center text-left">
        <h2 className="text-3xl font-extrabold mb-4">{slide.title}</h2>
        <p className="mb-6 text-gray-700">{slide.description}</p>
        <button className="bg-black text-white px-6 py-3 font-semibold border-2 hover:bg-white hover:text-black transition" style={{ backgroundColor: 'rgb(184, 126, 74)' }}>
          {slide.buttonText}
        </button>
      </div>
    </div>
  </div>
))}

      </Slider>
    </div>
  );
};

export default HeroBanner;
