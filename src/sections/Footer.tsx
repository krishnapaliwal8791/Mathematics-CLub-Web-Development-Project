import { useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: targetId } });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (targetId === 'home') {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#0a0f1d] pt-16 pb-8 border-t border-gray-800/80 relative overflow-hidden">
      {/* Decorative math symbol ambient background */}
      <div className="absolute -bottom-20 -left-10 opacity-[0.02] pointer-events-none select-none">
        <span className="text-[300px] font-serif leading-none text-white">∞</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex items-center justify-center p-1 rounded-full border border-accent/30 bg-[#0B1020] shadow-[0_0_15px_rgba(20,184,166,0.15)]">
                <img src="/logo.webp" alt="Mathematics Club Logo" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-white tracking-tight">Mathematics Club</h3>
                <p className="text-accent text-sm font-medium">MITS Gwalior</p>
              </div>
            </div>
            <p className="text-text-secondary text-sm max-w-sm leading-relaxed font-light">
              A community of students passionate about mathematics, technology, creativity, and impactful event management. Think. Solve. Innovate.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Quick Links</h4>
            <ul className="space-y-3 text-text-secondary text-sm font-light">
              <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> About Us</a></li>
              <li><a href="#events" onClick={(e) => handleNavClick(e, 'events')} className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Our Events</a></li>
              <li><a href="#teams" onClick={(e) => handleNavClick(e, 'teams')} className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Teams</a></li>
              <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')} className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Gallery</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Connect</h4>
            <ul className="space-y-3 text-text-secondary text-sm font-light">
              <li><a href="https://www.instagram.com/mathematicsclubmitsdu/" target="_blank" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/mathematics-club-mits-gwalior/" target="_blank" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> LinkedIn</a></li>
              <li><a href="https://www.threads.com/@mathematicsclubmitsdu" target="_blank" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Threads</a></li>
              <li><a href="mailto:mathematicsclubmitsdu@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Email Us (mathematicsclubmitsdu@gmail.com)</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-sm font-light">
            &copy; {new Date().getFullYear()} Mathematics Club, MITS Gwalior. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm font-light flex items-center gap-1.5">
            Developed by <span className="text-gray-300 font-medium">Technical Team</span>
          </p>
        </div>
        
      </div>
    </footer>
  );
}
