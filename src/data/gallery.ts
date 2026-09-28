export interface GalleryEventMetadata {
  id: string;
  name: string;
  description: string;
  year: number;
  category: string;
  featured?: boolean;
}

export const galleryMetadata: GalleryEventMetadata[] = [
  {
    id: "national-science-day",
    name: "National Science Day",
    description: "Science exhibitions, mathematical demonstrations and club activities.",
    year: 2026,
    category: "Celebration",
    featured: true
  },
  {
    id: "number-ninjas",
    name: "Number Ninjas",
    description: "Flagship mathematics competition conducted by the club.",
    year: 2026,
    category: "Competition",
    featured: true
  },
  {
    id: "aarunya-stall",
    name: "Aarunya Stall",
    description: "Mathematics Club stall and outreach activities during Aarunya.",
    year: 2026,
    category: "Exhibition"
  }
];
