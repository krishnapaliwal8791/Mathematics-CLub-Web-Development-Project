import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Teams from '../sections/Teams';
import Events from '../sections/Events';
import Recruitment from '../sections/Recruitment';
import Gallery from '../sections/Gallery';
import Footer from '../sections/Footer';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      // Delay slightly to ensure layout is ready
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (location.state.scrollTo === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Teams />
        <Events />
        <Recruitment />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
