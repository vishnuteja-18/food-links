// FoodConnect AI — Complete Frontend Application Bundle
const { useState, useEffect, useContext, createContext } = React;

// --- 1. DATASTORE & MOCK DATA ---
const INITIAL_USERS = {
  provider: {
    id: 'usr_prov_1',
    name: 'Chef Marcus Vance',
    orgName: 'The Grand Harvest Bistro',
    role: 'provider',
    type: 'Restaurant & Banquets',
    email: 'marcus@grandharvest.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200',
    address: '428 Metro Boulevard, Downtown District',
    city: 'San Francisco, CA',
    verified: true,
    donationsCount: 148,
    totalKgDonated: 3420,
    impactScore: 98,
  },
  ngo: {
    id: 'usr_ngo_1',
    name: 'Sister Sarah Jenkins',
    orgName: 'City Hope Community Shelter',
    role: 'ngo',
    type: 'Homeless Shelter & Community Kitchen',
    email: 'sarah@cityhope.org',
    phone: '+1 (555) 876-5432',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    address: '89 Mission Way, Central District',
    city: 'San Francisco, CA',
    verified: true,
    capacityDailyMeals: 450,
    activeClaims: 2,
    receivedKg: 8950,
    impactScore: 99,
  },
  volunteer: {
    id: 'usr_vol_1',
    name: 'David Chen',
    orgName: 'Food Rescue Rapid Squad',
    role: 'volunteer',
    type: 'Rapid EV Van Volunteer',
    email: 'david.chen@rescuefleet.org',
    phone: '+1 (555) 432-1098',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    vehicle: 'Electric Cargo Van (Temp Controlled)',
    completedRuns: 87,
    rating: 4.96,
  },
  admin: {
    id: 'usr_adm_1',
    name: 'Elena Rostova',
    orgName: 'Metropolitan Food Redistribution Authority',
    role: 'admin',
    type: 'Platform Impact Director',
    email: 'elena@foodconnect.ai',
    phone: '+1 (555) 999-0011',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
  }
};

const INITIAL_LISTINGS = [
  {
    id: 'FNC-8401',
    title: 'Surplus Lunch Buffet: Mediterranean Grilled Platters & Rice',
    providerId: 'usr_prov_1',
    providerName: 'The Grand Harvest Bistro',
    providerType: 'Fine Dining Restaurant',
    address: '428 Metro Boulevard, Downtown',
    distanceKm: 2.3,
    category: 'Cooked Meals',
    foodType: 'Buffet Surplus',
    quantityKg: 35,
    mealCount: 75,
    storageType: 'Hot Insulated Containers (65°C)',
    dietary: ['Halal', 'Nut-Free', 'High Protein'],
    isVeg: false,
    allergens: 'Contains Dairy',
    cookedAt: 'Today, 1:15 PM',
    expiresAt: 'Today, 6:00 PM',
    remainingMinutes: 145,
    urgencyScore: 'HIGH',
    urgencyColor: 'bg-amber-500',
    freshnessPct: 92,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    status: 'AVAILABLE',
    aiInsights: {
      shelfLifeEstimate: 'Safe for consumption up to 4.5 hours under standard insulated transport.',
      urgencyReason: 'Cooked high-protein lunch meal; dispatch within 2 hours recommended for peak freshness.',
      co2SavedKg: 87.5,
      waterSavedLiters: 1400,
      matchedNgo: 'City Hope Community Shelter (2.3 km away, 75 meals needed today)',
    },
    claimedBy: null,
    tracking: null
  },
  {
    id: 'FNC-8402',
    title: 'Artisan Sourdough, Croissants & Brioche Baskets',
    providerId: 'usr_prov_2',
    providerName: 'Golden Crust Boulangerie',
    providerType: 'Bakery & Cafe',
    address: '112 Baker Square, North Beach',
    distanceKm: 4.1,
    category: 'Bakery & Bread',
    foodType: 'Fresh Baked Goods',
    quantityKg: 20,
    mealCount: 60,
    storageType: 'Dry Ambient Storage (20°C)',
    dietary: ['Vegetarian', 'Eggless Breads'],
    isVeg: true,
    allergens: 'Contains Gluten, Dairy',
    cookedAt: 'Today, 6:30 AM',
    expiresAt: 'Tomorrow, 12:00 PM',
    remainingMinutes: 480,
    urgencyScore: 'MEDIUM',
    urgencyColor: 'bg-blue-500',
    freshnessPct: 96,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    status: 'AVAILABLE',
    aiInsights: {
      shelfLifeEstimate: 'Stable for 24+ hours at room temperature in protective packaging.',
      urgencyReason: 'Dry bakery item; great breakfast distribution potential for tomorrow morning.',
      co2SavedKg: 32.0,
      waterSavedLiters: 480,
      matchedNgo: 'St. Jude Youth Center (3.8 km away)',
    },
    claimedBy: null,
    tracking: null
  },
  {
    id: 'FNC-8403',
    title: 'Executive Banquet: Steamed Rice, Dal Makhani & Paneer Tikka',
    providerId: 'usr_prov_3',
    providerName: 'Royal Orchid Convention Center',
    providerType: 'Event & Banquet Hall',
    address: '780 Marina Parkway, Waterfront',
    distanceKm: 3.2,
    category: 'Cooked Meals',
    foodType: 'Corporate Banquet Surplus',
    quantityKg: 65,
    mealCount: 140,
    storageType: 'Commercial Hot-Hold Chafing (70°C)',
    dietary: ['100% Vegetarian', 'Pure Veg', 'No Onion-Garlic Option'],
    isVeg: true,
    allergens: 'Contains Dairy (Paneer)',
    cookedAt: 'Today, 12:30 PM',
    expiresAt: 'Today, 4:30 PM',
    remainingMinutes: 55,
    urgencyScore: 'CRITICAL',
    urgencyColor: 'bg-red-500',
    freshnessPct: 88,
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600',
    status: 'CLAIMED',
    aiInsights: {
      shelfLifeEstimate: 'Critical consumption window: 2 hours remaining before cooling protocol is required.',
      urgencyReason: 'Large volume of hot vegetarian curry and rice; prioritizes high-capacity shelter.',
      co2SavedKg: 145.0,
      waterSavedLiters: 2600,
      matchedNgo: 'City Hope Community Shelter',
    },
    claimedBy: {
      ngoName: 'City Hope Community Shelter',
      ngoAddress: '89 Mission Way, Central District',
      claimedAt: '15 mins ago',
      contact: 'Sister Sarah (+1 555-876-5432)',
      beneficiaries: 140,
    },
    tracking: {
      step: 2,
      statusText: 'Driver Arriving at Provider in 8 mins',
      driverName: 'David Chen (Rapid EV Fleet)',
      driverPhone: '+1 (555) 432-1098',
      driverVehicle: 'Ford E-Transit Van (Temp Controlled)',
      pickupOtp: '8492',
      deliveryOtp: '3104',
      etaMinutes: 8,
      liveCoords: { lat: 37.7749, lng: -122.4194 }
    }
  },
  {
    id: 'FNC-8404',
    title: 'Fresh Organic Produce: Hydroponic Greens, Carrots & Bell Peppers',
    providerId: 'usr_prov_4',
    providerName: 'Sun Valley Organic Mart',
    providerType: 'Supermarket / Fresh Market',
    address: '95 Valley Way, Westwood',
    distanceKm: 5.6,
    category: 'Fresh Produce',
    foodType: 'Raw Vegetables & Greens',
    quantityKg: 48,
    mealCount: 110,
    storageType: 'Chilled Storage (4°C)',
    dietary: ['Vegan', 'Gluten-Free', 'Raw', 'Organic'],
    isVeg: true,
    allergens: 'None',
    cookedAt: 'Harvested Yesterday',
    expiresAt: 'In 3 Days',
    remainingMinutes: 2880,
    urgencyScore: 'LOW',
    urgencyColor: 'bg-emerald-500',
    freshnessPct: 98,
    imageUrl: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=600',
    status: 'IN_TRANSIT',
    aiInsights: {
      shelfLifeEstimate: '3-4 days safe freshness under normal refrigeration.',
      urgencyReason: 'High nutritional raw produce; perfect for soup kitchens or bulk prep.',
      co2SavedKg: 96.0,
      waterSavedLiters: 1800,
      matchedNgo: 'Sunshine Elders Care Home',
    },
    claimedBy: {
      ngoName: 'Sunshine Elders Care Home',
      ngoAddress: '240 Orchard Grove',
      claimedAt: '1 hour ago',
      contact: 'Nurse Linda (+1 555-321-7654)',
      beneficiaries: 95,
    },
    tracking: {
      step: 3,
      statusText: 'In Transit — Heading to Sunshine Elders Care',
      driverName: 'Maya Patel (Volunteer)',
      driverPhone: '+1 (555) 654-9870',
      driverVehicle: 'Toyota RAV4 Hybrid',
      pickupOtp: '5521',
      deliveryOtp: '9082',
      etaMinutes: 14,
      liveCoords: { lat: 37.7833, lng: -122.4167 }
    }
  },
  {
    id: 'FNC-8405',
    title: 'Assorted Gourmet Sandwiches, Wraps & Fruit Cups',
    providerId: 'usr_prov_1',
    providerName: 'The Grand Harvest Bistro',
    providerType: 'Restaurant & Banquets',
    address: '428 Metro Boulevard, Downtown',
    distanceKm: 2.3,
    category: 'Cooked Meals',
    foodType: 'Packaged Fresh Meals',
    quantityKg: 18,
    mealCount: 45,
    storageType: 'Refrigerated Display Case (4°C)',
    dietary: ['Includes Veg & Chicken Options', 'Individually Wrapped'],
    isVeg: false,
    allergens: 'Gluten, Mayo',
    cookedAt: 'Today, 11:00 AM',
    expiresAt: 'Today, 8:00 PM',
    remainingMinutes: 210,
    urgencyScore: 'HIGH',
    urgencyColor: 'bg-amber-500',
    freshnessPct: 94,
    imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=600',
    status: 'DELIVERED',
    aiInsights: {
      shelfLifeEstimate: 'Individually wrapped food retains safety for 8 hours chilled.',
      urgencyReason: 'Ready-to-eat individual portions ideal for direct distribution.',
      co2SavedKg: 41.5,
      waterSavedLiters: 720,
      matchedNgo: 'St. Jude Youth Center',
    },
    claimedBy: {
      ngoName: 'St. Jude Youth Center',
      ngoAddress: '150 Foster Road',
      claimedAt: '3 hours ago',
      contact: 'Pastor John (+1 555-443-2211)',
      beneficiaries: 45,
    },
    tracking: {
      step: 4,
      statusText: 'Successfully Handed Over & Verified',
      driverName: 'David Chen (Rapid EV Fleet)',
      driverPhone: '+1 (555) 432-1098',
      deliveryTime: '25 mins ago',
      verifiedPhoto: true
    }
  }
];

const NEARBY_NGOS = [
  {
    id: 'ngo_1',
    name: 'City Hope Community Shelter',
    distanceKm: 2.3,
    capacity: 450,
    mealsNeededToday: 75,
    acceptsCooked: true,
    acceptsRaw: true,
    dietaryReqs: 'All types accepted (Veg & Non-Veg separated)',
    rating: 4.9,
    verifiedBadge: 'Verified Tier 1 NGO',
    contact: 'Sister Sarah Jenkins (+1 555-876-5432)',
    address: '89 Mission Way, Central District'
  },
  {
    id: 'ngo_2',
    name: 'St. Jude Youth & Children Center',
    distanceKm: 3.8,
    capacity: 180,
    mealsNeededToday: 40,
    acceptsCooked: true,
    acceptsRaw: false,
    dietaryReqs: 'Nut-Free, Mild spice, Kid-friendly',
    rating: 4.85,
    verifiedBadge: 'Verified Youth Shelter',
    contact: 'Pastor John Mark (+1 555-443-2211)',
    address: '150 Foster Road, Eastside'
  },
  {
    id: 'ngo_3',
    name: 'Sunshine Elders Care & Hospice',
    distanceKm: 5.2,
    capacity: 120,
    mealsNeededToday: 35,
    acceptsCooked: true,
    acceptsRaw: true,
    dietaryReqs: 'Low sodium, Diabetic-friendly, Soft diet',
    rating: 5.0,
    verifiedBadge: 'Verified Healthcare Facility',
    contact: 'Linda Wu (+1 555-321-7654)',
    address: '240 Orchard Grove, Westwood'
  }
];

const PLATFORM_IMPACT_STATS = {
  totalKgSaved: 148920,
  totalMealsServed: 326500,
  totalCo2PreventedKg: 372300,
  activeNgosCount: 142,
  activeProvidersCount: 385,
  volunteerDriversCount: 92,
  averagePickupTimeMins: 28,
  aiMatchingAccuracy: 99.4,
  monthlyRedistribution: [
    { month: 'May', kg: 14200, meals: 31000, co2: 35500 },
    { month: 'Jun', kg: 18500, meals: 40200, co2: 46250 },
    { month: 'Jul', kg: 21900, meals: 48000, co2: 54750 },
    { month: 'Aug', kg: 27400, meals: 60500, co2: 68500 },
    { month: 'Sep', kg: 31800, meals: 69800, co2: 79500 },
    { month: 'Oct', kg: 35120, meals: 77000, co2: 87800 },
  ],
  categoryBreakdown: [
    { name: 'Cooked Meals & Buffets', percentage: 46, color: '#15803D' },
    { name: 'Bakery & Bread', percentage: 22, color: '#22C55E' },
    { name: 'Fresh Produce & Fruit', percentage: 18, color: '#4ADE80' },
    { name: 'Dairy & Packaged Goods', percentage: 14, color: '#86EFAC' },
  ],
  recentRedistributionLog: [
    { id: 'LOG-1', time: '8 mins ago', text: '35 kg Mediterranean Platters claimed by City Hope Shelter', type: 'claim' },
    { id: 'LOG-2', time: '22 mins ago', text: '48 kg Organic Vegetables picked up by Volunteer Maya Patel', type: 'transit' },
    { id: 'LOG-3', time: '45 mins ago', text: '18 kg Gourmet Sandwiches verified & delivered at St. Jude Youth Center', type: 'delivery' },
    { id: 'LOG-4', time: '1 hr ago', text: 'New 65 kg Banquet Rice & Curry listed with AI Urgent Priority flag', type: 'listing' },
    { id: 'LOG-5', time: '2 hrs ago', text: 'The Grand Harvest Bistro awarded Gold Donor Impact Tier', type: 'award' },
  ]
};

const AI_DONATION_INSIGHTS = [
  {
    id: 'ai-ins-1',
    type: 'optimization',
    title: 'Peak Surplus Time Prediction',
    description: 'Based on last 4 weeks, Friday & Saturday buffets generate 34% more edible surplus between 2:00 PM and 3:30 PM. Scheduling automated AI pre-listing saves 40 minutes of idle shelf-time.',
    badge: 'Smart Timing',
    confidence: '98% Accuracy'
  },
  {
    id: 'ai-ins-2',
    type: 'demand',
    title: 'High Demand for Cooked Vegetarian Protein',
    description: '3 local shelters within 4 km currently report a deficit of 180 vegetarian lunch servings today. Your listed paneer and dal platters were auto-matched with 99.4% suitability.',
    badge: 'Proximity Match',
    confidence: 'Top Priority'
  },
  {
    id: 'ai-ins-3',
    type: 'environmental',
    title: 'CSR Carbon Offset Milestone',
    description: 'Your organization has diverted 3,420 kg of food waste this quarter, preventing 8.55 tons of methane greenhouse gas emissions — equivalent to taking 2 gasoline cars off the road for a year.',
    badge: 'ESG Certificate Ready',
    confidence: 'Verified Impact'
  }
];

// --- 2. GLOBAL CONTEXT ---
const AppContext = createContext();

function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentRole, setCurrentRole] = useState('provider');
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS.provider);
  
  const [listings, setListings] = useState(() => {
    try {
      const saved = localStorage.getItem('foodconnect_listings');
      return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
    } catch(e) {
      return INITIAL_LISTINGS;
    }
  });

  const [trackedItem, setTrackedItem] = useState(() => {
    return listings.find(item => item.id === 'FNC-8403') || listings[0];
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Donation Claimed!',
      message: 'City Hope Shelter claimed your Mediterranean Lunch Buffet (35 kg).',
      time: '10m ago',
      read: false,
      type: 'success'
    },
    {
      id: 2,
      title: 'AI Freshness Advisory',
      message: 'Critical safe window alert: Executive Banquet requires pickup in under 45 mins.',
      time: '25m ago',
      read: false,
      type: 'warning'
    },
    {
      id: 3,
      title: 'Volunteer Driver Assigned',
      message: 'David Chen (EV Cargo Fleet) is en route to 428 Metro Boulevard.',
      time: '40m ago',
      read: true,
      type: 'info'
    }
  ]);

  const [toasts, setToasts] = useState([]);
  const [certificateItem, setCertificateItem] = useState(null);
  const [selectedQrItem, setSelectedQrItem] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('foodconnect_listings', JSON.stringify(listings));
    } catch(e) {}
  }, [listings]);

  const showToast = (message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const switchRole = (role) => {
    setCurrentRole(role);
    if (INITIAL_USERS[role]) {
      setCurrentUser(INITIAL_USERS[role]);
    }
    showToast(`Switched view to ${role.toUpperCase()} mode`, 'info');
  };

  const loginAs = (role) => {
    switchRole(role);
    if (role === 'provider') setCurrentPage('provider-dashboard');
    else if (role === 'ngo') setCurrentPage('ngo-marketplace');
    else if (role === 'volunteer') setCurrentPage('volunteer-portal');
    else if (role === 'admin') setCurrentPage('admin-portal');
  };

  const addFoodListing = (newListingData) => {
    const newId = `FNC-${Math.floor(1000 + Math.random() * 9000)}`;
    const co2Val = Number((newListingData.quantityKg * 2.5).toFixed(1));
    const waterVal = Number((newListingData.quantityKg * 40).toFixed(0));
    
    let urgency = 'MEDIUM';
    let urgencyColor = 'bg-blue-500';
    if (newListingData.category === 'Cooked Meals' || newListingData.shelfLifeHours <= 3) {
      urgency = 'CRITICAL';
      urgencyColor = 'bg-red-500';
    } else if (newListingData.shelfLifeHours <= 6) {
      urgency = 'HIGH';
      urgencyColor = 'bg-amber-500';
    } else if (newListingData.category === 'Bakery & Bread') {
      urgency = 'MEDIUM';
      urgencyColor = 'bg-blue-500';
    } else {
      urgency = 'LOW';
      urgencyColor = 'bg-emerald-500';
    }

    const createdListing = {
      id: newId,
      title: newListingData.title,
      providerId: currentUser.id || 'usr_prov_1',
      providerName: currentUser.orgName || 'The Grand Harvest Bistro',
      providerType: currentUser.type || 'Food Provider',
      address: newListingData.pickupAddress || currentUser.address,
      distanceKm: Number((1.2 + Math.random() * 3).toFixed(1)),
      category: newListingData.category,
      foodType: newListingData.foodType || newListingData.category,
      quantityKg: Number(newListingData.quantityKg),
      mealCount: Number(newListingData.mealCount || Math.round(newListingData.quantityKg * 2.2)),
      storageType: newListingData.storageType,
      dietary: newListingData.dietary || ['Vegetarian'],
      isVeg: newListingData.isVeg ?? true,
      allergens: newListingData.allergens || 'None declared',
      cookedAt: newListingData.cookedAt || 'Just now',
      expiresAt: newListingData.expiresAt || 'In 4 hours',
      remainingMinutes: (newListingData.shelfLifeHours || 4) * 60,
      urgencyScore: urgency,
      urgencyColor: urgencyColor,
      freshnessPct: 98,
      imageUrl: newListingData.imageUrl || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
      status: 'AVAILABLE',
      aiInsights: {
        shelfLifeEstimate: `Safe for consumption up to ${newListingData.shelfLifeHours || 4} hours with ${newListingData.storageType}.`,
        urgencyReason: `AI calculated ${urgency} priority based on food moisture, prep temperature, and ambient forecast.`,
        co2SavedKg: co2Val,
        waterSavedLiters: waterVal,
        matchedNgo: 'City Hope Community Shelter (Best Proximity & Capacity Match)',
      },
      claimedBy: null,
      tracking: null
    };

    setListings(prev => [createdListing, ...prev]);

    setNotifications(prev => [
      {
        id: Date.now(),
        title: 'New Surplus Listed!',
        message: `${createdListing.title} (${createdListing.quantityKg} kg) is now active for NGO discovery.`,
        time: 'Just now',
        read: false,
        type: 'success'
      },
      ...prev
    ]);

    showToast(`🎉 Donation "${createdListing.title}" listed successfully!`, 'success');
    
    if (window.confetti) {
      window.confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }

    return createdListing;
  };

  const claimFoodListing = (listingId, ngoDetails) => {
    setListings(prev => prev.map(item => {
      if (item.id === listingId) {
        const updated = {
          ...item,
          status: 'CLAIMED',
          claimedBy: {
            ngoName: ngoDetails?.orgName || 'City Hope Community Shelter',
            ngoAddress: ngoDetails?.address || '89 Mission Way, Central District',
            claimedAt: 'Just now',
            contact: ngoDetails?.contact || 'Sister Sarah (+1 555-876-5432)',
            beneficiaries: item.mealCount,
          },
          tracking: {
            step: 1,
            statusText: 'Claim Confirmed — Dispatching Volunteer Courier',
            driverName: 'David Chen (Rapid EV Fleet)',
            driverPhone: '+1 (555) 432-1098',
            driverVehicle: 'Electric Cargo Van (Temp Controlled)',
            pickupOtp: Math.floor(1000 + Math.random() * 9000).toString(),
            deliveryOtp: Math.floor(1000 + Math.random() * 9000).toString(),
            etaMinutes: 18,
            liveCoords: { lat: 37.7749, lng: -122.4194 }
          }
        };
        setTrackedItem(updated);
        return updated;
      }
      return item;
    }));

    setNotifications(prev => [
      {
        id: Date.now(),
        title: 'Donation Claimed!',
        message: `You successfully claimed listing #${listingId}. Courier dispatched.`,
        time: 'Just now',
        read: false,
        type: 'success'
      },
      ...prev
    ]);

    showToast('🚀 Food donation claimed! Pickup dispatch created.', 'success');
  };

  const updateDeliveryStep = (listingId, nextStep) => {
    setListings(prev => prev.map(item => {
      if (item.id === listingId && item.tracking) {
        let statusText = item.tracking.statusText;
        let newStatus = item.status;

        if (nextStep === 2) {
          statusText = 'Volunteer Driver En Route to Provider';
          newStatus = 'CLAIMED';
        } else if (nextStep === 3) {
          statusText = 'Food Picked Up — In Transit to Shelter';
          newStatus = 'IN_TRANSIT';
        } else if (nextStep === 4) {
          statusText = 'Successfully Delivered & Verified';
          newStatus = 'DELIVERED';
        }

        const updated = {
          ...item,
          status: newStatus,
          tracking: {
            ...item.tracking,
            step: nextStep,
            statusText: statusText,
          }
        };
        if (trackedItem && trackedItem.id === listingId) {
          setTrackedItem(updated);
        }
        return updated;
      }
      return item;
    }));

    if (nextStep === 4) {
      if (window.confetti) {
        window.confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      }
      showToast('✅ Food delivery verified & completed! Impact logged.', 'success');
    } else {
      showToast('📍 Delivery tracking status updated.', 'info');
    }
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      currentRole,
      switchRole,
      currentUser,
      setCurrentUser,
      loginAs,
      listings,
      setListings,
      trackedItem,
      setTrackedItem,
      notifications,
      setNotifications,
      toasts,
      showToast,
      certificateItem,
      setCertificateItem,
      selectedQrItem,
      setSelectedQrItem,
      addFoodListing,
      claimFoodListing,
      updateDeliveryStep,
      impactStats: PLATFORM_IMPACT_STATS,
      aiInsights: AI_DONATION_INSIGHTS,
      nearbyNgos: NEARBY_NGOS
    }}>
      {children}
    </AppContext.Provider>
  );
}

const useApp = () => useContext(AppContext);

// --- 3. COMPONENTS ---
function Navbar() {
  const { 
    currentPage, 
    setCurrentPage, 
    currentRole, 
    switchRole, 
    currentUser, 
    notifications,
    setNotifications 
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top Impact Banner */}
      <div className="bg-brand-700 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-brand-500/30 text-brand-100 border border-brand-400/30 text-[11px] font-semibold">
          ⚡ Live AI Redistribution
        </span>
        <span>Over <strong>148,920 kg</strong> of surplus food redirected to 140+ verified community shelters.</span>
        <button 
          onClick={() => setCurrentPage('impact-analytics')}
          className="underline hover:text-brand-200 font-bold ml-1 transition"
        >
          View Live Metrics &rarr;
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentPage('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 flex items-center justify-center shadow-md shadow-brand-700/20 group-hover:scale-105 transition">
              <span className="text-xl text-white">🌱</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl tracking-tight text-slate-900">
                  Food<span className="text-brand-700">Connect</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-brand-100 text-brand-800 rounded border border-brand-200">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-none font-medium">Surplus Food Rescue</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentPage('landing')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                currentPage === 'landing' ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setCurrentPage('provider-dashboard')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                currentPage === 'provider-dashboard' ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Provider Portal
            </button>

            <button
              onClick={() => setCurrentPage('ngo-marketplace')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                currentPage === 'ngo-marketplace' ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Discover Food
            </button>

            <button
              onClick={() => setCurrentPage('live-tracking')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                currentPage === 'live-tracking' ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Live Tracking
            </button>

            <button
              onClick={() => setCurrentPage('impact-analytics')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                currentPage === 'impact-analytics' ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Impact Hub
            </button>

            <button
              onClick={() => setCurrentPage('volunteer-portal')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                currentPage === 'volunteer-portal' ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Volunteers
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            
            {/* Quick Demo Role Switcher Badge */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition"
                title="Switch persona to test features"
              >
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                <span className="capitalize">{currentRole} Mode</span>
                <span className="text-[10px] text-slate-500">▼</span>
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Test As Role</p>
                  </div>
                  <button
                    onClick={() => { switchRole('provider'); setCurrentPage('provider-dashboard'); setShowRoleDropdown(false); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-brand-50 flex items-center justify-between text-slate-700"
                  >
                    <span>🍽️ <strong>Food Provider</strong></span>
                    {currentRole === 'provider' && <span className="text-brand-600 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => { switchRole('ngo'); setCurrentPage('ngo-marketplace'); setShowRoleDropdown(false); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-brand-50 flex items-center justify-between text-slate-700"
                  >
                    <span>🏢 <strong>NGO / Shelter</strong></span>
                    {currentRole === 'ngo' && <span className="text-brand-600 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => { switchRole('volunteer'); setCurrentPage('volunteer-portal'); setShowRoleDropdown(false); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-brand-50 flex items-center justify-between text-slate-700"
                  >
                    <span>🚚 <strong>Volunteer Courier</strong></span>
                    {currentRole === 'volunteer' && <span className="text-brand-600 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => { switchRole('admin'); setCurrentPage('admin-portal'); setShowRoleDropdown(false); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-brand-50 flex items-center justify-between text-slate-700"
                  >
                    <span>🛡️ <strong>Platform Admin</strong></span>
                    {currentRole === 'admin' && <span className="text-brand-600 font-bold">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              >
                <span className="text-base">🔔</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">Notifications</span>
                      <span className="text-xs bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full font-semibold">
                        {unreadCount} new
                      </span>
                    </div>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllRead}
                        className="text-xs text-brand-700 hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 px-2 py-1">
                    {notifications.map(n => (
                      <div 
                        key={n.id} 
                        className={`p-2.5 rounded-xl transition ${n.read ? 'bg-white opacity-80' : 'bg-brand-50/60 font-medium'}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Donate Button */}
            <button
              onClick={() => setCurrentPage('add-food')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-700 hover:bg-brand-800 text-white text-xs font-semibold shadow-sm transition active:scale-95"
            >
              <span>+</span>
              <span>Donate Food</span>
            </button>

            {/* Profile Avatar */}
            <button
              onClick={() => setCurrentPage('auth')}
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full border border-slate-200 hover:border-slate-300 bg-white transition"
            >
              <img 
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200'} 
                alt="Profile" 
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs font-medium text-slate-700 hidden lg:inline max-w-[100px] truncate">
                {currentUser?.name?.split(' ')[0] || 'Account'}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              ☰
            </button>

          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
          <button onClick={() => { setCurrentPage('landing'); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Home</button>
          <button onClick={() => { setCurrentPage('provider-dashboard'); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Provider Dashboard</button>
          <button onClick={() => { setCurrentPage('add-food'); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-brand-700 bg-brand-50">+ Add Surplus Food</button>
          <button onClick={() => { setCurrentPage('ngo-marketplace'); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Discover Food (NGO)</button>
          <button onClick={() => { setCurrentPage('live-tracking'); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Live Tracking</button>
          <button onClick={() => { setCurrentPage('impact-analytics'); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Impact Hub</button>
          <button onClick={() => { setCurrentPage('volunteer-portal'); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Volunteer Portal</button>
          <button onClick={() => { setCurrentPage('auth'); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Sign In / Switch Accounts</button>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const { setCurrentPage, loginAs } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/20 text-white font-bold text-xl">
                🌱
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                Food<span className="text-brand-400">Connect</span> <span className="text-xs px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-400/30">AI</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering food businesses and community shelters with AI predictive logistics. We eliminate edible food waste, fight urban hunger, and build climate resilience together.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-xs text-brand-400 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                99.4% AI Match Efficiency
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-300 border border-slate-700">
                🌿 372k+ kg CO₂ Prevented
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => setCurrentPage('landing')} className="hover:text-white transition">Home</button></li>
              <li><button onClick={() => setCurrentPage('provider-dashboard')} className="hover:text-white transition">Food Providers</button></li>
              <li><button onClick={() => setCurrentPage('ngo-marketplace')} className="hover:text-white transition">Shelters & NGOs</button></li>
              <li><button onClick={() => setCurrentPage('live-tracking')} className="hover:text-white transition">Live Logistics</button></li>
              <li><button onClick={() => setCurrentPage('volunteer-portal')} className="hover:text-white transition">Volunteer Drivers</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Demo Portals</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => loginAs('provider')} className="hover:text-brand-400 transition">🍽️ Restaurant Portal</button></li>
              <li><button onClick={() => loginAs('ngo')} className="hover:text-brand-400 transition">🏢 NGO Discovery Hub</button></li>
              <li><button onClick={() => loginAs('volunteer')} className="hover:text-brand-400 transition">🚚 Courier Dispatch</button></li>
              <li><button onClick={() => loginAs('admin')} className="hover:text-brand-400 transition">🛡️ City Impact Admin</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Impact & Trust</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><button onClick={() => setCurrentPage('impact-analytics')} className="hover:text-white transition">ESG & CSR Impact Report</button></li>
              <li className="hover:text-slate-200 cursor-pointer">Food Safety Compliance</li>
              <li className="hover:text-slate-200 cursor-pointer">Good Samaritan Protection</li>
              <li className="hover:text-slate-200 cursor-pointer">Cold-Chain Temperature Logs</li>
              <li className="hover:text-slate-200 cursor-pointer">Tax Deduction Certificates</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FoodConnect AI Platform. Built for Social Good & Zero Waste.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Food Safety Protocols</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

function ToastContainer() {
  const { toasts } = useApp();
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 text-xs sm:text-sm font-medium ${
            toast.type === 'success' ? 'bg-brand-900/95 text-white border-brand-500/40 shadow-glow-green' :
            toast.type === 'warning' ? 'bg-amber-900/95 text-white border-amber-500/40' :
            toast.type === 'error' ? 'bg-red-900/95 text-white border-red-500/40' :
            'bg-slate-900/95 text-white border-slate-600'
          }`}
        >
          <span className="text-base flex-shrink-0">
            {toast.type === 'success' ? '✅' : toast.type === 'warning' ? '⚠️' : toast.type === 'error' ? '❌' : '⚡'}
          </span>
          <span className="flex-1 leading-snug">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

function QrCodeModal() {
  const { selectedQrItem, setSelectedQrItem, showToast } = useApp();
  if (!selectedQrItem) return null;

  const copyPin = (pin) => {
    navigator.clipboard?.writeText(pin);
    showToast(`Copied Security PIN: ${pin}`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-center relative overflow-hidden">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="text-left">
            <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
              SECURE HANDOFF PROTOCOL
            </span>
            <h3 className="font-display font-bold text-slate-900 text-lg mt-1">Food Pickup Verification</h3>
          </div>
          <button 
            onClick={() => setSelectedQrItem(null)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
          >
            ✕
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 my-4 text-left border border-slate-200/80">
          <p className="text-xs font-bold text-slate-800 line-clamp-1">{selectedQrItem.title}</p>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
            <span>Listing: <strong>#{selectedQrItem.id}</strong></span>
            <span>Quantity: <strong>{selectedQrItem.quantityKg} kg ({selectedQrItem.mealCount} meals)</strong></span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-white border-2 border-dashed border-slate-200 rounded-2xl my-2">
          <div className="w-48 h-48 bg-slate-950 p-3 rounded-xl flex flex-col items-center justify-center relative shadow-inner">
            <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="currentColor">
              <rect x="5" y="5" width="28" height="28" fill="white" rx="3" />
              <rect x="9" y="9" width="20" height="20" fill="black" rx="2" />
              <rect x="13" y="13" width="12" height="12" fill="white" rx="1" />
              <rect x="67" y="5" width="28" height="28" fill="white" rx="3" />
              <rect x="71" y="9" width="20" height="20" fill="black" rx="2" />
              <rect x="75" y="13" width="12" height="12" fill="white" rx="1" />
              <rect x="5" y="67" width="28" height="28" fill="white" rx="3" />
              <rect x="9" y="71" width="20" height="20" fill="black" rx="2" />
              <rect x="13" y="75" width="12" height="12" fill="white" rx="1" />
              <rect x="38" y="10" width="8" height="8" fill="white" />
              <rect x="50" y="10" width="8" height="8" fill="white" />
              <rect x="38" y="24" width="8" height="8" fill="white" />
              <rect x="50" y="36" width="8" height="8" fill="white" />
              <rect x="10" y="40" width="8" height="8" fill="white" />
              <rect x="22" y="40" width="8" height="8" fill="white" />
              <rect x="38" y="50" width="24" height="8" fill="white" />
              <rect x="70" y="42" width="8" height="8" fill="white" />
              <rect x="82" y="42" width="8" height="8" fill="white" />
              <rect x="70" y="56" width="18" height="8" fill="white" />
              <rect x="42" y="70" width="14" height="14" fill="white" />
              <rect x="65" y="75" width="24" height="8" fill="white" />
              <rect x="75" y="88" width="14" height="6" fill="white" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-[10px] font-bold border-2 border-white shadow">
                AI
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">Scan with Driver App during pickup handoff</p>
        </div>

        <div className="mt-4">
          <p className="text-xs text-slate-400 font-medium">Or provide 4-Digit Handover PIN to Courier:</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="px-5 py-2.5 rounded-xl bg-brand-50 border border-brand-300 text-brand-900 font-mono font-extrabold text-2xl tracking-widest shadow-sm">
              {selectedQrItem.tracking?.pickupOtp || '8492'}
            </div>
            <button
              onClick={() => copyPin(selectedQrItem.tracking?.pickupOtp || '8492')}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              title="Copy PIN"
            >
              📋
            </button>
          </div>
        </div>

        <button
          onClick={() => setSelectedQrItem(null)}
          className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow transition"
        >
          Done / Close
        </button>

      </div>
    </div>
  );
}

function ImpactCertificateModal() {
  const { certificateItem, setCertificateItem, showToast } = useApp();
  if (!certificateItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full p-8 relative my-8">
        
        <button 
          onClick={() => setCertificateItem(null)}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
        >
          ✕
        </button>

        <div className="border-4 border-double border-brand-700/60 p-8 rounded-2xl bg-gradient-to-b from-white via-brand-50/20 to-white relative">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold border border-brand-200 uppercase tracking-widest">
              🌿 OFFICIAL CSR & ESG FOOD RESCUE RECORD
            </div>
            
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight pt-2">
              CERTIFICATE OF FOOD REDISTRIBUTION
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Issued by FoodConnect AI National Social Impact Infrastructure
            </p>
          </div>

          <div className="my-6 text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">This certifies that</p>
            <h3 className="text-xl sm:text-2xl font-black text-brand-800 font-display mt-1">
              {certificateItem.orgName || 'The Grand Harvest Bistro'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{certificateItem.address || '428 Metro Boulevard, Downtown'}</p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 text-center leading-relaxed max-w-lg mx-auto">
            Has successfully diverted and donated surplus edible food for immediate humanitarian redistribution to verified community shelters and hunger relief centers.
          </p>

          <div className="grid grid-cols-3 gap-3 my-6 text-center">
            <div className="bg-white rounded-xl p-3 border border-brand-200 shadow-sm">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Food Rescued</span>
              <span className="text-lg sm:text-xl font-black text-brand-700 font-display">
                {certificateItem.quantityKg || '3,420'} kg
              </span>
            </div>
            <div className="bg-white rounded-xl p-3 border border-brand-200 shadow-sm">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Meals Served</span>
              <span className="text-lg sm:text-xl font-black text-brand-700 font-display">
                {certificateItem.mealCount || '7,520'}
              </span>
            </div>
            <div className="bg-white rounded-xl p-3 border border-brand-200 shadow-sm">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">CO₂ Prevented</span>
              <span className="text-lg sm:text-xl font-black text-brand-700 font-display">
                {certificateItem.co2Saved || '8,550'} kg
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-left text-xs text-slate-500">
            <div>
              <p className="font-bold text-slate-800">Verification Hash:</p>
              <p className="font-mono text-[10px] text-slate-400">SHA256-FNC-9984-ESG-AUTH-2026</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800">Good Samaritan Safe Harbor:</p>
              <p className="text-[10px] text-brand-700 font-semibold">100% Verified Non-Liability Compliant</p>
            </div>
          </div>

        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            🖨️ Print Certificate
          </button>
          <button
            onClick={() => showToast('📄 CSR Impact Certificate PDF generated & downloaded!', 'success')}
            className="px-5 py-2 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-md shadow-brand-700/20 transition active:scale-95"
          >
            📥 Download Official PDF
          </button>
        </div>

      </div>
    </div>
  );
}

// --- 4. PAGES ---
function LandingPage() {
  const { setCurrentPage, loginAs, impactStats, nearbyNgos } = useApp();

  const [sandboxFood, setSandboxFood] = useState('Cooked Chicken Curry & Basmati Rice');
  const [sandboxQuantity, setSandboxQuantity] = useState(40);
  const [sandboxCategory, setSandboxCategory] = useState('Cooked Meals');
  const [sandboxResult, setSandboxResult] = useState({
    urgency: 'HIGH',
    urgencyColor: 'text-amber-600 bg-amber-50 border-amber-200',
    shelfLife: '3.5 Hours remaining',
    co2Saved: '100.0 kg',
    waterSaved: '1,600 L',
    matchedNgo: 'City Hope Community Shelter (2.3 km away)',
    confidence: '99.4%'
  });

  const runAiSandbox = (food, qty, cat) => {
    setSandboxFood(food);
    setSandboxQuantity(qty);
    setSandboxCategory(cat);

    let urg = 'MEDIUM';
    let urgCol = 'text-blue-600 bg-blue-50 border-blue-200';
    let shelf = '6 Hours remaining';

    if (cat === 'Cooked Meals') {
      urg = qty > 30 ? 'CRITICAL' : 'HIGH';
      urgCol = urg === 'CRITICAL' ? 'text-red-600 bg-red-50 border-red-200' : 'text-amber-600 bg-amber-50 border-amber-200';
      shelf = '2.5 - 4 Hours remaining';
    } else if (cat === 'Bakery') {
      urg = 'MEDIUM';
      urgCol = 'text-blue-600 bg-blue-50 border-blue-200';
      shelf = '18 Hours remaining';
    } else {
      urg = 'LOW';
      urgCol = 'text-emerald-600 bg-emerald-50 border-emerald-200';
      shelf = '48+ Hours remaining';
    }

    setSandboxResult({
      urgency: urg,
      urgencyColor: urgCol,
      shelfLife: shelf,
      co2Saved: (qty * 2.5).toFixed(1) + ' kg',
      waterSaved: (qty * 40).toLocaleString() + ' L',
      matchedNgo: `${nearbyNgos[0]?.name || 'City Hope Shelter'} (${Math.round(qty * 2.2)} meals needed)`,
      confidence: '99.4%'
    });
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-100/60 to-transparent pointer-events-none -z-10 rounded-full blur-3xl opacity-70"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-semibold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-600 animate-ping"></span>
                <span>AI-Powered Zero Hunger & Waste Reduction Engine</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1]">
                Turning Surplus Food Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 to-brand-500">Hope.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
                AI-powered food redistribution connecting restaurants, hostels, event caterers, and supermarkets with nearby verified NGOs and shelters in real time.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setCurrentPage('add-food')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-base shadow-lg shadow-brand-700/25 transition transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>🍽️ Donate Food Now</span>
                  <span>&rarr;</span>
                </button>

                <button
                  onClick={() => setCurrentPage('ngo-marketplace')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-300 shadow-sm transition flex items-center justify-center gap-2"
                >
                  <span>🏢 Find Surplus Food (NGO)</span>
                </button>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-400">Quick Test Portals:</span>
                <button onClick={() => loginAs('provider')} className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition">Restaurant Demo</button>
                <button onClick={() => loginAs('ngo')} className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition">Shelter Demo</button>
                <button onClick={() => loginAs('volunteer')} className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition">Driver Dispatch</button>
                <button onClick={() => loginAs('admin')} className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition">City Admin</button>
              </div>

            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl p-3 bg-gradient-to-br from-slate-100 to-slate-200/50 shadow-2xl border border-slate-200">
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800" 
                    alt="Volunteers organizing healthy hot meals" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-brand-500 text-white w-fit mb-1">
                      Live AI Dispatch
                    </span>
                    <h3 className="font-display font-bold text-lg leading-snug">
                      75 Hot Meals Dispatched from Grand Harvest Bistro
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Matched to City Hope Shelter &bull; Arrival in 12 mins
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-lg">⚡</div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Avg Response Time</p>
                    <p className="text-sm font-extrabold text-slate-900 font-display">28 Minutes Pickup</p>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-200 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">🌿</div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400">Zero Edible Waste</p>
                    <p className="text-xs font-bold text-slate-800">100% Verified Safe</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 shadow-card border border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="pt-4 md:pt-0">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-brand-700">{impactStats.totalKgSaved.toLocaleString()} <span className="text-xl text-slate-400">kg</span></p>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Surplus Food Rescued</p>
          </div>
          <div className="pt-4 md:pt-0">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-brand-700">{impactStats.totalMealsServed.toLocaleString()}</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Nutritious Meals Served</p>
          </div>
          <div className="pt-4 md:pt-0">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-brand-700">{impactStats.activeNgosCount}+</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Verified Shelter Partners</p>
          </div>
          <div className="pt-4 md:pt-0">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-brand-700">{impactStats.totalCo2PreventedKg.toLocaleString()} <span className="text-xl text-slate-400">kg</span></p>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">CO₂ Emissions Diverted</p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE AI DEMO SANDBOX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-400/30 uppercase tracking-wider">
                ⚡ Try Interactive AI Sandbox
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white leading-tight">
                Experience AI Food Urgency & Matching Engine
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Test how our AI categorizes surplus dishes, computes safe consumption windows, calculates carbon offsets, and assigns priority shelters instantly.
              </p>

              <div className="pt-2">
                <p className="text-xs text-slate-400 font-semibold mb-2">Click Quick Presets to Test:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => runAiSandbox('Corporate Buffet: Dal Makhani & Biryani', 55, 'Cooked Meals')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
                  >
                    🍛 Banquet Hot Curry (55 kg)
                  </button>
                  <button
                    onClick={() => runAiSandbox('Artisan Brioche & Croissants', 18, 'Bakery')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
                  >
                    🥐 Fresh Bakery (18 kg)
                  </button>
                  <button
                    onClick={() => runAiSandbox('Hydroponic Greens & Veggies', 45, 'Produce')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
                  >
                    🥗 Farm Produce (45 kg)
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-mono text-slate-400 ml-2">FoodConnect-AI-Engine-v3.4</span>
                </div>
                <span className="text-xs text-brand-400 font-mono font-semibold">Status: ONLINE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Food Item Name</label>
                  <input
                    type="text"
                    value={sandboxFood}
                    onChange={(e) => runAiSandbox(e.target.value, sandboxQuantity, sandboxCategory)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Quantity (Kilograms)</label>
                  <input
                    type="number"
                    value={sandboxQuantity}
                    onChange={(e) => runAiSandbox(sandboxFood, Number(e.target.value), sandboxCategory)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">AI Urgency Rating:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${sandboxResult.urgencyColor}`}>
                    {sandboxResult.urgency} PRIORITY
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center">
                  <div className="bg-slate-900 p-2 rounded-lg">
                    <p className="text-[10px] text-slate-500">Safe Window</p>
                    <p className="text-xs font-bold text-white mt-0.5">{sandboxResult.shelfLife}</p>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg">
                    <p className="text-[10px] text-slate-500">CO₂ Avoided</p>
                    <p className="text-xs font-bold text-emerald-400 mt-0.5">{sandboxResult.co2Saved}</p>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg">
                    <p className="text-[10px] text-slate-500">Water Saved</p>
                    <p className="text-xs font-bold text-blue-400 mt-0.5">{sandboxResult.waterSaved}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <p className="text-[11px] text-slate-400">
                    🎯 Top Proximity NGO Match: <strong className="text-white">{sandboxResult.matchedNgo}</strong>
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentPage('add-food')}
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span>Post Real Donation With This AI &rarr;</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Seamless 4-Step Redistribution
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            How FoodConnect AI Solves Food Waste
          </h2>
          <p className="text-slate-600 text-base">
            From kitchen surplus to community dining tables in under 45 minutes through smart algorithmic matching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 hover:shadow-card-hover transition">
            <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xl font-display mb-4">1</div>
            <h3 className="font-display font-bold text-slate-900 text-lg mb-2">Provider Lists Surplus</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Restaurants or caterers log surplus food in seconds with category, quantity, and storage conditions.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 hover:shadow-card-hover transition">
            <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xl font-display mb-4">2</div>
            <h3 className="font-display font-bold text-slate-900 text-lg mb-2">AI Analyzes & Matches</h3>
            <p className="text-xs text-slate-500 leading-relaxed">AI evaluates perishability and temperature, alerting the closest verified shelter with meal deficits.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 hover:shadow-card-hover transition">
            <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xl font-display mb-4">3</div>
            <h3 className="font-display font-bold text-slate-900 text-lg mb-2">Rapid Volunteer Pickup</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Volunteers receive GPS routes and verify pickup using dynamic 4-digit PIN and QR codes.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 hover:shadow-card-hover transition">
            <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xl font-display mb-4">4</div>
            <h3 className="font-display font-bold text-slate-900 text-lg mb-2">Verified ESG Impact</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Recipient confirms delivery. Providers receive automated CSR tax exemption certificates and carbon logs.</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-800 via-brand-700 to-brand-900 rounded-3xl p-10 sm:p-14 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Ready to Turn Your Surplus Food Into Smiles?
            </h2>
            <p className="text-brand-100 text-base sm:text-lg">
              Join 380+ restaurants, bakeries, hostels and 140+ community shelters already making a tangible impact daily.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setCurrentPage('add-food')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-brand-50 text-brand-900 font-extrabold text-base shadow-lg transition active:scale-95"
              >
                Start Donating Food Today
              </button>
              <button
                onClick={() => setCurrentPage('ngo-marketplace')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-900/60 hover:bg-brand-900 text-white font-bold text-base border border-brand-400/40 transition"
              >
                Register Your NGO / Shelter
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function AuthPage() {
  const { loginAs, showToast } = useApp();
  const [tab, setTab] = useState('login');
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState('provider');
  const [regOrg, setRegOrg] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      showToast('Please enter both email and password.', 'error');
      return;
    }
    let role = 'provider';
    if (loginEmail.includes('ngo') || loginEmail.includes('shelter')) role = 'ngo';
    else if (loginEmail.includes('driver') || loginEmail.includes('volunteer')) role = 'volunteer';
    else if (loginEmail.includes('admin')) role = 'admin';

    showToast(`Welcome back! Logged in as ${role.toUpperCase()}`, 'success');
    loginAs(role);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword || !regOrg) {
      showToast('Please fill in all required registration fields.', 'error');
      return;
    }
    if (!termsAgreed) {
      showToast('Please agree to Food Safety and Platform Terms.', 'warning');
      return;
    }
    showToast(`🎉 Registration successful for ${regOrg}!`, 'success');
    loginAs(regRole);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8 relative overflow-hidden">
        
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-500 items-center justify-center text-white font-bold text-2xl shadow-md shadow-brand-700/20 mb-1">
            🌱
          </div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            {tab === 'login' ? 'Welcome to FoodConnect AI' : 'Join the Zero-Waste Movement'}
          </h2>
          <p className="text-xs text-slate-500">
            {tab === 'login' ? 'Sign in to access your donation portal' : 'Register your restaurant, shelter or volunteer account'}
          </p>
        </div>

        <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              tab === 'login' ? 'bg-white text-brand-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              tab === 'register' ? 'bg-white text-brand-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="mb-6 p-3 bg-brand-50/70 rounded-2xl border border-brand-200/80">
          <p className="text-[11px] font-bold text-brand-900 mb-2">⚡ Quick 1-Click Demo Logins:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => loginAs('provider')}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-brand-100 text-[11px] font-semibold text-slate-800 border border-brand-200 transition text-left"
            >
              🍽️ Provider (Restaurant)
            </button>
            <button
              type="button"
              onClick={() => loginAs('ngo')}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-brand-100 text-[11px] font-semibold text-slate-800 border border-brand-200 transition text-left"
            >
              🏢 NGO / Shelter
            </button>
            <button
              type="button"
              onClick={() => loginAs('volunteer')}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-brand-100 text-[11px] font-semibold text-slate-800 border border-brand-200 transition text-left"
            >
              🚚 Courier Driver
            </button>
            <button
              type="button"
              onClick={() => loginAs('admin')}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-brand-100 text-[11px] font-semibold text-slate-800 border border-brand-200 transition text-left"
            >
              🛡️ City Admin
            </button>
          </div>
        </div>

        {tab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="name@organization.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-600 focus:bg-white transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => showToast('Password reset link sent to email.', 'info')}
                  className="text-[11px] text-brand-700 hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-600 focus:bg-white transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
              />
              <label htmlFor="remember" className="ml-2 text-xs text-slate-600">Keep me signed in</label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-md shadow-brand-700/20 transition active:scale-95"
            >
              Sign In to FoodConnect
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Account Type</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRegRole('provider')}
                  className={`py-2 text-[11px] font-bold rounded-lg border text-center transition ${
                    regRole === 'provider' ? 'bg-brand-50 border-brand-500 text-brand-800' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  🍽️ Provider
                </button>
                <button
                  type="button"
                  onClick={() => setRegRole('ngo')}
                  className={`py-2 text-[11px] font-bold rounded-lg border text-center transition ${
                    regRole === 'ngo' ? 'bg-brand-50 border-brand-500 text-brand-800' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  🏢 NGO
                </button>
                <button
                  type="button"
                  onClick={() => setRegRole('volunteer')}
                  className={`py-2 text-[11px] font-bold rounded-lg border text-center transition ${
                    regRole === 'volunteer' ? 'bg-brand-50 border-brand-500 text-brand-800' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  🚚 Courier
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Organization</label>
                <input
                  type="text"
                  required
                  value={regOrg}
                  onChange={(e) => setRegOrg(e.target.value)}
                  placeholder="e.g. Harvest Bistro"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Work Email</label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="contact@organization.org"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Password</label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Create secure password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div className="flex items-start pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
              />
              <label htmlFor="terms" className="ml-2 text-[11px] text-slate-600 leading-tight">
                I agree to the FoodConnect Safe Food Standards & Good Samaritan terms.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition active:scale-95 mt-2"
            >
              Create Account & Verify
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

function ProviderDashboard() {
  const { 
    currentUser, 
    listings, 
    setCurrentPage, 
    setSelectedQrItem, 
    setCertificateItem, 
    setTrackedItem, 
    aiInsights,
  } = useApp();

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const myListings = listings.filter(item => 
    item.providerId === currentUser.id || item.providerName.includes('Harvest') || item.providerName.includes('Grand')
  );

  const filteredListings = myListings.filter(item => {
    if (activeTab === 'available' && item.status !== 'AVAILABLE') return false;
    if (activeTab === 'claimed' && item.status !== 'CLAIMED') return false;
    if (activeTab === 'in_transit' && item.status !== 'IN_TRANSIT') return false;
    if (activeTab === 'delivered' && item.status !== 'DELIVERED') return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const totalKg = myListings.reduce((sum, item) => sum + (item.quantityKg || 0), 0);
  const activeCount = myListings.filter(i => i.status === 'AVAILABLE' || i.status === 'CLAIMED' || i.status === 'IN_TRANSIT').length;
  const completedCount = myListings.filter(i => i.status === 'DELIVERED').length;
  const pendingPickupCount = myListings.filter(i => i.status === 'CLAIMED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img 
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200'} 
            alt="Provider Logo" 
            className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500/20 shadow"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-2xl text-slate-900">
                {currentUser?.orgName || 'The Grand Harvest Bistro'}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 text-xs font-bold border border-brand-200">
                Verified Provider
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Logged in as {currentUser?.name} &bull; {currentUser?.address}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setCertificateItem({
              orgName: currentUser?.orgName || 'The Grand Harvest Bistro',
              address: currentUser?.address || '428 Metro Boulevard',
              quantityKg: totalKg,
              mealCount: Math.round(totalKg * 2.2),
              co2Saved: (totalKg * 2.5).toFixed(0)
            })}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition"
          >
            📜 CSR Certificate
          </button>
          
          <button
            onClick={() => setCurrentPage('add-food')}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-md shadow-brand-700/20 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="text-base">+</span>
            <span>Add Surplus Food</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Rescued</span>
            <span className="text-lg">⚖️</span>
          </div>
          <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">{totalKg} <span className="text-sm font-semibold text-slate-400">kg</span></p>
          <p className="text-[11px] text-brand-700 font-semibold mt-1">≈ {Math.round(totalKg * 2.2)} meals served</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Listings</span>
            <span className="text-lg">📦</span>
          </div>
          <p className="font-display font-extrabold text-2xl sm:text-3xl text-brand-700">{activeCount}</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Live in marketplace</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Awaiting Pickup</span>
            <span className="text-lg">🚚</span>
          </div>
          <p className="font-display font-extrabold text-2xl sm:text-3xl text-amber-600">{pendingPickupCount}</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Couriers assigned</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
            <span className="text-lg">✅</span>
          </div>
          <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">{completedCount}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">100% Verified Delivery</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-brand-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse"></span>
            <h3 className="font-display font-bold text-sm text-white">AI Real-Time Optimization Insights</h3>
          </div>
          <span className="text-[11px] font-mono text-brand-300">Predictive Engine: Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight) => (
            <div key={insight.id} className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-500/30 text-brand-200 border border-brand-400/30">{insight.badge}</span>
                <span className="text-[10px] text-slate-400 font-mono">{insight.confidence}</span>
              </div>
              <h4 className="font-display font-bold text-xs text-white leading-snug">{insight.title}</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-card border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-xl text-slate-900">Manage Surplus Food Listings</h2>
            <p className="text-xs text-slate-500 mt-0.5">Track claims, courier handoffs, and verification OTPs</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search your listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-600"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
          {['all', 'available', 'claimed', 'in_transit', 'delivered'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                activeTab === tab ? 'bg-brand-700 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">🍲</div>
            <p className="text-sm font-semibold text-slate-700">No surplus food listings match this filter.</p>
            <button onClick={() => setCurrentPage('add-food')} className="px-4 py-2 rounded-xl bg-brand-700 text-white text-xs font-bold">+ List Surplus Food Now</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredListings.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow ${item.urgencyColor}`}>
                        {item.urgencyScore} URGENCY
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-white font-bold">
                        #{item.id}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow ${
                        item.status === 'AVAILABLE' ? 'bg-emerald-500 text-white' :
                        item.status === 'CLAIMED' ? 'bg-amber-500 text-white' :
                        item.status === 'IN_TRANSIT' ? 'bg-blue-600 text-white' :
                        'bg-slate-800 text-white'
                      }`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-display font-bold text-slate-900 text-base leading-snug line-clamp-2">{item.title}</h3>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">QUANTITY</span>
                        <strong className="text-slate-800">{item.quantityKg} kg</strong> ({item.mealCount} meals)
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">STORAGE</span>
                        <span className="text-slate-800 truncate block">{item.storageType}</span>
                      </div>
                    </div>

                    <div className="bg-brand-50/70 rounded-xl p-2.5 border border-brand-200/80 text-[11px] text-brand-900">
                      <span className="font-bold">⚡ AI Safe Window:</span> {item.aiInsights.shelfLifeEstimate}
                    </div>

                    {item.claimedBy && (
                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-xs">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Claimed By:</p>
                        <p className="font-bold text-slate-800">{item.claimedBy.ngoName}</p>
                        <p className="text-[11px] text-slate-500">{item.claimedBy.contact}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center gap-2 border-t border-slate-100 mt-2">
                  {item.status === 'CLAIMED' || item.status === 'IN_TRANSIT' ? (
                    <>
                      <button
                        onClick={() => setSelectedQrItem(item)}
                        className="flex-1 py-2 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition"
                      >
                        📱 Handoff PIN / QR
                      </button>
                      <button
                        onClick={() => { setTrackedItem(item); setCurrentPage('live-tracking'); }}
                        className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                      >
                        📍 Track Courier
                      </button>
                    </>
                  ) : item.status === 'DELIVERED' ? (
                    <button
                      onClick={() => setCertificateItem({
                        orgName: currentUser?.orgName || item.providerName,
                        address: item.address,
                        quantityKg: item.quantityKg,
                        mealCount: item.mealCount,
                        co2Saved: item.aiInsights.co2SavedKg
                      })}
                      className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
                    >
                      📜 View Verified CSR Certificate
                    </button>
                  ) : (
                    <div className="w-full text-center py-1.5 text-xs font-medium text-slate-500 bg-slate-50 rounded-xl">
                      Waiting for nearby NGO claim...
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

function AddFoodPage() {
  const { currentUser, addFoodListing, setCurrentPage, nearbyNgos, showToast } = useApp();

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cooked Meals');
  const [quantityKg, setQuantityKg] = useState(25);
  const [mealCount, setMealCount] = useState(55);
  const [storageType, setStorageType] = useState('Hot Insulated Containers (65°C)');
  const [dietary, setDietary] = useState(['Vegetarian']);
  const [isVeg, setIsVeg] = useState(true);
  const [shelfLifeHours, setShelfLifeHours] = useState(4);
  const [pickupAddress, setPickupAddress] = useState(currentUser?.address || '428 Metro Boulevard, Downtown');
  const [contactName, setContactName] = useState(currentUser?.name || 'Chef Marcus Vance');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '+1 (555) 234-5678');
  const [instructions, setInstructions] = useState('Please pick up from back kitchen loading bay.');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600');

  const selectCategoryPreset = (cat) => {
    setCategory(cat);
    if (cat === 'Cooked Meals') {
      setStorageType('Hot Insulated Containers (65°C)');
      setShelfLifeHours(3.5);
      setImageUrl('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600');
    } else if (cat === 'Bakery & Bread') {
      setStorageType('Dry Ambient Storage (20°C)');
      setShelfLifeHours(24);
      setImageUrl('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600');
    } else if (cat === 'Fresh Produce') {
      setStorageType('Chilled Storage (4°C)');
      setShelfLifeHours(72);
      setImageUrl('https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=600');
    } else {
      setStorageType('Refrigerated (4°C)');
      setShelfLifeHours(48);
      setImageUrl('https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=600');
    }
  };

  const toggleDietary = (tag) => {
    if (dietary.includes(tag)) setDietary(dietary.filter(t => t !== tag));
    else setDietary([...dietary, tag]);
  };

  const handleQtyChange = (val) => {
    const qty = Number(val);
    setQuantityKg(qty);
    setMealCount(Math.round(qty * 2.2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      showToast('Please enter a descriptive food title.', 'error');
      return;
    }

    addFoodListing({
      title,
      category,
      quantityKg,
      mealCount,
      storageType,
      dietary,
      isVeg,
      shelfLifeHours,
      pickupAddress,
      imageUrl,
      cookedAt: 'Today, Just Now',
      expiresAt: `Today, in ${shelfLifeHours} hours`
    });

    setCurrentPage('provider-dashboard');
  };

  const aiUrgency = category === 'Cooked Meals' ? (shelfLifeHours <= 3 ? 'CRITICAL' : 'HIGH') : (shelfLifeHours <= 12 ? 'MEDIUM' : 'LOW');
  const co2Preview = (quantityKg * 2.5).toFixed(1);
  const waterPreview = (quantityKg * 40).toLocaleString();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold border border-brand-200 uppercase tracking-wider">
          🤖 AI-Assisted Donation Flow
        </div>
        <h1 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
          List Surplus Food For Rescue
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          AI will calculate urgency, verify food safety windows, and notify nearby shelters in real time.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-8">
        <div className={`p-3 rounded-2xl border text-center transition ${step >= 1 ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
          <span className="text-xs">Step 1: Food Details</span>
        </div>
        <div className={`p-3 rounded-2xl border text-center transition ${step >= 2 ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
          <span className="text-xs">Step 2: AI Urgency</span>
        </div>
        <div className={`p-3 rounded-2xl border text-center transition ${step >= 3 ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
          <span className="text-xs">Step 3: Pickup Handoff</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-card border border-slate-200 p-6 sm:p-8 space-y-6">
        
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Select Food Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'Cooked Meals', label: 'Cooked / Buffet', icon: '🍛' },
                  { id: 'Bakery & Bread', label: 'Bakery & Bread', icon: '🥐' },
                  { id: 'Fresh Produce', label: 'Fresh Veggies', icon: '🥗' },
                  { id: 'Packaged Goods', label: 'Dairy & Packaged', icon: '🥛' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => selectCategoryPreset(cat.id)}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                      category === cat.id ? 'bg-brand-50 border-brand-600 shadow-sm text-brand-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-xs">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Food Title / Description *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Executive Lunch Buffet: Steamed Rice, Vegetable Curry & Paneer"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-brand-600 focus:bg-white transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Surplus Quantity (kg)</label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={quantityKg}
                  onChange={(e) => handleQtyChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Estimated Servings</label>
                <input
                  type="number"
                  min="1"
                  value={mealCount}
                  onChange={(e) => setMealCount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Storage Condition</label>
              <input
                type="text"
                value={storageType}
                onChange={(e) => setStorageType(e.target.value)}
                placeholder="e.g. Hot Chafing Dish (65°C+) / Sealed Thermos"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Dietary Specifications</label>
              <div className="flex flex-wrap gap-2">
                {['Vegetarian', 'Pure Veg', 'Non-Veg', 'Vegan', 'Halal', 'Nut-Free', 'Gluten-Free'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleDietary(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                      dietary.includes(tag) ? 'bg-brand-700 border-brand-700 text-white font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {tag} {dietary.includes(tag) ? '✓' : '+'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  if (!title) { showToast('Please enter a food title to proceed.', 'error'); return; }
                  setStep(2);
                }}
                className="px-6 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition flex items-center gap-2"
              >
                <span>Continue to AI Analysis &rarr;</span>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-brand-400 animate-ping"></span>
                  <h3 className="font-display font-bold text-base text-white">AI Spoilage & Freshness Matrix</h3>
                </div>
                <span className="text-xs font-mono text-brand-300">Model Accuracy: 99.4%</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-800/80 rounded-xl p-3">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Urgency Score</span>
                  <p className={`text-lg font-bold font-mono mt-1 ${aiUrgency === 'CRITICAL' ? 'text-red-400' : aiUrgency === 'HIGH' ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {aiUrgency}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">High priority shelter match</p>
                </div>

                <div className="bg-slate-800/80 rounded-xl p-3">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Carbon Offset</span>
                  <p className="text-lg font-bold text-emerald-400 font-mono mt-1">{co2Preview} kg CO₂</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Methane prevention</p>
                </div>

                <div className="bg-slate-800/80 rounded-xl p-3">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Water Saved</span>
                  <p className="text-lg font-bold text-blue-400 font-mono mt-1">{waterPreview} L</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Resource conservation</p>
                </div>
              </div>

              <div className="bg-slate-800/80 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Safe Consumption Window (Hours):</span>
                  <span className="font-bold text-brand-400 font-mono">{shelfLifeHours} Hours</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="48"
                  value={shelfLifeHours}
                  onChange={(e) => setShelfLifeHours(Number(e.target.value))}
                  className="w-full accent-brand-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-brand-50/70 rounded-2xl p-5 border border-brand-200 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 bg-brand-100 px-2 py-0.5 rounded border border-brand-300">
                🎯 Instant Proximity Matches
              </span>
              <h4 className="font-display font-bold text-sm text-brand-950">
                Recommended Shelters Ready to Accept This Surplus:
              </h4>

              <div className="space-y-2">
                {nearbyNgos.slice(0, 2).map((ngo) => (
                  <div key={ngo.id} className="bg-white rounded-xl p-3 border border-brand-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs text-slate-900">{ngo.name}</p>
                      <p className="text-[11px] text-slate-500">{ngo.distanceKm} km away &bull; Needs {ngo.mealsNeededToday} meals</p>
                    </div>
                    <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
                      99% Match
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button type="button" onClick={() => setStep(1)} className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold">&larr; Back</button>
              <button type="button" onClick={() => setStep(3)} className="px-6 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition">Continue to Pickup Logistics &rarr;</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Contact Person Name</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Direct Phone Number</label>
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Exact Pickup Address</label>
              <input
                type="text"
                required
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Driver Instructions / Bay Notes</label>
              <textarea
                rows="3"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Ring bell at delivery gate #2. Containers already packed."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              ></textarea>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-1">
              <p className="font-bold text-slate-800 text-sm">{title}</p>
              <p className="text-slate-600">Quantity: <strong>{quantityKg} kg ({mealCount} meals)</strong> &bull; Category: <strong>{category}</strong></p>
              <p className="text-slate-600">Safe window: <strong>{shelfLifeHours} hours</strong> &bull; AI Priority: <strong className="text-brand-700">{aiUrgency}</strong></p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button type="button" onClick={() => setStep(2)} className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold">&larr; Back</button>
              <button type="submit" className="px-8 py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-sm font-extrabold shadow-lg shadow-brand-700/25 transition transform active:scale-95">
                🚀 Publish & Dispatch Surplus
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}

function NgoMarketplacePage() {
  const { 
    listings, 
    claimFoodListing, 
    currentUser, 
    setCurrentPage, 
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [urgencyFilter, setUrgencyFilter] = useState('ALL');
  const [maxDistance, setMaxDistance] = useState(10);
  const [dietaryVegOnly, setDietaryVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClaimListing, setSelectedClaimListing] = useState(null);
  const [claimVolunteerOption, setClaimVolunteerOption] = useState('rapid_fleet');

  const availableListings = listings.filter(item => item.status === 'AVAILABLE');

  const filteredListings = availableListings.filter(item => {
    if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;
    if (urgencyFilter !== 'ALL' && item.urgencyScore !== urgencyFilter) return false;
    if (item.distanceKm > maxDistance) return false;
    if (dietaryVegOnly && !item.isVeg) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && !item.providerName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleClaimConfirm = () => {
    if (!selectedClaimListing) return;

    claimFoodListing(selectedClaimListing.id, {
      orgName: currentUser.orgName || 'City Hope Community Shelter',
      address: currentUser.address || '89 Mission Way, Central District',
      contact: currentUser.name + ` (${currentUser.phone})`,
      volunteerOption: claimVolunteerOption,
    });

    setSelectedClaimListing(null);
    setCurrentPage('live-tracking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold border border-brand-200 uppercase tracking-wider">
              🟢 Live Surplus Discovery Portal
            </span>
            <span className="text-xs text-slate-400 font-mono">{availableListings.length} Active Donations</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-2">
            Discover & Claim Surplus Food
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time feed of edible surplus dishes verified and ready for immediate community redistribution.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('live-tracking')}
          className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow transition"
        >
          📍 Track Active Pickups
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Search Food or Provider</label>
            <input
              type="text"
              placeholder="e.g. Rice, Bistro, Bakery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-600"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-600"
            >
              <option value="ALL">All Categories</option>
              <option value="Cooked Meals">Cooked Meals / Buffets</option>
              <option value="Bakery & Bread">Bakery & Bread</option>
              <option value="Fresh Produce">Fresh Produce</option>
              <option value="Packaged Goods">Dairy & Packaged</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">AI Urgency Priority</label>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-600"
            >
              <option value="ALL">All Urgencies</option>
              <option value="CRITICAL">🔴 Critical (Pickup &lt; 2 hrs)</option>
              <option value="HIGH">🟠 High Priority (Pickup &lt; 4 hrs)</option>
              <option value="MEDIUM">🔵 Medium Priority (Today)</option>
              <option value="LOW">🟢 Low Priority (2-3 Days)</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase mb-1">
              <span>Max Distance</span>
              <span className="text-slate-800">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer mt-2"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={dietaryVegOnly}
              onChange={(e) => setDietaryVegOnly(e.target.checked)}
              className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
            />
            <span>Show Vegetarian Only 🥦</span>
          </label>
          <span className="text-xs text-slate-400">
            Showing <strong>{filteredListings.length}</strong> matching donations
          </span>
        </div>
      </div>

      {filteredListings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-card border border-slate-200 space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mx-auto text-2xl">🍲</div>
          <h3 className="font-display font-bold text-lg text-slate-900">No surplus donations match your filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">Try expanding your distance radius or clearing category filters to view available donations.</p>
          <button
            onClick={() => { setCategoryFilter('ALL'); setUrgencyFilter('ALL'); setMaxDistance(25); setDietaryVegOnly(false); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white shadow ${item.urgencyColor}`}>
                      {item.urgencyScore} URGENCY
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-800">
                      {item.distanceKm} km away
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-bold truncate opacity-90">{item.providerName}</p>
                    <p className="text-[10px] text-slate-300">{item.address}</p>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <h3 className="font-display font-bold text-slate-900 text-base leading-snug line-clamp-2">{item.title}</h3>

                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">QUANTITY</span>
                      <strong className="text-brand-800 text-sm font-display">{item.quantityKg} kg</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">FEEDS</span>
                      <strong className="text-slate-800 text-sm font-display">≈ {item.mealCount} people</strong>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="text-slate-400">🌡️ Storage:</span>
                      <span className="font-medium truncate">{item.storageType}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="text-slate-400">🥗 Tags:</span>
                      <span className="font-medium truncate">{item.dietary?.join(', ')}</span>
                    </div>
                  </div>

                  <div className="bg-brand-50/80 rounded-xl p-3 border border-brand-200/80 text-[11px] text-brand-900 space-y-1">
                    <p className="font-bold">⚡ AI Urgency Insight:</p>
                    <p className="text-slate-600 leading-snug">{item.aiInsights?.urgencyReason}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedClaimListing(item)}
                  className="w-full py-3 rounded-2xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-md shadow-brand-700/20 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Claim For Redistribution</span>
                  <span>&rarr;</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {selectedClaimListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 relative">
            <button onClick={() => setSelectedClaimListing(null)} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500">✕</button>

            <div className="space-y-2 pb-4 border-b border-slate-100">
              <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200 uppercase">Confirm Claim & Dispatch</span>
              <h3 className="font-display font-bold text-xl text-slate-900">Claim Food Donation #{selectedClaimListing.id}</h3>
              <p className="text-xs text-slate-500 font-medium">{selectedClaimListing.title}</p>
            </div>

            <div className="my-4 space-y-4">
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-xs">
                <p className="text-slate-500">Provider: <strong>{selectedClaimListing.providerName}</strong></p>
                <p className="text-slate-500">Address: <strong>{selectedClaimListing.address} ({selectedClaimListing.distanceKm} km away)</strong></p>
                <p className="text-slate-500">Quantity: <strong>{selectedClaimListing.quantityKg} kg ({selectedClaimListing.mealCount} meals)</strong></p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Pickup Logistics Method</label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-brand-500 bg-brand-50/60 cursor-pointer text-xs">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="vol" checked={claimVolunteerOption === 'rapid_fleet'} onChange={() => setClaimVolunteerOption('rapid_fleet')} className="text-brand-600" />
                      <div>
                        <p className="font-bold text-slate-900">Auto-Assign Rapid Volunteer EV Fleet</p>
                        <p className="text-[11px] text-slate-500">Temperature-controlled van arriving in ~18 mins</p>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer text-xs">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="vol" checked={claimVolunteerOption === 'self_pickup'} onChange={() => setClaimVolunteerOption('self_pickup')} className="text-brand-600" />
                      <div>
                        <p className="font-bold text-slate-900">Self-Pickup by Shelter Staff</p>
                        <p className="text-[11px] text-slate-500">Our vehicle will collect within 30 minutes</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                ⚠️ <strong>Food Safety Pledge:</strong> By claiming this surplus, your shelter agrees to distribute or store food under proper temperature guidelines upon arrival.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button type="button" onClick={() => setSelectedClaimListing(null)} className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold">Cancel</button>
              <button type="button" onClick={handleClaimConfirm} className="px-6 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition active:scale-95">
                Confirm Claim & Generate OTP
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function LiveTrackingPage() {
  const { 
    trackedItem, 
    setTrackedItem, 
    listings, 
    updateDeliveryStep, 
    setCertificateItem,
    showToast 
  } = useApp();

  const trackableListings = listings.filter(i => i.status !== 'AVAILABLE');
  const currentItem = trackedItem || trackableListings[0];

  if (!currentItem || !currentItem.tracking) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mx-auto text-2xl">🚚</div>
        <h2 className="font-display font-bold text-2xl text-slate-900">No Active Deliveries in Transit</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">Claim a surplus food donation from the NGO Marketplace or list a new item to see real-time route simulation.</p>
      </div>
    );
  }

  const currentStep = currentItem.tracking.step || 1;

  const copyPin = (pin) => {
    navigator.clipboard?.writeText(pin);
    showToast(`Copied PIN: ${pin}`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-ping"></span>
            <span className="text-xs font-mono font-bold text-brand-700 uppercase">LIVE TELEMETRY & ROUTE DISPATCH</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-1">
            Real-Time Logistics Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Tracking order <strong>#{currentItem.id}</strong> &bull; {currentItem.title}</p>
        </div>

        {trackableListings.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Switch Order:</span>
            <select
              value={currentItem.id}
              onChange={(e) => {
                const found = trackableListings.find(l => l.id === e.target.value);
                if (found) setTrackedItem(found);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none"
            >
              {trackableListings.map(t => (
                <option key={t.id} value={t.id}>#{t.id} - {t.title.slice(0, 25)}... ({t.status})</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-card border border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900">Live GPS Route & Fleet Position</h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">GPS Linked (99.8%)</span>
          </div>

          <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner flex items-center justify-center p-4">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
              <path d="M 50 150 Q 150 70 200 150 T 350 150" fill="none" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
              <path d="M 50 150 Q 150 70 200 150 T 350 150" fill="none" stroke="#22C55E" strokeWidth="3" strokeDasharray="6 4" />
              
              <circle cx="50" cy="150" r="14" fill="#15803D" />
              <text x="50" y="154" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">🍽️</text>
              <text x="50" y="180" fill="#94A3B8" fontSize="10" fontWeight="bold" textAnchor="middle">Provider</text>

              <circle cx="350" cy="150" r="14" fill="#1E293B" stroke="#22C55E" strokeWidth="2" />
              <text x="350" y="154" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">🏢</text>
              <text x="350" y="180" fill="#94A3B8" fontSize="10" fontWeight="bold" textAnchor="middle">Shelter</text>

              {currentStep === 1 && (
                <g transform="translate(70, 130)">
                  <circle cx="0" cy="0" r="16" fill="#F59E0B" className="animate-pulse" />
                  <text x="0" y="4" fill="white" fontSize="12" textAnchor="middle">🚚</text>
                </g>
              )}
              {currentStep === 2 && (
                <g transform="translate(130, 100)">
                  <circle cx="0" cy="0" r="16" fill="#F59E0B" className="animate-pulse" />
                  <text x="0" y="4" fill="white" fontSize="12" textAnchor="middle">🚚</text>
                </g>
              )}
              {currentStep === 3 && (
                <g transform="translate(240, 170)">
                  <circle cx="0" cy="0" r="16" fill="#22C55E" className="animate-pulse" />
                  <text x="0" y="4" fill="white" fontSize="12" textAnchor="middle">🚚</text>
                </g>
              )}
              {currentStep === 4 && (
                <g transform="translate(350, 150)">
                  <circle cx="0" cy="0" r="18" fill="#16A34A" />
                  <text x="0" y="4" fill="white" fontSize="12" textAnchor="middle">✅</text>
                </g>
              )}
            </svg>

            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md rounded-xl p-3 border border-slate-700 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-brand-400 animate-ping"></div>
                <div>
                  <p className="font-bold">{currentItem.tracking.statusText}</p>
                  <p className="text-[11px] text-slate-400">Driver: {currentItem.tracking.driverName}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase block font-bold">Estimated Arrival</span>
                <strong className="text-brand-400 font-mono text-sm">
                  {currentStep === 4 ? 'Arrived' : `~${currentItem.tracking.etaMinutes || 12} mins`}
                </strong>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-lg">🚚</div>
              <div>
                <p className="font-display font-bold text-sm text-slate-900">{currentItem.tracking.driverName}</p>
                <p className="text-xs text-slate-500">{currentItem.tracking.driverVehicle}</p>
              </div>
            </div>
            <a
              href={`tel:${currentItem.tracking.driverPhone}`}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
            >
              📞 Call Driver
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg text-slate-900">Milestone Progress</h3>

            <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              <div className="flex items-start gap-4 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${currentStep >= 1 ? 'bg-brand-700 text-white shadow' : 'bg-slate-100 text-slate-400'}`}>1</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Claim Confirmed by Shelter</h4>
                  <p className="text-[11px] text-slate-500">{currentItem.claimedBy?.ngoName || 'City Hope Shelter'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${currentStep >= 2 ? 'bg-brand-700 text-white shadow' : 'bg-slate-100 text-slate-400'}`}>2</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Driver En Route to Provider</h4>
                  <p className="text-[11px] text-slate-500">{currentItem.providerName}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${currentStep >= 3 ? 'bg-brand-700 text-white shadow' : 'bg-slate-100 text-slate-400'}`}>3</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Food Picked Up & In Transit</h4>
                  <p className="text-[11px] text-slate-500">Insulated temperature verified</p>
                </div>
              </div>

              <div className="flex items-start gap-4 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${currentStep >= 4 ? 'bg-brand-700 text-white shadow' : 'bg-slate-100 text-slate-400'}`}>4</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Delivered & Impact Verified</h4>
                  <p className="text-[11px] text-slate-500">Meals ready for serving</p>
                </div>
              </div>
            </div>

            <div className="bg-brand-50/70 rounded-2xl p-4 border border-brand-200 space-y-2">
              <span className="text-[10px] font-bold text-brand-800 uppercase tracking-wider block">🔐 Courier Handover PINs</span>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white p-2.5 rounded-xl border border-brand-200">
                  <span className="text-[10px] text-slate-400 block font-bold">Pickup OTP</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono font-extrabold text-slate-900 text-base">{currentItem.tracking.pickupOtp || '8492'}</span>
                    <button onClick={() => copyPin(currentItem.tracking.pickupOtp || '8492')} className="text-xs text-brand-700 hover:underline">Copy</button>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-brand-200">
                  <span className="text-[10px] text-slate-400 block font-bold">Delivery OTP</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono font-extrabold text-slate-900 text-base">{currentItem.tracking.deliveryOtp || '3104'}</span>
                    <button onClick={() => copyPin(currentItem.tracking.deliveryOtp || '3104')} className="text-xs text-brand-700 hover:underline">Copy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <p className="text-[11px] text-slate-400 font-semibold uppercase">Demo Stage Advancement:</p>
            <div className="grid grid-cols-2 gap-2">
              {currentStep < 4 ? (
                <button
                  onClick={() => updateDeliveryStep(currentItem.id, currentStep + 1)}
                  className="col-span-2 py-3 rounded-2xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Simulate Next Stage ({currentStep + 1}/4) &rarr;</span>
                </button>
              ) : (
                <button
                  onClick={() => setCertificateItem({
                    orgName: currentItem.providerName,
                    address: currentItem.address,
                    quantityKg: currentItem.quantityKg,
                    mealCount: currentItem.mealCount,
                    co2Saved: currentItem.aiInsights.co2SavedKg
                  })}
                  className="col-span-2 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow transition"
                >
                  📜 View Delivery Impact Certificate
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

function ImpactAnalyticsPage() {
  const { impactStats, currentUser, setCertificateItem } = useApp();
  const [timeRange, setTimeRange] = useState('6M');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold border border-brand-200 uppercase tracking-wider">
            🌿 National Social Impact & ESG Hub
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-2">
            Food Redistribution & Climate Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time verified environmental offset and hunger relief metrics audited under Good Samaritan safety guidelines.
          </p>
        </div>

        <button
          onClick={() => setCertificateItem({
            orgName: currentUser?.orgName || 'The Grand Harvest Bistro',
            address: currentUser?.address || '428 Metro Boulevard',
            quantityKg: '3,420',
            mealCount: '7,520',
            co2Saved: '8,550'
          })}
          className="px-5 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition flex items-center gap-2"
        >
          <span>📜 Generate Official CSR Certificate</span>
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Food Diverted</span>
            <span className="text-xl">🥗</span>
          </div>
          <p className="font-display font-extrabold text-3xl text-brand-700">{impactStats.totalKgSaved.toLocaleString()} <span className="text-sm font-semibold text-slate-400">kg</span></p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">+24.5% vs previous quarter</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Meals Provided</span>
            <span className="text-xl">🍲</span>
          </div>
          <p className="font-display font-extrabold text-3xl text-slate-900">{impactStats.totalMealsServed.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">140+ Shelters fed daily</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">CO₂ Saved</span>
            <span className="text-xl">🌱</span>
          </div>
          <p className="font-display font-extrabold text-3xl text-emerald-600">{impactStats.totalCo2PreventedKg.toLocaleString()} <span className="text-sm font-semibold text-slate-400">kg</span></p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Methane averted</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">AI Accuracy</span>
            <span className="text-xl">⚡</span>
          </div>
          <p className="font-display font-extrabold text-3xl text-slate-900">{impactStats.aiMatchingAccuracy}%</p>
          <p className="text-[11px] text-brand-700 font-semibold mt-1">Avg 28m collection time</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">Monthly Food Rescue Growth</h3>
              <p className="text-xs text-slate-500">Kilograms of surplus food redirected per month</p>
            </div>

            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              {['1M', '3M', '6M', '1Y'].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${timeRange === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <div className="h-64 w-full flex items-end justify-between gap-3 sm:gap-6 pt-8 pb-4 border-b border-slate-100">
              {impactStats.monthlyRedistribution.map((m) => {
                const heightPct = Math.round((m.kg / 40000) * 100);
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <div className="text-[10px] font-mono font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition">
                      {(m.kg / 1000).toFixed(1)}k
                    </div>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full max-w-[48px] bg-gradient-to-t from-brand-700 to-brand-400 rounded-t-xl transition-all duration-500 group-hover:scale-y-105 group-hover:shadow-lg group-hover:shadow-brand-500/30"
                    ></div>
                    <span className="text-xs font-bold text-slate-600 mt-1">{m.month}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-3">
              <span>May 2026</span>
              <span className="font-semibold text-brand-700">October 2026 (Peak Volume: 35.1k kg)</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900">Food Categories</h3>
            <p className="text-xs text-slate-500">Distribution by food typology</p>

            <div className="space-y-4 mt-6">
              {impactStats.categoryBreakdown.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{cat.name}</span>
                    <strong className="font-mono text-slate-900">{cat.percentage}%</strong>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                      className="h-full rounded-full transition-all duration-500"
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-50 rounded-2xl p-4 border border-brand-200 text-xs text-brand-900 space-y-1">
            <p className="font-bold">🌱 Environmental Audit Note:</p>
            <p className="text-slate-600 leading-snug">Every 1 kg of cooked food diverted avoids approx 2.5 kg of CO₂ equivalent lifecycle emissions.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-4">
        <h3 className="font-display font-bold text-lg text-slate-900">Real-Time Redistribution Audit Log</h3>
        <div className="divide-y divide-slate-100">
          {impactStats.recentRedistributionLog.map((log) => (
            <div key={log.id} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                <span className="text-slate-800 font-medium">{log.text}</span>
              </div>
              <span className="text-slate-400 font-mono whitespace-nowrap">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function VolunteerPage() {
  const { 
    currentUser, 
    listings, 
    setCurrentPage, 
    setTrackedItem, 
    updateDeliveryStep, 
    showToast 
  } = useApp();

  const activeRuns = listings.filter(item => item.status === 'CLAIMED' || item.status === 'IN_TRANSIT');

  const handleAcceptMission = (item) => {
    setTrackedItem(item);
    updateDeliveryStep(item.id, 2);
    setCurrentPage('live-tracking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-2xl shadow">🚚</div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-2xl text-slate-900">Volunteer Courier Dispatch</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Driver On-Duty</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{currentUser.name} &bull; {currentUser.vehicle || 'Electric Cargo Van'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl">🏆 87 Completed Runs</span>
          <button onClick={() => showToast('Status set to Ready for Express Pickups!', 'success')} className="px-4 py-2 rounded-xl bg-brand-700 text-white text-xs font-bold shadow">Active & Ready</button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-card border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-xl text-slate-900">Available Rescue Runs Nearby</h2>
            <p className="text-xs text-slate-500">Pick up from food providers and deliver safely to recipient shelters</p>
          </div>
          <span className="text-xs font-bold bg-brand-100 text-brand-800 px-3 py-1 rounded-full">{activeRuns.length} Runs In Queue</span>
        </div>

        {activeRuns.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">No pending rescue runs right now. All surplus items currently delivered or awaiting claim.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeRuns.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-md transition space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">ORDER #{item.id}</span>
                    <h3 className="font-display font-bold text-slate-900 text-base mt-1">{item.title}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${item.urgencyColor}`}>{item.urgencyScore}</span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-brand-700 font-bold">A (Pickup):</span>
                    <div>
                      <p className="font-bold text-slate-800">{item.providerName}</p>
                      <p className="text-[11px] text-slate-500">{item.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                    <span className="text-blue-600 font-bold">B (Drop-off):</span>
                    <div>
                      <p className="font-bold text-slate-800">{item.claimedBy?.ngoName || 'City Hope Shelter'}</p>
                      <p className="text-[11px] text-slate-500">{item.claimedBy?.ngoAddress || '89 Mission Way'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Weight: <strong>{item.quantityKg} kg ({item.mealCount} meals)</strong></span>
                  <span>Est Trip: <strong>~18 mins (4.2 km)</strong></span>
                </div>

                <button
                  onClick={() => handleAcceptMission(item)}
                  className="w-full py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition active:scale-95"
                >
                  🚀 Accept Mission & Open Turn-by-Turn GPS
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

function AdminPage() {
  const { listings, nearbyNgos, impactStats, showToast } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-ping"></span>
            <span className="text-xs font-mono font-bold text-brand-400 uppercase">METROPOLITAN FOOD SECURITY PLATFORM CONTROL</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">City Impact & Redistribution Center</h1>
          <p className="text-xs text-slate-400 mt-0.5">Supervising food safety compliance, volunteer fleets, and algorithmic matching rates.</p>
        </div>

        <button
          onClick={() => showToast('Platform health diagnostics: All systems 100% nominal', 'success')}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow"
        >
          ⚡ Run System Diagnostics
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Active Providers</span>
          <p className="font-display font-black text-2xl text-slate-900 mt-1">{impactStats.activeProvidersCount}</p>
          <span className="text-[10px] text-brand-700 font-semibold">100% Health Audited</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Verified NGOs</span>
          <p className="font-display font-black text-2xl text-slate-900 mt-1">{impactStats.activeNgosCount}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">4 Pending Approval</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Courier Fleet</span>
          <p className="font-display font-black text-2xl text-slate-900 mt-1">{impactStats.volunteerDriversCount}</p>
          <span className="text-[10px] text-blue-600 font-semibold">24 EV Vans Active</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">AI Match Precision</span>
          <p className="font-display font-black text-2xl text-brand-700 mt-1">{impactStats.aiMatchingAccuracy}%</p>
          <span className="text-[10px] text-slate-500 font-semibold">Zero Spoilage Violations</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900">Shelter Verification Queue</h3>
            <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold">3 Pending</span>
          </div>

          <div className="space-y-3">
            {nearbyNgos.slice(0, 3).map((ngo) => (
              <div key={ngo.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-slate-900">{ngo.name}</p>
                  <p className="text-[11px] text-slate-500">{ngo.address} &bull; Cap: {ngo.capacity} meals/day</p>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-1">{ngo.verifiedBadge}</span>
                </div>
                <button
                  onClick={() => showToast(`Verified ${ngo.name}`, 'success')}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-brand-50 border border-slate-200 text-xs font-bold text-brand-700"
                >
                  ✓ Re-verify
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900">Redistribution System Log</h3>
            <span className="text-xs bg-brand-100 text-brand-800 px-2.5 py-0.5 rounded-full font-bold">Live Stream</span>
          </div>

          <div className="space-y-2.5">
            {listings.map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-slate-700">#{item.id}</span>
                  <p className="font-medium text-slate-900 truncate max-w-xs">{item.title}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  item.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800' :
                  item.status === 'CLAIMED' ? 'bg-amber-100 text-amber-800' :
                  item.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                  'bg-slate-200 text-slate-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

// --- 5. MAIN ROUTER & ROOT RENDER ---
function MainRouter() {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC]">
      <div>
        <Navbar />
        <main className="transition-all duration-300">
          {currentPage === 'landing' && <LandingPage />}
          {currentPage === 'auth' && <AuthPage />}
          {currentPage === 'provider-dashboard' && <ProviderDashboard />}
          {currentPage === 'add-food' && <AddFoodPage />}
          {currentPage === 'ngo-marketplace' && <NgoMarketplacePage />}
          {currentPage === 'live-tracking' && <LiveTrackingPage />}
          {currentPage === 'impact-analytics' && <ImpactAnalyticsPage />}
          {currentPage === 'volunteer-portal' && <VolunteerPage />}
          {currentPage === 'admin-portal' && <AdminPage />}
        </main>
      </div>

      <Footer />
      <ToastContainer />
      <QrCodeModal />
      <ImpactCertificateModal />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}

// Mount to DOM
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
