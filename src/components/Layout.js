import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaSpotify, FaYoutube } from 'react-icons/fa';

export default function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/music', label: 'Music' },
    { href: '/videos', label: 'Videos' },
    { href: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: 'https://www.facebook.com/queenlesskingsmusic/', icon: FaFacebook, label: 'Facebook', color: 'hover:text-blue-400' },
    { href: 'https://www.instagram.com/queenlesskingsmusic/', icon: FaInstagram, label: 'Instagram', color: 'hover:text-pink-400' },
    { href: 'https://open.spotify.com/artist/11SfEIcAyAMs9UdphqUF82', icon: FaSpotify, label: 'Spotify', color: 'hover:text-green-400' },
    { href: 'https://www.youtube.com/@queenlesskings8794', icon: FaYoutube, label: 'YouTube', color: 'hover:text-red-400' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Enhanced Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="group">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                QUEENLESS KINGS
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-300 hover:text-white transition-all duration-300 group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-110"></div>
                </Link>
              ))}
            </div>

            {/* Social Links - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10`}
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`}></span>
                <span className={`absolute block w-full h-0.5 bg-white transition-all duration-300 top-3 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`}></span>
              </div>
            </button>
          </div>

          {/* Enhanced Mobile Menu */}
          <div className={`md:hidden transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100 pb-6' 
              : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl mt-4 border border-white/10 shadow-2xl">
              <div className="p-6 space-y-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-white transition-all duration-300 p-3 rounded-xl hover:bg-white/10 transform hover:translate-x-2"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Mobile Social Links */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-center space-x-6">
                    {socialLinks.map((social) => {
                      const IconComponent = social.icon;
                      return (
                        <a
                          key={social.href}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 p-3 rounded-full hover:bg-white/10`}
                          aria-label={social.label}
                        >
                          <IconComponent className="w-6 h-6" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-t from-black via-gray-900 to-black border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                QUEENLESS KINGS
              </h3>
              <p className="text-gray-400 text-sm">
                Alternative Rock from Tralee, Kerry
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <div className="flex flex-wrap justify-center gap-4">
                {navLinks.slice(0, 4).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social & Contact */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
              <div className="flex justify-center md:justify-end space-x-4 mb-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10`}
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
              <p className="text-gray-400 text-sm">
                info@queenlesskings.com
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Queenless Kings. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
