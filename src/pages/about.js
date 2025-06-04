import Head from 'next/head';
import Layout from '../components/Layout';
import Image from 'next/image';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About - Queenless Kings</title>
        <meta name="description" content="Learn more about Queenless Kings, the alternative rock band from Tralee, Kerry" />
      </Head>
      
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">ABOUT QUEENLESS KINGS</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl mb-6 text-center font-semibold">
                Alternative // Tralee, Kerry
              </p>
              
              <div className="mb-8">
                <div className="relative w-full h-96 md:h-[600px] rounded-xl overflow-hidden mb-8 shadow-2xl border-2 border-gray-800">
                  <Image
                    src="/queenless%20kings/band%20photo%20main.webp"
                    alt="Queenless Kings band photo"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg transform hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
              
              <p className="text-xl mb-6">
                We are Queenless Kings, the culmination of 10 years of learning, writing and gigging, coming from Tralee Co. Kerry.
              </p>
              
              <p className="mb-6">
                We've played venues small and large over the years. As a part of the music trail with Other Voices in Dingle and over to Europe as a part of Höchst schlossfest in Germany.
              </p>
              
              <p className="mb-6">
                We all met in school so long ago now. We knew we'd be tightly knit but maybe not that the music would be the glue that keeps us sharing rent into our 20's.
              </p>
              
              <p className="mb-6">
                It's amazing to think we were copying homework from each other before class and now we're fighting over who did the dishes.
              </p>
              
              <p className="mb-6">
                Inspired by the powerful sounds of the 80's and 90's but always pushing that sound to the future.
                Our goal is to give back all that music has given to us by making more.
              </p>
              
              <div className="mt-12 bg-gray-900 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">CONTACT & BOOKINGS</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold text-primary">General Inquiries</h3>
                    <p className="text-gray-300">Email: info@queenlesskings.com</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Booking & Management</h3>
                    <p className="text-gray-300">Email: management@queenlesskings.com</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-bold text-primary mb-2">Follow Us</h3>
                  <div className="flex space-x-4">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
