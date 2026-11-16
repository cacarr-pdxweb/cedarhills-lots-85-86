export const CONTACT_EMAIL = 'cedarhills.lots8586@gmail.com';

export const LINKS = {
  myMapsEmbed:
    'https://www.google.com/maps/d/embed?mid=1H5dBGOnLBPvfd0z6hkgU14s5sVXlSSE&ehbc=2E312F&noprof=1',
  myMapsViewer:
    'https://www.google.com/maps/d/viewer?mid=1H5dBGOnLBPvfd0z6hkgU14s5sVXlSSE&usp=sharing',
  disclosureDrive:
    'https://drive.google.com/drive/folders/1lUBBPffAMEI4arvtBt4cq5OIdVQA9cTB?usp=sharing',
  kmlDownload: '/Cedar_Hills_Lots_85_86.kml',
} as const;

export interface PropertyImage {
  id: string;
  slug: string;
  title: string;
  shortLabel: string;
  category: 'parcel' | 'route';
  caption: string;
  alt: string;
  width: number;
  height: number;
}

export const PROPERTY_IMAGES: PropertyImage[] = [
  {
    id: 'combined',
    slug: 'lots-85-86-combined',
    title: 'Lots 85 & 86 Combined 10-Acre Boundary',
    shortLabel: '10-Acre Aerial',
    category: 'parcel',
    caption:
      'Level 660 ft × 660 ft square block of high-desert grassland and spaced one-seed junipers at ~6,000 ft elevation.',
    alt: 'Aerial satellite view outlining the 10-acre square boundary of Cedar Hills Unit 5 Lots 85 and 86 across flat juniper savanna terrain',
    width: 1920,
    height: 1201,
  },
  {
    id: 'corners',
    slug: 'lots-85-86-corners',
    title: 'Dual-Lot Split & Corner GPS Coordinates',
    shortLabel: 'Lot Split & GPS',
    category: 'parcel',
    caption:
      'Separately deeded 5-acre parcels side-by-side: Lot 85 West (APN 206-07-068) and Lot 86 East (APN 206-07-069) with verified WGS84 corner pins.',
    alt: 'Satellite view showing the north-south dividing line between Lot 85 and Lot 86 along with all four GPS corner markers',
    width: 1920,
    height: 1200,
  },
  {
    id: 'turnoff',
    slug: 'cherrys-rd-turnoff',
    title: 'Cherrys Rd Turnoff to Western Frontage',
    shortLabel: 'Access Road',
    category: 'route',
    caption:
      'Turn south off Cherrys Rd (34.947033, -109.502242) and follow the straight dirt boundary road 1.32 miles directly along Lot 85.',
    alt: 'High-altitude aerial image tracing the 1.32-mile straight north-south access road from Cherrys Road down to the northwest corner of Lot 85',
    width: 1920,
    height: 1236,
  },
  {
    id: 'plat',
    slug: 'plat-cedar-hills-unit-5',
    title: '1960 Recorded Subdivision Plat (Plat 1-46)',
    shortLabel: 'Recorded Plat',
    category: 'parcel',
    caption:
      'Official March 1960 Apache County plat (Doc #1960-019350) confirming 660 ft × 330 ft lot dimensions and dedicated 50-ft roadway/utility easements.',
    alt: 'Official 1960 Apache County subdivision plat map for Cedar Hills Unit Five with Lots 85 and 86 highlighted in yellow',
    width: 1920,
    height: 1320,
  },
  {
    id: 'route-3d-sat',
    slug: 'route-chambers-3d-sat',
    title: '3D High-Desert Approach from Chambers & I-40',
    shortLabel: '3D Plateau View',
    category: 'route',
    caption:
      'Perspective looking northwest across the southern Colorado Plateau from Lots 85 & 86 toward I-40 Exit 325, Chambers, and the Painted Desert.',
    alt: '3D satellite perspective showing the driving corridor from Chambers along I-40 south across the high-desert plateau to Lots 85 and 86',
    width: 1920,
    height: 1200,
  },
  {
    id: 'route-2d-sat',
    slug: 'route-chambers-2d-sat',
    title: 'Regional Corridor Near Petrified Forest',
    shortLabel: 'Regional Map',
    category: 'route',
    caption:
      'Located between the eastern boundary of Petrified Forest National Park and US-191, ~22.6 miles (~33 minutes) southwest of Chambers, AZ.',
    alt: 'Top-down regional satellite map showing the route from Chambers past I-40 Exit 325 and east of Petrified Forest National Park',
    width: 1920,
    height: 1200,
  },
  {
    id: 'route-3d-map',
    slug: 'route-chambers-3d-map',
    title: '3D Road Network & Cherrys Rd Junction',
    shortLabel: '3D Road Map',
    category: 'route',
    caption:
      'Vector elevation view highlighting the transition from I-40 / BIA Rte 2015 / CR 7230 onto Cherrys Rd and the final 1.32-mile N–S approach.',
    alt: '3D vector road map tracing the route from Point A in Chambers AZ through Point B at Cherrys Road down to the 10-acre parcel block',
    width: 1920,
    height: 1353,
  },
];

export interface GpsPoint {
  id: string;
  label: string;
  shortLabel: string;
  lat: string;
  lon: string;
  note: string;
  svgX?: number;
  svgY?: number;
}

export const GPS_POINTS: GpsPoint[] = [
  {
    id: 'center',
    label: '10-Acre Tract Center',
    shortLabel: 'Center',
    lat: '34.926956',
    lon: '-109.501120',
    note: 'Midpoint of the N–S dividing line between Lots 85 & 86',
    svgX: 220,
    svgY: 165,
  },
  {
    id: 'nw',
    label: 'Northwest Corner (Lot 85 NW)',
    shortLabel: 'NW',
    lat: '34.927861',
    lon: '-109.502222',
    note: 'Junction of N–S dirt road & northern 50-ft platted easement',
    svgX: 80,
    svgY: 65,
  },
  {
    id: 'sw',
    label: 'Southwest Corner (Lot 85 SW)',
    shortLabel: 'SW',
    lat: '34.926051',
    lon: '-109.502222',
    note: '660 ft south along the N–S boundary dirt road (borders Lot 108)',
    svgX: 80,
    svgY: 265,
  },
  {
    id: 'ne',
    label: 'Northeast Corner (Lot 86 NE)',
    shortLabel: 'NE',
    lat: '34.927861',
    lon: '-109.500017',
    note: 'NE corner along the northern platted easement (borders Lot 87)',
    svgX: 360,
    svgY: 65,
  },
  {
    id: 'se',
    label: 'Southeast Corner (Lot 86 SE)',
    shortLabel: 'SE',
    lat: '34.926051',
    lon: '-109.500017',
    note: 'SE corner of the combined 10-acre tract (borders Lots 87 & 107)',
    svgX: 360,
    svgY: 265,
  },
  {
    id: 'turnoff',
    label: 'Cherrys Rd Turnoff (1.32 mi N)',
    shortLabel: 'Turnoff',
    lat: '34.947033',
    lon: '-109.502242',
    note: 'Turn due south off Cherrys Rd onto the straight N–S access road',
  },
];

export const KEY_SPECS = [
  {
    label: 'Offering Price',
    value: '$4,950 Cash',
    detail: '$2,475 per 5-acre lot · 22% below County FCV ($6,350)',
  },
  {
    label: 'Acreage & Layout',
    value: '10.00 Acres',
    detail: 'Two deeded 5.00-ac lots (660′ × 660′ combined)',
  },
  {
    label: 'Parcel Identifiers',
    value: '206-07-068 & 069',
    detail: 'Treasurer Accts R0041435 & R0041436 · Cedar Hills Unit 5',
  },
  {
    label: 'Zoning & Taxes',
    value: 'AG · $0.00 Due',
    detail: 'No HOA/POA · $38.92/yr total tax, paid through 2026',
  },
] as const;

export const PROPERTY_HIGHLIGHTS = [
  {
    title: 'Two Separately Deeded 5-Acre Parcels',
    summary:
      'Sold together as a square 660′ × 660′ block (Lot 85 West + Lot 86 East). Keep all 10 acres unified, site two homes/camps, or sell one 5-acre parcel later with no county lot split.',
  },
  {
    title: 'Physical Dirt-Road Frontage + Platted Easements',
    summary:
      'An established N–S dirt road runs along the entire 660-ft western edge of Lot 85, complemented by a 50-ft platted public roadway & utility easement along the entire northern edge (Plat 1-46).',
  },
  {
    title: '6,000-Ft High-Desert Juniper Savanna',
    summary:
      'Level, dry ground dotted with spaced one-seed junipers and open range grass—ready for solar, a trailer, or a cabin without tree clearing. Mild 4-season weather (35°F / 71°F avg highs, ~8.2″ rain, ~4″ snow).',
  },
  {
    title: 'Clear Title & Off-Grid Flexibility',
    summary:
      'Vested via 2017 Warranty Deed (#2017-000363) with zero liens and taxes paid through 2026. Zoned AG: no build deadline, site-built or manufactured homes allowed, plus up to 30 days/yr permit-free RV camping.',
  },
] as const;

export const DRIVING_STEPS = [
  {
    step: '01',
    leg: 'Chambers to I-40 Exit 325 (7.8 mi paved)',
    detail:
      'From Chambers (US-191 & I-40), go north 0.2 mi on US-191 N, merge onto I-40 W toward Flagstaff for 7.3 mi, and take Exit 325 (Navajo Travel Center).',
  },
  {
    step: '02',
    leg: 'BIA Rte 2015 & CR 7230 (10.5 mi dirt)',
    detail:
      'Turn left (south) on Navajo Rd (0.2 mi), right on Kerr McGee Rd (0.4 mi), south on BIA Rte 2015 for 7.0 mi total, then straight south on CR 7230 / Rte 2007 for 2.9 mi.',
  },
  {
    step: '03',
    leg: 'Cherrys Rd to Turnoff (3.0 mi dirt)',
    detail:
      'Turn left (0.3 mi) and continue southeast on Cherrys Rd ~2.7 mi to the junction at 34.947033, -109.502242.',
  },
  {
    step: '04',
    leg: 'Final Approach Along Lot 85 (1.32 mi)',
    detail:
      'Turn right (due south) onto the straight N–S subdivision boundary road for 1.32 mi directly to the NW corner (34.927861, -109.502222) and western boundary.',
  },
] as const;

export const DISCLOSURE_ITEMS = [
  {
    file: 'Property Information & Disclosure Sheet',
    detail: 'Complete parcel profile, coordinates, zoning, and utility disclosures',
  },
  {
    file: '2017 Recorded Warranty Deed (#2017-000363)',
    detail: 'Official Apache County Recorder deed vesting clean fee-simple title',
  },
  {
    file: 'Oct 2026 Treasurer Zero-Balance Receipt',
    detail: 'Official statement confirming $0.00 balance due on both accounts',
  },
  {
    file: 'Assessor Cards (R0041435 & R0041436)',
    detail: 'County valuations ($3,175 FCV per lot / $6,350 combined) & Class 02.R',
  },
  {
    file: '1960 Recorded Subdivision Plat (1-46)',
    detail: 'March 1960 survey showing 660′ × 330′ lots & dedicated easements',
  },
  {
    file: 'Maps, Aerials & .KML Boundary File',
    detail: 'County GIS parcel maps, satellite route overlays & Google Earth KML',
  },
] as const;

export const FAQ_ITEMS = [
  {
    id: 'utilities',
    question: 'What utilities are available on the property?',
    answer:
      'Lots 85 & 86 are completely off-grid with no municipal water, sewer, or electric lines. Owners use solar/wind/generators for power, hauled water/cisterns or private wells for water, and county-permitted septic or alternative waste systems.',
  },
  {
    id: 'camping-building',
    question: 'Can I camp with an RV or build later?',
    answer:
      'Yes. Under Apache County Agricultural General (AG) zoning there is no HOA, no POA, and no time limit to build. You can camp in an RV up to 30 consecutive days per year without a permit (or up to 3 RVs with a free 30-day County Camping Permit), or place one site-built, modular, or manufactured home on each 5-acre parcel.',
  },
  {
    id: 'road-conditions',
    question: 'What kind of vehicle do I need to reach the lots?',
    answer:
      'After the 7.8-mile paved drive from Chambers to I-40 Exit 325, the remaining 14.8 miles follow unmaintained dirt/sand ranch and subdivision roads. A high-clearance or 4WD vehicle and offline GPS navigation (using the included .KML file) are strongly recommended.',
  },
  {
    id: 'closing-process',
    question: 'How is the sale closed and recorded?',
    answer:
      'Sale is direct from the owner via notarized Arizona Statutory Warranty Deed and Affidavit of Property Value (Form 82162), recorded with Apache County ($17 total county recording fee). Buyers can close via Escrow.com, direct wire/cashier’s check with deed verification, or through a licensed Arizona title agency (e.g., Pioneer Title Agency in St. Johns) at buyer’s expense.',
  },
] as const;
