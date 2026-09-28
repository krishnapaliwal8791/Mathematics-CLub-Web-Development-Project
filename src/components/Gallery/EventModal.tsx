import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Lightbox } from './Lightbox';

interface EventModalProps {
  event: {
    id: string;
    name: string;
    description: string;
    cover: string;
    images: string[];
  };
  onClose: () => void;
}

export function EventModal({ event, onClose }: EventModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImageIndex === null) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, selectedImageIndex]);

  return createPortal(
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-[#0B1020] h-screen overflow-y-auto"
        >
          {/* Close Button (Fixed Top Right) */}
          <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[10000] pt-[env(safe-area-inset-top)]">
            <button
              onClick={onClose}
              className="flex items-center gap-2 p-2 sm:px-5 sm:py-2.5 text-white bg-gray-900/90 hover:bg-gray-800 backdrop-blur-md border border-gray-700/80 shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-full transition-all"
            >
              <X className="w-6 h-6 sm:w-5 sm:h-5" />
              <span className="font-medium text-lg sm:text-base hidden sm:inline">Close</span>
            </button>
          </div>

          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mt-10 sm:mt-0">
            {/* Header */}
            <div className="mb-10">
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 pr-16 sm:pr-32">{event.name}</h2>
              <p className="text-text-secondary text-base sm:text-xl max-w-3xl">{event.description}</p>
            </div>

            {/* Gallery Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 pb-20">
              {event.images.map((img, idx) => (
                <ImageWithSkeleton 
                  key={idx}
                  src={img} 
                  alt={`${event.name} photo ${idx + 1}`} 
                  delay={idx * 0.05}
                  onClick={() => setSelectedImageIndex(idx)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {selectedImageIndex !== null && (
        <Lightbox
          images={event.images}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </>,
    document.body
  );
}

// Subcomponent for handling image load state in the masonry grid
function ImageWithSkeleton({ src, alt, delay, onClick }: { src: string, alt: string, delay: number, onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.4 }}
      className="break-inside-avoid cursor-pointer group relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800/50 shadow-lg hover:shadow-[0_0_15px_rgba(20,184,166,0.2)] hover:border-accent/30 transition-all duration-300 min-h-[150px]"
      onClick={onClick}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse z-0" />
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto object-cover transform group-hover:scale-105 transition-all duration-500 ease-out z-10 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-20 pointer-events-none" />
    </motion.div>
  );
}
