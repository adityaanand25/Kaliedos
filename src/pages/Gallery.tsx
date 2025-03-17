import React, { useState } from 'react';

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredArtworks = artworks.filter(
    artwork => selectedCategory === 'all' || artwork.category === selectedCategory
  );

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Art Gallery</h1>

        {/* Category Filter */}
        <div className="flex justify-center space-x-4 mb-12">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === category.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork) => (
            <div key={artwork.id} className="group">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{artwork.title}</h3>
                <p className="text-gray-600">{artwork.artist}</p>
                <p className="text-indigo-600 font-semibold mt-1">{artwork.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const categories = [
  { value: 'all', label: 'All' },
  { value: 'abstract', label: 'Abstract' },
  { value: 'landscape', label: 'Landscape' },
  { value: 'portrait', label: 'Portrait' }
];

const artworks = [
  {
    id: 1,
    title: "Cosmic Dance",
    artist: "Elena Rodriguez",
    price: "$1,500",
    category: "abstract",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Mountain Serenity",
    artist: "James Chen",
    price: "$2,200",
    category: "landscape",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Urban Reflections",
    artist: "Sarah Kim",
    price: "$1,800",
    category: "abstract",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Silent Gaze",
    artist: "Marcus Thompson",
    price: "$2,500",
    category: "portrait",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    title: "Desert Dreams",
    artist: "Anna Martinez",
    price: "$1,900",
    category: "landscape",
    image: "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    title: "Color Symphony",
    artist: "David Park",
    price: "$1,700",
    category: "abstract",
    image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&q=80"
  }
];

export default Gallery;