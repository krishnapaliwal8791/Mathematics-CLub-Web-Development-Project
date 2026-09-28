import { Link } from 'react-router-dom';

export default function Recruitment() {
  return (
    <section id="recruitment" className="py-24 relative bg-[#0a0f1d] overflow-hidden">
      {/* Abstract Geometry Background */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Concentric Polar Circles */}
        <div className="w-[800px] h-[800px] border-[1px] border-white rounded-full absolute"></div>
        <div className="w-[600px] h-[600px] border-[1px] border-white rounded-full absolute"></div>
        <div className="w-[400px] h-[400px] border-[1px] border-white rounded-full absolute"></div>
        {/* Radial lines */}
        <div className="w-[1000px] h-[1px] bg-white absolute rotate-45"></div>
        <div className="w-[1000px] h-[1px] bg-white absolute -rotate-45"></div>
        <div className="w-[1000px] h-[1px] bg-white absolute rotate-0"></div>
        <div className="w-[1000px] h-[1px] bg-white absolute rotate-90"></div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none z-0"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Join Mathematics Club</h2>
        
        <p className="text-xl text-text-secondary mb-10 leading-relaxed font-light">
          We welcome students of all skill levels. Whether you are a math wizard, a creative designer, an eloquent speaker, or a natural leader, there is a place for you in our equation.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['Technical', 'Design', 'Content', 'Management', 'Promotion', 'Video Editing'].map((skill, index) => (
            <span key={index} className="px-5 py-2.5 rounded-full border border-gray-700/80 bg-[#111827]/80 backdrop-blur-sm text-gray-300 text-sm font-medium hover:border-primary/50 hover:text-white transition-colors cursor-default">
              {skill}
            </span>
          ))}
        </div>
        
        <Link 
          to="/recruitment" 
          className="inline-block bg-primary hover:bg-blue-600 text-white text-lg font-bold px-12 py-4 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] transition-all duration-300 transform hover:-translate-y-1"
        >
          Apply Now
        </Link>
      </div>
    </section>
  );
}
