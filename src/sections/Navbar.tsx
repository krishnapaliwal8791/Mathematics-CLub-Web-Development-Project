import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Events', id: 'events' },
    { name: 'Teams', id: 'teams' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Recruitment', id: 'recruitment' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: targetId } });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0B1020]/80 backdrop-blur-lg border-b border-gray-800/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Branding */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 cursor-pointer" onClick={(e) => handleNavClick(e as any, 'home')}>
              <div className="relative flex items-center justify-center p-0.5 rounded-full border-[0.5px] border-accent/40 bg-[#0B1020] shadow-[0_0_8px_rgba(20,184,166,0.25)]">
                <img src="/logo.png" alt="Mathematics Club Logo" className="h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-[15px] sm:text-xl tracking-tight leading-tight text-white whitespace-nowrap">Mathematics Club</span>
                <span className="text-[10px] sm:text-xs text-accent font-medium leading-none mt-0.5">MITS Gwalior</span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="flex items-baseline space-x-1 lg:space-x-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="text-text-secondary hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Desktop CTA */}
            <div className="hidden md:flex items-center justify-end flex-shrink-0">
              <a 
                href="#recruitment" 
                onClick={(e) => handleNavClick(e, 'recruitment')}
                className="bg-primary hover:bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]"
              >
                Join Us
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-text-secondary hover:text-white focus:outline-none p-2 -mr-2"
                aria-label="Open menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#0B1020]/60 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] max-w-[80vw] bg-[#0B1020] border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 h-16 border-b border-gray-800/60 flex-shrink-0">
          <span className="font-bold text-lg text-white">Menu</span>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-400 hover:text-white p-2 -mr-2 rounded-md transition-colors"
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-text-secondary hover:text-white hover:bg-[#111827] block px-4 py-3.5 rounded-lg text-base font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-800/60 flex-shrink-0 mb-4">
          <a
            href="#recruitment"
            onClick={(e) => handleNavClick(e, 'recruitment')}
            className="w-full flex justify-center items-center bg-primary hover:bg-blue-600 text-white px-4 py-3.5 rounded-lg text-base font-semibold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
          >
            Join Us
          </a>
        </div>
      </div>
    </>
  );
}
