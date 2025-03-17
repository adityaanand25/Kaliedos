import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to Kaleidos Club</h1>
            <p className="text-xl mb-8">Discover unique artworks and join our creative community</p>
            <Link
              to="/gallery"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Explore Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Artworks */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Artworks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork) => (
              <div key={artwork.id} className="group">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{artwork.title}</h3>
                <p className="text-gray-600">{artwork.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Club CTA */}
      <div className="bg-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Art Community</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get exclusive access to new artworks, special events, and member-only discounts
          </p>
          <Link
            to="/club"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Become a Member
          </Link>
        </div>
      </div>
    </div>
  );
}

const featuredArtworks = [
  {
    id: 1,
    title: "Abstract Harmony",
    price: "$1,200",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Urban Dreams",
    price: "$950",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Nature's Poetry",
    price: "$800",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80"
  }
];

export default Home;