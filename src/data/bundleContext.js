// FoodConnect AI — Complete Single-File Production React Bundle
const { useState, useEffect, useContext, createContext } = React;

// 1. DATA & CONSTANTS
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

// 2. CONTEXT & STATE
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
