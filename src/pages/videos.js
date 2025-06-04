import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import { useState } from 'react';

export default function Videos() {
  const videos = [
    { 
      id: 'band content.mp4', 
      title: 'Queenless Kings - Band Content',
      type: 'video',
      thumbnail: '/queenless kings/band photo.jpg',
      url: '/queenless kings/band content.mp4'
    },
    { 
      id: 'live gig.mp4', 
      title: 'Queenless Kings - Live Performance',
      type: 'video',
      thumbnail: '/queenless kings/previous gig 2.jpg',
      url: '/queenless kings/live gig.mp4'
    },
    { 
      id: 'piece of cake single.mp4', 
      title: 'Piece of Cake - Single',
      type: 'video',
      thumbnail: '/queenless kings/previous gig.jpg',
      url: '/queenless kings/piece of cake single.mp4'
    },
    { 
      id: 'then and now.mp4', 
      title: 'Queenless Kings - Then and Now',
      type: 'video',
      thumbnail: '/queenless kings/queenlesskingsmusic_1731090435_3496962489243162220_19327151472.webp',
      url: '/queenless kings/then and now.mp4'
    },
    { 
      id: 'work harder video.mp4', 
      title: 'Work Harder - Music Video',
      type: 'video',
      thumbnail: '/queenless kings/queenlesskingsmusic_1732286640_3506996986407970163_19327151472.jpg',
      url: '/queenless kings/work harder video.mp4'
    },
    { 
      id: 'live gig 2.mp4', 
      title: 'Queenless Kings - Live Show',
      type: 'video',
      thumbnail: '/queenless kings/queenlesskingsmusic_1732721683_3510646387546488337_19327151472.jpg',
      url: '/queenless kings/live gig 2.mp4'
    },
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <Layout>
      <Head>
        <title>Videos - Queenless Kings</title>
        <meta name="description" content="Watch Queenless Kings' latest videos and live performances" />
      </Head>
      
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">VIDEOS</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div 
                key={index} 
                className="group cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden mb-4 relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300">
                    <div className="w-16 h-16 bg-red-600 bg-opacity-90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              Subscribe to our YouTube channel for more videos and updates.
            </p>
            <a 
              href="https://www.youtube.com/channel/YOUR_CHANNEL_ID" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-black rounded-full font-semibold transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.6 8.6c-.2-1.2-.5-2.3-1.2-3.1-.7-.7-1.9-1-3.1-1.2-2.2-.2-5.5-.3-7.8 0-1.2.2-2.4.5-3.1 1.2-.7.8-1 1.9-1.2 3.1-.2 2.2-.3 5.5 0 7.8.2 1.2.5 2.4 1.2 3.1.8.7 1.9 1 3.1 1.2 2.2.2 5.5.3 7.8 0 1.2-.2 2.4-.5 3.1-1.2.7-.8 1-1.9 1.2-3.1.2-2.2.3-5.5 0-7.8zM9.6 16.5v-9l7.5 4.5-7.5 4.5z" />
              </svg>
              SUBSCRIBE ON YOUTUBE
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-4xl">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVideo(null);
              }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
              <video 
                src={selectedVideo.url} 
                controls 
                autoPlay 
                className="w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <h3 className="mt-4 text-xl font-bold text-center">
              {selectedVideo.title}
            </h3>
          </div>
        </div>
      )}
    </Layout>
  );
}
