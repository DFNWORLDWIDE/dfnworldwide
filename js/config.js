/* ============================================================
   DFN WORLDWIDE — GLOBAL CONFIG
   Single source of truth. Every page reads from this object.
   Update links, copy, and metadata here ONCE — it propagates
   everywhere via the components that consume DFN_CONFIG.
   ============================================================ */

const DFN_CONFIG = {
  brand: {
    name: "DFN Worldwide",
    legalName: "DFN Worldwide PTY Ltd",
    regNumber: "2026/408693/07",
    tagline: "Discipline From Nothing",
    artist: "Suave Melodies",
    founder: "Suave",
    location: "Tembisa, Gauteng, South Africa",
    founded: "2026",
  },

  // Update these once you have real links — every page button reads from here
  links: {
    email: "mailto:info@dfnworldwide.com",
    spotify: "#",
    appleMusic: "#",
    youtube: "#",
    instagram: "#",
    tiktok: "#",
    x: "#",
    facebook: "#",
    gumroadBook: "https://dfnworldwide.gumroad.com/l/bsawq",
    gumroadStore: "https://dfnworldwide.gumroad.com",
    kdpBook: "#",
    upwork: "#",
    fiverr: "#",
  },

  nav: [
    { label: "Home", href: "/index.html" },
    { label: "Music", href: "/pages/music.html" },
    { label: "Book", href: "/pages/books.html" },
    { label: "Press Kit", href: "/pages/press.html" },
    { label: "Discipline Tracker", href: "/apps/tracker/index.html" },
  ],

  divisions: [
    {
      id: "studio",
      code: "DFN-01",
      name: "DFN Studio",
      role: "Record Label",
      desc: "Original amapiano production under the artist name Suave Melodies. Every release is built, mixed, registered, and distributed in-house — single, EP, mixtape, album.",
      status: "ACTIVE",
      href: "/pages/music.html",
      cta: "Listen to the catalog",
    },
    {
      id: "publishing",
      code: "DFN-02",
      name: "DFN Publishing",
      role: "Books & Frameworks",
      desc: "Self-help and discipline frameworks, starting with Discipline From Nothing: The Reset System — formatted for Amazon KDP and distributed free via Gumroad.",
      status: "ACTIVE",
      href: "/pages/books.html",
      cta: "Read the book",
    },
    {
      id: "fashion",
      code: "DFN-03",
      name: "DFN Fashion",
      role: "Apparel & Merch",
      desc: "Apparel carrying the DFN identity — built for people who are building something from nothing too. Print-on-demand rollout in progress.",
      status: "IN PROGRESS",
      href: "#",
      cta: "Coming soon",
    },
    {
      id: "dev",
      code: "DFN-04",
      name: "DFN Dev System",
      role: "Software & Tools",
      desc: "The systems behind the system — this website, the Discipline Tracker app, and the internal tools that keep every division running.",
      status: "ACTIVE",
      href: "/apps/tracker/index.html",
      cta: "Open the tracker",
    },
  ],

  release: {
    title: "DFNCHALLENGE EP",
    artist: "Suave Melodies",
    upc: "5064011441301",
    tracks: ["DFNCHALLENGE", "DFNstory", "DFNlegacy"],
    releaseDate: "2026-07-23",
  },

  book: {
    title: "Discipline From Nothing: The Reset System",
    subtitle: "An 8-chapter framework for rebuilding your life from the ground up.",
    gumroadFree: "https://dfnworldwide.gumroad.com/l/bsawq",
  },

  founderStory: {
    short: "Built in Tembisa, from nothing. DFN Worldwide is the proof.",
    long: "DFN Worldwide started with one principle: discipline beats circumstance. Every division — music, publishing, fashion, and software — was built from the ground up by one person, with no shortcuts and no safety net. This isn't a pitch. It's a system, and it's working.",
  },
};

// Make available to both module and non-module scripts
if (typeof module !== "undefined") {
  module.exports = DFN_CONFIG;
}
