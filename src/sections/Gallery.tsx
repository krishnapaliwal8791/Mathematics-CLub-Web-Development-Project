import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventCard } from '../components/Gallery/EventCard';
import { EventModal } from '../components/Gallery/EventModal';
import { galleryMetadata } from '../data/gallery';
import type { GalleryEventMetadata } from '../data/gallery';

export interface GalleryEvent extends GalleryEventMetadata {
  cover: string;
  images: string[];
}

export default function Gallery() {
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);

  const events = useMemo(() => {
    // Dynamic import of gallery images
    const galleryModules = import.meta.glob('../assets/gallery/**/*.{png,jpg,jpeg,webp}', { eager: true }) as Record<string, { default: string }>;
    
    // Create a map of metadata by id for quick lookup
    const metaMap = new Map<string, GalleryEventMetadata>();
    galleryMetadata.forEach(meta => metaMap.set(meta.id, meta));

    // Gather images by folder (event ID)
    const folderImages: Record<string, { cover: string; images: string[] }> = {};

    for (const [path, module] of Object.entries(galleryModules)) {
      const url = module.default;
      const parts = path.split('/');
      const filename = parts.pop();
      const eventId = parts.pop();
      
      if (!eventId || !filename) continue;
      
      if (!folderImages[eventId]) {
        folderImages[eventId] = { cover: '', images: [] };
      }
      
      // Step 5: Ensure cover.webp is NEVER added to the gallery image array
      if (filename.startsWith('cover.')) {
        folderImages[eventId].cover = url;
      } else {
        folderImages[eventId].images.push(url);
      }
    }

    const finalEvents: GalleryEvent[] = [];

    // Process folders
    for (const [eventId, data] of Object.entries(folderImages)) {
      const meta = metaMap.get(eventId);
      
      // Step 8: If images exist but metadata does not, ignore and warn
      if (!meta) {
        console.warn(`Gallery: Ignored folder "${eventId}" - no metadata found in src/data/gallery.ts`);
        continue;
      }

      let { cover, images } = data;
      
      // Step 6: If cover.webp is missing, use first gallery image as fallback cover.
      if (!cover && images.length > 0) {
        cover = images[0];
      }

      // Step 7: If metadata exists but no images exist (or no cover if 0 images): Hide that event.
      // Since cover could be the only image, but we need gallery images too. 
      // Rule: "1.webp, 2.webp... -> gallery images"
      if (images.length === 0) {
        continue;
      }

      finalEvents.push({
        ...meta,
        cover,
        images
      });
    }

    // Step 4: Sort events: featured first, newest year first, alphabetical name
    finalEvents.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      if (a.year !== b.year) return b.year - a.year;
      
      return a.name.localeCompare(b.name);
    });

    return finalEvents;
  }, []);

  const totalPhotos = events.reduce((acc, event) => acc + event.images.length, 0);

  return (
    <section id="gallery" className="py-24 bg-[#0B1020] relative overflow-hidden">
      {/* Mathematical Isometric/Golden Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ 
          backgroundImage: 'linear-gradient(30deg, white 1px, transparent 1px), linear-gradient(150deg, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Moments in <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Focus</span></h2>
            <p className="text-text-secondary text-lg font-light max-w-2xl">
              A visual journey through Mathematics Club events, competitions and activities.
            </p>
          </div>
          
          <div className="flex gap-6 items-center flex-shrink-0 bg-[#111827]/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-800/60">
            <div className="flex flex-col items-center px-2">
              <span className="text-3xl font-bold text-white mb-1">{events.length}</span>
              <span className="text-xs text-accent uppercase tracking-wider font-semibold">Events</span>
            </div>
            <div className="w-px h-12 bg-gray-800"></div>
            <div className="flex flex-col items-center px-2">
              <span className="text-3xl font-bold text-white mb-1">{totalPhotos}</span>
              <span className="text-xs text-accent uppercase tracking-wider font-semibold">Photos</span>
            </div>
          </div>
        </motion.div>
        
        {events.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="py-24 text-center border border-dashed border-gray-800/60 rounded-3xl bg-[#111827]/30 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-white text-xl font-medium mb-2">No gallery events found</p>
            <p className="text-text-secondary">Add metadata to <code className="bg-gray-800/60 px-2 py-1 rounded text-accent mx-1 text-sm">src/data/gallery.ts</code> and images to <code className="bg-gray-800/60 px-2 py-1 rounded text-accent mx-1 text-sm">assets/gallery/</code>.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {events.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <EventCard 
                  event={event} 
                  onClick={() => setSelectedEvent(event)} 
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <EventModal 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
