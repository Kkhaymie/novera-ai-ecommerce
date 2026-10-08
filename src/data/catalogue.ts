import { CountryMarket, NoveraProduct } from '../types/commerce';

export const NOVERA_MARKETS: CountryMarket[] = [
  {
    code: 'NG',
    name: 'Nigeria',
    currency: 'NGN',
    symbol: '₦',
    regionLabel: 'West Africa HQ',
    hubCity: 'Lagos / Abuja',
  },
  {
    code: 'GH',
    name: 'Ghana',
    currency: 'GHS',
    symbol: 'GH₵',
    regionLabel: 'West Africa',
    hubCity: 'Accra',
  },
  {
    code: 'ZA',
    name: 'South Africa',
    currency: 'ZAR',
    symbol: 'R',
    regionLabel: 'Southern Africa',
    hubCity: 'Johannesburg / Cape Town',
  },
  {
    code: 'KE',
    name: 'Kenya',
    currency: 'KES',
    symbol: 'KSh',
    regionLabel: 'East Africa',
    hubCity: 'Nairobi',
  },
  {
    code: 'TZ',
    name: 'Tanzania',
    currency: 'TZS',
    symbol: 'TSh',
    regionLabel: 'East Africa',
    hubCity: 'Dar es Salaam',
  },
  {
    code: 'BJ',
    name: 'Benin Republic',
    currency: 'XOF',
    symbol: 'CFA',
    regionLabel: 'West Africa',
    hubCity: 'Cotonou',
  },
];

export const HERO_IMAGE_PATH = '/src/assets/images/hero_flagship_commerce_1791498554928.jpg';

const IMG = {
  PHONES: '/src/assets/images/cat_phones_tablets_1791498566598.jpg',
  TABLET: '/src/assets/images/prod_slatepad_oled_1791499624902.jpg',
  LAPTOP: '/src/assets/images/cat_laptops_computing_1791498577841.jpg',
  MONITOR_DESK: '/src/assets/images/prod_ultrawide_monitor_desk_1791500964042.jpg',
  AUDIO: '/src/assets/images/cat_audio_electronics_1791498588056.jpg',
  WATCH: '/src/assets/images/prod_chronos_watch_1791499644819.jpg',
  GAMING: '/src/assets/images/prod_gaming_console_vr_1791500935883.jpg',
  CAMERA_DRONE: '/src/assets/images/prod_camera_drone_4k_1791500945289.jpg',
  ESPRESSO_HOME: '/src/assets/images/cat_home_living_1791498599014.jpg',
  LAMP_HOME: '/src/assets/images/prod_lumiere_lamp_1791499635009.jpg',
  KITCHEN_HOME: '/src/assets/images/prod_smart_kitchen_airfryer_1791500954738.jpg',
  WEEKENDER: '/src/assets/images/prod_kente_weekender_1791499664136.jpg',
  EYEWEAR_WALLET: '/src/assets/images/prod_fashion_chronograph_sunglasses_1791500407106.jpg',
  SNEAKERS: '/src/assets/images/prod_fashion_sneakers_1791500416116.jpg',
  TOTE_JACKET: '/src/assets/images/prod_fashion_apparel_tote_1791500974084.jpg',
  SERUM_CREAM: '/src/assets/images/prod_botanica_serum_1791499654465.jpg',
  PARFUM: '/src/assets/images/prod_beauty_oud_parfum_1791500425093.jpg',
  GROOMING: '/src/assets/images/prod_beauty_grooming_kit_1791500433933.jpg',
  HAIR_STYLER: '/src/assets/images/prod_beauty_hair_styler_1791500985007.jpg',
};

export interface CategoryTile {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  itemCountLabel: string;
  featuredSpan?: boolean;
}

export const CATEGORY_TILES: CategoryTile[] = [
  {
    id: 'cat-phones',
    name: 'Phones & Tablets',
    slug: 'Phones & Tablets',
    description: '5G Titanium smartphones, foldable flagships, OLED tablets, and fast-charge power banks.',
    imageUrl: IMG.PHONES,
    itemCountLabel: '8 Products',
    featuredSpan: true,
  },
  {
    id: 'cat-laptops',
    name: 'Laptops & Computing',
    slug: 'Laptops & Computing',
    description: 'M-Series & AI workstations, 34" OLED ultrawide monitors, mechanical keyboards, and NVMe SSDs.',
    imageUrl: IMG.LAPTOP,
    itemCountLabel: '8 Products',
    featuredSpan: false,
  },
  {
    id: 'cat-electronics',
    name: 'Electronics',
    slug: 'Electronics',
    description: 'Next-gen gaming consoles, VR headsets, 4K cinema cameras, drones, ANC headphones, and smartwatches.',
    imageUrl: IMG.GAMING,
    itemCountLabel: '8 Products',
    featuredSpan: false,
  },
  {
    id: 'cat-home',
    name: 'Home & Living',
    slug: 'Home & Living',
    description: 'Dual-basket air fryers, high-speed vacuum blenders, espresso machines, and architectural lighting.',
    imageUrl: IMG.KITCHEN_HOME,
    itemCountLabel: '8 Products',
    featuredSpan: true,
  },
  {
    id: 'cat-fashion',
    name: 'Fashion',
    slug: 'Fashion',
    description: 'Full-grain leather weekenders, structured luxury totes, Italian court sneakers, and titanium eyewear.',
    imageUrl: IMG.TOTE_JACKET,
    itemCountLabel: '8 Products',
    featuredSpan: false,
  },
  {
    id: 'cat-beauty',
    name: 'Beauty & Personal Care',
    slug: 'Beauty & Personal Care',
    description: 'Ionic supersonic hair stylers, Oud Eau de Parfum, botanical facial serums, and sonic grooming systems.',
    imageUrl: IMG.HAIR_STYLER,
    itemCountLabel: '8 Products',
    featuredSpan: true,
  },
];

export const NAVIGATION_CATEGORIES = [
  'All Categories',
  'Phones & Tablets',
  'Laptops & Computing',
  'Electronics',
  'Home & Living',
  'Fashion',
  'Beauty & Personal Care',
  'Deals',
];

/**
 * 48 Curated Products (8 per department across all 6 departments)
 * Covering the exact high-intent items shoppers browse and buy online.
 */
export const SAMPLE_SHOWCASE_PRODUCTS: NoveraProduct[] = [
  // ============================================================================
  // 1. PHONES & TABLETS (8 Products)
  // ============================================================================
  {
    id: 'nov-pt-01',
    name: 'Aether Pro 15 Titanium 5G Smartphone (256GB)',
    brand: 'Aether Mobile',
    category: 'Phones & Tablets',
    price: 685000,
    currency: 'NGN',
    imageUrl: IMG.PHONES,
    description:
      'Grade-5 brushed titanium flagship smartphone featuring a 120Hz LTPO OLED display, 48MP periscope telephoto camera, dual-SIM 5G for Pan-African bands, and 5,200mAh silicon-carbon battery.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Storage & RAM', value: '256GB NVMe / 12GB LPDDR5X' },
      { label: 'Display', value: '6.7-inch 120Hz ProMotion OLED' },
      { label: 'Camera System', value: '48MP Main + 5x Optical Telephoto' },
      { label: 'Battery & Charging', value: '5,200mAh · 65W Fast USB-C' },
    ],
    isSampleRecord: true,
    featured: true,
  },
  {
    id: 'nov-pt-02',
    name: 'SlatePad Pro 13 Ultra-Thin Tandem OLED Tablet & Stylus',
    brand: 'Aether Mobile',
    category: 'Phones & Tablets',
    price: 820000,
    currency: 'NGN',
    imageUrl: IMG.TABLET,
    description:
      '5.1mm ultra-thin architectural tablet featuring tandem OLED luminance, magnetic low-latency stylus for digital illustration and note-taking, and desktop-class multitasking.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Display', value: '13.0-inch Tandem OLED 120Hz' },
      { label: 'Chassis Thickness', value: '5.1mm CNC Aluminum Unibody' },
      { label: 'Storage', value: '512GB High-Speed Flash' },
      { label: 'Included Accessory', value: 'Magnetic Wireless Charging Stylus' },
    ],
    isSampleRecord: true,
    featured: true,
  },
  {
    id: 'nov-pt-03',
    name: 'Aether Fold V2 Dual-Screen 5G Executive Smartphone (512GB)',
    brand: 'Aether Mobile',
    category: 'Phones & Tablets',
    price: 1180000,
    currency: 'NGN',
    imageUrl: IMG.PHONES,
    description:
      'Book-style foldable smartphone with a crease-resistant 7.9-inch inner AMOLED workspace, zero-gap titanium hinge, and multi-window productivity suite.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Inner Display', value: '7.9-inch 120Hz Foldable AMOLED' },
      { label: 'Cover Display', value: '6.4-inch Gorilla Glass Victus' },
      { label: 'Storage', value: '512GB UFS 4.0' },
      { label: 'Hinge Rating', value: 'Tested to 400,000 Folds' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-pt-04',
    name: 'Nova Core 5G All-Day Smartphone (128GB)',
    brand: 'Nova Telecom',
    category: 'Phones & Tablets',
    price: 265000,
    currency: 'NGN',
    imageUrl: IMG.PHONES,
    description:
      'High-value everyday 5G smartphone engineered with a 6,000mAh two-day marathon battery, crisp 90Hz AMOLED screen, and 50MP OIS night-mode camera.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Storage', value: '128GB (Expandable via microSD)' },
      { label: 'Battery Capacity', value: '6,000mAh 2-Day Endurance' },
      { label: 'Display', value: '6.6-inch 90Hz FHD+ AMOLED' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-pt-05',
    name: 'SlatePad Air 11 Cellular Study & Creator Tablet (256GB)',
    brand: 'Aether Mobile',
    category: 'Phones & Tablets',
    price: 475000,
    currency: 'NGN',
    imageUrl: IMG.TABLET,
    description:
      'Lightweight 11-inch Wi-Fi 6E + 5G cellular tablet built for university lectures, portable media streaming, and magnetic folio keyboard productivity.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Display', value: '11.0-inch Liquid Crystal 120Hz' },
      { label: 'Connectivity', value: '5G Sub-6GHz + Wi-Fi 6E' },
      { label: 'Weight', value: '462g Featherweight Chassis' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-pt-06',
    name: 'VoltCore 27,000mAh 140W GaN Airline-Safe Laptop & Phone Power Bank',
    brand: 'VoltCore Energy',
    category: 'Phones & Tablets',
    price: 98000,
    currency: 'NGN',
    imageUrl: IMG.PHONES,
    description:
      'High-density 99.9Wh airline-compliant portable power station with real-time OLED wattage telemetry and dual 140W USB-C PD 3.1 ports to fast-charge laptops and phones simultaneously.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Capacity', value: '27,000mAh / 99.9Wh (Cabin Safe)' },
      { label: 'Max Output', value: '140W USB-C Power Delivery 3.1' },
      { label: 'Display', value: 'Smart Digital Wattage & Time Readout' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-pt-07',
    name: 'SlatePad Magnetic Backlit Trackpad Folio Keyboard',
    brand: 'Aether Mobile',
    category: 'Phones & Tablets',
    price: 135000,
    currency: 'NGN',
    imageUrl: IMG.TABLET,
    description:
      'Floating cantilever magnetic keyboard case with scissor-switch backlit keys, multi-touch glass haptic trackpad, and pass-through USB-C charging.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Compatibility', value: '13-inch & 11-inch SlatePad Series' },
      { label: 'Key Travel', value: '1.2mm Scissor Mechanism' },
      { label: 'Connection', value: 'Zero-Latency Magnetic Smart Pogo Pins' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-pt-08',
    name: 'VoltCore 3-in-1 Qi2 15W Magnetic Wireless Desktop Charging Stand',
    brand: 'VoltCore Energy',
    category: 'Phones & Tablets',
    price: 74000,
    currency: 'NGN',
    imageUrl: IMG.PHONES,
    description:
      'Weighted CNC aluminum bedside and desk charging tree that simultaneously powers your smartphone, smartwatch, and wireless earbuds with certified 15W Qi2 magnetic alignment.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Wireless Standard', value: 'Qi2 Certified 15W MagSafe Compatible' },
      { label: 'Simultaneous Zones', value: 'Phone + Watch + ANC Earbuds' },
      { label: 'Included Adapter', value: '45W GaN Wall Power Brick & Braided Cable' },
    ],
    isSampleRecord: true,
    featured: false,
  },

  // ============================================================================
  // 2. LAPTOPS & COMPUTING (8 Products)
  // ============================================================================
  {
    id: 'nov-lc-01',
    name: 'Zenith StudioBook 16 M-Series Pro Workstation (32GB / 1TB)',
    brand: 'Zenith Computing',
    category: 'Laptops & Computing',
    price: 1450000,
    currency: 'NGN',
    imageUrl: IMG.LAPTOP,
    description:
      'Anodized space-black aluminum workstation engineered for software engineering, 3D rendering, 4K editorial workflows, and 22-hour unplugged battery endurance.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Memory & Storage', value: '32GB Unified RAM · 1TB Gen4 NVMe SSD' },
      { label: 'Display', value: '16.0-inch Mini-LED 120Hz XDR' },
      { label: 'Ports', value: '3x Thunderbolt 4, HDMI 2.1, SDXC UHS-II' },
    ],
    isSampleRecord: true,
    featured: true,
  },
  {
    id: 'nov-lc-02',
    name: 'Zenith UltraView 34" Curved WQHD 175Hz OLED Designer & Coding Monitor',
    brand: 'Zenith Computing',
    category: 'Laptops & Computing',
    price: 690000,
    currency: 'NGN',
    imageUrl: IMG.MONITOR_DESK,
    description:
      '21:9 ultrawide QD-OLED curved display with 99.3% DCI-P3 color accuracy, single-cable 96W USB-C laptop docking, and built-in KVM switch for multi-computer setups.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Resolution & Panel', value: '3440 × 1440 WQHD QD-OLED (1800R)' },
      { label: 'Refresh Rate', value: '175Hz · 0.03ms Response' },
      { label: 'Connectivity', value: 'USB-C (96W PD), 2x HDMI 2.1, DisplayPort 1.4' },
    ],
    isSampleRecord: true,
    featured: true,
  },
  {
    id: 'nov-lc-03',
    name: 'Zenith AirBook 14 Featherweight Executive Ultrabook (16GB / 512GB)',
    brand: 'Zenith Computing',
    category: 'Laptops & Computing',
    price: 785000,
    currency: 'NGN',
    imageUrl: IMG.LAPTOP,
    description:
      'Fanless 1.18kg magnesium-aluminum ultrabook built for founders, consultants, and remote executives requiring silent speed and 18-hour battery life.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Weight', value: '1.18 kg Ultra-Portable' },
      { label: 'Memory & Storage', value: '16GB LPDDR5 · 512GB PCIe SSD' },
      { label: 'Security', value: 'Biometric Fingerprint Reader + IR Camera' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-lc-04',
    name: 'KeyCraft Pro 75% Gasket-Mounted Wireless Mechanical Keyboard',
    brand: 'KeyCraft Studio',
    category: 'Laptops & Computing',
    price: 118000,
    currency: 'NGN',
    imageUrl: IMG.MONITOR_DESK,
    description:
      'CNC-machined aluminum wireless mechanical keyboard featuring hot-swappable tactile switches, double-shot PBT keycaps with Royal Emerald accents, and QMK/VIA programmability.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Layout', value: '75% Compact Tenkeyless (84 Keys)' },
      { label: 'Connectivity', value: 'Tri-Mode: Bluetooth 5.1, 2.4GHz Dongle, USB-C' },
      { label: 'Battery', value: '4,000mAh Rechargeable' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-lc-05',
    name: 'Apex Blade 15 RTX Gaming & 3D Creator Laptop (240Hz OLED)',
    brand: 'Zenith Computing',
    category: 'Laptops & Computing',
    price: 1620000,
    currency: 'NGN',
    imageUrl: IMG.LAPTOP,
    description:
      'Vapor-chamber cooled powerhouse equipped with dedicated ray-tracing graphics, 32GB DDR5 memory, and a 240Hz QHD+ OLED display for AAA gaming and Unreal Engine workflows.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Graphics', value: 'Dedicated 12GB GDDR6 Ray-Tracing GPU' },
      { label: 'Display', value: '15.6-inch QHD+ 240Hz G-Sync OLED' },
      { label: 'Cooling', value: 'Dual-Fan Titanium Vapor Chamber' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-lc-06',
    name: 'KeyCraft ErgoMaster MagSpeed Wireless Productivity Mouse',
    brand: 'KeyCraft Studio',
    category: 'Laptops & Computing',
    price: 82000,
    currency: 'NGN',
    imageUrl: IMG.MONITOR_DESK,
    description:
      'Sculpted right-hand ergonomic wireless mouse with electromagnetic 1,000-lines-per-second scroll wheel, horizontal thumb wheel, and 8K DPI glass-tracking sensor.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Sensor', value: '8,000 DPI Darkfield Tracks on Glass' },
      { label: 'Switches', value: 'Whisper-Quiet Tactile Micro-Switches' },
      { label: 'Multi-Device', value: 'Pair up to 3 Computers Instantly' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-lc-07',
    name: 'ThunderDock 12-in-1 Dual-4K Thunderbolt 4 Workstation Hub',
    brand: 'VoltCore Energy',
    category: 'Laptops & Computing',
    price: 145000,
    currency: 'NGN',
    imageUrl: IMG.MONITOR_DESK,
    description:
      'Desktop aluminum docking station expanding a single laptop port into dual 4K 60Hz displays, 2.5Gb Ethernet, UHS-II SD card slots, and 100W host power delivery.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Total Ports', value: '12 Ports (Thunderbolt 4, HDMI, DP, 2.5GbE, USB-A/C)' },
      { label: 'Host Charging', value: 'Up to 100W Upstream Power Delivery' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-lc-08',
    name: 'Velocity 2TB Rugged NVMe USB4 Portable Solid State Drive',
    brand: 'Zenith Computing',
    category: 'Laptops & Computing',
    price: 168000,
    currency: 'NGN',
    imageUrl: IMG.LAPTOP,
    description:
      'Pocket-sized IP67 water-and-drop resistant external SSD delivering up to 3,800 MB/s read/write speeds for direct ProRes 4K video editing and encrypted backups.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Capacity & Speed', value: '2TB NVMe · Up to 3,800 MB/s' },
      { label: 'Encryption', value: '256-Bit AES Hardware Password Protection' },
      { label: 'Durability', value: 'IP67 Water/Dust Resistant + 3m Drop Rated' },
    ],
    isSampleRecord: true,
    featured: false,
  },

  // ============================================================================
  // 3. ELECTRONICS (8 Products)
  // ============================================================================
  {
    id: 'nov-el-01',
    name: 'Aureal Reference ANC Studio Headphones & USB-C Hi-Fi DAC Bundle',
    brand: 'Aureal Acoustics',
    category: 'Electronics',
    price: 390000,
    currency: 'NGN',
    imageUrl: IMG.AUDIO,
    description:
      'Planar magnetic wireless studio headphones with adaptive hybrid noise cancellation paired with a desktop-grade portable USB-C Hi-Fi DAC for uncompromised acoustic fidelity.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Driver Type', value: '45mm Beryllium Dynamic Drivers' },
      { label: 'Battery Life', value: 'Up to 42 Hours ANC Active' },
      { label: 'DAC Resolution', value: '32-bit / 384kHz Lossless PCM' },
    ],
    isSampleRecord: true,
    featured: true,
  },
  {
    id: 'nov-el-02',
    name: 'Hyperion 4K 120fps Next-Gen Gaming Console & Spatial VR Bundle (1TB)',
    brand: 'Hyperion Interactive',
    category: 'Electronics',
    price: 795000,
    currency: 'NGN',
    imageUrl: IMG.GAMING,
    description:
      'Complete home entertainment and virtual reality bundle featuring a 1TB custom SSD 4K/120fps console, haptic feedback wireless controller with emerald lightbar, and 4K HDR OLED VR headset.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Console Storage', value: '1TB Custom Ultra-High-Speed NVMe SSD' },
      { label: 'Video Output', value: '4K at 120Hz · VRR · Ray Tracing' },
      { label: 'Included VR Headset', value: 'Dual 2000×2040 OLED Eye-Tracking Headset' },
    ],
    isSampleRecord: true,
    featured: true,
  },
  {
    id: 'nov-el-03',
    name: 'Chronos Apex Titanium Smart Chronograph Watch (Sapphire Edition)',
    brand: 'Aureal Acoustics',
    category: 'Electronics',
    price: 410000,
    currency: 'NGN',
    imageUrl: IMG.WATCH,
    description:
      'Grade-5 titanium smart chronograph with sapphire crystal AMOLED face, dual-frequency expedition GPS, ECG & blood oxygen sensors, and perforated Royal Emerald strap.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Case & Crystal', value: '46mm Titanium · Domed Sapphire' },
      { label: 'Water Resistance', value: '100m / 10 ATM Dive Rated' },
      { label: 'Battery Endurance', value: 'Up to 14 Days Normal Use' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-el-04',
    name: 'CineAlpha FX Full-Frame 4K/120p Mirrorless Cinema Camera & 50mm Prime',
    brand: 'Optix Imaging',
    category: 'Electronics',
    price: 1850000,
    currency: 'NGN',
    imageUrl: IMG.CAMERA_DRONE,
    description:
      'Full-frame back-illuminated CMOS cinema and photography camera with 15+ stops of dynamic range, 5-axis in-body stabilization, and a razor-sharp 50mm T1.5 cine prime lens.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Sensor', value: '35mm Full-Frame Exmor R CMOS' },
      { label: 'Video Recording', value: '10-Bit 4:2:2 4K at 120fps Internal' },
      { label: 'Included Lens', value: '50mm T1.5 Cine Prime + Matte Box' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-el-05',
    name: 'AeroPro Carbon 4K/60fps Tri-Directional Obstacle-Sensing Camera Drone',
    brand: 'Optix Imaging',
    category: 'Electronics',
    price: 640000,
    currency: 'NGN',
    imageUrl: IMG.CAMERA_DRONE,
    description:
      'Foldable carbon-composite aerial cinematography drone featuring a 3-axis mechanical gimbal camera, 46-minute flight time, and 15km HD transmission range.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Camera Sensor', value: '4/3 CMOS 20MP Hasselblad-Grade Optics' },
      { label: 'Max Flight Time', value: '46 Minutes per Intelligent Battery' },
      { label: 'Safety', value: 'Omnidirectional Binocular Obstacle Sensing' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-el-06',
    name: 'Aureal Pulse Pro True-Wireless Lossless ANC Earbuds',
    brand: 'Aureal Acoustics',
    category: 'Electronics',
    price: 165000,
    currency: 'NGN',
    imageUrl: IMG.AUDIO,
    description:
      'In-ear acoustic monitors with custom dual-driver architecture, 6-microphone wind-resistant call clarity, and wireless charging aluminum case.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Noise Cancellation', value: 'Up to 48dB Adaptive Hybrid ANC' },
      { label: 'Total Playtime', value: '36 Hours with Charging Case' },
      { label: 'Ingress Protection', value: 'IP55 Sweat & Weather Resistant' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-el-07',
    name: 'Hyperion DualSense Edge Pro Wireless Controller (Emerald LED Edition)',
    brand: 'Hyperion Interactive',
    category: 'Electronics',
    price: 112000,
    currency: 'NGN',
    imageUrl: IMG.GAMING,
    description:
      'Customizable pro gaming controller for console and PC featuring replaceable stick modules, adjustable trigger stops, rear assignable paddles, and tactile grip.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Compatibility', value: 'Console, Windows PC, Mac & Mobile via Bluetooth' },
      { label: 'Customization', value: 'Swappable Thumbsticks & Back Paddles' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-el-08',
    name: 'Aureal SoundStage 360 Spatial Dolby Atmos Wireless Home Speaker',
    brand: 'Aureal Acoustics',
    category: 'Electronics',
    price: 285000,
    currency: 'NGN',
    imageUrl: IMG.AUDIO,
    description:
      'Room-filling Wi-Fi and Bluetooth acoustic sculpture with upward-firing Dolby Atmos drivers, automatic room calibration, and multi-room AirPlay 2 / Spotify Connect.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Acoustic Array', value: '6 Class-D Amplifiers + Subwoofer' },
      { label: 'Connectivity', value: 'Wi-Fi 6, AirPlay 2, Bluetooth 5.3, HDMI eARC' },
    ],
    isSampleRecord: true,
    featured: false,
  },

  // ============================================================================
  // 4. HOME & LIVING (8 Products)
  // ============================================================================
  {
    id: 'nov-hl-01',
    name: 'Anvil Barista Pro Dual-Boiler PID Espresso & Cappuccino System',
    brand: 'Anvil Home',
    category: 'Home & Living',
    price: 520000,
    currency: 'NGN',
    imageUrl: IMG.ESPRESSO_HOME,
    description:
      'Precision PID-controlled espresso extraction machine with matte obsidian housing, commercial 58mm stainless portafilter, and micro-foam steam wand.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Pump Pressure', value: '15-Bar Italian Rotary Pump' },
      { label: 'Temperature Control', value: 'Digital PID Thermostat' },
      { label: 'Water Reservoir', value: '2.2L Removable BPA-Free Tank' },
    ],
    isSampleRecord: true,
    featured: true,
  },
  {
    id: 'nov-hl-02',
    name: 'Anvil DualZone 10L Digital Touchscreen Air Fryer & Roast Oven',
    brand: 'Anvil Home',
    category: 'Home & Living',
    price: 195000,
    currency: 'NGN',
    imageUrl: IMG.KITCHEN_HOME,
    description:
      'Twin-basket 10-liter cyclonic air fryer with Smart-Finish synchronization that cooks two different foods at independent temperatures to finish at the exact same moment.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Total Capacity', value: '10 Liters (2 × 5L Non-Stick Baskets)' },
      { label: 'Cooking Modes', value: '6-in-1: Air Fry, Roast, Bake, Dehydrate, Reheat, Crisp' },
      { label: 'Power Rating', value: '2400W Rapid Air Circulation (220–240V)' },
    ],
    isSampleRecord: true,
    featured: true,
  },
  {
    id: 'nov-hl-03',
    name: 'Ostyra 1800W High-Speed Vacuum Smoothie & Nut-Milk Glass Blender',
    brand: 'Anvil Home',
    category: 'Home & Living',
    price: 165000,
    currency: 'NGN',
    imageUrl: IMG.KITCHEN_HOME,
    description:
      'Commercial-grade vacuum blender that removes oxygen before blending to lock in vibrant nutrients, prevent separation, and crush ice or nuts into velvety textures.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Motor Speed', value: '32,000 RPM Brushless Copper Motor' },
      { label: 'Pitcher Material', value: '1.8L Thermal-Shock Borosilicate Glass' },
      { label: 'Smart Programs', value: 'Smoothie, Soup, Nut Butter, Ice Crush, Auto-Clean' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-hl-04',
    name: 'Lumiere Cast-Bronze Architectural Table Lamp (Belgian Linen Shade)',
    brand: 'Anvil Home',
    category: 'Home & Living',
    price: 185000,
    currency: 'NGN',
    imageUrl: IMG.LAMP_HOME,
    description:
      'Sculptural cast-bronze brutalist pedestal lamp with raw Belgian linen diffuser and warm-dimming LED filament illumination (2200K–3000K).',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Color Temperature', value: '2200K–3000K Stepless Rotary Dimmer' },
      { label: 'Materials', value: 'Hand-Cast Bronze & Natural Linen' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-hl-05',
    name: 'Anvil PureAir HEPA-14 Smart Air Purifier & Air Quality Monitor',
    brand: 'Anvil Home',
    category: 'Home & Living',
    price: 245000,
    currency: 'NGN',
    imageUrl: IMG.ESPRESSO_HOME,
    description:
      '360-degree medical-grade H14 HEPA and activated carbon filtration tower that captures 99.99% of dust, smoke, and allergens with real-time PM2.5 laser readout.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Coverage Area', value: 'Up to 75 m² Living Spaces' },
      { label: 'Noise Level', value: '21 dB Whisper-Quiet Night Mode' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-hl-06',
    name: 'Anvil Precision Conical Burr Coffee Grinder (60 Grind Settings)',
    brand: 'Anvil Home',
    category: 'Home & Living',
    price: 128000,
    currency: 'NGN',
    imageUrl: IMG.ESPRESSO_HOME,
    description:
      'Hardened stainless-steel conical burr grinder with digital dose timer and anti-static grounds canister for espresso, pour-over, and French press.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Burr Material', value: '40mm Hardened Conical Stainless Steel' },
      { label: 'Grind Steps', value: '60 Micro-Adjusted Settings' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-hl-07',
    name: 'Lumiere Cordless Rechargeable Brass Dining & Patio Accent Lamp',
    brand: 'Anvil Home',
    category: 'Home & Living',
    price: 88000,
    currency: 'NGN',
    imageUrl: IMG.LAMP_HOME,
    description:
      'Weather-resistant cordless table lamp with touch-activated 3-stage warm dimming and 24-hour rechargeable battery for dining tables, lounges, and terraces.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Battery Runtime', value: 'Up to 24 Hours per USB-C Charge' },
      { label: 'Finish', value: 'Satin Brushed Brass & Matte Obsidian' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-hl-08',
    name: 'Anvil RoboSweep LiDAR Self-Emptying Robot Vacuum & Mop',
    brand: 'Anvil Home',
    category: 'Home & Living',
    price: 460000,
    currency: 'NGN',
    imageUrl: IMG.KITCHEN_HOME,
    description:
      'Laser-guided autonomous home cleaner with 6,000Pa suction, sonic wet mopping, automatic carpet lift, and 60-day hands-free self-emptying dock.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Suction Power', value: '6,000Pa HyperForce Suction' },
      { label: 'Navigation', value: '360° PreciSense LiDAR Mapping' },
    ],
    isSampleRecord: true,
    featured: false,
  },

  // ============================================================================
  // 5. FASHION (8 Products)
  // ============================================================================
  {
    id: 'nov-fa-01',
    name: 'Aurelius Full-Grain Leather Cabin Weekender Duffle Bag',
    brand: 'Aurelius Atelier',
    category: 'Fashion',
    price: 295000,
    currency: 'NGN',
    imageUrl: IMG.WEEKENDER,
    description:
      'Handcrafted matte black full-grain calfskin cabin weekender featuring bespoke woven emerald-and-gold geometric trim, padded laptop compartment, and solid brass hardware.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Material', value: 'Full-Grain Vegetable-Tanned Leather' },
      { label: 'Hardware', value: 'Solid Brushed Brass Zippers & D-Rings' },
      { label: 'Dimensions', value: '52cm × 28cm × 25cm (Airline Cabin Approved)' },
    ],
    isSampleRecord: true,
    featured: true,
  },
  {
    id: 'nov-fa-02',
    name: 'Valeria Structured Emerald & Noir Pebbled Leather Luxury Tote Bag',
    brand: 'Aurelius Atelier',
    category: 'Fashion',
    price: 245000,
    currency: 'NGN',
    imageUrl: IMG.TOTE_JACKET,
    description:
      'Architectural two-tone structured handbag crafted from Royal Emerald and matte black pebbled calfskin with a 14-inch padded laptop sleeve and gold-plated buckles.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Exterior', value: 'Italian Pebbled Calfskin Leather' },
      { label: 'Interior', value: 'Micro-Suede Lining with Zippered Laptop Partition' },
    ],
    isSampleRecord: true,
    featured: true,
  },
  {
    id: 'nov-fa-03',
    name: 'Vanguard Titanium Aviator Eyewear & Woven Emerald Cardholder Set',
    brand: 'Aurelius Atelier',
    category: 'Fashion',
    price: 165000,
    currency: 'NGN',
    imageUrl: IMG.EYEWEAR_WALLET,
    description:
      'Japanese matte-black acetate navigator sunglasses with 24k gold-plated titanium temples paired with an intrecciato emerald calfskin 6-slot RFID cardholder.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Lens Protection', value: '100% UVA/UVB Polarized CR-39 Lenses' },
      { label: 'Cardholder', value: 'Hand-Woven Emerald Calfskin + RFID Shield' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-fa-04',
    name: 'Atelier Low-Top Architectural Leather & Emerald Suede Sneakers',
    brand: 'Aurelius Atelier',
    category: 'Fashion',
    price: 235000,
    currency: 'NGN',
    imageUrl: IMG.SNEAKERS,
    description:
      'Minimalist low-profile court sneakers constructed from supple matte black calfskin, water-repellent nubuck panels, and Royal Emerald suede heel tabs.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Upper Material', value: 'Full-Grain Italian Calfskin & Suede' },
      { label: 'Outsole', value: 'Stitched Margom Vulcanized Rubber Cup Sole' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-fa-05',
    name: 'Aurelius Tailored Heavyweight Merino-Blend Minimalist Bomber Jacket',
    brand: 'Aurelius Atelier',
    category: 'Fashion',
    price: 210000,
    currency: 'NGN',
    imageUrl: IMG.TOTE_JACKET,
    description:
      'Structured obsidian bomber jacket tailored from breathable double-faced merino wool blend with matte gunmetal two-way zipper and concealed passport pocket.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Fabric', value: '70% Australian Merino Wool / 30% Technical Gabardine' },
      { label: 'Fit', value: 'Modern Tailored Architectural Silhouette' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-fa-06',
    name: 'Valeria 100% Mulberry Silk Geometric Emerald & Gold Twill Foulard Scarf',
    brand: 'Aurelius Atelier',
    category: 'Fashion',
    price: 85000,
    currency: 'NGN',
    imageUrl: IMG.TOTE_JACKET,
    description:
      'Luminous 90cm × 90cm square silk twill scarf printed with bespoke Pan-African geometric linework and hand-rolled edges.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Material', value: '100% 16-Momme Mulberry Silk Twill' },
      { label: 'Dimensions', value: '90cm × 90cm Hand-Rolled Hem' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-fa-07',
    name: 'Aurelius Executive 16-Inch Slim Leather Briefcase & Folio',
    brand: 'Aurelius Atelier',
    category: 'Fashion',
    price: 225000,
    currency: 'NGN',
    imageUrl: IMG.WEEKENDER,
    description:
      'Ultra-slim boardroom briefcase crafted from saddle leather with a luggage trolley pass-through strap, magnetic quick-access document pocket, and detachable shoulder strap.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Laptop Fit', value: 'Fits up to 16-inch Laptops & Tablets' },
      { label: 'Travel Feature', value: 'Rear Trolley Sleeve for Rolling Luggage' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-fa-08',
    name: 'Atelier Monolith Matte-Black & Emerald Runner Trainers',
    brand: 'Aurelius Atelier',
    category: 'Fashion',
    price: 198000,
    currency: 'NGN',
    imageUrl: IMG.SNEAKERS,
    description:
      'All-day travel and city runner combining breathable ballistic mesh, nubuck overlays, and dual-density cushioned midsole.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Upper', value: 'Ballistic Nylon Mesh & Italian Nubuck' },
      { label: 'Cushioning', value: 'Dual-Density High-Rebound EVA Midsole' },
    ],
    isSampleRecord: true,
    featured: false,
  },

  // ============================================================================
  // 6. BEAUTY & PERSONAL CARE (8 Products)
  // ============================================================================
  {
    id: 'nov-bp-01',
    name: 'Lumina Emerald Radiance Botanical Serum & Black Onyx Night Cream Set',
    brand: 'Lumina Botanicals',
    category: 'Beauty & Personal Care',
    price: 95000,
    currency: 'NGN',
    imageUrl: IMG.SERUM_CREAM,
    description:
      'Concentrated cold-pressed African marula, 10% niacinamide, and hyaluronic facial serum paired with a deep-hydration Black Onyx ceramide restorative night cream.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Serum Volume', value: '30ml UV-Protected Emerald Glass Dropper' },
      { label: 'Cream Volume', value: '50ml Restorative Ceramide Complex' },
      { label: 'Skin Types', value: 'Dermatologist Tested for All Skin Tones' },
    ],
    isSampleRecord: true,
    featured: true,
  },
  {
    id: 'nov-bp-02',
    name: 'Aeterna AeroSilk Supersonic Ionic Hair Dryer & 4-in-1 Multi-Styler Set',
    brand: 'Aeterna Grooming',
    category: 'Beauty & Personal Care',
    price: 265000,
    currency: 'NGN',
    imageUrl: IMG.HAIR_STYLER,
    description:
      '110,000 RPM brushless digital hair dryer and Coanda air-wrap curler wand with intelligent heat control (measures air temperature 100 times per second to prevent heat damage).',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Motor Speed', value: '110,000 RPM High-Velocity Ionic Jet' },
      { label: 'Attachments', value: 'Curl Diffuser, Smoothing Nozzle, Air-Wrap Wand' },
      { label: 'Finish', value: 'Matte Obsidian & 24k Brushed Gold' },
    ],
    isSampleRecord: true,
    featured: true,
  },
  {
    id: 'nov-bp-03',
    name: 'Emeraude Nuit Reserve Extrait Eau de Parfum (50ml)',
    brand: 'Lumina Botanicals',
    category: 'Beauty & Personal Care',
    price: 138000,
    currency: 'NGN',
    imageUrl: IMG.PARFUM,
    description:
      'Extrait-strength unisex signature fragrance housed in a faceted smoked-emerald glass flacon with notes of Calabrian bergamot, smoked oud, Madagascar vanilla, and warm ambergris.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Concentration', value: '28% Extrait de Parfum Intense' },
      { label: 'Olfactory Family', value: 'Woody Amber & Spiced Oud' },
      { label: 'Longevity', value: '12+ Hours Skin & Garment Projection' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-bp-04',
    name: 'Aeterna 9000 Precision Beard Trimmer & Sonic Facial Cleanse System',
    brand: 'Aeterna Grooming',
    category: 'Beauty & Personal Care',
    price: 175000,
    currency: 'NGN',
    imageUrl: IMG.GROOMING,
    description:
      'Waterproof anodized aluminum beard sculptor with 0.5mm–10mm motorized micro-dial paired with an antimicrobial silicone sonic facial cleansing brush and slate charging dock.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Blade Technology', value: 'DLC-Coated Self-Sharpening Japanese Steel' },
      { label: 'Sonic Brush', value: '8,000 Transdermal Pulsations / Minute' },
      { label: 'Waterproofing', value: 'IPX7 Wet & Dry Shower Safe' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-bp-05',
    name: 'Verdant & Flora Cold-Pressed Jasmine & Sandalwood Botanical Body Oil Duo',
    brand: 'Lumina Botanicals',
    category: 'Beauty & Personal Care',
    price: 78000,
    currency: 'NGN',
    imageUrl: IMG.HAIR_STYLER,
    description:
      'Fast-absorbing dry luxury body and bath oils infused with wild-harvested baobab, moringa, Moroccan neroli, and Australian sandalwood for luminous satin skin.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Set Contents', value: '100ml Verdant Body Oil + 50ml Flora Elixir' },
      { label: 'Formulation', value: '100% Cold-Pressed Botanicals · Paraben-Free' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-bp-06',
    name: 'Lumina Vitamin C 20% + Ferulic Brightening Day Defense Drops',
    brand: 'Lumina Botanicals',
    category: 'Beauty & Personal Care',
    price: 64000,
    currency: 'NGN',
    imageUrl: IMG.SERUM_CREAM,
    description:
      'Potent antioxidant daytime serum formulated to target hyperpigmentation, uneven tone, and environmental oxidative stress without leaving a sticky residue.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Active Complex', value: '20% L-Ascorbic Acid + 0.5% Ferulic + Vitamin E' },
      { label: 'Volume', value: '30ml Airless UV-Shielded Bottle' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-bp-07',
    name: 'Emeraude Voyage Luxury Discovery Atomizer Coffret (3 × 15ml)',
    brand: 'Lumina Botanicals',
    category: 'Beauty & Personal Care',
    price: 110000,
    currency: 'NGN',
    imageUrl: IMG.PARFUM,
    description:
      'Travel-ready fragrance wardrobe featuring three 15ml refillable vials (Emeraude Nuit, Santal Noir, and Citrus Vetiver) with a magnetic brushed-gold travel case.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Total Volume', value: '3 × 15ml Eau de Parfum Sprays' },
      { label: 'Case Material', value: 'Magnetic Anodized Brass Travel Sleeve' },
    ],
    isSampleRecord: true,
    featured: false,
  },
  {
    id: 'nov-bp-08',
    name: 'Aeterna SonicPro Hydro-Pulse Electric Toothbrush & UV Sanitizing Case',
    brand: 'Aeterna Grooming',
    category: 'Beauty & Personal Care',
    price: 92000,
    currency: 'NGN',
    imageUrl: IMG.GROOMING,
    description:
      '42,000-stroke-per-minute magnetic levitation sonic toothbrush with pressure sensor, 60-day battery life, and a USB-C UV-C sanitizing travel case.',
    stockStatus: 'Sample Showcase Record',
    specifications: [
      { label: 'Cleaning Modes', value: 'Clean, White, Polish, Gum Care, Sensitive' },
      { label: 'Travel Case', value: 'Built-In UV-C LED Brush Head Sterilizer' },
    ],
    isSampleRecord: true,
    featured: false,
  },
];

export const NOVERA_AI_SUGGESTED_PROMPTS = [
  'Find me a phone',
  'Show products under my budget',
  'Compare two laptops',
  'Recommend a home appliance',
  "What is Novera's return policy?",
  'Convert this price to Ghanaian Cedis',
  'I need help with an order',
];

export function formatCurrencyAmount(amount: number, currency: string): string {
  const market = NOVERA_MARKETS.find((m) => m.currency === currency);
  const symbol = market ? market.symbol : `${currency} `;
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
