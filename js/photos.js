/* =============================================================================
   PHOTOS — gallery + hero configuration
   -----------------------------------------------------------------------------
   Images live in  images/full/  (≈2400 px) and  images/thumbs/  (≈800 px).
   To replace a photo, overwrite the matching numbered JPG (01–50). To reorder
   or recaption, edit the GALLERY array below. Leave src empty for a placeholder.
   Optional per-photo fields:
     size: "large" | "wide"   → featured tile sizing in the grid
     group: "exterior" | …    → filter chip category
     alt: "…"                 → screen-reader description (defaults to caption)
   ========================================================================== */

// Big background photo behind the address at the top of the page.
const HERO_PHOTO = "images/hero.jpg";

const GALLERY = [
  // —— Exterior ——
  { src: "images/full/05.jpg", thumb: "images/thumbs/05.jpg", caption: "Front entry walk",          group: "exterior", size: "large" },
  { src: "images/full/04.jpg", thumb: "images/thumbs/04.jpg", caption: "Front elevation",           group: "exterior", size: "wide" },
  { src: "images/full/02.jpg", thumb: "images/thumbs/02.jpg", caption: "Front exterior",            group: "exterior" },
  { src: "images/full/03.jpg", thumb: "images/thumbs/03.jpg", caption: "Front exterior",            group: "exterior" },
  { src: "images/full/01.jpg", thumb: "images/thumbs/01.jpg", caption: "Driveway approach",        group: "exterior" },

  // —— Entry, dining & living ——
  { src: "images/full/06.jpg", thumb: "images/thumbs/06.jpg", caption: "Entry hall",                group: "living" },
  { src: "images/full/07.jpg", thumb: "images/thumbs/07.jpg", caption: "Entry toward living",       group: "living" },
  { src: "images/full/08.jpg", thumb: "images/thumbs/08.jpg", caption: "Dining room",               group: "living", size: "wide" },
  { src: "images/full/09.jpg", thumb: "images/thumbs/09.jpg", caption: "Dining room",               group: "living" },
  { src: "images/full/10.jpg", thumb: "images/thumbs/10.jpg", caption: "Living room",               group: "living", size: "large" },
  { src: "images/full/11.jpg", thumb: "images/thumbs/11.jpg", caption: "Living room built-ins",     group: "living" },
  { src: "images/full/12.jpg", thumb: "images/thumbs/12.jpg", caption: "Living room",               group: "living" },
  { src: "images/full/13.jpg", thumb: "images/thumbs/13.jpg", caption: "Living room",               group: "living" },
  { src: "images/full/14.jpg", thumb: "images/thumbs/14.jpg", caption: "Living room",               group: "living" },
  { src: "images/full/15.jpg", thumb: "images/thumbs/15.jpg", caption: "Living room fireplace",     group: "living" },

  // —— Kitchen ——
  { src: "images/full/16.jpg", thumb: "images/thumbs/16.jpg", caption: "Kitchen",                   group: "kitchen", size: "wide" },
  { src: "images/full/17.jpg", thumb: "images/thumbs/17.jpg", caption: "Kitchen",                   group: "kitchen" },
  { src: "images/full/18.jpg", thumb: "images/thumbs/18.jpg", caption: "Kitchen",                   group: "kitchen" },
  { src: "images/full/19.jpg", thumb: "images/thumbs/19.jpg", caption: "Kitchen island",            group: "kitchen" },
  { src: "images/full/20.jpg", thumb: "images/thumbs/20.jpg", caption: "Breakfast nook",            group: "kitchen" },
  { src: "images/full/21.jpg", thumb: "images/thumbs/21.jpg", caption: "Breakfast nook",            group: "kitchen" },
  { src: "images/full/22.jpg", thumb: "images/thumbs/22.jpg", caption: "Laundry room",              group: "kitchen" },

  // —— Secondary bedrooms & baths ——
  { src: "images/full/23.jpg", thumb: "images/thumbs/23.jpg", caption: "Powder room",               group: "bedrooms" },
  { src: "images/full/24.jpg", thumb: "images/thumbs/24.jpg", caption: "Bedroom",                   group: "bedrooms" },
  { src: "images/full/25.jpg", thumb: "images/thumbs/25.jpg", caption: "Bedroom",                   group: "bedrooms" },
  { src: "images/full/26.jpg", thumb: "images/thumbs/26.jpg", caption: "Bathroom",                  group: "bedrooms" },
  { src: "images/full/27.jpg", thumb: "images/thumbs/27.jpg", caption: "Bathroom",                  group: "bedrooms" },
  { src: "images/full/28.jpg", thumb: "images/thumbs/28.jpg", caption: "Bedroom",                   group: "bedrooms" },
  { src: "images/full/29.jpg", thumb: "images/thumbs/29.jpg", caption: "Bedroom",                   group: "bedrooms" },

  // —— Primary suite ——
  { src: "images/full/30.jpg", thumb: "images/thumbs/30.jpg", caption: "Primary bedroom",           group: "primary", size: "wide" },
  { src: "images/full/31.jpg", thumb: "images/thumbs/31.jpg", caption: "Primary bedroom",           group: "primary" },
  { src: "images/full/32.jpg", thumb: "images/thumbs/32.jpg", caption: "Primary bedroom",           group: "primary" },
  { src: "images/full/33.jpg", thumb: "images/thumbs/33.jpg", caption: "Primary bath",              group: "primary" },
  { src: "images/full/34.jpg", thumb: "images/thumbs/34.jpg", caption: "Primary bath",              group: "primary" },
  { src: "images/full/35.jpg", thumb: "images/thumbs/35.jpg", caption: "Primary bath shower",       group: "primary" },
  { src: "images/full/36.jpg", thumb: "images/thumbs/36.jpg", caption: "Primary walk-in closet",    group: "primary" },

  // —— Study ——
  { src: "images/full/37.jpg", thumb: "images/thumbs/37.jpg", caption: "French doors",              group: "living" },
  { src: "images/full/38.jpg", thumb: "images/thumbs/38.jpg", caption: "Study",                     group: "living" },
  { src: "images/full/39.jpg", thumb: "images/thumbs/39.jpg", caption: "Study",                     group: "living" },
  { src: "images/full/40.jpg", thumb: "images/thumbs/40.jpg", caption: "Hallway",                   group: "living" },

  // —— Upstairs suite ——
  { src: "images/full/41.jpg", thumb: "images/thumbs/41.jpg", caption: "Upstairs closet",           group: "upstairs" },
  { src: "images/full/42.jpg", thumb: "images/thumbs/42.jpg", caption: "Upstairs bath",             group: "upstairs" },
  { src: "images/full/43.jpg", thumb: "images/thumbs/43.jpg", caption: "Upstairs bath",             group: "upstairs" },
  { src: "images/full/44.jpg", thumb: "images/thumbs/44.jpg", caption: "Upstairs bath",             group: "upstairs" },
  { src: "images/full/45.jpg", thumb: "images/thumbs/45.jpg", caption: "Upstairs bedroom",          group: "upstairs", size: "wide" },
  { src: "images/full/46.jpg", thumb: "images/thumbs/46.jpg", caption: "Upstairs bedroom",          group: "upstairs" },
  { src: "images/full/47.jpg", thumb: "images/thumbs/47.jpg", caption: "Upstairs bedroom",          group: "upstairs" },

  // —— Outdoor ——
  { src: "images/full/48.jpg", thumb: "images/thumbs/48.jpg", caption: "Patio",                     group: "outdoor" },
  { src: "images/full/49.jpg", thumb: "images/thumbs/49.jpg", caption: "Backyard",                  group: "outdoor", size: "wide" },
  { src: "images/full/50.jpg", thumb: "images/thumbs/50.jpg", caption: "Backyard",                  group: "outdoor" },
];

const GALLERY_GROUPS = [
  { id: "all",       label: "All" },
  { id: "exterior",  label: "Exterior" },
  { id: "living",    label: "Living" },
  { id: "kitchen",   label: "Kitchen" },
  { id: "primary",   label: "Primary" },
  { id: "bedrooms",  label: "Bedrooms" },
  { id: "upstairs",  label: "Upstairs" },
  { id: "outdoor",   label: "Outdoor" },
];
