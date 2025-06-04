import Head from 'next/head';
import Layout from '../components/Layout';
import { useState } from 'react';
import Image from 'next/image';

export default function Photos() {
  const photos = [
    { 
      id: 1, 
      src: '/queenless kings/band photo.jpg', 
      alt: 'Queenless Kings band photo',
      width: 1200,
      height: 800
    },
    { 
      id: 2, 
      src: '/queenless kings/previous gig 2.jpg', 
      alt: 'Queenless Kings live performance',
      width: 1200,
      height: 800
    },
    { 
      id: 3, 
      src: '/queenless kings/previous gig 3.webp', 
      alt: 'Queenless Kings on stage',
      width: 1080,
      height: 1350
    },
    { 
      id: 4, 
      src: '/queenless kings/previous gig.jpg', 
      alt: 'Queenless Kings live show',
      width: 1200,
      height: 800
    },
    { 
      id: 5, 
      src: '/queenless kings/queenlesskingsmusic_1732286640_3506996986407970163_19327151472.jpg', 
      alt: 'Queenless Kings concert',
      width: 1080,
      height: 1350
    },
    { 
      id: 6, 
      src: '/queenless kings/queenlesskingsmusic_1731090435_3496962489243162220_19327151472.webp', 
      alt: 'Queenless Kings live',
      width: 1080,
      height: 1349
    },
  ];

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <Layout>
      <Head>
        <title>Photos - Queenless Kings</title>
        <meta name="description" content="Photo gallery of Queenless Kings" />
      </Head>
      
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">PHOTOS</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div 
                key={photo.id} 
                className="group relative overflow-hidden rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 h-64"
                onClick={() => setSelectedPhoto(photo)}
              >
                <Image 
                  src={photo.src} 
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              All photos © {new Date().getFullYear()} Queenless Kings. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              For high-resolution photos or press inquiries, please contact: press@queenlesskings.com
            </p>
          </div>
        </div>
      </section>
      
      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="bg-gray-900 p-4 rounded-lg h-full overflow-auto">
              <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                <Image 
                  src={selectedPhoto.src} 
                  alt={selectedPhoto.alt}
                  layout="fill"
                  objectFit="contain"
                  className="rounded"
                />
              </div>
              <p className="mt-4 text-center text-white">{selectedPhoto.alt}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
