// data/organizations.js

// Function to get a realistic recent date string (for demo)
function getRandomPastDate() {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 180); // Up to ~6 months ago
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

// The core list of organizations
const organizations = [
  {
    id: "syria-relief-uk", // Unique ID for tracking/favorites
    name: "Syria Relief",
    focus: "Provides humanitarian aid to Syrians affected by conflict.",
    region: "Syria",
    category: ["Humanitarian Aid", "Conflict Zones", "Medical Aid", "Food Security", "Shelter"],
    website: "https://syriarelief.org.uk",
    verified: true,
    lastVerified: getRandomPastDate()
  },
  {
    id: "yemen-aid-us",
    name: "Yemen Aid",
    focus: "Delivers relief and advocacy for Yemen.",
    region: "Yemen",
    category: ["Humanitarian Aid", "Advocacy", "Conflict Zones", "Food Security"],
    website: "https://yemenaid.org",
    verified: true,
    lastVerified: getRandomPastDate()
  },
  {
    id: "yemen-foundation-us",
    name: "Yemen Relief and Reconstruction Foundation",
    focus: "Supports relief and reconstruction in Yemen.",
    region: "Yemen",
    category: ["Humanitarian Aid", "Reconstruction", "Conflict Zones", "Infrastructure"],
    website: "https://yemenfoundation.org",
    verified: true,
    lastVerified: getRandomPastDate()
  },
  {
    id: "saba-relief-uk",
    name: "Saba Relief",
    focus: "Raises funds for food, medical aid, and water in Yemen.",
    region: "Yemen",
    category: ["Food Security", "Medical Aid", "Water Access", "Conflict Zones"],
    website: "https://sabarelief.org",
    verified: true,
    lastVerified: getRandomPastDate()
  },
  {
    id: "m2m-global",
    name: "Mothers2mothers (m2m)",
    focus: "Works to eliminate pediatric AIDS in sub-Saharan Africa.",
    region: "Africa",
    category: ["Medical Aid", "Children", "Health", "HIV/AIDS"],
    website: "https://m2m.org",
    verified: true,
    lastVerified: getRandomPastDate()
  },
  {
    id: "redaid-nigeria",
    name: "RedAid Nigeria",
    focus: "Addresses neglected tropical diseases and disabilities in Nigeria.",
    region: "Africa",
    category: ["Medical Aid", "Health", "Disability", "Disease Prevention"],
    website: "https://nigeria.red-aid.org",
    verified: true,
    lastVerified: getRandomPastDate()
  },
   {
    id: "wahf-ghana",
    name: "West African Health Foundation (WAHF)",
    focus: "Improves health and nutrition for children and women in Ghana.",
    region: "Africa",
    category: ["Health", "Nutrition", "Children", "Women"],
    website: "https://wahealthfoundation.org",
    verified: true,
    lastVerified: getRandomPastDate()
  },
  {
    id: "against-malaria",
    name: "Against Malaria Foundation",
    focus: "Distributes insecticide-treated nets to prevent malaria globally.",
    region: "Global",
    category: ["Medical Aid", "Health", "Disease Prevention", "Children"],
    website: "https://againstmalaria.com",
    verified: true,
    lastVerified: getRandomPastDate()
  },
  {
    id: "mag-international",
    name: "The Mines Advisory Group (MAG)",
    focus: "Clears landmines and unexploded ordnance globally.",
    region: "Global",
    category: ["Safety", "Conflict Zones", "Reconstruction", "Humanitarian Aid"],
    website: "https://maginternational.org",
    verified: true,
    lastVerified: getRandomPastDate()
  },
   {
    id: "war-child-global",
    name: "War Child",
    focus: "Supports children affected by conflict through education and psychosocial support.",
    region: "Global",
    category: ["Children", "Education", "Mental Health", "Conflict Zones", "Humanitarian Aid"],
    website: "https://warchild.org",
    verified: true,
    lastVerified: getRandomPastDate()
  },
   {
    id: "map-uk",
      name: "Medical Aid for Palestinians (MAP)",
      focus: "Provides access to essential health services and builds local capacity.",
      region: "Palestine",
      category: ["Medical Aid", "Health", "Conflict Zones", "Humanitarian Aid"],
      website: "https://www.map.org.uk/",
      verified: true,
      lastVerified: getRandomPastDate()
  },
   {
      id: "pcrf-net",
      name: "Palestine Children's Relief Fund (PCRF)",
      focus: "Provides medical and humanitarian relief collectively and individually to Arab children.",
      region: "Palestine",
      category: ["Children", "Medical Aid", "Humanitarian Aid", "Conflict Zones", "Surgery"],
      website: "https://www.pcrf.net/",
      verified: true,
      lastVerified: getRandomPastDate()
  },
   {
      id: "icrc-global",
      name: "International Committee of the Red Cross (ICRC)",
      focus: "Helps people affected by conflict and armed violence and promotes the laws that protect victims of war.",
      region: "Global",
      category: ["Humanitarian Aid", "Conflict Zones", "Medical Aid", "Emergency Response", "Refugees", "International Law"],
      website: "https://www.icrc.org/en",
      verified: true, // Generally highly reputable
      lastVerified: getRandomPastDate()
   },
    {
      id: "unicef-global",
      name: "UNICEF",
      focus: "Works in over 190 countries and territories to save children's lives, defend their rights, and help them fulfill their potential.",
      region: "Global",
      category: ["Children", "Health", "Education", "Water Access", "Nutrition", "Emergency Response"],
      website: "https://www.unicef.org/",
      verified: true, // Generally highly reputable
      lastVerified: getRandomPastDate()
   },
   {
    id: "sos-villages-global",
    name: "SOS Children's Villages International",
    focus: "Offers family-based care for children without parental care globally.",
    region: "Global",
    category: ["Children", "Family Support", "Orphan Care", "Education"],
    website: "https://sos-childrensvillages.org",
    verified: true,
    lastVerified: getRandomPastDate()
  },
  // Add more diverse examples if needed
  {
    id: "charity-water",
    name: "charity: water",
    focus: "Brings clean and safe drinking water to people in developing countries.",
    region: "Global",
    category: ["Water Access", "Health", "Infrastructure", "Community Development"],
    website: "https://www.charitywater.org/",
    verified: true,
    lastVerified: getRandomPastDate()
  }
];

// State for favorites, loaded from localStorage
let favorites = [];

// --- Favorites Management ---

// Loads favorite IDs from localStorage into the 'favorites' array
// Also updates the 'isFavorite' property on the main organizations array
function loadFavorites() {
    const storedFavorites = localStorage.getItem('veritasDonateFavorites');
    favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    // Update the isFavorite status on the main organizations array
    organizations.forEach(org => {
        org.isFavorite = favorites.includes(org.id);
    });
}

// Saves the current 'favorites' array to localStorage
function saveFavorites() {
    localStorage.setItem('veritasDonateFavorites', JSON.stringify(favorites));
}

// Toggles the favorite status of an organization by its ID
function toggleFavorite(orgId) {
    const orgIndex = organizations.findIndex(o => o.id === orgId);
    if (orgIndex === -1) return; // Safety check

    const favoriteIndex = favorites.indexOf(orgId);
    if (favoriteIndex > -1) {
        // Remove from favorites
        favorites.splice(favoriteIndex, 1);
        organizations[orgIndex].isFavorite = false;
    } else {
        // Add to favorites
        favorites.push(orgId);
        organizations[orgIndex].isFavorite = true;
    }
    saveFavorites(); // Persist changes
    // Note: The UI update (re-rendering) is triggered by the calling function in main.js
}

// Load favorites when the script initially runs
loadFavorites();