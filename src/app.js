const { createElement: h, useMemo, useState, useEffect } = React;

const routes = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/properties", label: "Properties" },
  { path: "/mbweni", label: "Mbweni" },
  { path: "/magomeni", label: "Magomeni" },
  { path: "/kariakoo", label: "Kariakoo" },
  { path: "/contact", label: "Contact" }
];

const siteUrl = "https://mel.co.tz";
const whatsappUrl = "https://wa.me/255737326352?text=Hello%20Mzizima%20Estate%20Limited%2C%20I%20would%20like%20to%20inquire%20about%20your%20properties.";
const officeMapQuery = "Dar es Salaam, Magomeni, Majebere Street";
const officeMapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(officeMapQuery)}&output=embed`;
const officeMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeMapQuery)}`;

const pageMeta = {
  "/": {
    title: "Mzizima Estate Limited | Apartments and Commercial Rentals in Dar es Salaam",
    description: "Mzizima Estate Limited offers unfurnished apartments and commercial rental properties in Dar es Salaam, including Mbweni, Magomeni, and Kariakoo."
  },
  "/about": {
    title: "About Us | Mzizima Estate Limited",
    description: "Learn about Mzizima Estate Limited, a Dar es Salaam real estate company and sister company under STC Group Limited."
  },
  "/properties": {
    title: "Properties, Apartments and Commercial Rentals | Mzizima Estate Limited",
    description: "Compare unfurnished apartments and commercial rental properties in Dar es Salaam from Mzizima Estate Limited, including Mbweni, Magomeni, and Kariakoo."
  },
  "/mbweni": {
    title: "Mbweni Apartments - Shyrose Bhanji Street | Mzizima Estate Limited",
    description: "View Mbweni apartments on Shyrose Bhanji Street, including two-bedroom and three-bedroom unfurnished apartment options from Mzizima Estate Limited."
  },
  "/magomeni": {
    title: "Magomeni Apartments - Majebere Street | Mzizima Estate Limited",
    description: "View Magomeni apartments on Majebere Street with security, lift access, CCTV, parking, and unfurnished apartment options."
  },
  "/kariakoo": {
    title: "Kariakoo Commercial Properties | Mzizima Estate Limited",
    description: "View both Mzizima Estate Limited commercial rental properties in Kariakoo, located on Uhuru Street and Msimbazi Street."
  },
  "/kariakoo-uhuru": {
    title: "Kariakoo Uhuru Street Commercial Property | Mzizima Estate Limited",
    description: "View the Kariakoo Uhuru Street commercial property with basement, shop rentals, store floors, and office space from Mzizima Estate Limited."
  },
  "/kariakoo-msimbazi": {
    title: "Kariakoo Msimbazi Street Commercial Property | Mzizima Estate Limited",
    description: "View the Kariakoo Msimbazi Street commercial property with basement, shop rentals, store floors, and office space from Mzizima Estate Limited."
  },
  "/contact": {
    title: "Contact Us | Mzizima Estate Limited",
    description: "Contact Mzizima Estate Limited for apartment inquiries, viewing arrangements, and property information in Dar es Salaam."
  }
};

const iconPaths = {
  arrow: "M5 12h14M13 5l7 7-7 7",
  balcony: "M4 10h16M6 10v9M18 10v9M8 14h8",
  bath: "M5 11h14v2a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-2ZM7 11V7a3 3 0 0 1 6 0",
  bed: "M4 11V6h7a3 3 0 0 1 3 3v2M4 11h16v8M4 19v-8M20 19v-8",
  building: "M4 20h16M6 20V4h9v16M15 9h3v11M9 8h2M9 12h2M9 16h2",
  camera: "M5 7h3l2-2h4l2 2h3v11H5V7ZM12 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  car: "M5 16h14M7 16l1.4-5h7.2L17 16M7 16v3M17 16v3M8 19h.01M16 19h.01",
  check: "M20 6 9 17l-5-5",
  fence: "M4 20V8l3-3 3 3v12M10 20V8l3-3 3 3v12M16 20V8l3-3 1 1v14M3 12h18M3 17h18",
  home: "M3 11 12 4l9 7v9H5v-9M9 20v-6h6v6",
  kitchen: "M7 4h10v16H7V4ZM10 8h4M10 12h4M10 16h.01",
  lift: "M7 20h10V4H7v16ZM10 8l2-2 2 2M10 16l2 2 2-2",
  mail: "M4 6h16v12H4V6Zm0 0 8 7 8-7",
  map: "M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  office: "M4 21V7l8-4 8 4v14M8 9h2M14 9h2M8 13h2M14 13h2M8 17h2M14 17h2",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6.3 6.3l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2Z",
  security: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  sofa: "M5 12V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3M4 12h16v6H4v-6ZM6 18v2M18 18v2",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  wind: "M4 8h11a3 3 0 1 0-3-3M4 12h16M4 16h8a3 3 0 1 1-3 3"
};

function Icon({ name, className = "h-5 w-5" }) {
  return h(
    "svg",
    { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
    h("path", { d: iconPaths[name] || iconPaths.home })
  );
}

const locations = [
  {
    slug: "mbweni",
    name: "Mbweni Apartments",
    street: "Shyrose Bhanji Street, Mbweni",
    city: "Dar es Salaam",
    total: 12,
    totalLabel: "total apartments",
    typeHeading: "Apartment type",
    setupHeading: "Bedroom setup",
    imageClass: "mbweni-image",
    pagePath: "/mbweni",
    photos: [
      "/src/assets/mbweni-apartments-1.webp",
      "/src/assets/mbweni-apartments-2.webp",
      "/src/assets/mbweni-apartments-3.webp"
    ],
    description:
      "Mzizima Estate Limited owns 12 unfurnished apartments in Mbweni, located along Shyrose Bhanji Street. The property includes two-bedroom and three-bedroom apartment options with spacious layouts and essential residential features.",
    apartments: [
      {
        id: "mbweni-two",
        label: "Two-Bedroom Apartments",
        quantity: 4,
        bedrooms: ["2 bedrooms", "Both bedrooms are master bedrooms"],
        features: ["Public toilet", "Balcony", "Kitchen", "Sitting room", "Electrical fans", "Security guards", "Parking", "Unfurnished apartment status"],
        icons: ["bath", "balcony", "kitchen", "sofa", "wind", "security", "car", "home"],
        statusLabel: "Unfurnished Apartment"
      },
      {
        id: "mbweni-three",
        label: "Three-Bedroom Apartments",
        quantity: 8,
        bedrooms: ["3 bedrooms", "2 master bedrooms", "1 non-master bedroom"],
        features: ["Public toilet", "Balcony", "Kitchen", "Sitting room", "Electrical fans", "Security guards", "Parking", "Unfurnished apartment status"],
        icons: ["bath", "balcony", "kitchen", "sofa", "wind", "security", "car", "home"],
        statusLabel: "Unfurnished Apartment"
      }
    ]
  },
  {
    slug: "magomeni",
    name: "Magomeni Apartments",
    street: "Majebere Street, Magomeni",
    city: "Dar es Salaam",
    total: 6,
    totalLabel: "total apartments",
    typeHeading: "Apartment type",
    setupHeading: "Bedroom setup",
    imageClass: "magomeni-image",
    pagePath: "/magomeni",
    photos: [],
    description:
      "Mzizima Estate Limited owns 6 unfurnished apartments in Magomeni, located along Majebere Street. The property offers two-bedroom and three-bedroom apartments with enhanced security, lift access, CCTV cameras, and parking.",
    apartments: [
      {
        id: "magomeni-two",
        label: "Two-Bedroom Apartments",
        quantity: 3,
        bedrooms: ["2 bedrooms", "Both bedrooms are master bedrooms"],
        features: ["Public toilet", "Balcony", "Fence", "Electrical fence", "Security guards", "Lift", "CCTV cameras", "Sitting room", "Kitchen", "Parking", "Unfurnished apartment status"],
        icons: ["bath", "balcony", "fence", "security", "security", "lift", "camera", "sofa", "kitchen", "car", "home"],
        statusLabel: "Unfurnished Apartment"
      },
      {
        id: "magomeni-three",
        label: "Three-Bedroom Apartments",
        quantity: 3,
        bedrooms: ["3 bedrooms", "2 master bedrooms", "1 non-master bedroom"],
        features: ["Public toilet", "Balcony", "Fence", "Electrical fence", "Security guards", "Lift", "CCTV cameras", "Sitting room", "Kitchen", "Parking", "Unfurnished apartment status"],
        icons: ["bath", "balcony", "fence", "security", "security", "lift", "camera", "sofa", "kitchen", "car", "home"],
        statusLabel: "Unfurnished Apartment"
      }
    ]
  },
  {
    slug: "kariakoo-uhuru",
    name: "Kariakoo Uhuru Street Commercial Property",
    street: "Uhuru Street, Kariakoo",
    city: "Dar es Salaam",
    total: 1,
    totalLabel: "commercial building",
    typeHeading: "Rental use",
    setupHeading: "Floor allocation",
    imageClass: "kariakoo-image",
    pagePath: "/kariakoo-uhuru",
    ctaLabel: "Explore Uhuru Street",
    photos: [],
    description:
      "Mzizima Estate Limited owns a commercial property in Kariakoo, located along Uhuru Street. The building includes one basement and 12 floors, with shop rentals on the basement, ground floor, and first floor, store spaces from the 2nd to 11th floors, and offices on the 12th floor.",
    apartments: [
      {
        id: "kariakoo-uhuru-commercial",
        label: "Commercial Rental Building",
        quantity: 1,
        unitLabel: "building",
        bedrooms: ["1 basement", "12 floors", "Basement, ground floor and first floor: shop rentals", "2nd to 11th floors: stores", "12th floor: offices"],
        features: ["Kariakoo business location", "Shop rental spaces", "Store floors", "Office floor", "Basement level", "Ground floor access", "Multi-floor commercial use", "Inquiry available"],
        icons: ["map", "building", "home", "office", "building", "map", "building", "phone"],
        statusLabel: "Commercial Rental Property"
      }
    ]
  },
  {
    slug: "kariakoo-msimbazi",
    name: "Kariakoo Msimbazi Street Commercial Property",
    street: "Msimbazi Street, Kariakoo",
    city: "Dar es Salaam",
    total: 1,
    totalLabel: "commercial building",
    typeHeading: "Rental use",
    setupHeading: "Floor allocation",
    imageClass: "kariakoo-image",
    pagePath: "/kariakoo-msimbazi",
    ctaLabel: "Explore Msimbazi Street",
    photos: [],
    description:
      "Mzizima Estate Limited owns a commercial property in Kariakoo, located along Msimbazi Street. The building includes one basement and 12 floors, with shop rentals on the basement, ground floor, and first floor, store spaces from the 2nd to 11th floors, and offices on the 12th floor.",
    apartments: [
      {
        id: "kariakoo-msimbazi-commercial",
        label: "Commercial Rental Building",
        quantity: 1,
        unitLabel: "building",
        bedrooms: ["1 basement", "12 floors", "Basement, ground floor and first floor: shop rentals", "2nd to 11th floors: stores", "12th floor: offices"],
        features: ["Kariakoo business location", "Shop rental spaces", "Store floors", "Office floor", "Basement level", "Ground floor access", "Multi-floor commercial use", "Inquiry available"],
        icons: ["map", "building", "home", "office", "building", "map", "building", "phone"],
        statusLabel: "Commercial Rental Property"
      }
    ]
  }
];

const listings = locations.flatMap((location) =>
  location.apartments.map((apartment) => ({ ...apartment, locationSlug: location.slug, locationName: location.name, street: location.street, city: location.city }))
);

function LinkButton({ path, children, variant = "solid", small = false }) {
  const base = "inline-flex items-center justify-center gap-2 border font-semibold transition";
  const color = variant === "solid" ? "border-gold bg-gold text-navy hover:border-white hover:bg-white" : "border-white/40 bg-white/10 text-white hover:bg-white hover:text-navy";
  return h(
    "a",
    { href: path, className: `${base} ${color} ${small ? "px-4 py-2 text-sm" : "px-6 py-3"}` },
    children,
    h(Icon, { name: "arrow", className: "h-4 w-4" })
  );
}

function Header({ path }) {
  return h(
    "header",
    { className: "fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-navy/95 text-white backdrop-blur" },
    h(
      "div",
      { className: "mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8" },
      h(
        "a",
        { href: "/", className: "flex items-center gap-3 text-left" },
        h("img", { src: "/src/assets/mzizima-logo-horizontal.png?v=2", alt: "Mzizima Estate Limited", className: "h-14 w-auto object-contain" })
      ),
      h("nav", { className: "hidden items-center gap-1 lg:flex" }, routes.map((item) =>
        h("a", { key: item.path, href: item.path, className: `px-4 py-2 text-sm font-medium transition hover:text-gold ${path === item.path ? "text-gold" : "text-white/78"}` }, item.label)
      )),
      h("div", { className: "hidden lg:block" }, h(LinkButton, { path: "/contact", small: true }, "Inquire Now")),
      h("details", { className: "relative lg:hidden" },
        h("summary", { className: "flex h-11 w-11 cursor-pointer list-none items-center justify-center border border-white/20" }, h(Icon, { name: "menu" })),
        h("div", { className: "absolute right-0 top-14 w-64 border border-white/10 bg-navy p-3 shadow-soft" }, routes.map((item) =>
          h("a", { key: item.path, href: item.path, className: "block w-full px-4 py-3 text-left text-sm font-medium text-white/82 hover:bg-white/10 hover:text-gold" }, item.label)
        ))
      )
    )
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return h("div", { className: "max-w-3xl" },
    eyebrow && h("p", { className: "text-sm font-semibold uppercase tracking-[0.18em] text-gold" }, eyebrow),
    h("h2", { className: "mt-3 text-3xl font-semibold text-navy sm:text-4xl" }, title),
    text && h("p", { className: "mt-4 text-lg leading-8 text-charcoal/70" }, text)
  );
}

function PageHero({ eyebrow, title, text }) {
  return h("section", { className: "page-hero-bg pt-28 text-white" },
    h("div", { className: "mx-auto max-w-7xl px-5 py-20 sm:px-8" },
      h("p", { className: "text-sm font-semibold uppercase tracking-[0.18em] text-gold" }, eyebrow),
      h("h1", { className: "mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl" }, title),
      h("p", { className: "mt-6 max-w-3xl text-lg leading-8 text-white/80" }, text)
    )
  );
}

function LocationCard({ location }) {
  return h("article", { className: "overflow-hidden border border-stone bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft" },
    h("div", { className: `${location.imageClass} flex min-h-[300px] items-end p-7 text-white` },
      h("div", null,
        h("p", { className: "inline-flex items-center gap-2 bg-navy/80 px-3 py-2 text-sm font-semibold" }, h(Icon, { name: "map", className: "h-4 w-4 text-gold" }), location.street),
        h("h3", { className: "mt-4 text-3xl font-semibold" }, location.name)
      )
    ),
    h("div", { className: "p-7" },
      h("p", { className: "text-sm font-semibold uppercase tracking-[0.16em] text-gold" }, `${location.total} ${location.totalLabel || "total apartments"}`),
      h("div", { className: "mt-5 grid gap-3" }, location.apartments.map((apartment) =>
        h("div", { key: apartment.id, className: "flex items-center justify-between gap-4 border border-stone bg-mist px-4 py-3" },
          h("span", { className: "font-medium text-navy" }, `${apartment.quantity} ${apartment.quantity === 1 ? (apartment.unitLabel || "unit") : "units"} - ${apartment.label}`),
          h("span", { className: "text-sm text-charcoal/60" }, apartment.bedrooms[0])
        )
      )),
      h("div", { className: "mt-7" }, h(LinkButton, { path: location.pagePath }, location.ctaLabel || `Explore ${location.name.split(" ")[0]}`))
    )
  );
}

function HomePage() {
  const overview = ["4 Prime Locations", "18 Apartments", "2 Kariakoo Commercial Properties", "Mbweni: 12 Apartments", "Magomeni: 6 Apartments"];
  const features = [
    ["map", "Prime Dar es Salaam locations", "Strategic addresses in Mbweni and Magomeni with convenient city access."],
    ["home", "Spacious apartment layouts", "Two-bedroom and three-bedroom apartment options designed for modern living."],
    ["security", "Secure environments", "Security guards, fencing, CCTV options, and controlled residential access."],
    ["car", "Parking availability", "Dedicated parking considerations across the apartment properties."],
    ["building", "Professional property management", "A reliable real estate company in Tanzania under the STC Group Limited family."],
    ["users", "Suitable for family living", "Comfortable apartment features for residents seeking space, practicality, and peace of mind."]
  ];

  return h("main", { className: "route-fade" },
    h("section", { className: "hero-bg min-h-[84vh] text-white" },
      h("div", { className: "mx-auto flex min-h-[84vh] max-w-7xl items-center px-5 py-28 sm:px-8" },
        h("div", { className: "max-w-3xl" },
          h("p", { className: "mb-5 inline-flex border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur" }, "Dar es Salaam Real Estate"),
          h("h1", { className: "text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl" }, "Modern Apartments and Commercial Rentals in Dar es Salaam by Mzizima Estate Limited"),
          h("p", { className: "mt-6 max-w-2xl text-lg leading-8 text-white/84" }, "Discover unfurnished apartment spaces and Kariakoo commercial rental properties in prime Dar es Salaam locations."),
          h("div", { className: "mt-9 flex flex-col gap-3 sm:flex-row" }, h(LinkButton, { path: "/properties" }, "View Apartments"), h(LinkButton, { path: "/contact", variant: "outline" }, "Contact Us"))
        )
      )
    ),
    h("section", { className: "bg-white py-8" },
      h("div", { className: "mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-5" }, overview.map((item) =>
        h("div", { key: item, className: "border border-stone bg-mist px-5 py-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft" }, h(Icon, { name: "check", className: "mb-4 h-6 w-6 text-gold" }), h("p", { className: "font-semibold text-navy" }, item))
      ))
    ),
    h("section", { className: "py-20" },
      h("div", { className: "mx-auto max-w-7xl px-5 sm:px-8" },
        h(SectionHeading, { eyebrow: "Featured locations", title: "Residential and commercial properties in Dar es Salaam", text: "Compare Mzizima Estate Limited apartment and commercial rental properties across Mbweni, Magomeni, and Kariakoo." }),
        h("div", { className: "mt-10 grid gap-7 lg:grid-cols-2" }, locations.map((location) => h(LocationCard, { key: location.slug, location })))
      )
    ),
    h("section", { className: "bg-white py-20" },
      h("div", { className: "mx-auto max-w-7xl px-5 sm:px-8" },
        h(SectionHeading, { eyebrow: "Why choose us", title: "A trusted setting for modern family living" }),
        h("div", { className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" }, features.map(([icon, title, text]) =>
          h("div", { key: title, className: "border border-stone bg-mist p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-soft" }, h(Icon, { name: icon, className: "h-7 w-7 text-gold" }), h("h3", { className: "mt-5 text-xl font-semibold text-navy" }, title), h("p", { className: "mt-3 leading-7 text-charcoal/68" }, text))
        ))
      )
    ),
    h(CtaBand)
  );
}

function AboutPage() {
  return h("main", { className: "route-fade" },
    h(PageHero, { eyebrow: "About Mzizima Estate Limited", title: "A Dar es Salaam real estate company built on trust.", text: "Mzizima Estate Limited is focused on owning and managing quality apartment properties in strategic locations across the city." }),
    h("section", { className: "bg-white py-20" },
      h("div", { className: "mx-auto max-w-5xl px-5 sm:px-8" },
        h(SectionHeading, { eyebrow: "Company profile", title: "Quality apartment ownership and management" }),
        h("div", { className: "mt-8 space-y-6 text-lg leading-8 text-charcoal/82" },
          h("p", null, "Mzizima Estate Limited is a Dar es Salaam-based real estate company focused on owning and managing quality apartment properties in strategic locations across the city. As a sister company under STC Group Limited, the company is built on professionalism, trust, and long-term property value."),
          h("p", null, "The company currently owns apartment properties in Mbweni and Magomeni, plus commercial rental properties in Kariakoo along Uhuru Street and Msimbazi Street. These properties serve residents and businesses seeking strategic Dar es Salaam locations.")
        ),
        h("div", { className: "mt-12 grid gap-5 sm:grid-cols-3" }, [
          ["map", "Dar es Salaam", "Focused on strategic city locations."],
          ["building", "20 Properties", "18 apartments plus 2 Kariakoo commercial buildings."],
          ["home", "STC Group Limited", "Part of a professional company family."]
        ].map(([icon, title, text]) =>
          h("div", { key: title, className: "border border-stone bg-mist p-6" }, h(Icon, { name: icon, className: "h-7 w-7 text-gold" }), h("h2", { className: "mt-5 text-xl font-semibold text-navy" }, title), h("p", { className: "mt-2 text-sm leading-6 text-charcoal/70" }, text))
        ))
      )
    ),
    h(CtaBand)
  );
}

function PropertyCard({ apartment }) {
  const quantityLabel = `${apartment.quantity} ${apartment.quantity === 1 ? (apartment.unitLabel || "unit") : "units"}`;
  return h("article", { className: "border border-stone bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft" },
    h("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" },
      h("div", null,
        h("p", { className: "flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold" }, h(Icon, { name: "map", className: "h-4 w-4" }), apartment.locationName),
        h("h3", { className: "mt-3 text-2xl font-semibold text-navy" }, apartment.label),
        h("p", { className: "mt-2 text-charcoal/68" }, `${apartment.street}, ${apartment.city}`)
      ),
      h("span", { className: "inline-flex w-fit border border-gold bg-gold/10 px-3 py-2 text-sm font-semibold text-navy" }, quantityLabel)
    ),
    h("div", { className: "mt-5 flex flex-wrap gap-2" }, apartment.bedrooms.map((bedroom) => h("span", { key: bedroom, className: "border border-stone bg-mist px-3 py-2 text-sm text-charcoal/74" }, bedroom))),
    h("div", { className: "mt-6 grid gap-3 sm:grid-cols-2" }, apartment.features.slice(0, 8).map((feature, index) =>
      h("div", { key: `${feature}-${index}`, className: "flex items-center gap-3 text-sm text-charcoal/72" }, h(Icon, { name: apartment.icons[index], className: "h-4 w-4 shrink-0 text-gold" }), feature)
    )),
    h("div", { className: "mt-6 flex flex-col gap-3 border-t border-stone pt-6 sm:flex-row sm:items-center sm:justify-between" }, h("p", { className: "font-semibold text-navy" }, `Status: ${apartment.statusLabel || "Unfurnished Apartment"}`), h(LinkButton, { path: "/contact", small: true }, "Inquiry"))
  );
}

function PropertiesPage() {
  const [active, setActive] = useState("all");
  const filters = [["All Properties", "all"], ["Mbweni", "mbweni"], ["Magomeni", "magomeni"], ["Kariakoo", "kariakoo"], ["Commercial Properties", "commercial"], ["Two-Bedroom Apartments", "two"], ["Three-Bedroom Apartments", "three"]];
  const shown = useMemo(() => {
    if (active === "all") return listings;
    if (active === "mbweni" || active === "magomeni") return listings.filter((item) => item.locationSlug === active);
    if (active === "kariakoo") return listings.filter((item) => item.locationSlug.startsWith("kariakoo"));
    if (active === "commercial") return listings.filter((item) => item.statusLabel === "Commercial Rental Property");
    return listings.filter((item) => item.label.toLowerCase().startsWith(active));
  }, [active]);

  return h("main", { className: "route-fade" },
    h(PageHero, { eyebrow: "Properties", title: "Compare residential and commercial properties in Dar es Salaam", text: "Browse unfurnished apartments in Mbweni and Magomeni, plus commercial rental buildings in Kariakoo for shops, stores, and offices." }),
    h("section", { className: "bg-mist py-20" },
      h("div", { className: "mx-auto max-w-7xl px-5 sm:px-8" },
        h("div", { className: "flex flex-wrap gap-3" }, filters.map(([label, value]) =>
          h("button", { key: value, type: "button", onClick: () => setActive(value), className: `border px-4 py-3 text-sm font-semibold transition ${active === value ? "border-navy bg-navy text-white" : "border-stone bg-white text-charcoal hover:border-gold hover:text-navy"}` }, label)
        )),
        h("div", { className: "mt-8 grid gap-6" }, shown.map((apartment) => h(PropertyCard, { key: apartment.id, apartment })))
      )
    )
  );
}

function KariakooPage() {
  const kariakooLocations = locations.filter((location) => location.slug.startsWith("kariakoo"));

  return h("main", { className: "route-fade" },
    h(PageHero, {
      eyebrow: "Kariakoo commercial properties",
      title: "Two commercial rental properties in Kariakoo",
      text: "Mzizima Estate Limited owns commercial rental properties on Uhuru Street and Msimbazi Street in Kariakoo. Each building includes shop rentals, store floors, and office space."
    }),
    h("section", { className: "bg-mist py-20" },
      h("div", { className: "mx-auto max-w-7xl px-5 sm:px-8" },
        h(SectionHeading, {
          eyebrow: "Kariakoo",
          title: "Choose a Kariakoo property",
          text: "Both commercial buildings include one basement and 12 floors, with shops from basement to first floor, stores from 2nd to 11th floor, and offices on the 12th floor."
        }),
        h("div", { className: "mt-10 grid gap-7 lg:grid-cols-2" }, kariakooLocations.map((location) => h(LocationCard, { key: location.slug, location })))
      )
    )
  );
}

function ApartmentDetailPage({ location }) {
  return h("main", { className: "route-fade" },
    h(PageHero, { eyebrow: location.name, title: `${location.name} - ${location.street.split(",")[0]}`, text: location.description }),
    h("section", { className: "bg-white py-20" },
      h("div", { className: "mx-auto max-w-7xl px-5 sm:px-8" },
        location.photos.length ? h("div", { className: "mb-12 grid gap-5 lg:grid-cols-3" }, location.photos.map((photo, index) =>
          h("figure", { key: photo, className: `${index === 0 ? "lg:col-span-2" : ""} overflow-hidden border border-stone bg-mist shadow-sm` },
            h("img", { src: photo, alt: `${location.name} photo ${index + 1}`, className: "h-full min-h-[260px] w-full object-cover transition duration-500 hover:scale-105" })
          )
        )) : null,
        h("div", { className: "grid gap-10 lg:grid-cols-[0.85fr_1.15fr]" },
          h("aside", { className: "h-fit border border-stone bg-mist p-7" },
            h("p", { className: "flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold" }, h(Icon, { name: "map", className: "h-4 w-4" }), location.city),
            h("h2", { className: "mt-4 text-3xl font-semibold text-navy" }, location.name),
            h("p", { className: "mt-4 leading-7 text-charcoal/70" }, `${location.street}, ${location.city}`),
            h("div", { className: "mt-7 border-y border-stone py-6" }, h("p", { className: "text-5xl font-semibold text-navy" }, location.total), h("p", { className: "mt-1 font-semibold text-charcoal/64" }, location.totalLabel || "Total unfurnished apartments")),
            h("div", { className: "mt-7" }, h(LinkButton, { path: "/contact" }, "Arrange Inquiry"))
          ),
          h("div", { className: "grid gap-7" }, location.apartments.map((apartment) =>
            h("article", { key: apartment.id, className: "border border-stone bg-white p-7 shadow-sm" },
              h("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" },
                h("div", null, h("p", { className: "text-sm font-semibold uppercase tracking-[0.14em] text-gold" }, location.typeHeading || "Apartment type"), h("h3", { className: "mt-3 text-2xl font-semibold text-navy" }, apartment.label)),
                h("span", { className: "w-fit border border-gold bg-gold/10 px-4 py-3 font-semibold text-navy" }, `Quantity: ${apartment.quantity}`)
              ),
              h("div", { className: "mt-6 grid gap-5 lg:grid-cols-2" },
                h("div", null, h("h4", { className: "font-semibold text-navy" }, location.setupHeading || "Bedroom setup"), h("div", { className: "mt-4 space-y-3" }, apartment.bedrooms.map((bedroom) => h("p", { key: bedroom, className: "flex gap-3 text-charcoal/72" }, h(Icon, { name: "check", className: "mt-0.5 h-5 w-5 shrink-0 text-gold" }), bedroom)))),
                h("div", null, h("h4", { className: "font-semibold text-navy" }, "Features"), h("div", { className: "mt-4 grid gap-3 sm:grid-cols-2" }, apartment.features.map((feature, index) => h("p", { key: `${feature}-${index}`, className: "flex items-center gap-3 text-sm text-charcoal/72" }, h(Icon, { name: apartment.icons[index], className: "h-4 w-4 shrink-0 text-gold" }), feature))))
              )
            )
          ))
        )
      )
    )
  );
}

function ContactPage() {
  return h("main", { className: "route-fade" },
    h(PageHero, { eyebrow: "Contact", title: "Interested in our apartments?", text: "Contact Mzizima Estate Limited today for inquiries, viewing arrangements, and more information." }),
    h("section", { className: "bg-white py-20" },
      h("div", { className: "mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]" },
        h("div", null,
          h("h2", { className: "text-3xl font-semibold text-navy" }, "Reach our property team"),
          h("p", { className: "mt-4 leading-7 text-charcoal/70" }, "Share your preferred location and property type. Our team can assist with inquiries for apartments in Mbweni and Magomeni, plus commercial rentals in Kariakoo."),
          h("div", { className: "mt-8 space-y-4" }, [
            ["phone", "Phone number", "+255 737 326 352"],
            ["mail", "Email address", "info@mel.co.tz"],
            ["map", "Office location", "Dar es Salaam, Magomeni, Majebere Street"]
          ].map(([icon, label, value]) => h("div", { key: label, className: "flex gap-4 border border-stone bg-mist p-5" }, h(Icon, { name: icon, className: "mt-1 h-6 w-6 shrink-0 text-gold" }), h("div", null, h("p", { className: "text-sm font-semibold uppercase tracking-[0.14em] text-charcoal/50" }, label), h("p", { className: "mt-1 font-semibold text-navy" }, value))))),
          h("a", { className: "mt-8 inline-flex items-center justify-center gap-2 border border-gold bg-gold px-6 py-3 font-semibold text-navy transition hover:bg-white", href: whatsappUrl, target: "_blank", rel: "noopener noreferrer" }, "WhatsApp Inquiry", h(Icon, { name: "arrow", className: "h-4 w-4" }))
        ),
        h(ContactForm)
      )
    ),
    h("section", { className: "bg-mist pb-20" },
      h("div", { className: "mx-auto max-w-7xl px-5 sm:px-8" },
        h("div", { className: "overflow-hidden border border-stone bg-white shadow-sm" },
          h("iframe", {
            title: "Mzizima Estate Limited office location on Google Maps",
            src: officeMapEmbedUrl,
            className: "h-[420px] w-full",
            loading: "lazy",
            referrerPolicy: "no-referrer-when-downgrade"
          }),
          h("div", { className: "flex flex-col gap-4 border-t border-stone p-5 sm:flex-row sm:items-center sm:justify-between" },
            h("div", null,
              h("p", { className: "text-sm font-semibold uppercase tracking-[0.14em] text-gold" }, "Office location"),
              h("p", { className: "mt-1 font-semibold text-navy" }, officeMapQuery)
            ),
            h("a", { className: "inline-flex items-center justify-center gap-2 border border-gold bg-gold px-5 py-3 font-semibold text-navy transition hover:bg-white", href: officeMapUrl, target: "_blank", rel: "noopener noreferrer" }, "Open in Google Maps", h(Icon, { name: "arrow", className: "h-4 w-4" }))
          )
        )
      )
    )
  );
}

function ContactForm() {
  const inputClass = "border border-stone bg-white px-4 py-3 font-normal outline-none transition focus:border-gold";
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = [
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email")}`,
      `Preferred location: ${data.get("location")}`,
      `Property type: ${data.get("apartmentType")}`,
      "",
      `${data.get("message")}`
    ].join("\n");
    window.location.href = `mailto:info@mel.co.tz?subject=${encodeURIComponent("Apartment inquiry from website")}&body=${encodeURIComponent(body)}`;
  };

  return h("form", { onSubmit: handleSubmit, className: "border border-stone bg-mist p-6 shadow-sm sm:p-8" },
    h("div", { className: "grid gap-5 sm:grid-cols-2" },
      h("label", { className: "grid gap-2 text-sm font-semibold text-navy" }, "Name", h("input", { name: "name", required: true, autoComplete: "name", className: inputClass, placeholder: "Your full name" })),
      h("label", { className: "grid gap-2 text-sm font-semibold text-navy" }, "Phone number", h("input", { name: "phone", required: true, type: "tel", autoComplete: "tel", className: inputClass, placeholder: "+255..." })),
      h("label", { className: "grid gap-2 text-sm font-semibold text-navy" }, "Email", h("input", { name: "email", required: true, type: "email", autoComplete: "email", className: inputClass, placeholder: "you@example.com" })),
      h("label", { className: "grid gap-2 text-sm font-semibold text-navy" }, "Preferred location", h("select", { name: "location", required: true, className: inputClass }, h("option", null, "Mbweni"), h("option", null, "Magomeni"), h("option", null, "Kariakoo - Uhuru Street"), h("option", null, "Kariakoo - Msimbazi Street"))),
      h("label", { className: "grid gap-2 text-sm font-semibold text-navy sm:col-span-2" }, "Property type", h("select", { name: "apartmentType", required: true, className: inputClass }, h("option", null, "Two-bedroom apartment"), h("option", null, "Three-bedroom apartment"), h("option", null, "Shop rental"), h("option", null, "Store rental"), h("option", null, "Office space"))),
      h("label", { className: "grid gap-2 text-sm font-semibold text-navy sm:col-span-2" }, "Message", h("textarea", { name: "message", required: true, className: `${inputClass} min-h-36`, placeholder: "Tell us what you would like to know." }))
    ),
    h("button", { className: "mt-6 w-full border border-gold bg-gold px-6 py-3 font-semibold text-navy transition hover:border-navy hover:bg-navy hover:text-white", type: "submit" }, "Submit Inquiry")
  );
}

function CtaBand() {
  return h("section", { className: "bg-charcoal py-16 text-white" },
    h("div", { className: "mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between" },
      h("div", null, h("p", { className: "text-sm font-semibold uppercase tracking-[0.18em] text-gold" }, "Inquiries and viewing arrangements"), h("h2", { className: "mt-3 max-w-3xl text-3xl font-semibold" }, "Speak with Mzizima Estate Limited about apartments in Dar es Salaam.")),
      h("div", { className: "flex shrink-0 flex-col gap-3 sm:flex-row" }, h(LinkButton, { path: "/contact" }, "Contact Us"), h("a", { className: "inline-flex items-center justify-center gap-2 border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-navy", href: whatsappUrl, target: "_blank", rel: "noopener noreferrer" }, "WhatsApp", h(Icon, { name: "arrow", className: "h-4 w-4" })))
    )
  );
}

function Footer() {
  return h("footer", { className: "bg-navy text-white" },
    h("div", { className: "mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]" },
      h("div", null, h("div", { className: "flex items-center gap-3" }, h("img", { src: "/src/assets/mzizima-logo-horizontal.png?v=2", alt: "Mzizima Estate Limited", className: "h-16 w-auto object-contain" }), h("div", null, h("p", { className: "font-semibold" }, "Mzizima Estate Limited"), h("p", { className: "text-sm text-white/55" }, "Sister company of STC Group Limited"))), h("p", { className: "mt-6 max-w-md leading-7 text-white/66" }, "A real estate company in Tanzania offering unfurnished apartments and commercial rental properties across Dar es Salaam.")),
      h("div", null, h("p", { className: "font-semibold text-gold" }, "Navigation"), h("div", { className: "mt-4 grid gap-3 text-sm text-white/70" }, routes.slice(0, 4).map((item) => h("a", { key: item.path, href: item.path, className: "text-left hover:text-gold" }, item.label)))),
      h("div", null, h("p", { className: "font-semibold text-gold" }, "Contact"), h("div", { className: "mt-4 space-y-3 text-sm text-white/70" }, h("p", { className: "flex gap-3" }, h(Icon, { name: "phone", className: "h-4 w-4 text-gold" }), "+255 737 326 352"), h("p", { className: "flex gap-3" }, h(Icon, { name: "mail", className: "h-4 w-4 text-gold" }), "info@mel.co.tz"), h("p", { className: "flex gap-3" }, h(Icon, { name: "map", className: "h-4 w-4 text-gold" }), "Dar es Salaam, Magomeni, Majebere Street")))
    ),
    h("div", { className: "border-t border-white/10 px-5 py-5 text-center text-sm text-white/50" }, "(c) 2026 Mzizima Estate Limited. All rights reserved.")
  );
}

function App() {
  const path = normalizePath(window.location.pathname);
  useEffect(() => {
    const meta = pageMeta[path] || pageMeta["/"];
    const canonicalPath = path === "/" ? "/" : `${path}/`;
    document.title = meta.title;
    setMeta("description", meta.description);
    setMeta("og:title", meta.title, "property");
    setMeta("og:description", meta.description, "property");
    setMeta("og:url", `${siteUrl}${canonicalPath}`, "property");
    setCanonical(`${siteUrl}${canonicalPath}`);
  }, [path]);

  let page = h(HomePage);
  if (path === "/about") page = h(AboutPage);
  if (path === "/properties") page = h(PropertiesPage);
  if (path === "/kariakoo") page = h(KariakooPage);
  const detailLocation = locations.find((location) => path === location.pagePath);
  if (detailLocation) page = h(ApartmentDetailPage, { location: detailLocation });
  if (path === "/contact") page = h(ContactPage);

  return h(React.Fragment, null, h(Header, { path }), page, h(Footer));
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));

function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function setMeta(name, content, attr = "name") {
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href) {
  let tag = document.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}
