import { CatalogueCategory, CountryMarket, NoveraProduct } from '../types/commerce';
import {
  EXACT_SINGLE_PRODUCT_PHOTOS,
  buildProductAssetManifest,
} from './productVisuals';

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
  SENATOR_AGBADA: '/src/assets/images/prod_fashion_senator_agbada_1791674334160.jpg',
  LOAFERS_HEELS: '/src/assets/images/prod_footwear_loafers_heels_1791674344235.jpg',
  SERUM_CREAM: '/src/assets/images/prod_botanica_serum_1791499654465.jpg',
  PARFUM: '/src/assets/images/prod_beauty_oud_parfum_1791500425093.jpg',
  GROOMING: '/src/assets/images/prod_beauty_grooming_kit_1791500433933.jpg',
  HAIR_STYLER: '/src/assets/images/prod_beauty_hair_styler_1791500985007.jpg',
  GROCERIES: '/src/assets/images/cat_groceries_pantry_1791674290888.jpg',
  BABY_KIDS: '/src/assets/images/cat_baby_kids_essentials_1791674303822.jpg',
  SPORTS_FITNESS: '/src/assets/images/cat_sports_fitness_gear_1791674315393.jpg',
  FURNITURE_OFFICE: '/src/assets/images/cat_furniture_office_desk_1791674325175.jpg',
};

/**
 * Maps specific product IDs (NG0131–NG0178) to their genuine studio product photography.
 * Products NG0001–NG0130 do not have individual verified photos in the catalogue TSV, so they
 * intentionally render with visually refined category-specific studio placeholders in ResilientImage
 * rather than substituting photographs of unrelated products.
 */
const VERIFIED_PRODUCT_IMAGES: Record<string, string> = {
  NG0131: IMG.PHONES,
  NG0132: IMG.TABLET,
  NG0133: IMG.PHONES,
  NG0134: IMG.PHONES,
  NG0135: IMG.TABLET,
  NG0136: IMG.PHONES,
  NG0137: IMG.TABLET,
  NG0138: IMG.PHONES,
  NG0139: IMG.LAPTOP,
  NG0140: IMG.MONITOR_DESK,
  NG0141: IMG.LAPTOP,
  NG0142: IMG.MONITOR_DESK,
  NG0143: IMG.LAPTOP,
  NG0144: IMG.MONITOR_DESK,
  NG0145: IMG.MONITOR_DESK,
  NG0146: IMG.LAPTOP,
  NG0147: IMG.AUDIO,
  NG0148: IMG.GAMING,
  NG0149: IMG.WATCH,
  NG0150: IMG.CAMERA_DRONE,
  NG0151: IMG.CAMERA_DRONE,
  NG0152: IMG.AUDIO,
  NG0153: IMG.GAMING,
  NG0154: IMG.AUDIO,
  NG0155: IMG.ESPRESSO_HOME,
  NG0156: IMG.KITCHEN_HOME,
  NG0157: IMG.KITCHEN_HOME,
  NG0158: IMG.LAMP_HOME,
  NG0159: IMG.ESPRESSO_HOME,
  NG0160: IMG.ESPRESSO_HOME,
  NG0161: IMG.LAMP_HOME,
  NG0162: IMG.KITCHEN_HOME,
  NG0163: IMG.WEEKENDER,
  NG0164: IMG.TOTE_JACKET,
  NG0165: IMG.EYEWEAR_WALLET,
  NG0166: IMG.SNEAKERS,
  NG0167: IMG.TOTE_JACKET,
  NG0168: IMG.TOTE_JACKET,
  NG0169: IMG.WEEKENDER,
  NG0170: IMG.SNEAKERS,
  NG0171: IMG.SERUM_CREAM,
  NG0172: IMG.HAIR_STYLER,
  NG0173: IMG.PARFUM,
  NG0174: IMG.GROOMING,
  NG0175: IMG.HAIR_STYLER,
  NG0176: IMG.SERUM_CREAM,
  NG0177: IMG.PARFUM,
  NG0178: IMG.GROOMING,
};

export const CATEGORY_REPRESENTATIVE_IMAGES: Record<CatalogueCategory, string> = {
  'Phones & Accessories': IMG.PHONES,
  Computers: IMG.LAPTOP,
  Electronics: IMG.AUDIO,
  'Home & Kitchen': IMG.KITCHEN_HOME,
  Fashion: IMG.SENATOR_AGBADA,
  Footwear: IMG.LOAFERS_HEELS,
  Beauty: IMG.SERUM_CREAM,
  Groceries: IMG.GROCERIES,
  'Baby & Kids': IMG.BABY_KIDS,
  'Sports & Fitness': IMG.SPORTS_FITNESS,
  'Furniture & Office': IMG.FURNITURE_OFFICE,
};

/**
 * Curated 8 Featured Product IDs for the minimal Homepage showcase
 */
const HOMEPAGE_FEATURED_IDS = new Set([
  'NG0041', // Samsung Galaxy A16
  'NG0059', // MacBook Air M2
  'NG0072', // Air Fryer 4.5L
  'NG0121', // Ergonomic Office Chair
  'NG0131', // Aether Pro 15 Titanium 5G Smartphone (256GB)
  'NG0139', // Zenith StudioBook 16 M-Series Pro Workstation
  'NG0147', // Aureal Reference ANC Studio Headphones & USB-C Hi-Fi DAC Bundle
  'NG0164', // Valeria Structured Emerald & Noir Pebbled Leather Luxury Tote Bag
]);

/**
 * All 11 Exact Catalogue Categories
 */
export const CATALOGUE_CATEGORIES: CatalogueCategory[] = [
  'Fashion',
  'Footwear',
  'Beauty',
  'Phones & Accessories',
  'Computers',
  'Home & Kitchen',
  'Groceries',
  'Baby & Kids',
  'Sports & Fitness',
  'Furniture & Office',
  'Electronics',
];

export const NAVIGATION_CATEGORIES: string[] = [
  'All Categories',
  ...CATALOGUE_CATEGORIES,
];

export interface CategoryTile {
  id: string;
  name: CatalogueCategory;
  slug: CatalogueCategory;
  description: string;
  imageUrl?: string;
}

export const FEATURED_CATEGORY_TILES: CategoryTile[] = [
  {
    id: 'cat-phones-acc',
    name: 'Phones & Accessories',
    slug: 'Phones & Accessories',
    description: 'Smartphones, tablets, power banks, fast chargers, and accessories.',
    imageUrl: IMG.PHONES,
  },
  {
    id: 'cat-computers',
    name: 'Computers',
    slug: 'Computers',
    description: 'Laptops, workstations, monitors, SSDs, and office peripherals.',
    imageUrl: IMG.LAPTOP,
  },
  {
    id: 'cat-electronics',
    name: 'Electronics',
    slug: 'Electronics',
    description: 'Studio headphones, consoles, cameras, drones, and smartwatches.',
    imageUrl: IMG.AUDIO,
  },
  {
    id: 'cat-home-kitchen',
    name: 'Home & Kitchen',
    slug: 'Home & Kitchen',
    description: 'Air fryers, blenders, espresso machines, cookware, and appliances.',
    imageUrl: IMG.KITCHEN_HOME,
  },
  {
    id: 'cat-fashion',
    name: 'Fashion',
    slug: 'Fashion',
    description: 'Ready-to-wear apparel, native sets, leather bags, and accessories.',
    imageUrl: IMG.TOTE_JACKET,
  },
  {
    id: 'cat-beauty',
    name: 'Beauty',
    slug: 'Beauty',
    description: 'Skincare serums, fragrances, hair care, and personal grooming.',
    imageUrl: IMG.SERUM_CREAM,
  },
];

/**
 * Exact 178-Product Catalogue TSV from Novera Product Catalogue
 * NG0001 through NG0130 (Original 130 products)
 * NG0131 through NG0178 (48 additional website products)
 */
const RAW_CATALOGUE_TSV = `NG0001	Men's Premium Senator Outfit	Fashion	Veemax	₦85,000	10	In Stock	Navy	No warranty	Yes	Traditional men's senator outfit in premium fabric
NG0002	Men's Casual Polo Shirt	Fashion	Zara	₦32,000	20	In Stock	Black	No warranty	Yes	Cotton polo shirt suitable for casual and smart-casual wear
NG0003	Women's Ankara Midi Dress	Fashion	Local Collection	₦45,000	17	In Stock	Multicolour	No warranty	Yes	Ready-to-wear Ankara midi dress with contemporary styling
NG0004	Women's Office Blouse	Fashion	Mango	₦38,000	9	In Stock	White	14-day return	Yes	Smart long-sleeve blouse designed for office and formal wear
NG0005	Men's Slim Fit Chinos	Fashion	H&M	₦42,000	8	In Stock	Khaki	14-day return	Yes	Slim-fit cotton chinos for everyday and office wear
NG0006	Women's High Waist Jeans	Fashion	Levi's	₦58,000	30	In Stock	Blue	No warranty	Yes	High-waist stretch denim jeans with a slim silhouette
NG0007	Men's Native Agbada Set	Fashion	Local Collection	₦120,000	4	Low Stock	Cream	No warranty	Yes	Three-piece traditional Agbada set for occasions and events
NG0008	Women's Two-Piece Lounge Set	Fashion	Fashion Hub	₦28,000	16	In Stock	Grey	No warranty	Yes	Soft two-piece lounge set for relaxed everyday wear
NG0009	Unisex Hoodie	Fashion	Nike	₦65,000	35	In Stock	Black	14-day return	Yes	Fleece-lined hoodie suitable for casual everyday styling
NG0010	Women's Pleated Maxi Skirt	Fashion	Fashion Hub	₦35,000	4	Low Stock	Wine	14-day return	Yes	Flowing pleated maxi skirt for casual and semi-formal outfits
NG0011	Men's Leather Belt	Fashion	Tobacco Leather	₦22,000	15	In Stock	Brown	14-day return	Yes	Genuine leather belt with durable metal buckle
NG0012	Women's Handbag	Fashion	Charles & Keith	₦78,000	29	In Stock	Black	No warranty	Yes	Structured everyday handbag with multiple compartments
NG0013	Men's Formal Shirt	Fashion	Arrow	₦36,000	31	In Stock	Sky Blue	14-day return	Yes	Long-sleeve formal shirt suitable for business and office wear
NG0014	Women's Chiffon Gown	Fashion	Fashion Hub	₦52,000	20	In Stock	Emerald	No warranty	Yes	Elegant chiffon gown for parties, dinners and occasions
NG0015	Men's Denim Jacket	Fashion	Levi's	₦72,000	13	In Stock	Blue	14-day return	Yes	Classic denim jacket for casual layering
NG0016	Men's Leather Loafers	Footwear	Aldo	₦68,000	30	In Stock	Brown	7-day return	Yes	Classic leather loafers for office and smart-casual outfits
NG0017	Women's Block Heel Sandals	Footwear	Aldo	₦55,000	20	In Stock	Black	No warranty	Yes	Comfortable block heel sandals for work and events
NG0018	Men's Running Sneakers	Footwear	Nike	₦95,000	16	In Stock	Black/White	7-day return	Yes	Lightweight running sneakers with cushioned sole
NG0019	Women's Casual Sneakers	Footwear	Adidas	₦82,000	9	In Stock	White	No warranty	Yes	Everyday lifestyle sneakers with comfortable fit
NG0020	Men's Chelsea Boots	Footwear	Clarks	₦110,000	27	In Stock	Brown	No warranty	Yes	Leather Chelsea boots for smart-casual styling
NG0021	Women's Flat Sandals	Footwear	Local Collection	₦25,000	25	In Stock	Gold	7-day return	Yes	Comfortable flat sandals suitable for everyday use
NG0022	Men's Slides	Footwear	Adidas	₦48,000	19	In Stock	Black	No warranty	Yes	Comfortable branded slides for casual wear
NG0023	Women's Running Shoes	Footwear	New Balance	₦88,000	32	In Stock	Pink/White	14-day return	Yes	Lightweight trainers designed for walking and workouts
NG0024	Kids' Velcro Sneakers	Footwear	Puma	₦42,000	10	In Stock	Blue	7-day return	Yes	Durable children's sneakers with easy Velcro fastening
NG0025	Men's Traditional Leather Sandals	Footwear	Local Collection	₦30,000	8	In Stock	Brown	14-day return	Yes	Handcrafted leather sandals for native outfits
NG0026	Vitamin C Face Serum	Beauty	The Ordinary	₦28,000	21	In Stock	Clear	14-day return	Yes	Brightening serum formulated for an even-looking complexion
NG0027	Hyaluronic Acid Serum	Beauty	CeraVe	₦32,000	26	In Stock	Clear	14-day return	Yes	Hydrating facial serum for daily skincare routines
NG0028	Gentle Facial Cleanser	Beauty	CeraVe	₦25,000	15	In Stock	White	14-day return	Yes	Gentle cleanser suitable for normal to dry skin
NG0029	Shea Butter Body Cream	Beauty	Nivea	₦18,000	7	In Stock	White	No warranty	Yes	Moisturising body cream for dry skin
NG0030	Sunscreen SPF 50	Beauty	La Roche-Posay	₦42,000	17	In Stock	White	7-day return	Yes	Broad-spectrum sunscreen for daily sun protection
NG0031	Liquid Foundation	Beauty	Maybelline	₦24,000	8	In Stock	Natural	No warranty	Yes	Medium-to-full coverage liquid foundation
NG0032	Matte Lipstick	Beauty	MAC	₦38,000	9	In Stock	Red	7-day return	Yes	Long-lasting matte lipstick for everyday and occasion wear
NG0033	Perfume for Women 100ml	Beauty	Lattafa	₦55,000	20	In Stock	Gold	7-day return	Yes	Long-lasting feminine fragrance with floral and warm notes
NG0034	Perfume for Men 100ml	Beauty	Lattafa	₦58,000	26	In Stock	Black	No warranty	Yes	Long-lasting masculine fragrance with woody notes
NG0035	Hair Clipper	Beauty	Wahl	₦65,000	26	In Stock	Black	7-day return	Yes	Rechargeable professional hair clipper for home grooming
NG0036	Natural Black Hair Shampoo	Beauty	SheaMoisture	₦29,000	16	In Stock	Brown	14-day return	Yes	Moisturising shampoo formulated for textured hair
NG0037	Leave-In Hair Conditioner	Beauty	Cantu	₦22,000	20	In Stock	White	14-day return	Yes	Leave-in conditioner for moisturising and defining textured hair
NG0038	Body Mist	Beauty	Victoria's Secret	₦48,000	7	In Stock	Pink	14-day return	Yes	Light fragrance mist for everyday use
NG0039	Makeup Brush Set	Beauty	Real Techniques	₦35,000	13	In Stock	Black	14-day return	Yes	Multi-piece makeup brush set for face and eye application
NG0040	Electric Facial Cleansing Brush	Beauty	Xiaomi	₦48,000	18	In Stock	Pink	No warranty	Yes	Rechargeable silicone cleansing brush for facial care
NG0041	Samsung Galaxy A16	Phones & Accessories	Samsung	₦285,000	32	In Stock	Blue	12 months	Yes	Entry-level smartphone with large display and 128GB storage
NG0042	iPhone 13 128GB	Phones & Accessories	Apple	₦820,000	20	In Stock	Midnight	12 months	Yes	Apple smartphone with 128GB storage and dual camera system
NG0043	Redmi Note 14	Phones & Accessories	Xiaomi	₦310,000	17	In Stock	Black	12 months	Yes	Mid-range smartphone with AMOLED display and 256GB storage
NG0044	Tecno Camon 30	Phones & Accessories	Tecno	₦335,000	23	In Stock	Green	6 months	Yes	Camera-focused smartphone with AMOLED display and 256GB storage
NG0045	Infinix Note 40	Phones & Accessories	Infinix	₦295,000	17	In Stock	Gold	6 months	Yes	Smartphone with fast charging and 256GB internal storage
NG0046	Oraimo Power Bank 20000mAh	Phones & Accessories	Oraimo	₦48,000	23	In Stock	Black	12 months	Yes	High-capacity portable power bank for phones and tablets
NG0047	Anker 20W USB-C Charger	Phones & Accessories	Anker	₦42,000	20	In Stock	White	6 months	Yes	Compact fast charger for compatible USB-C devices
NG0048	Baseus USB-C Cable 1m	Phones & Accessories	Baseus	₦18,000	16	In Stock	Black	12 months	Yes	Durable USB-C charging and data cable
NG0049	Phone Ring Holder	Phones & Accessories	Generic	₦8,000	23	In Stock	Silver	6 months	Yes	Universal phone grip and stand for smartphones
NG0050	Tempered Glass Screen Protector	Phones & Accessories	Generic	₦6,500	34	In Stock	Clear	12 months	Yes	Scratch-resistant tempered glass screen protector
NG0051	MagSafe Compatible Power Bank	Phones & Accessories	Anker	₦85,000	32	In Stock	White	6 months	Yes	Magnetic portable power bank for compatible smartphones
NG0052	Bluetooth Selfie Stick	Phones & Accessories	Generic	₦22,000	19	In Stock	Black	6 months	Yes	Extendable selfie stick with Bluetooth shutter control
NG0053	Wireless Charging Pad	Phones & Accessories	Samsung	₦38,000	18	In Stock	Black	12 months	Yes	Compact wireless charging pad for compatible smartphones
NG0054	Dual SIM 4G Feature Phone	Phones & Accessories	Nokia	₦75,000	19	In Stock	Black	12 months	Yes	Simple dual-SIM feature phone with long battery life
NG0055	iPhone 15 Pro Case	Phones & Accessories	Spigen	₦32,000	30	In Stock	Clear	12 months	Yes	Protective shock-resistant case for iPhone 15 Pro
NG0056	HP 15 Laptop Core i5	Computers	HP	₦980,000	28	In Stock	Silver	12 months	Yes	15.6-inch laptop with Intel Core i5, 8GB RAM and SSD storage
NG0057	Lenovo IdeaPad Slim 3	Computers	Lenovo	₦890,000	17	In Stock	Grey	6 months	Yes	Slim laptop for productivity, school and office work
NG0058	Dell Inspiron 15	Computers	Dell	₦1,050,000	35	In Stock	Silver	12 months	Yes	15.6-inch laptop suitable for business and everyday computing
NG0059	MacBook Air M2	Computers	Apple	₦1,550,000	8	In Stock	Midnight	6 months	Yes	Lightweight laptop with Apple M2 chip and 256GB storage
NG0060	ASUS VivoBook 15	Computers	ASUS	₦925,000	10	In Stock	Blue	6 months	Yes	15.6-inch productivity laptop with 8GB RAM and SSD storage
NG0061	Logitech Wireless Mouse	Computers	Logitech	₦25,000	13	In Stock	Black	12 months	Yes	Compact wireless mouse for laptops and desktops
NG0062	HP Wireless Keyboard	Computers	HP	₦32,000	30	In Stock	Black	12 months	Yes	Full-size wireless keyboard for home and office use
NG0063	Kingston 256GB SSD	Computers	Kingston	₦42,000	7	In Stock	Black	12 months	Yes	Portable solid-state drive for fast file storage
NG0064	Samsung 512GB SSD	Computers	Samsung	₦78,000	27	In Stock	Black	12 months	Yes	High-speed 512GB solid-state drive
NG0065	Laptop Backpack	Computers	Targus	₦55,000	32	In Stock	Black	12 months	Yes	Padded laptop backpack with multiple storage compartments
NG0066	USB-C Multiport Hub	Computers	Ugreen	₦65,000	19	In Stock	Grey	12 months	Yes	Multiport USB-C hub with HDMI and USB expansion
NG0067	24-inch Full HD Monitor	Computers	Dell	₦265,000	3	Low Stock	Black	12 months	Yes	24-inch Full HD monitor for work, study and home office
NG0068	Mechanical Keyboard	Computers	Redragon	₦58,000	10	In Stock	Black	12 months	Yes	RGB mechanical keyboard designed for work and gaming
NG0069	Webcam Full HD 1080p	Computers	Logitech	₦72,000	20	In Stock	Black	12 months	Yes	Full HD webcam for meetings, classes and content creation
NG0070	External Hard Drive 1TB	Computers	Seagate	₦95,000	24	In Stock	Black	6 months	Yes	Portable 1TB external hard drive for backup and storage
NG0071	Electric Kettle 1.7L	Home & Kitchen	Binatone	₦32,000	21	In Stock	Black	12 months	Yes	1.7-litre electric kettle with automatic shut-off
NG0072	Air Fryer 4.5L	Home & Kitchen	Russell Hobbs	₦125,000	13	In Stock	Black	12 months	Yes	4.5-litre air fryer for low-oil cooking
NG0073	Non-Stick Cookware Set	Home & Kitchen	Royalford	₦95,000	3	Low Stock	Black	12 months	Yes	Multi-piece non-stick cookware set for everyday cooking
NG0074	12-Piece Dinner Set	Home & Kitchen	Luminarc	₦48,000	19	In Stock	White	12 months	Yes	Durable dinnerware set for home dining
NG0075	Blender 1.5L	Home & Kitchen	Nexus	₦68,000	14	In Stock	Black	12 months	Yes	1.5-litre kitchen blender with multiple speed settings
NG0076	Microwave Oven 20L	Home & Kitchen	Hisense	₦185,000	9	In Stock	Silver	12 months	Yes	20-litre microwave oven for quick meal preparation
NG0077	4-Burner Gas Cooker	Home & Kitchen	Scanfrost	₦310,000	22	In Stock	Black	12 months	Yes	Four-burner gas cooker with built-in oven
NG0078	Rice Cooker 1.8L	Home & Kitchen	Panasonic	₦58,000	35	In Stock	White	12 months	Yes	Automatic rice cooker with keep-warm function
NG0079	Rechargeable Table Fan	Home & Kitchen	Binatone	₦55,000	15	In Stock	White	6 months	Yes	Rechargeable table fan for use during power interruptions
NG0080	Standing Fan 18-inch	Home & Kitchen	Binatone	₦72,000	26	In Stock	White	6 months	Yes	18-inch standing fan with multiple speed levels
NG0081	Water Dispenser	Home & Kitchen	Haier Thermocool	₦210,000	3	Low Stock	White	12 months	Yes	Hot and cold water dispenser for home or office
NG0082	Vacuum Cleaner	Home & Kitchen	Philips	₦145,000	23	In Stock	Black	12 months	Yes	Compact vacuum cleaner for household cleaning
NG0083	Bedside Lamp	Home & Kitchen	IKEA	₦38,000	4	Low Stock	White	6 months	Yes	Minimal bedside lamp for bedrooms and reading areas
NG0084	Digital Kitchen Scale	Home & Kitchen	Generic	₦18,000	26	In Stock	Black	12 months	Yes	Digital scale for accurate kitchen measurements
NG0085	Storage Container Set	Home & Kitchen	LocknLock	₦42,000	18	In Stock	Clear	6 months	Yes	Reusable airtight food storage container set
NG0086	Golden Penny Spaghetti 500g	Groceries	Golden Penny	₦1,200	18	In Stock	Red	14-day return	Yes	500g spaghetti pack for home cooking
NG0087	Indomie Chicken Noodles 70g x 10	Groceries	Indomie	₦5,500	8	In Stock	Blue	No warranty	Yes	Ten-pack instant chicken-flavoured noodles
NG0088	Peak Full Cream Milk 400g	Groceries	Peak	₦4,800	34	In Stock	Blue	No warranty	Yes	Full cream powdered milk for households
NG0089	Milo Chocolate Drink 400g	Groceries	Nestlé	₦5,500	11	In Stock	Green	No warranty	Yes	Chocolate malt beverage powder for breakfast and drinks
NG0090	Quaker Oats 500g	Groceries	Quaker	₦4,500	33	In Stock	Red	14-day return	Yes	Rolled oats suitable for breakfast and healthy meals
NG0091	Mamador Vegetable Oil 1L	Groceries	Mamador	₦3,900	13	In Stock	Yellow	7-day return	Yes	Vegetable cooking oil for everyday meal preparation
NG0092	Dangote Sugar 1kg	Groceries	Dangote	₦2,200	30	In Stock	White	No warranty	Yes	Refined granulated sugar for household use
NG0093	Basmati Rice 5kg	Groceries	Royal Stallion	₦18,500	15	In Stock	White	14-day return	Yes	Premium long-grain basmati rice
NG0094	Honey 500ml	Groceries	Bee Natural	₦8,500	22	In Stock	Gold	7-day return	Yes	Natural honey suitable for drinks, breakfast and cooking
NG0095	Tomato Paste 400g	Groceries	Gino	₦2,000	26	In Stock	Red	7-day return	Yes	Tomato paste for sauces, stews and everyday cooking
NG0096	Peanut Butter 400g	Groceries	Nutzy	₦6,500	31	In Stock	Brown	No warranty	Yes	Creamy peanut spread for breakfast and snacks
NG0097	Cereal Breakfast Pack 500g	Groceries	Nestlé	₦6,800	18	In Stock	Red	No warranty	Yes	Breakfast cereal suitable for family use
NG0098	Green Tea 25 Bags	Groceries	Lipton	₦3,500	7	In Stock	Green	7-day return	Yes	Tea bags for hot or cold beverages
NG0099	Premium Ground Coffee 200g	Groceries	Nescafé	₦6,200	4	Low Stock	Brown	14-day return	Yes	Instant coffee for home and office consumption
NG0100	Evaporated Milk 170g x 6	Groceries	Peak	₦4,200	17	In Stock	Blue	14-day return	Yes	Six-pack evaporated milk for drinks and cooking
NG0101	Baby Diapers Size 3	Baby & Kids	Pampers	₦12,500	17	In Stock	White	No warranty	Yes	Disposable baby diapers designed for comfort and absorbency
NG0102	Baby Diapers Size 5	Baby & Kids	Huggies	₦14,500	7	In Stock	White	14-day return	Yes	Absorbent diapers for active toddlers
NG0103	Baby Wipes 72 Sheets	Baby & Kids	Cussons	₦3,500	6	In Stock	White	No warranty	Yes	Gentle baby wipes for everyday cleaning
NG0104	Baby Feeding Bottle 250ml	Baby & Kids	Tommee Tippee	₦15,000	7	In Stock	Clear	No warranty	Yes	Anti-colic feeding bottle for babies
NG0105	Baby Cotton Bodysuit 3-Pack	Baby & Kids	Carter's	₦22,000	24	In Stock	Pink	No warranty	Yes	Soft cotton bodysuits for babies
NG0106	Kids School Backpack	Baby & Kids	Puma	₦35,000	35	In Stock	Blue	No warranty	Yes	Durable school backpack with multiple compartments
NG0107	Kids Educational Tablet	Baby & Kids	Amazon	₦145,000	20	In Stock	Blue	14-day return	Yes	Child-friendly tablet for educational apps and entertainment
NG0108	Building Blocks Set	Baby & Kids	LEGO	₦65,000	34	In Stock	Multicolour	No warranty	Yes	Creative building block set for children
NG0109	Kids Water Bottle	Baby & Kids	Sistema	₦12,000	11	In Stock	Pink	14-day return	Yes	Reusable leak-resistant bottle for school and outings
NG0110	Baby Bath Wash 500ml	Baby & Kids	Johnson's	₦8,500	33	In Stock	White	No warranty	Yes	Gentle body wash formulated for babies
NG0111	Yoga Mat	Sports & Fitness	Decathlon	₦28,000	33	In Stock	Purple	12 months	Yes	Non-slip exercise mat for yoga and home workouts
NG0112	Adjustable Dumbbell Set	Sports & Fitness	Decathlon	₦85,000	15	In Stock	Black	6 months	Yes	Adjustable dumbbell set for strength training
NG0113	Resistance Bands Set	Sports & Fitness	Generic	₦25,000	9	In Stock	Multicolour	12 months	Yes	Set of resistance bands for home workouts
NG0114	Football Size 5	Sports & Fitness	Adidas	₦48,000	30	In Stock	White/Black	12 months	Yes	Official-size football for training and recreational play
NG0115	Running Waist Bag	Sports & Fitness	Nike	₦22,000	30	In Stock	Black	12 months	Yes	Compact waist bag for carrying essentials during runs
NG0116	Gym Water Bottle 1L	Sports & Fitness	Nike	₦18,000	32	In Stock	Black	12 months	Yes	Reusable one-litre sports water bottle
NG0117	Sports Training Shoes	Sports & Fitness	Nike	₦105,000	6	In Stock	Black/White	12 months	Yes	Cushioned training shoes for gym and fitness sessions
NG0118	Skipping Rope	Sports & Fitness	Decathlon	₦12,000	9	In Stock	Black	6 months	Yes	Adjustable skipping rope for cardio workouts
NG0119	Fitness Smartwatch	Sports & Fitness	Amazfit	₦175,000	28	In Stock	Black	12 months	Yes	Smartwatch with activity, sleep and heart-rate tracking
NG0120	Sports Jersey	Sports & Fitness	Adidas	₦55,000	24	In Stock	Red	6 months	Yes	Breathable sports jersey for training and casual wear
NG0121	Ergonomic Office Chair	Furniture & Office	Sihoo	₦285,000	18	In Stock	Black	No warranty	Yes	Adjustable ergonomic chair designed for long work sessions
NG0122	Study Desk	Furniture & Office	IKEA	₦175,000	15	In Stock	Oak	14-day return	Yes	Compact study and home-office desk
NG0123	Office Desk Lamp	Furniture & Office	IKEA	₦42,000	31	In Stock	White	No warranty	Yes	Adjustable desk lamp for reading and office work
NG0124	Filing Cabinet	Furniture & Office	Generic	₦120,000	30	In Stock	Grey	No warranty	Yes	Metal filing cabinet for office documents
NG0125	Bookshelf 5-Tier	Furniture & Office	Generic	₦95,000	20	In Stock	Walnut	7-day return	Yes	Five-tier bookshelf for home or office storage
NG0126	Executive Office Chair	Furniture & Office	Local Collection	₦340,000	18	In Stock	Black	No warranty	Yes	High-back executive chair with padded armrests
NG0127	Computer Desk 120cm	Furniture & Office	Local Collection	₦145,000	31	In Stock	Brown	14-day return	Yes	Compact workstation for laptop and desktop setups
NG0128	Visitor Chair	Furniture & Office	Generic	₦75,000	9	In Stock	Black	No warranty	Yes	Padded visitor chair for office reception and meeting areas
NG0129	Whiteboard 90x120cm	Furniture & Office	Generic	₦58,000	3	Low Stock	White	No warranty	Yes	Magnetic whiteboard for classrooms, meetings and planning
NG0130	Document Organiser	Furniture & Office	Generic	₦18,000	18	In Stock	Black	No warranty	Yes	Desktop organiser for documents and office stationery
NG0131	Aether Pro 15 Titanium 5G Smartphone (256GB)	Phones & Accessories	Aether Mobile	₦685,000	27	Not confirmed	Grey	12 months	Yes	Website-listed 5G smartphone advertised with 256GB storage.
NG0132	SlatePad Pro 13 Ultra-Thin Tandem OLED Tablet & Stylus	Phones & Accessories	Aether Mobile	₦820,000	9	Not confirmed	Silver	12 months	Yes	Website-listed ultra-thin 13-inch OLED tablet bundled with a stylus.
NG0133	Aether Fold V2 Dual-Screen 5G Executive Smartphone (512GB)	Phones & Accessories	Aether Mobile	₦1,180,000	10	Not confirmed	Black	12 months	Yes	Website-listed dual-screen folding 5G smartphone with 512GB storage.
NG0134	Nova Core 5G All-Day Smartphone (128GB)	Phones & Accessories	Nova Telecom	₦265,000	20	Not confirmed	Black	12 months	Yes	Website-listed 5G smartphone advertised with 128GB storage.
NG0135	SlatePad Air 11 Cellular Study & Creator Tablet (256GB)	Phones & Accessories	Aether Mobile	₦475,000	28	Not confirmed	Silver	12 months	Yes	Website-listed 11-inch cellular tablet advertised with 256GB storage.
NG0136	VoltCore 27,000mAh 140W GaN Airline-Safe Laptop & Phone Power Bank	Phones & Accessories	VoltCore Energy	₦98,000	4	Not confirmed	Black	6 months	Yes	Website-listed 27,000mAh 140W GaN power bank for laptops and phones.
NG0137	SlatePad Magnetic Backlit Trackpad Folio Keyboard	Phones & Accessories	Aether Mobile	₦135,000	9	Not confirmed	Black	6 months	Yes	Website-listed magnetic folio keyboard with backlit keys and a trackpad.
NG0138	VoltCore 3-in-1 Qi2 15W Magnetic Wireless Desktop Charging Stand	Phones & Accessories	VoltCore Energy	₦74,000	20	Not confirmed	Black	6 months	Yes	Website-listed Qi2 15W magnetic three-in-one desktop charging stand.
NG0139	Zenith StudioBook 16 M-Series Pro Workstation (32GB / 1TB)	Computers	Zenith Computing	₦1,450,000	31	Not confirmed	Silver	12 months	Yes	Website-listed 16-inch M-Series workstation advertised with 32GB memory and 1TB storage.
NG0140	Zenith UltraView 34" Curved WQHD 175Hz OLED Designer & Coding Monitor	Computers	Zenith Computing	₦690,000	9	Not confirmed	Black	12 months	Yes	Website-listed 34-inch curved WQHD OLED monitor advertised with 175Hz refresh rate.
NG0141	Zenith AirBook 14 Featherweight Executive Ultrabook (16GB / 512GB)	Computers	Zenith Computing	₦785,000	17	Not confirmed	Grey	12 months	Yes	Website-listed 14-inch ultrabook advertised with 16GB memory and 512GB storage.
NG0142	KeyCraft Pro 75% Gasket-Mounted Wireless Mechanical Keyboard	Computers	KeyCraft Studio	₦118,000	28	Not confirmed	Black	6 months	Yes	Website-listed 75-percent wireless mechanical keyboard with gasket mounting.
NG0143	Apex Blade 15 RTX Gaming & 3D Creator Laptop (240Hz OLED)	Computers	Zenith Computing	₦1,620,000	17	Not confirmed	Black	12 months	Yes	Website-listed gaming and creator laptop advertised with an RTX GPU and 240Hz OLED display.
NG0144	KeyCraft ErgoMaster MagSpeed Wireless Productivity Mouse	Computers	KeyCraft Studio	₦82,000	27	Not confirmed	Black	6 months	Yes	Website-listed wireless productivity mouse with MagSpeed branding.
NG0145	ThunderDock 12-in-1 Dual-4K Thunderbolt 4 Workstation Hub	Computers	VoltCore Energy	₦145,000	26	Not confirmed	Grey	6 months	Yes	Website-listed 12-in-one Thunderbolt 4 workstation hub with dual-4K support.
NG0146	Velocity 2TB Rugged NVMe USB4 Portable Solid State Drive	Computers	Zenith Computing	₦168,000	32	Not confirmed	Black	12 months	Yes	Website-listed rugged 2TB NVMe USB4 portable solid-state drive.
NG0147	Aureal Reference ANC Studio Headphones & USB-C Hi-Fi DAC Bundle	Electronics	Aureal Acoustics	₦390,000	27	Not confirmed	Black	6 months	Yes	Website-listed ANC studio headphones bundled with a USB-C Hi-Fi DAC.
NG0148	Hyperion 4K 120fps Next-Gen Gaming Console & Spatial VR Bundle (1TB)	Electronics	Hyperion Interactive	₦795,000	13	Not confirmed	Black	12 months	Yes	Website-listed gaming console and spatial VR bundle advertised as 4K 120fps with 1TB storage.
NG0149	Chronos Apex Titanium Smart Chronograph Watch (Sapphire Edition)	Electronics	Aureal Acoustics	₦410,000	14	Not confirmed	Titanium Grey	12 months	Yes	Website-listed titanium-styled smart chronograph watch, Sapphire Edition.
NG0150	CineAlpha FX Full-Frame 4K/120p Mirrorless Cinema Camera & 50mm Prime	Electronics	Optix Imaging	₦1,850,000	24	Not confirmed	Black	12 months	Yes	Website-listed full-frame mirrorless cinema camera and 50mm prime lens bundle, advertised as 4K/120p.
NG0151	AeroPro Carbon 4K/60fps Tri-Directional Obstacle-Sensing Camera Drone	Electronics	Optix Imaging	₦640,000	8	Not confirmed	Grey	12 months	Yes	Website-listed 4K/60fps camera drone with advertised tri-directional obstacle sensing.
NG0152	Aureal Pulse Pro True-Wireless Lossless ANC Earbuds	Electronics	Aureal Acoustics	₦165,000	35	Not confirmed	Black	6 months	Yes	Website-listed true-wireless ANC earbuds with lossless-audio branding.
NG0153	Hyperion DualSense Edge Pro Wireless Controller (Emerald LED Edition)	Electronics	Hyperion Interactive	₦112,000	17	Not confirmed	Black/Emerald	6 months	Yes	Website-listed wireless gaming controller, Emerald LED Edition.
NG0154	Aureal SoundStage 360 Spatial Dolby Atmos Wireless Home Speaker	Electronics	Aureal Acoustics	₦285,000	15	Not confirmed	Black	12 months	Yes	Website-listed wireless home speaker advertised with spatial Dolby Atmos audio.
NG0155	Anvil Barista Pro Dual-Boiler PID Espresso & Cappuccino System	Home & Kitchen	Anvil Home	₦520,000	8	Not confirmed	Silver	12 months	Yes	Website-listed dual-boiler PID espresso and cappuccino system.
NG0156	Anvil DualZone 10L Digital Touchscreen Air Fryer & Roast Oven	Home & Kitchen	Anvil Home	₦195,000	16	Not confirmed	Black	12 months	Yes	Website-listed 10L digital touchscreen dual-zone air fryer and roast oven.
NG0157	Ostyra 1800W High-Speed Vacuum Smoothie & Nut-Milk Glass Blender	Home & Kitchen	Anvil Home	₦165,000	27	Not confirmed	Black	12 months	Yes	Website-listed 1800W vacuum blender for smoothies and nut milk, with glass jug.
NG0158	Lumiere Cast-Bronze Architectural Table Lamp (Belgian Linen Shade)	Home & Kitchen	Anvil Home	₦185,000	23	Not confirmed	Bronze/Cream	6 months	Yes	Website-listed cast-bronze table lamp with Belgian linen shade.
NG0159	Anvil PureAir HEPA-14 Smart Air Purifier & Air Quality Monitor	Home & Kitchen	Anvil Home	₦245,000	16	Not confirmed	White	12 months	Yes	Website-listed smart air purifier with HEPA-14 and air-quality-monitor branding.
NG0160	Anvil Precision Conical Burr Coffee Grinder (60 Grind Settings)	Home & Kitchen	Anvil Home	₦128,000	34	Not confirmed	Black	12 months	Yes	Website-listed conical burr coffee grinder advertised with 60 grind settings.
NG0161	Lumiere Cordless Rechargeable Brass Dining & Patio Accent Lamp	Home & Kitchen	Anvil Home	₦88,000	7	Not confirmed	Brass	6 months	Yes	Website-listed cordless rechargeable brass accent lamp for dining and patio use.
NG0162	Anvil RoboSweep LiDAR Self-Emptying Robot Vacuum & Mop	Home & Kitchen	Anvil Home	₦460,000	20	Not confirmed	Black	12 months	Yes	Website-listed LiDAR robot vacuum and mop with self-emptying feature in its product name.
NG0163	Aurelius Full-Grain Leather Cabin Weekender Duffle Bag	Fashion	Aurelius Atelier	₦295,000	19	Not confirmed	Brown	No warranty	Yes	Website-listed full-grain leather cabin weekender duffle bag.
NG0164	Valeria Structured Emerald & Noir Pebbled Leather Luxury Tote Bag	Fashion	Aurelius Atelier	₦245,000	9	Not confirmed	Emerald/Black	No warranty	Yes	Website-listed structured pebbled leather luxury tote described as Emerald and Noir.
NG0165	Vanguard Titanium Aviator Eyewear & Woven Emerald Cardholder Set	Fashion	Aurelius Atelier	₦165,000	14	Not confirmed	Silver/Emerald	No warranty	Yes	Website-listed titanium aviator eyewear and woven Emerald cardholder set.
NG0166	Atelier Low-Top Architectural Leather & Emerald Suede Sneakers	Fashion	Aurelius Atelier	₦235,000	24	Not confirmed	White/Emerald	No warranty	Yes	Website-listed low-top leather and Emerald suede sneakers.
NG0167	Aurelius Tailored Heavyweight Merino-Blend Minimalist Bomber Jacket	Fashion	Aurelius Atelier	₦210,000	13	Not confirmed	Black	No warranty	Yes	Website-listed heavyweight Merino-blend minimalist bomber jacket.
NG0168	Valeria 100% Mulberry Silk Geometric Emerald & Gold Twill Foulard Scarf	Fashion	Aurelius Atelier	₦85,000	17	Not confirmed	Emerald/Gold	No warranty	Yes	Website-listed 100-percent Mulberry silk geometric Emerald and Gold twill scarf.
NG0169	Aurelius Executive 16-Inch Slim Leather Briefcase & Folio	Fashion	Aurelius Atelier	₦225,000	3	Not confirmed	Brown	No warranty	Yes	Website-listed slim leather briefcase and folio for 16-inch devices.
NG0170	Atelier Monolith Matte-Black & Emerald Runner Trainers	Fashion	Aurelius Atelier	₦198,000	32	Not confirmed	Black/Emerald	No warranty	Yes	Website-listed Matte-Black and Emerald runner trainers.
NG0171	Lumina Emerald Radiance Botanical Serum & Black Onyx Night Cream Set	Beauty	Lumina Botanicals	₦95,000	16	Not confirmed	Emerald/Black	No warranty	Yes	Website-listed botanical serum and Black Onyx night cream set.
NG0172	Aeterna AeroSilk Supersonic Ionic Hair Dryer & 4-in-1 Multi-Styler Set	Beauty	Aeterna Grooming	₦265,000	13	Not confirmed	Black	6 months	Yes	Website-listed supersonic ionic hair dryer and four-in-one multi-styler set.
NG0173	Emeraude Nuit Reserve Extrait Eau de Parfum (50ml)	Beauty	Lumina Botanicals	₦138,000	31	Not confirmed	Black/Gold	No warranty	Yes	Website-listed 50ml Extrait Eau de Parfum.
NG0174	Aeterna 9000 Precision Beard Trimmer & Sonic Facial Cleanse System	Beauty	Aeterna Grooming	₦175,000	31	Not confirmed	Black	6 months	Yes	Website-listed precision beard trimmer and sonic facial cleansing system.
NG0175	Verdant & Flora Cold-Pressed Jasmine & Sandalwood Botanical Body Oil Duo	Beauty	Lumina Botanicals	₦78,000	10	Not confirmed	Clear	No warranty	Yes	Website-listed Jasmine and Sandalwood cold-pressed botanical body oil duo.
NG0176	Lumina Vitamin C 20% + Ferulic Brightening Day Defense Drops	Beauty	Lumina Botanicals	₦64,000	26	Not confirmed	Clear	No warranty	Yes	Website-listed Vitamin C 20-percent and Ferulic brightening day drops.
NG0177	Emeraude Voyage Luxury Discovery Atomizer Coffret (3 × 15ml)	Beauty	Lumina Botanicals	₦110,000	34	Not confirmed	Multicolour	No warranty	Yes	Website-listed luxury fragrance discovery coffret containing three 15ml atomizers.
NG0178	Aeterna SonicPro Hydro-Pulse Electric Toothbrush & UV Sanitizing Case	Beauty	Aeterna Grooming	₦92,000	23	Not confirmed	White	6 months	Yes	Website-listed electric toothbrush with hydro-pulse and UV sanitizing-case branding.`;

function parseCatalogueTSV(tsv: string): NoveraProduct[] {
  const seenIds = new Set<string>();
  const lines = tsv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const parsed: NoveraProduct[] = [];

  for (const line of lines) {
    const cols = line.split('\t').map((c) => c.trim());
    if (cols.length < 11) continue;

    const [
      product_id,
      product_name,
      categoryRaw,
      brand,
      price_ngn,
      stockRaw,
      availability,
      colour,
      warranty,
      delivery_available,
      description,
    ] = cols;

    if (!product_id || seenIds.has(product_id)) continue;
    seenIds.add(product_id);

    const numericPrice = Number(price_ngn.replace(/[^0-9.]/g, '')) || 0;
    const stock_quantity = parseInt(stockRaw, 10) || 0;
    const category = categoryRaw as CatalogueCategory;
    const isUnconfirmedShowcaseRecord = availability.toLowerCase() === 'not confirmed';

    parsed.push({
      id: product_id,
      product_id,
      name: product_name,
      product_name,
      category,
      brand,
      price: numericPrice,
      price_ngn,
      currency: 'NGN',
      stock_quantity,
      availability,
      colour,
      warranty,
      delivery_available,
      description,
      imageUrl: EXACT_SINGLE_PRODUCT_PHOTOS[product_id],
      isUnconfirmedShowcaseRecord,
      featured: HOMEPAGE_FEATURED_IDS.has(product_id),
    });
  }

  return parsed;
}

export const NOVERA_CATALOGUE_PRODUCTS: NoveraProduct[] = parseCatalogueTSV(RAW_CATALOGUE_TSV);

export const NOVERA_PRODUCT_ASSET_MANIFEST = buildProductAssetManifest(NOVERA_CATALOGUE_PRODUCTS);

export const NOVERA_AI_SUGGESTED_PROMPTS = [
  'Help me find a laptop under ₦900,000.',
  'Do you have the Samsung Galaxy A16?',
  'Recommend a good air fryer.',
  "What is Novera's return policy?",
  'How long does delivery take to Ghana?',
  'Convert this product price to Kenyan shillings.',
  'I want to speak to customer support.',
];

export function formatCurrencyAmount(amount: number, currency: string = 'NGN'): string {
  const market = NOVERA_MARKETS.find((m) => m.currency === currency);
  const symbol = market ? market.symbol : `${currency} `;
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
