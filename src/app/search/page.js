'use client';

import Image from 'next/image';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Addtocardbutton from '@/components/addtocardbutton';
import Wishlistheart from '@/components/Wishlistheart';

const SEARCH_PRODUCTS = [
  { id: 1, name: 'Classic Leather Shoe', category: 'leather shoe', image: '/shoe1.avif', price: 1800, oldPrice: 2500 },
  { id: 2, name: 'Everyday Sneaker', category: 'sneakers shoe', image: '/shoe2.avif', price: 1800, oldPrice: 2500 },
  { id: 3, name: 'Cushioned Sport Sneaker', category: 'sneakers shoe', image: '/shoe3.avif', price: 1800, oldPrice: 2500 },
  { id: 5, name: 'Urban Casual Shoe', category: 'shoe', image: '/shoe5.avif', price: 1800, oldPrice: 2500 },
  { id: 6, name: 'Modern Ladies Shoe', category: 'ladies shoe women', image: '/shoe6.avif', price: 1800, oldPrice: 2500 },
  { id: 7, name: 'Minimal Leather Bag', category: 'bag leather', image: '/shoe7.avif', price: 1800, oldPrice: 2500 },
  { id: 8, name: 'Travel Shoulder Bag', category: 'bag', image: '/shoe8.avif', price: 1800, oldPrice: 2500 },
  { id: 9, name: 'Classic Leather Belt', category: 'belt leather', image: '/shoe9.avif', price: 1800, oldPrice: 2500 },
  { id: 10, name: 'Daily Comfort Sandal', category: 'sandals', image: '/shoe10.avif', price: 1800, oldPrice: 2500 },
];

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.trim() || '';
  const normalizedQuery = query.toLowerCase();
  const matchingProducts = SEARCH_PRODUCTS.filter((product) =>
    `${product.name} ${product.category}`.toLowerCase().includes(normalizedQuery),
  );

  return (
    <main className="container mx-auto min-h-[60vh] px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-red-600">Search results</p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
          {query ? `Results for “${query}”` : 'Search products'}
        </h1>
        {query && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {matchingProducts.length} {matchingProducts.length === 1 ? 'product' : 'products'} found
          </p>
        )}
      </div>

      {matchingProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {matchingProducts.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm dark:border-gray-700">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover" />
                <Wishlistheart />
              </div>
              <div className="p-3 sm:p-4">
                <h2 className="truncate text-base font-bold sm:text-lg">{product.name}</h2>
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-red-500">TK. {product.price}</p>
                  <p className="text-xs text-gray-500 line-through">TK. {product.oldPrice}</p>
                </div>
                <div className="mt-3">
                  <Addtocardbutton />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center dark:border-gray-700">
          <h2 className="text-xl font-semibold">No products found</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Try searching for shoes, bags, belts, or sandals.</p>
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<main className="container mx-auto min-h-[60vh] px-4 py-8">Loading products...</main>}>
      <SearchResults />
    </Suspense>
  );
}
