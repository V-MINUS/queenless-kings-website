import Head from 'next/head';
import Layout from '../components/Layout';
import { FaSpotify, FaYoutube, FaSoundcloud } from 'react-icons/fa';

export default function Music() {
  const platforms = [
    {
      name: 'Spotify',
      icon: <FaSpotify className="w-5 h-5 mr-2" />,
      color: 'bg-green-500 hover:bg-green-600',
      url: 'https://open.spotify.com/artist/11SfEIcAyAMs9UdphqUF82',
    },
    {
      name: 'YouTube',
      icon: <FaYoutube className="w-5 h-5 mr-2" />,
      color: 'bg-red-600 hover:bg-red-700',
      url: 'https://www.youtube.com/@queenlesskings8794',
    },
    {
      name: 'SoundCloud',
      icon: <FaSoundcloud className="w-5 h-5 mr-2" />,
      color: 'bg-orange-500 hover:bg-orange-600',
      url: 'https://soundcloud.com/user-598831235',
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Music - Queenless Kings</title>
        <meta name="description" content="Listen to Queenless Kings' latest music releases" />
      </Head>
      
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">MUSIC</h1>
          
          <div className="max-w-4xl mx-auto">
            {/* Spotify Embed */}
            <div className="bg-gray-900 rounded-xl p-6 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">LISTEN NOW</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src="https://open.spotify.com/embed/artist/11SfEIcAyAMs9UdphqUF82?utm_source=generator" 
                  width="100%" 
                  height="352" 
                  frameBorder="0" 
                  allowFullScreen 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            {/* Music Platforms */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-8">AVAILABLE ON ALL PLATFORMS</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {platforms.map((platform, index) => (
                  <a
                    key={index}
                    href={platform.url}
                    className={`${platform.color} text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {platform.icon}
                    {platform.name}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-4">STAY UPDATED</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest releases, tour dates, and exclusive content.
              </p>
              <form className="flex max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                  required
                />
                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-black font-bold py-3 px-6 rounded-r-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
