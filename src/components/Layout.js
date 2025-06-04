import Head from 'next/head';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaSpotify, FaBandcamp } from 'react-icons/fa';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Head>
        <title>Queenless Kings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-black text-white py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold cursor-pointer">
              QUEENLESS KINGS
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="hover:text-gray-300 px-3 py-2">Home</Link>
              <Link href="/about" className="hover:text-gray-300 px-3 py-2">About</Link>
              <Link href="/photos" className="hover:text-gray-300 px-3 py-2">Photos</Link>
              <Link href="/videos" className="hover:text-gray-300 px-3 py-2">Videos</Link>
              <Link href="/music" className="hover:text-gray-300 px-3 py-2">Music</Link>
            </div>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/queenlesskingsmusic/" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-gray-300" />
              </a>
              <a href="https://www.instagram.com/queenlesskingsmusic/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-gray-300" />
              </a>
              <a href="https://open.spotify.com/artist/11SfEIcAyAMs9UdphqUF82" target="_blank" rel="noopener noreferrer">
                <FaSpotify className="text-2xl hover:text-gray-300" />
              </a>
              <a href="https://queenlesskings.bandcamp.com/" target="_blank" rel="noopener noreferrer">
                <FaBandcamp className="text-2xl hover:text-gray-300" />
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://www.facebook.com/queenlesskingsmusic/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl hover:text-gray-300" />
            </a>
            <a href="https://www.instagram.com/queenlesskingsmusic/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl hover:text-gray-300" />
            </a>
            <a href="https://open.spotify.com/artist/11SfEIcAyAMs9UdphqUF82" target="_blank" rel="noopener noreferrer">
              <FaSpotify className="text-2xl hover:text-gray-300" />
            </a>
            <a href="https://queenlesskings.bandcamp.com/" target="_blank" rel="noopener noreferrer">
              <FaBandcamp className="text-2xl hover:text-gray-300" />
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} Queenless Kings. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
