// ✅ Normalized category values to match schema enum
const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?..." },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "amazingpools"
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?..." },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "rooms"
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?..." },
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: "mountains"
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?..." },
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: "iconiccities"
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?..." },
    price: 800,
    location: "Portland",
    country: "United States",
    category: "camping"
  },
  {
    title: "Beachfront Paradise",
    description: "Step out of your door onto the sandy beach...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?..." },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: "amazingpools"
  },
  {
    title: "Rustic Cabin by the Lake",
    description: "Spend your days fishing and kayaking on the serene lake...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?..." },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    category: "mountains"
  },
  {
    title: "Luxury Penthouse with City Views",
    description: "Indulge in luxury living with panoramic city views...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?..." },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    category: "trending"
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?..." },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: "mountains"
  },
  {
    title: "Safari Lodge in the Serengeti",
    description: "Experience the thrill of the wild in a comfortable safari lodge...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?..." },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    category: "camping"
  },
  {
    title: "Historic Canal House",
    description: "Stay in a piece of history in this beautifully preserved canal house...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?..." },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    category: "iconiccities"
  },
  {
    title: "Private Island Retreat",
    description: "Have an entire island to yourself for an exclusive experience...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?..." },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    category: "amazingpools"
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description: "Escape to the picturesque Cotswolds in this quaint cottage...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?..." },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "trending"
  },
  {
    title: "Historic Brownstone in Boston",
    description: "Step back in time in this elegant historic brownstone...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?..." },
    price: 2200,
    location: "Boston",
    country: "United States",
    category: "iconiccities"
  },
  {
    title: "Beachfront Bungalow in Bali",
    description: "Relax on the sandy shores of Bali in this beautiful bungalow...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1602391833977-358a52198938?..." },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    category: "amazingpools"
  },
  {
    title: "Mountain View Cabin in Banff",
    description: "Enjoy breathtaking mountain views from this cozy cabin...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?..." },
    price: 1500,
    location: "Banff",
    country: "Canada",
    category: "mountains"
  },
  {
    title: "Art Deco Apartment in Miami",
    description: "Step into the glamour of the 1920s in this stylish apartment...",
    image: { filename: "listingimage", url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?..." },
    price: 1600,
    location: "Miami",
    country: "United States",
    category: "trending"
  },
  {
    title: "Tropical Villa in Phuket",
    description: "Escape to a tropical paradise in this luxurious villa...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?..." },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    category: "amazingpools"
  },
  {
    title: "Historic Castle in Scotland",
    description: "Live like royalty in this historic castle...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?..." },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    category: "castle"
  },
  {
    title: "Desert Oasis in Dubai",
    description: "Experience luxury in this opulent desert oasis...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?..." },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "trending"
  },
  {
    title: "Rustic Log Cabin in Montana",
    description: "Unplug and unwind in this cozy log cabin...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?..." },
    price: 1100,
    location: "Montana",
    country: "United States",
    category: "farmhouse"
  },
  {
    title: "Beachfront Villa in Greece",
    description: "Enjoy the crystal-clear waters of the Mediterranean...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?..." },
    price: 2500,
    location: "Mykonos",
    country: "Greece",
    category: "amazingpools"
  },
  {
    title: "Eco-Friendly Treehouse Retreat",
    description: "Stay in an eco-friendly treehouse nestled in the forest...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?..." },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
    category: "camping"
  },
  {
    title: "Historic Cottage in Charleston",
    description: "Experience the charm of Charleston in this restored cottage...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?..." },
    price: 1600,
    location: "Charleston",
    country: "United States",
    category: "iconiccities"
  },
  {
    title: "Modern Apartment in Tokyo",
    description: "Explore the vibrant city of Tokyo...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?..." },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    category: "trending"
  },
  {
    title: "Lakefront Cabin in New Hampshire",
    description: "Spend your days by the lake in this cozy cabin...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?..." },
    price: 1200,
    location: "New Hampshire",
    country: "United States",
    category: "mountains"
  },
  {
    title: "Luxury Villa in the Maldives",
    description: "Indulge in luxury in this overwater villa...",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?..." },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
    category: "amazingpools"
  }
];

module.exports = { data: sampleListings };
