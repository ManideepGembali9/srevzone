// SREVZONE Initial Master Data
export const initialCategories = [
  {
    id: "cat-scooters",
    name: "Electric Scooters",
    slug: "electric-scooters",
    description: "High-efficiency smart electric scooters for effortless daily urban commutes.",
    icon: "Bike",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    order: 1,
    count: 6
  },
  {
    id: "cat-bikes",
    name: "Electric Bikes",
    slug: "electric-bikes",
    description: "High-performance sports and street electric motorcycles with exhilarating torque.",
    icon: "Zap",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    order: 2,
    count: 4
  },
  {
    id: "cat-cycles",
    name: "Electric Cycles",
    slug: "electric-cycles",
    description: "Lightweight pedal-assist and throttle e-cycles for fitness and city exploration.",
    icon: "Compass",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
    order: 3,
    count: 3
  },
  {
    id: "cat-autos",
    name: "Electric Autos",
    slug: "electric-autos",
    description: "Clean, zero-emission commercial passenger autos with maximum daily driver savings.",
    icon: "Truck",
    image: "https://images.unsplash.com/photo-1596707328004-984e7f603c4f?auto=format&fit=crop&w=800&q=80",
    order: 4,
    count: 2
  },
  {
    id: "cat-commercial",
    name: "Electric Commercial Vehicles",
    slug: "electric-commercial-vehicles",
    description: "Heavy-duty electric delivery vans and cargo carriers built for last-mile logistics.",
    icon: "ShieldAlert",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80",
    order: 5,
    count: 3
  },
  {
    id: "cat-three-wheelers",
    name: "Electric Three-Wheelers",
    slug: "electric-three-wheelers",
    description: "Versatile 3-wheeler utility and transport vehicles with exceptional payload.",
    icon: "Layers",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    order: 6,
    count: 2
  },
  {
    id: "cat-kids",
    name: "Electric Kids Vehicles",
    slug: "electric-kids-vehicles",
    description: "Safe, speed-governed electric mini-karts and bikes for young champions.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80",
    order: 7,
    count: 2
  },
  {
    id: "cat-other",
    name: "Other Electric Vehicles",
    slug: "other-electric-vehicles",
    description: "Specialized golf carts, resort mobility pods, and custom mobility solutions.",
    icon: "Activity",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    order: 8,
    count: 1
  }
];

export const initialVehicles = [
  {
    id: "srev-v01",
    name: "SREV Stealth Pro Classic",
    brand: "SREVZONE Flagship",
    model: "Stealth Cyber Edition",
    categoryId: "cat-scooters",
    categoryName: "Electric Scooters",
    price: 149999,
    discountPrice: 139999,
    description: "Handcrafted aerospace curved-steel monocoque frame in satin matte graphite, classic round projector LED headlamp, and thrilling 160 km true range.",
    image: "/vehicles/srev-stealth-scooter.jpg",
    gallery: [
      "/vehicles/srev-stealth-scooter.jpg",
      "/hero/hero-stealth-scooter.jpg",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80"
    ],
    videoUrl: "",
    batteryCapacity: "4.0 kWh Li-ion IP67",
    drivingRange: "160 km / charge",
    maxSpeed: "95 km/h",
    chargingTime: "55 mins (0-80% Fast Charge)",
    motorPower: "6.5 kW Peak Silent Mid-Drive",
    colors: ["Matte Stealth Graphite", "Cyber Pearl White", "Neon Electric Blue", "Carbon Black"],
    warranty: "8 Years / 80,000 km Battery Warranty",
    stock: 12,
    isFeatured: true,
    isNewArrival: true,
    specifications: {
      acceleration: "0-40 km/h in 3.2 sec",
      braking: "Dual Hydraulic Disc with Combined Braking & Regen",
      display: "7-inch Anti-Glare TFT Screen with Turn-by-Turn GPS",
      storage: "28 Litres Illuminated Underseat Bay",
      gradeability: "22 degrees",
      kerbWeight: "108 kg"
    },
    features: [
      "Aerospace Monocoque Curved Steel Body",
      "Round Projector LED Headlamp with Halo DRL",
      "Whisper-Quiet 6.5 kW Mid-Drive Electric Propulsion",
      "Liquid-Cooled IP67 Ultra-Dense Battery Pack",
      "Regenerative Engine Braking & Reverse Assist"
    ]
  },
  {
    id: "srev-v02",
    name: "Ultraviolette F77 Mach 2",
    brand: "Ultraviolette",
    model: "Recon Edition",
    categoryId: "cat-bikes",
    categoryName: "Electric Bikes",
    price: 399000,
    discountPrice: 385000,
    description: "India's highest performance aviation-inspired electric sports motorcycle with incredible 305 km IDC range and ballistic acceleration.",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    batteryCapacity: "10.3 kWh SRB Battery",
    drivingRange: "305 km / charge",
    maxSpeed: "155 km/h",
    chargingTime: "1 hr with Boost Charger",
    motorPower: "30 kW Permanent Magnet",
    colors: ["Shadow Black", "Airstrike White", "Laser Red"],
    warranty: "8 Years / 8,00,000 km Warranty",
    stock: 4,
    isFeatured: true,
    isNewArrival: true,
    specifications: {
      acceleration: "0-60 km/h in 2.8 sec",
      torque: "100 Nm at Wheel",
      chassis: "Steel Trellis with Aluminium Bulkhead",
      display: "5-inch Multi-function TFT with LTE",
      weight: "207 kg"
    },
    features: [
      "Dynamic Stability Control (DSC)",
      "10 Levels of Regenerative Braking",
      "Ballistic Ride Mode",
      "Crash and Fall Detection with SOS"
    ]
  },
  {
    id: "srev-v03",
    name: "Ola S1 Pro Gen 2",
    brand: "Ola Electric",
    model: "Gen 2 Performance",
    categoryId: "cat-scooters",
    categoryName: "Electric Scooters",
    price: 139999,
    discountPrice: 129999,
    description: "Futuristic design, class-leading boot space, hyper mode and MoveOS 4 smart features with built-in speakers.",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    batteryCapacity: "4.0 kWh Lithium-ion",
    drivingRange: "195 km / charge",
    maxSpeed: "120 km/h",
    chargingTime: "6.5 hrs Home Fast",
    motorPower: "11 kW Mid-Drive",
    colors: ["Jet Black", "Porcelain White", "Amethyst Blue", "Matt Green"],
    warranty: "8 Years Battery Warranty",
    stock: 12,
    isFeatured: true,
    isNewArrival: false,
    specifications: {
      acceleration: "0-40 km/h in 2.6 sec",
      bootSpace: "34 Litres",
      suspension: "Telescopic Front Fork & Mono-shock",
      sound: "Party Mode Stereo Speakers"
    },
    features: [
      "MoveOS 4 with Cruise Control",
      "Hill Hold Assist",
      "Keyless Proximity Unlock",
      "In-built Maps & Music Streaming"
    ]
  },
  {
    id: "srev-v04",
    name: "Revolt RV400 Stealth",
    brand: "Revolt Motors",
    model: "RV400 BRZ",
    categoryId: "cat-bikes",
    categoryName: "Electric Bikes",
    price: 144999,
    discountPrice: 134999,
    description: "India's pioneer AI-enabled electric street bike with customizable simulated exhaust sounds and swappable battery tech.",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    batteryCapacity: "3.24 kWh Portable Li-ion",
    drivingRange: "150 km Eco Mode",
    maxSpeed: "85 km/h",
    chargingTime: "4.5 hrs (0-100%)",
    motorPower: "3.0 kW Mid-Drive",
    colors: ["Cosmic Black", "Rebel Red", "Pacific Blue"],
    warranty: "5 Years / 75,000 km",
    stock: 6,
    isFeatured: false,
    isNewArrival: true,
    specifications: {
      acceleration: "0-60 km/h in 3.9 sec",
      brakes: "Combi Brake System Dual Disc",
      groundClearance: "215 mm"
    },
    features: [
      "MyRevolt Smartphone App Control",
      "Simulated Multi-tone Exhaust Notes",
      "Removable Battery for Home Charging",
      "Geo-fencing and Theft Alarm"
    ]
  },
  {
    id: "srev-v05",
    name: "Mahindra Treo Zor",
    brand: "Mahindra Electric",
    model: "Delivery Van Pro",
    categoryId: "cat-commercial",
    categoryName: "Electric Commercial Vehicles",
    price: 320000,
    discountPrice: 305000,
    description: "The market leader in electric last-mile delivery, offering unmatched cargo volume and massive savings of ₹60,000+ per year on fuel.",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    batteryCapacity: "7.37 kWh LiFePO4",
    drivingRange: "125 km / charge",
    maxSpeed: "50 km/h",
    chargingTime: "3 hrs 50 min",
    motorPower: "8.0 kW Direct Drive IP67",
    colors: ["Arctic White & Blue"],
    warranty: "3 Years / 80,000 km Standard",
    stock: 5,
    isFeatured: true,
    isNewArrival: false,
    specifications: {
      payloadCapacity: "550 kg Certified",
      cargoTrayLength: "6.0 Feet Tray",
      climbingAbility: "12.7 degrees"
    },
    features: [
      "Advanced Lithium Iron Phosphate Safe Chem",
      "NEMO Fleet Telematics Management",
      "Direct Drive Automatic Transmission",
      "Reinforced Rust-proof Sheet Metal Cab"
    ]
  },
  {
    id: "srev-v06",
    name: "EMotorad T-Rex+ Mountain",
    brand: "EMotorad",
    model: "T-Rex Plus 2026",
    categoryId: "cat-cycles",
    categoryName: "Electric Cycles",
    price: 49999,
    discountPrice: 42999,
    description: "Aggressive hardtail mountain electric cycle with Shimano 7-speed gears, front lockable suspension and integrated frame battery.",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    batteryCapacity: "10.4 Ah Removable Li-ion",
    drivingRange: "55 km PAS / 40 km Throttle",
    maxSpeed: "25 km/h (Govt. Compliant)",
    chargingTime: "3 hrs Fast Charger",
    motorPower: "250W High-Torque BLDC Hub",
    colors: ["Army Olive", "Electric Cyan", "Matte Charcoal"],
    warranty: "Lifetime Frame / 2 Yrs Battery",
    stock: 15,
    isFeatured: false,
    isNewArrival: true,
    specifications: {
      gears: "Shimano Tourney 7-Speed",
      frame: "Aluminium Alloy 6061",
      wheels: "27.5 inch Kenda Mountain Tyres",
      brakes: "Dual Mechanical Disc with Auto Motor Cutoff"
    },
    features: [
      "Backlit LCD Display with 5 PAS Levels",
      "Walk Assist Mode",
      "Removable Battery with Key Lock",
      "USB Phone Charging Port on Battery"
    ]
  },
  {
    id: "srev-v07",
    name: "Piaggio Ape E-City FX",
    brand: "Piaggio",
    model: "E-City Passenger 2026",
    categoryId: "cat-autos",
    categoryName: "Electric Autos",
    price: 295000,
    discountPrice: 280000,
    description: "The gold standard in urban passenger transport. High headroom, luxurious Italian passenger seats, and zero tailpipe emissions.",
    image: "https://images.unsplash.com/photo-1596707328004-984e7f603c4f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596707328004-984e7f603c4f?auto=format&fit=crop&w=1200&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    batteryCapacity: "7.5 kWh Advanced Swappable / Fixed",
    drivingRange: "115 km / charge",
    maxSpeed: "45 km/h",
    chargingTime: "3.5 hrs Fast Charge",
    motorPower: "5.4 kW High Torque",
    colors: ["Classic Yellow & Green", "Pure White"],
    warranty: "3 Yrs / 1,00,000 km Super Warranty",
    stock: 7,
    isFeatured: false,
    isNewArrival: false,
    specifications: {
      passengerCapacity: "Driver + 3 Passengers",
      suspension: "Hydraulic Telescopic with Coil Spring",
      gradeability: "19%"
    },
    features: [
      "No Clutch, No Gears – Fatigue Free Driving",
      "Regenerative Braking for Extended Range",
      "Heavy Duty Chassis Engineered for Indian Roads",
      "Digital Instrument Cluster"
    ]
  },
  {
    id: "srev-v08",
    name: "SREV Mini Buggy X-Racer",
    brand: "SREVZONE",
    model: "X-Racer Kids Buggy",
    categoryId: "cat-kids",
    categoryName: "Electric Kids Vehicles",
    price: 34999,
    discountPrice: 29999,
    description: "High-adrenaline, maximum-safety electric mini kart with parental remote governor and roll-cage architecture.",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1200&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    batteryCapacity: "24V 20Ah Gel Cell",
    drivingRange: "30 km per charge",
    maxSpeed: "22 km/h (Adjustable 8/15/22)",
    chargingTime: "4 hrs",
    motorPower: "500W High Torque Motor",
    colors: ["Electric Blue", "Racer Orange", "Neon Lime"],
    warranty: "1 Year Full Warranty",
    stock: 5,
    isFeatured: false,
    isNewArrival: true,
    specifications: {
      ageGroup: "5 to 14 Years",
      safetyBelt: "4-Point Racing Harness",
      maxLoad: "65 kg"
    },
    features: [
      "Wireless Parental Emergency Kill Switch",
      "Full Tubular Steel Roll Cage",
      "Off-road Knobby Balloon Tyres",
      "LED Headlamps & Flag Pole"
    ]
  }
];

export const initialAccessories = [
  {
    id: "acc-01",
    name: "SREV Smart LED Aero Helmet",
    category: "Helmets",
    price: 4999,
    discountPrice: 3899,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    description: "DOT & ISI certified smart aerodynamic helmet with auto-sensing brake lights, Bluetooth stereo speakers, and turn signals.",
    stock: 25,
    brand: "SREVZONE Gear"
  },
  {
    id: "acc-02",
    name: "7.4 kW Fast Smart Home Wallbox Charger",
    category: "EV Chargers",
    price: 28999,
    discountPrice: 24499,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80",
    description: "Type-2 smart AC home charger with RFID authentication, Wi-Fi scheduling, surge protection, and weatherproofing.",
    stock: 14,
    brand: "VoltPro"
  },
  {
    id: "acc-03",
    name: "All-Weather Heavy Duty EV Body Cover",
    category: "Vehicle Accessories",
    price: 1899,
    discountPrice: 1299,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
    description: "100% waterproof UV-reflecting fabric with heat-resistant inner lining and windproof buckle fasteners.",
    stock: 40,
    brand: "SREV Shield"
  },
  {
    id: "acc-04",
    name: "Portable 3.3 kW Heavy Duty Emergency Charger",
    category: "EV Chargers",
    price: 11999,
    discountPrice: 9999,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    description: "Compact 15A/16A portable charger with 5m cable and digital voltage and temperature safety readouts.",
    stock: 18,
    brand: "SREV Mobility"
  },
  {
    id: "acc-05",
    name: "LiFePO4 48V 30Ah High-Efficiency Modular Battery",
    category: "Batteries",
    price: 34999,
    discountPrice: 31999,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    description: "2000+ cycle life battery with smart Bluetooth BMS, fire-retardant aluminium enclosure, and handle.",
    stock: 9,
    brand: "VoltCore"
  },
  {
    id: "acc-06",
    name: "Anti-Theft Hidden GPS Tracker with Remote Immobilizer",
    category: "Vehicle Accessories",
    price: 3499,
    discountPrice: 2799,
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80",
    description: "Real-time 4G GPS tracking, live route history, geofence intrusion alerts, and remote motor kill switch.",
    stock: 30,
    brand: "TrackSafe"
  }
];

export const initialPromotions = [
  {
    id: "promo-01",
    title: "Mega Green Exchange Fest",
    tagline: "Flat ₹15,000 Exchange Bonus + Zero Down Payment",
    description: "Trade in your old petrol two-wheeler or three-wheeler and get instant top valuation plus ₹15,000 extra exchange bonus on all premium EV models.",
    discount: "Flat ₹15,000 Off",
    couponCode: "GREENEXCHANGE",
    bannerImage: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    startDate: "2026-11-01",
    endDate: "2026-12-31",
    isActive: true,
    isFeatured: true
  },
  {
    id: "promo-02",
    title: "Festive Extended Battery Warranty Bonanza",
    tagline: "Complimentary 3-Year Extra Warranty + Free Smart Helmet",
    description: "Book any electric bike or scooter this month and receive free 8-year bumper-to-bumper battery coverage plus an ISI smart LED helmet worth ₹4,999.",
    discount: "Free ₹12,000 Benefits",
    couponCode: "SREVFESTIVE",
    bannerImage: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    startDate: "2026-11-10",
    endDate: "2026-12-15",
    isActive: true,
    isFeatured: true
  },
  {
    id: "promo-03",
    title: "Commercial Fleet Starter Package",
    tagline: "Special 5% Fleet Subsidy on Mahindra & Piaggio 3-Wheelers",
    description: "Boost your delivery business profitability with our commercial EV volume financing, fast-track subsidy processing, and 1 year free maintenance.",
    discount: "5% Extra Cash Rebate",
    couponCode: "FLEETPRO",
    bannerImage: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80",
    startDate: "2026-11-15",
    endDate: "2027-01-31",
    isActive: true,
    isFeatured: false
  }
];

export const initialDailyUpdates = [
  {
    id: "upd-01",
    title: "12 Ather 450 & Ola S1 Units Delivered to Jubilant Families!",
    caption: "Another milestone day at SREVZONE Mega Hub! Hearty congratulations to all our proud new green champions riding into a pollution-free future.",
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "",
    category: "Customer Delivery",
    date: "Today, 10:30 AM",
    isPinned: true
  },
  {
    id: "upd-02",
    title: "Ultraviolette F77 Mach 2 Superbike Unboxing in Showroom!",
    caption: "The beast has landed! Aviation engineering meets thunderous 100 Nm torque. Drop by SREVZONE this weekend to experience the flight.",
    imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "New Arrival",
    date: "Yesterday",
    isPinned: true
  },
  {
    id: "upd-03",
    title: "Free Battery Health Diagnostic Camp This Weekend",
    caption: "Get your electric vehicle battery tested with certified computerised balancing equipment completely free of charge at our specialized Service Centre.",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "",
    category: "Service Camp",
    date: "2 days ago",
    isPinned: false
  },
  {
    id: "upd-04",
    title: "Fleet Handover: 5 Mahindra Treo Zor for Rapid Logistics",
    caption: "Empowering sustainable logistics! Mr. Vikrant takes delivery of 5 electric cargo vans to power clean e-commerce delivery across the metro area.",
    imageUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80",
    videoUrl: "",
    category: "Commercial Handover",
    date: "3 days ago",
    isPinned: false
  }
];

export const initialServicePackages = [
  {
    id: "srv-01",
    name: "General Periodic EV Service",
    price: 799,
    duration: "90 Mins",
    description: "Complete 32-point inspection, brake pad cleaning, tyre pressure check, steering alignment, electrical wiring audit, and computer diagnostics.",
    popular: true,
    points: [
      "32-Point Comprehensive EV Diagnostics",
      "Brake Fluid & Mechanical Adjustment",
      "Electrical Harness & Port Inspection",
      "Complete Water-Resistant Foam Wash",
      "Diagnostic Error Code Clearing"
    ]
  },
  {
    id: "srv-02",
    name: "High-Voltage Battery Diagnostic & Cell Balancing",
    price: 1199,
    duration: "120 Mins",
    description: "Deep computerized cell impedance measurement, thermal management check, capacity calibration, and BMS firmware upgrade.",
    popular: true,
    points: [
      "Individual Cell Voltage Variance Check",
      "BMS Thermal Sensor Calibration",
      "Capacity Health Index (SOH) Certificate",
      "Terminal Corrosion Treatment & Torquing",
      "Fast Charging Handshake Verification"
    ]
  },
  {
    id: "srv-03",
    name: "Motor & Controller Dynamic Performance Check",
    price: 599,
    duration: "60 Mins",
    description: "Hall sensor testing, phase current balancing, throttle latency calibration, and regenerative braking fine-tuning.",
    popular: false,
    points: [
      "BLDC / PMSM Motor Magnetic Flux Check",
      "Regenerative Braking Deceleration Tuning",
      "Throttle Response Micro-calibration",
      "Water Seal & Gasket Inspection"
    ]
  },
  {
    id: "srv-04",
    name: "Full Ceramic Detailing & Hydrophobic Coating",
    price: 1499,
    duration: "180 Mins",
    description: "Deep clay treatment, swirl mark removal, 9H ceramic shield application on painted panels, and UV-protectant coating on plastics.",
    popular: false,
    points: [
      "Multi-stage Paint Correction",
      "9H Hydrophobic Ceramic Coat (1 Year Protection)",
      "Dashboard & Trim UV Rejuvenation",
      "Headlamp & Tail Lamp Polishing"
    ]
  }
];

export const initialTestimonials = [
  {
    id: "t-01",
    name: "Arun K. Sharma",
    role: "Ather 450 Apex Owner",
    comment: "SREVZONE provided an unmatched buying experience! From the instant test ride to on-the-spot finance approval and vehicle delivery in 48 hours. The bike is an absolute rocket on the road.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    location: "Bangalore"
  },
  {
    id: "t-02",
    name: "Pooja Deshmukh",
    role: "Ola S1 Pro Owner",
    comment: "My daily commute fuel cost dropped from ₹4,500/month to barely ₹350 on electricity! SREVZONE's service team also installed the home fast charger neatly at my apartment.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    location: "Whitefield"
  },
  {
    id: "t-03",
    name: "Vikramaditya Rao",
    role: "Fleet Owner (4 Mahindra Treo Zor)",
    comment: "Our grocery delivery logistics costs reduced by 65%. SREVZONE guided us through commercial state EV subsidies and their dedicated service team keeps our vehicles running 24/7.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    location: "Electronic City"
  }
];

export const initialWebsiteSettings = {
  brandName: "SREVZONE",
  officialTagline: "POWERING THE FUTURE • ELECTRIC VEHICLE SOLUTIONS",
  showroomName: "SREVZONE EV Mega Hub",
  address: "SREVZONE EV Mega Hub, Outer Ring Road, Tech Corridor, Bangalore, Karnataka - 560103",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  email: "contact@srevzone.com",
  openingHours: "Monday - Sunday: 09:00 AM - 08:30 PM",
  googleMapsUrl: "https://maps.google.com/?q=Bangalore+Electric+Vehicle+Hub",
  
  // Homepage Hero Visual & Editorial Content
  heroHeadline: "POWER YOUR RIDE. EXPERIENCE THE FUTURE.",
  heroSupportingText: "Discover the new SREV Stealth Pro Classic — handcrafted monocoque steel, satin graphite finish, and exhilarating 160 km range.",
  heroPrimaryBtnText: "EXPLORE VEHICLES",
  heroSecondaryBtnText: "CONTACT US",
  heroImageUrl: "/vehicles/srev-stealth-scooter.jpg",
  heroVehicleName: "SREV Stealth Pro Classic",
  heroVehicleSubtitle: "Satin Matte Graphite • Retro Futurism Edition",
  heroVehiclePrice: "₹1,49,999",
  heroVehicleRange: "160 km Range",
  heroVehicleSpeed: "0-40 in 3.2s",
  stats: {
    happyRiders: "12,500+",
    modelsAvailable: "45+",
    zeroCarbonKm: "18M+ km",
    warrantyYears: "Up to 8 Yrs"
  },

  // Cinematic Showcase Content
  showcaseModel: "SREV Stealth Pro Classic",
  showcaseTag: "Flagship Engineering Showcase",
  showcaseImage: "/vehicles/srev-stealth-scooter.jpg",
  showcaseHeadline: "Aerospace Monocoque Steel. Electric Prowess.",
  showcaseSub: "Forged in automotive-grade curved steel with satin matte graphite finish, ultra-dense 4.0 kWh battery, and whisper-quiet high-torque electric mid-drive.",
  showcaseSpeed: "3.2 Sec",
  showcaseTopSpeed: "95 km/h",
  showcaseRange: "160 km",
  showcaseBattery: "4.0 kWh IP67",
  showcasePrice: "₹1,49,999",
  showcaseDiscountPrice: "₹1,39,999",
  showcaseHotspots: [
    {
      id: "headlamp",
      title: "Classic Round Projector LED Headlamp",
      stat: "1800 Lumens",
      sub: "Dynamic LED DRL Ring",
      desc: "Aero-styled chrome rim with high-penetration projector beam for razor-sharp night visibility and timeless retro appeal.",
      x: "38%",
      y: "24%"
    },
    {
      id: "chassis",
      title: "Satin Matte Monocoque Steel Body",
      stat: "Aerospace Grade",
      sub: "Low Centre of Gravity",
      desc: "Solid curved pressed-steel monocoque chassis engineered for sports agility, high durability, and mirror-finish road presence.",
      x: "42%",
      y: "45%"
    },
    {
      id: "saddle",
      title: "Sculpted Dual Touring Saddle",
      stat: "Premium Vegan Leather",
      sub: "28L Underseat Bay",
      desc: "Ergonomically contoured touring saddle with high-density foam cushioning, passenger backrest mount, and full-face helmet storage.",
      x: "64%",
      y: "38%"
    },
    {
      id: "battery",
      title: "4.0 kWh Liquid-Cool Lithium Pack",
      stat: "160 km True Range",
      sub: "Fast Charge: 55 Mins",
      desc: "Automotive-grade NMC battery with smart active BMS telemetry, 8-year warranty protection, and intelligent regenerative energy harvesting.",
      x: "50%",
      y: "52%"
    },
    {
      id: "motor",
      title: "Whisper-Quiet Electric Mid-Drive",
      stat: "6.5 kW Peak",
      sub: "32 Nm Instant Torque",
      desc: "Seamless electric propulsion launching 0 to 40 km/h in 3.2 seconds with multi-stage regenerative braking.",
      x: "72%",
      y: "52%"
    }
  ],

  // Advantages (Why Choose SREVZONE)
  advantagesHeadline: "Why Discerning EV Riders Choose SREVZONE",
  advantagesSub: "We don't just sell electric vehicles. We engineer your entire transition to electric mobility with certified warranties, battery diagnostic labs, and long-term care.",
  advantagesList: [
    {
      title: "Multi-Brand Electric Mega Hub",
      stat: "15,000+ sq.ft.",
      desc: "Compare top EV scooters, motorcycles, cycles, and cargo vehicles side-by-side with certified EV specialists."
    },
    {
      title: "High-Voltage Certified Battery Lab",
      stat: "8-Year Warranty",
      desc: "State-of-the-art computerised cell impedance testing, thermal balancing, and official battery health index certificates."
    },
    {
      title: "VIP Doorstep Test Rides",
      stat: "At Home or Office",
      desc: "Experience your dream EV on our indoor test track or schedule delivery straight to your doorstep."
    },
    {
      title: "Instant Exchange & 0% Down Payment",
      stat: "Best Valuation",
      desc: "Exchange any petrol two-wheeler or three-wheeler in 30 minutes with maximum guaranteed market valuation."
    },
    {
      title: "Instant State & Central EV Subsidies",
      stat: "Direct Savings",
      desc: "Zero paperwork hassle — on-the-spot government subsidy reductions and complete registration assistance."
    },
    {
      title: "24/7 Roadside Assistance & Spares",
      stat: "100% Genuine",
      desc: "Fully stocked central parts warehouse and certified on-road emergency response vans covering your daily commute."
    }
  ],

  // Service Centre Section
  serviceTeaserHeadline: "Precision Care for Your Electric Vehicle",
  serviceTeaserSub: "Equipped with computerized diagnostic tools, battery state-of-health analyzers, and certified EV mechanics. Genuine parts and 100% transparent pricing.",
  serviceHotline: "+91 98765 43210",
  serviceFeatures: [
    "32-Point Computerized EV Health Audit",
    "High-Voltage Battery Cell Balancing Lab",
    "Motor & Controller Dynamic Calibration",
    "24/7 On-Road Emergency EV Breakdown Support",
    "Genuine OEM Spares & Fast-Charging Accessories"
  ],

  // About Us Page Content
  aboutHeadline: "Powering the Future of Mobility",
  aboutIntro: "SREVZONE was founded with a singular conviction: the electric revolution must be uncompromising, exhilarating, and accessible to every commuter, family, and commercial business in India.",
  aboutVision: "To be South Asia's most trusted electric mobility ecosystem. By combining multi-brand curation, high-performance battery diagnostic technology, and unmatched after-sales support, we eliminate every barrier to adopting zero-emission vehicles.",
  aboutPledge: "Every EV driven off the SREVZONE showroom floor saves an average of 1.4 tonnes of carbon dioxide annually. With over 12,500 active riders, our community offsets thousands of metric tonnes of tailpipe emissions each month.",
  megaHubTitle: "The SREVZONE Mega Hub",
  megaHubDesc: "Spanning over 15,000 sq.ft. in Bangalore's high-tech corridor with indoor test ride circuit, 12 high-voltage service bays, and certified battery health diagnostics.",

  // Contact Page Content
  contactTitle: "Get in Touch with Our EV Experts",
  contactSubtitle: "Have questions about battery life, state EV subsidies, exchange bonuses, or charging installations? We're here to assist.",

  // Social Links
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com"
  },

  // Appearance & Theme
  theme: {
    mode: "dark",
    accentColor: "#00A8FF"
  }
};

export const initialGalleryItems = [
  {
    id: "g1",
    title: "SREV Stealth Pro Classic Launch",
    type: "photo",
    category: "Showroom",
    url: "/vehicles/srev-stealth-scooter.jpg",
    description: "Flagship satin matte graphite electric scooter on lighted showroom display."
  },
  {
    id: "g2",
    title: "Ultraviolette F77 Mach 2 Track Run",
    type: "video",
    category: "Action",
    url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "High-speed circuit testing showing aerodynamic torque."
  },
  {
    id: "g3",
    title: "10 Ather 450 Customer Handover Day",
    type: "photo",
    category: "Customer Delivery",
    url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
    description: "Celebrating 10 new Ather EV riders joining the green mobility revolution."
  },
  {
    id: "g4",
    title: "High-Voltage Battery Cell Balancing Lab",
    type: "photo",
    category: "Service Lab",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    description: "Our certified technicians conducting health scans and thermal cell balancing."
  },
  {
    id: "g5",
    title: "Mahindra Treo Zor Commercial Fleet Handover",
    type: "photo",
    category: "Customer Delivery",
    url: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80",
    description: "Delivering commercial electric cargo fleet to Bangalore logistics partner."
  },
  {
    id: "g6",
    title: "SREV Smart LED Helmets & Wallbox Display",
    type: "photo",
    category: "Showroom",
    url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    description: "Showroom accessories showcase with fast chargers and smart helmets."
  }
];
