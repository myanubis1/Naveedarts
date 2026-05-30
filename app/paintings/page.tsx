'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Painting {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  featured: boolean;
}

export default function PaintingsPage() {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'paintings'));
        const paintingsData: Painting[] = [];
        querySnapshot.forEach((doc) => {
          paintingsData.push({ id: doc.id, ...doc.data() } as Painting);
        });
        setPaintings(paintingsData);
      } catch (error) {
        console.error('Error fetching paintings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, []);

  const categories = ['all', ...new Set(paintings.map(p => p.category))];
  const filteredPaintings =
    selectedCategory === 'all'
      ? paintings
      : paintings.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-luxury-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 luxury-text-gradient text-luxury-900">
          Our Collection
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-luxury-700 text-white'
                  : 'bg-white text-luxury-700 border border-luxury-200 hover:border-luxury-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Paintings Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <div className="spinner" />
          </div>
        ) : filteredPaintings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-luxury-600">No paintings found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredPaintings.map(painting => (
              <div key={painting.id} className="card-luxury overflow-hidden group cursor-pointer">
                <div className="relative h-64 bg-luxury-200 overflow-hidden">
                  {painting.images && painting.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={painting.images[0]}
                      alt={painting.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-luxury-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-luxury-100 text-luxury-700 rounded-full text-sm font-semibold mb-3 capitalize">
                    {painting.category}
                  </span>
                  <h3 className="text-xl font-bold text-luxury-900 mb-2">
                    {painting.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-accent-gold">
                      Rs. {painting.price.toLocaleString()}
                    </span>
                    <button className="btn-luxury text-sm">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}