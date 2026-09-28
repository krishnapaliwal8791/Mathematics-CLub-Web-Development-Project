const events = [
  {
    title: 'National Science Day 2026',
    date: 'February 2026',
    theme: 'Indian Knowledge Systems and Mathematics: Scientific Wisdom from Tradition to Technology',
    organizers: 'Department of Engineering Mathematics & Computing, Mathematics Club, Analytics Club, MITS Gwalior',
    highlights: [
      'Keynote Lecture by Dr. Ramkishor Upadhyay',
      'Science & Mathematics Exhibition',
      'Poster Presentation Competition',
      'Interactive Academic Activities'
    ],
    type: 'Featured Academic Event'
  },
  {
    title: 'Number Ninjas 2.0',
    date: 'Flagship Event',
    description: 'Our most anticipated multi-stage flagship event.',
    type: 'Multi-round Event',
    rounds: [
      { name: 'Round 1', detail: 'Mind Strike' },
      { name: 'Round 2', detail: 'Ninja Rush' },
      { name: 'Round 3', detail: 'Buzzer Battle' },
    ],
  },
  {
    title: 'Mathemania',
    date: 'Annual Event',
    description: 'Online quiz competition testing mathematical knowledge, logical thinking, and problem-solving ability. It challenges participants to think critically under time pressure.',
    type: 'Competition',
  },
  {
    title: 'Aarunya Participation',
    date: 'Annual Fest',
    description: 'Interactive mathematics stall featuring analytical games and logic challenges during the annual cultural fest. A perfect blend of fun and intellect.',
    type: 'Interactive Stall',
  },
  {
    title: 'Number Ninjas',
    date: 'Historical',
    description: 'The legendary predecessor that started our flagship series. A historical Mathematics Club event that set the benchmark for logic and math competitions.',
    type: 'Competition',
  },
];

export default function Events() {
  return (
    <section id="events" className="py-24 bg-[#0B1020] relative overflow-hidden">
      {/* Decorative Math Symbols */}
      <div className="absolute top-1/4 -left-20 opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <span className="text-[500px] font-serif leading-none text-white">∑</span>
      </div>
      <div className="absolute bottom-1/4 -right-20 opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <span className="text-[500px] font-serif leading-none text-white">π</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Club Achievements & Events</h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
            A showcase of our major milestones, academic symposia, and flagship competitions that define our community's commitment to analytical excellence and innovation.
          </p>
        </div>
        
        <div className="relative border-l-2 border-gray-800 ml-4 md:mx-auto md:max-w-4xl lg:max-w-5xl md:border-l-0">
          
          {/* Desktop central line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-800 via-primary/30 to-gray-800 -translate-x-1/2"></div>
          
          <div className="space-y-16">
            {events.map((event, index) => {
              
              const isEven = index % 2 === 0; // true: right side, false: left side
              
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group">
                  
                  {/* Timeline Dot */}
                  <div className={`absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full ${event.type === 'Featured Academic Event' ? 'bg-primary ring-primary/30' : 'bg-accent ring-[#0B1020]'} ring-4 z-10 top-6 md:top-auto transition-transform group-hover:scale-125 group-hover:bg-primary duration-300`}></div>
                  
                  {/* Content Left / Right Logic */}
                  <div className={`w-full md:w-[45%] pl-8 md:pl-0 mt-2 md:mt-0 ${!isEven ? 'md:pr-16' : 'md:pl-16 md:ml-auto'}`}>
                    
                    {/* Make content internally left-aligned for better list reading, but align the block correctly */}
                    <div className={`bg-[#111827] p-6 md:p-8 rounded-xl border ${event.type === 'Featured Academic Event' ? 'border-primary/50 shadow-[0_0_20px_rgba(37,99,235,0.15)]' : 'border-gray-800'} hover:border-accent/50 transition-all hover:shadow-[0_5px_20px_rgba(20,184,166,0.1)] duration-300 transform group-hover:-translate-y-1 text-left`}>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 justify-between">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-accent transition-colors">{event.title}</h3>
                        <span className={`inline-block w-fit text-[11px] font-bold px-2.5 py-1 ${event.type === 'Featured Academic Event' ? 'bg-primary/20 text-primary border-primary/30' : 'bg-primary/10 text-primary border-primary/20'} rounded-full uppercase tracking-wider border`}>
                          {event.type}
                        </span>
                      </div>
                      
                      <span className="text-gray-400 text-sm font-medium mb-4 block flex items-center gap-2">
                         <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                         </svg>
                         {event.date}
                      </span>
                      
                      {event.theme && (
                        <div className="mb-5 p-3 bg-[#0B1020]/50 border-l-2 border-accent rounded-r-md">
                          <p className="text-gray-300 font-medium text-xs md:text-sm italic">
                            <span className="text-accent font-bold not-italic mr-2">Theme:</span> 
                            {event.theme}
                          </p>
                        </div>
                      )}
                      
                      {event.description && (
                        <p className="text-text-secondary text-sm leading-relaxed mb-4">
                          {event.description}
                        </p>
                      )}
                      
                      {event.highlights && (
                        <ul className="space-y-2.5 mb-5 mt-2">
                          {event.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                              <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                              </svg>
                              <span className="leading-tight">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {event.rounds && (
                        <div className="space-y-2 mt-5 pt-5 border-t border-gray-800/60">
                          {event.rounds.map((round, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <span className="text-[10px] uppercase tracking-wider font-bold text-white bg-gray-800/80 px-2.5 py-1 rounded-sm border border-gray-700">{round.name}</span>
                              <span className="text-sm text-text-secondary font-medium">{round.detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {event.organizers && (
                        <div className="mt-5 pt-4 border-t border-gray-800/60 flex items-start gap-2.5">
                          <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            <span className="font-semibold text-gray-300 block mb-0.5">Organized By:</span> 
                            {event.organizers}
                          </p>
                        </div>
                      )}
                      
                    </div>
                    
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
