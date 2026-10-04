import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function AddFoodPage() {
  const { currentUser, addFoodListing, setCurrentPage, nearbyNgos, showToast } = useApp();

  // Form State
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cooked Meals');
  const [quantityKg, setQuantityKg] = useState(25);
  const [mealCount, setMealCount] = useState(55);
  const [storageType, setStorageType] = useState('Hot Insulated Containers (65°C)');
  const [dietary, setDietary] = useState(['Vegetarian']);
  const [isVeg, setIsVeg] = useState(true);
  const [allergens, setAllergens] = useState('None declared');
  const [shelfLifeHours, setShelfLifeHours] = useState(4);
  const [pickupAddress, setPickupAddress] = useState(currentUser?.address || '428 Metro Boulevard, Downtown');
  const [contactName, setContactName] = useState(currentUser?.name || 'Chef Marcus Vance');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '+1 (555) 234-5678');
  const [instructions, setInstructions] = useState('Please pick up from back kitchen loading bay.');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600');

  // Quick category presets
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

  // Toggle dietary tag
  const toggleDietary = (tag) => {
    if (dietary.includes(tag)) {
      setDietary(dietary.filter(t => t !== tag));
    } else {
      setDietary([...dietary, tag]);
    }
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
      allergens,
      shelfLifeHours,
      pickupAddress,
      imageUrl,
      cookedAt: 'Today, Just Now',
      expiresAt: `Today, in ${shelfLifeHours} hours`
    });

    setCurrentPage('provider-dashboard');
  };

  // AI Urgency Rating Calculator
  const aiUrgency = category === 'Cooked Meals' ? (shelfLifeHours <= 3 ? 'CRITICAL' : 'HIGH') : (shelfLifeHours <= 12 ? 'MEDIUM' : 'LOW');
  const co2Preview = (quantityKg * 2.5).toFixed(1);
  const waterPreview = (quantityKg * 40).toLocaleString();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Wizard Header */}
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

      {/* Stepper Indicator */}
      <div className="grid grid-cols-3 gap-2 mb-8">
        <div className={`p-3 rounded-2xl border text-center transition ${step >= 1 ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
          <span className="text-xs">Step 1: Food Details</span>
        </div>
        <div className={`p-3 rounded-2xl border text-center transition ${step >= 2 ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
          <span className="text-xs">Step 2: AI Urgency & Matching</span>
        </div>
        <div className={`p-3 rounded-2xl border text-center transition ${step >= 3 ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
          <span className="text-xs">Step 3: Pickup & Handoff</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-card border border-slate-200 p-6 sm:p-8 space-y-6">
        
        {/* STEP 1: Food Details */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Category selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Select Food Category
              </label>
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

            {/* Food Title */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Food Title / Dish Description *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Executive Lunch Buffet: Steamed Rice, Mixed Vegetable Curry, Paneer & Roti"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-brand-600 focus:bg-white transition"
              />
            </div>

            {/* Quantity and Meals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Surplus Quantity (Kilograms)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={quantityKg}
                    onChange={(e) => handleQtyChange(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-600"
                  />
                  <span className="text-xs font-bold text-slate-500">kg</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Estimated Meal Servings
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={mealCount}
                    onChange={(e) => setMealCount(Number(e.target.value))}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-600"
                  />
                  <span className="text-xs font-bold text-slate-500">servings</span>
                </div>
              </div>
            </div>

            {/* Storage Condition & Temperature */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Current Storage Condition & Temperature
              </label>
              <input
                type="text"
                value={storageType}
                onChange={(e) => setStorageType(e.target.value)}
                placeholder="e.g. Hot Chafing Dish (65°C+) / Sealed Insulated Thermos"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-600"
              />
            </div>

            {/* Dietary Tags */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Dietary Specifications
              </label>
              <div className="flex flex-wrap gap-2">
                {['Vegetarian', 'Pure Veg', 'Non-Veg', 'Vegan', 'Halal', 'Jain / No Onion Garlic', 'Nut-Free', 'Gluten-Free'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleDietary(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                      dietary.includes(tag) ? 'bg-brand-700 border-brand-700 text-white font-bold' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {tag} {dietary.includes(tag) ? '✓' : '+'}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 1 Next Button */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  if (!title) {
                    showToast('Please enter a food title to proceed.', 'error');
                    return;
                  }
                  setStep(2);
                }}
                className="px-6 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition flex items-center gap-2"
              >
                <span>Continue to AI Analysis &rarr;</span>
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: AI Freshness, Urgency & Match Prediction */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* AI Urgency Display Card */}
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
                  <p className={`text-lg font-bold font-mono mt-1 ${
                    aiUrgency === 'CRITICAL' ? 'text-red-400' :
                    aiUrgency === 'HIGH' ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
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

              {/* Shelf life slider */}
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

            {/* AI Top NGO Proximity Matches */}
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
                      <p className="text-[11px] text-slate-500">{ngo.distanceKm} km away &bull; Needs {ngo.mealsNeededToday} meals today</p>
                    </div>
                    <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
                      99% Match
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                &larr; Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition"
              >
                Continue to Pickup Logistics &rarr;
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: Pickup Logistics & Confirm */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Contact Person Name
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Direct Phone Number
                </label>
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
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Exact Pickup Address
              </label>
              <input
                type="text"
                required
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Driver Instructions / Loading Bay Notes
              </label>
              <textarea
                rows="3"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Ring bell at delivery gate #2. Containers already packed."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              ></textarea>
            </div>

            {/* Summary Review */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-1">
              <p className="font-bold text-slate-800 text-sm">{title}</p>
              <p className="text-slate-600">
                Quantity: <strong>{quantityKg} kg ({mealCount} meals)</strong> &bull; Category: <strong>{category}</strong>
              </p>
              <p className="text-slate-600">
                Safe window: <strong>{shelfLifeHours} hours</strong> &bull; AI Priority: <strong className="text-brand-700">{aiUrgency}</strong>
              </p>
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                &larr; Back
              </button>
              
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-sm font-extrabold shadow-lg shadow-brand-700/25 transition transform active:scale-95 flex items-center gap-2"
              >
                <span>🚀 Publish & Dispatch Surplus</span>
              </button>
            </div>

          </div>
        )}

      </form>

    </div>
  );
}
