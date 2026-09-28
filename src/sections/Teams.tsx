const teams = [
  {
    name: 'Technical Team',
    description: 'Handles the website, technical aspects of events, and coding challenges.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    name: 'Graphics Team',
    description: 'Designs posters, banners, UI mockups, and visual identities for all club activities.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Content Team',
    description: 'Drafts engaging content for social media, event documentation, and website copy.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    name: 'Management Team',
    description: 'The backbone of our events. Ensures smooth operations, logistics, and scheduling.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: 'Promotion Team',
    description: 'Drives engagement, manages public relations, and brings the crowd to our events.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    name: 'Videography & Editing',
    description: 'Captures memories and produces high-quality promotional videos and after-movies.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Teams() {
  return (
    <section id="teams" className="py-24 bg-[#0a0f1d] relative overflow-hidden">
      {/* Subtle Dot Matrix Network Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
          backgroundSize: '32px 32px' 
        }}
      ></div>
      
      {/* Faint Graph/Sine Wave Overlay */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M0,50 Q25,20 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.5" />
        <path d="M0,70 Q25,40 50,70 T100,70" fill="none" stroke="white" strokeWidth="0.2" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Teams</h2>
          <p className="text-text-secondary text-lg font-light">
            The Mathematics Club operates through six specialized nodes, forming a complete network to execute flawless events.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => (
            <div 
              key={index}
              className="bg-[#111827]/80 backdrop-blur-sm p-8 rounded-xl border border-gray-800/60 hover:border-primary/40 transition-all hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)] group relative overflow-hidden"
            >
              {/* Card internal gradient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors relative z-10">
                {team.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 relative z-10">{team.name}</h3>
              <p className="text-text-secondary leading-relaxed font-light text-sm relative z-10">
                {team.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
