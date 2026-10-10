export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0B1020] relative overflow-hidden">
      {/* Subtle Mathematics Background Elements */}
      <div className="absolute top-0 right-0 h-full w-1/2 flex items-center justify-end pointer-events-none opacity-[0.02] select-none overflow-hidden">
        <span className="text-[400px] font-serif leading-none -mr-20 text-white">∫</span>
      </div>
      
      {/* Decorative math equation faint text */}
      <div className="absolute bottom-10 left-10 pointer-events-none opacity-[0.03] select-none font-serif text-2xl tracking-widest whitespace-nowrap transform -rotate-90 origin-bottom-left">
        e^(iπ) + 1 = 0
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative inline-block">
              About The Club
              <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-accent to-transparent"></div>
            </h2>
            <div className="space-y-6 text-text-secondary text-lg font-light">
              <p>
                The Mathematics Club of MITS Gwalior is a dynamic student organization that goes far beyond just mathematics. We are a hub of innovation, creativity, and leadership.
              </p>
              <p>
                Our community brings together students from diverse backgrounds to collaborate across multiple domains. Whether it is solving complex algorithmic challenges, designing stunning graphics, producing high-quality videos, or managing large-scale events, our members do it all.
              </p>
              <p>
                We believe in practical learning through active participation. By organizing technical events, workshops, and competitions, our members develop crucial real-world skills in teamwork, project management, and cross-functional collaboration.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:gap-6 relative">
            {/* Subtle glow behind stats */}
            <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="bg-[#111827]/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800/60 hover:border-accent/30 transition-colors relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-accent text-4xl mb-4 font-bold font-mono">10<span className="text-2xl opacity-70">+</span></div>
              <div className="text-white font-medium mb-1">Annual Events</div>
              <div className="text-text-secondary text-sm">Organized at college and national level</div>
            </div>
            
            <div className="bg-[#111827]/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800/60 hover:border-primary/30 transition-colors mt-8 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-primary text-4xl mb-4 font-bold font-mono">7</div>
              <div className="text-white font-medium mb-1">Dedicated Teams</div>
              <div className="text-text-secondary text-sm">Working in synergy for every project</div>
            </div>
            
            <div className="bg-[#111827]/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800/60 hover:border-accent/30 transition-colors relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-accent text-4xl mb-4 font-bold font-mono">200<span className="text-2xl opacity-70">+</span></div>
              <div className="text-white font-medium mb-1">Active Members</div>
              <div className="text-text-secondary text-sm">From various engineering disciplines</div>
            </div>
            
            <div className="bg-[#111827]/80 backdrop-blur-sm p-6 rounded-xl border border-gray-800/60 hover:border-primary/30 transition-colors mt-8 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-primary text-4xl mb-4 font-bold font-mono">100<span className="text-2xl opacity-70">%</span></div>
              <div className="text-white font-medium mb-1">Practical Learning</div>
              <div className="text-text-secondary text-sm">Hands-on experience in leadership</div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
