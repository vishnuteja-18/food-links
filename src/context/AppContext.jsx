import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS, INITIAL_LISTINGS, PLATFORM_IMPACT_STATS, AI_DONATION_INSIGHTS, NEARBY_NGOS } from '../data/mockData.js';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation & Role State
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentRole, setCurrentRole] = useState('provider'); // 'provider', 'ngo', 'volunteer', 'admin', 'public'
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS.provider);
  
  // Datastore with LocalStorage persistence
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('foodconnect_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
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

  // Sync listings to localStorage
  useEffect(() => {
    localStorage.setItem('foodconnect_listings', JSON.stringify(listings));
  }, [listings]);

  // Toast trigger
  const showToast = (message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  // Role Switcher helper
  const switchRole = (role) => {
    setCurrentRole(role);
    if (INITIAL_USERS[role]) {
      setCurrentUser(INITIAL_USERS[role]);
    }
    showToast(`Switched view to ${role.toUpperCase()} mode`, 'info');
  };

  const loginAs = (role) => {
    switchRole(role);
    if (role === 'provider') {
      setCurrentPage('provider-dashboard');
    } else if (role === 'ngo') {
      setCurrentPage('ngo-marketplace');
    } else if (role === 'volunteer') {
      setCurrentPage('volunteer-portal');
    } else if (role === 'admin') {
      setCurrentPage('admin-portal');
    }
  };

  // Add new food listing with AI scoring
  const addFoodListing = (newListingData) => {
    const newId = `FNC-${Math.floor(1000 + Math.random() * 9000)}`;
    const co2Val = Number((newListingData.quantityKg * 2.5).toFixed(1));
    const waterVal = Number((newListingData.quantityKg * 40).toFixed(0));
    
    // Auto AI urgency calculation
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

    // Add alert notification
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
    
    // Trigger confetti
    if (window.confetti) {
      window.confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    return createdListing;
  };

  // NGO claims a donation
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
        message: `You successfully claimed listing #${listingId}. Volunteer courier has been notified.`,
        time: 'Just now',
        read: false,
        type: 'success'
      },
      ...prev
    ]);

    showToast('🚀 Food donation claimed! Pickup dispatch created.', 'success');
  };

  // Step advancement in tracking
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

export const useApp = () => useContext(AppContext);
