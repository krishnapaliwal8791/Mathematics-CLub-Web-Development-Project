

import { useState } from 'react';

interface EventCardProps {
  event: {
    id: string;
    name: string;
    description: string;
    cover: string;
    images: string[];
  };
  onClick: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-gray-800/60 shadow-lg hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] hover:border-accent/40 transition-all flex flex-col h-full duration-300"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse z-0" />
        )}
        <img
          src={event.cover}
          alt={event.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 z-10 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-[#0B1020]/20 to-transparent opacity-90 z-20 pointer-events-none" />
        
        <div className="absolute bottom-3 right-3 rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-medium text-white border border-white/10 flex items-center gap-1.5 z-30">
          <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {event.images.length} Photos
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">{event.name}</h3>
        <p className="text-text-secondary text-sm font-light line-clamp-2">{event.description}</p>
      </div>
    </div>
  );
}
