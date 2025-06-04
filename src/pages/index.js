import Head from 'next/head';
import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Queenless Kings - Alternative Rock Band from Tralee, Kerry</title>
        <meta name="description" content="Official website of Queenless Kings, an alternative rock band from Tralee, Kerry. Listen to our music, watch our videos, and stay updated on upcoming shows." />
      </Head>
      
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/gallery/videos/cearnog gig 1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">QUEENLESS KINGS</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Alternative Rock from Tralee, Ireland</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/music" className="bg-primary hover:bg-primary-dark text-black font-bold py-3 px-8 rounded-full text-lg transition-colors">
              Listen Now
            </Link>
            <a 
              href="https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
            >
              Watch Videos
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 text-center animate-bounce">
          <span className="text-sm">Scroll Down</span>
          <div className="mt-2">
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Mini Music Player */}
      <div className="bg-gray-900 py-4 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 flex items-center">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-md overflow-hidden">
                  <Image 
                    src="/images/album-cover.jpg" 
                    alt="Latest Release" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-white font-semibold">Latest Single</h3>
                <p className="text-gray-400 text-sm">Song Name - Queenless Kings</p>
              </div>
              <div className="flex items-center">
                <button className="text-white hover:text-purple-400 p-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                  </svg>
                </button>
                <button className="text-white hover:text-purple-400 p-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
                <a 
                  href="https://open.spotify.com/artist/11SfEIcAyAMs9UdphqUF82" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center transition-colors"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  Play on Spotify
                </a>
              </div>
            </div>
            <div className="h-1 bg-gray-700">
              <div className="h-full w-1/3 bg-gradient-to-r from-purple-600 to-blue-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Release */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">LATEST RELEASE</h2>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square">
              <Image
                src="/queenless-kings/latest-release.jpg"
                alt="Latest Release Artwork"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">SINGLE TITLE</h3>
              <p className="text-gray-300 mb-6">Released on [Release Date]</p>
              
              <div className="mb-6">
                <h4 className="font-bold mb-2">Listen on:</h4>
                <div className="flex flex-wrap gap-3">
                  <a href="https://open.spotify.com/artist/11SfEIcAyAMs9UdphqUF82" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <i className="fab fa-spotify mr-2"></i> Spotify
                  </a>
                  <a href="https://music.apple.com/artist/queenless-kings/123456789" target="_blank" rel="noopener noreferrer" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <i className="fab fa-apple mr-2"></i> Apple Music
                  </a>
                  <a href="https://www.youtube.com/channel/UC1234567890" target="_blank" rel="noopener noreferrer" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <i className="fab fa-youtube mr-2"></i> YouTube
                  </a>
                </div>
              </div>
              
              <Link href="/music" className="inline-block border-2 border-white hover:bg-white hover:text-black text-white font-bold py-2 px-6 rounded-full transition-colors">
                View All Music
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Shows */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">UPCOMING SHOWS</h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-6 mb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold">Venue Name</h3>
                  <p className="text-gray-300">City, Country</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">June 15, 2023</p>
                  <a href="#" className="text-primary hover:underline">Get Tickets</a>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link href="/shows" className="inline-block border-2 border-white hover:bg-white hover:text-black text-white font-bold py-2 px-6 rounded-full transition-colors">
                View All Shows
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">STAY UPDATED</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Subscribe to our newsletter for the latest news, music releases, and tour dates.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
              required
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-black font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
          
          <div className="flex justify-center space-x-6 mt-8">
            <a href="https://www.facebook.com/queenlesskingsmusic/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary transition-colors">
              <span className="sr-only">Facebook</span>
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/queenlesskingsmusic/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary transition-colors">
              <span className="sr-only">Instagram</span>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://open.spotify.com/artist/11SfEIcAyAMs9UdphqUF82" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary transition-colors">
              <span className="sr-only">Spotify</span>
              <i className="fab fa-spotify"></i>
            </a>
            <a href="https://www.youtube.com/channel/UC1234567890" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary transition-colors">
              <span className="sr-only">YouTube</span>
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
