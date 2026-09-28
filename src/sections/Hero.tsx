export default function Hero() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/banner.webp")' }}
      >
        <div className="absolute inset-0 bg-[#0B1020]/85"></div>
      </div>
      
      {/* Mathematical Coordinate Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', 
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      ></div>
      
      {/* Central Origin Crosshair for Grid */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.07] pointer-events-none">
        <div className="w-full h-[1px] bg-white"></div>
        <div className="absolute h-full w-[1px] bg-white"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          <div className="flex-1 text-center lg:text-left mt-10 lg:mt-0">
            <h2 className="text-accent font-semibold tracking-wider uppercase mb-2 text-sm md:text-base flex items-center justify-center lg:justify-start gap-3">
              <span className="h-[1px] w-8 bg-accent/50 hidden sm:block"></span>
              Mathematics Club <span className="text-white mx-1 opacity-50">•</span> MITS Gwalior
            </h2>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Think. <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Solve.</span> <br className="hidden lg:block" /> Innovate.
            </h1>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
              A community of students passionate about mathematics, technology, creativity, and impactful event management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#about" 
                onClick={(e) => handleNavClick(e, 'about')}
                className="bg-primary hover:bg-blue-600 text-white px-8 py-3.5 rounded-md font-medium transition-all text-lg text-center shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
              >
                Explore Club
              </a>
              <a 
                href="#recruitment" 
                onClick={(e) => handleNavClick(e, 'recruitment')}
                className="bg-transparent border border-gray-600 hover:border-white text-white px-8 py-3.5 rounded-md font-medium transition-colors text-lg text-center hover:bg-white/5"
              >
                Join Recruitment
              </a>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center lg:justify-end hidden sm:flex relative">
            {/* Subtle orbital math rings behind logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[0.5px] border-accent/20 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-[0.5px] border-primary/20 rounded-full animate-[spin_40s_linear_infinite_reverse] pointer-events-none"></div>
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full"></div>
              <img src="/logo.webp" alt="Mathematics Club Logo" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
