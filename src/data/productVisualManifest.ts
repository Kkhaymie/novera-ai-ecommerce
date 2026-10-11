import { CatalogueCategory } from '../types/commerce';

export type ProductVisualResolutionTier =
  | 'exact_product_photo'
  | 'product_specific_illustration'
  | 'subtype_visual'
  | 'category_visual'
  | 'novera_fallback';

export type ProductArtworkArchetype =
  // Fashion (NG0001–NG0015, NG0163–NG0170)
  | 'senator_suit'
  | 'polo_shirt'
  | 'ankara_dress'
  | 'office_blouse'
  | 'chinos_trousers'
  | 'denim_jeans'
  | 'agbada_robe'
  | 'lounge_set'
  | 'hoodie_sweatshirt'
  | 'pleated_skirt'
  | 'leather_belt'
  | 'structured_handbag'
  | 'formal_shirt'
  | 'evening_gown'
  | 'denim_jacket'
  | 'bomber_jacket'
  | 'silk_scarf'
  | 'weekender_duffle'
  | 'leather_briefcase'
  | 'aviator_eyewear_set'
  // Footwear (NG0016–NG0025)
  | 'leather_loafers'
  | 'block_heel_sandals'
  | 'running_sneakers'
  | 'casual_sneakers'
  | 'chelsea_boots'
  | 'flat_sandals'
  | 'pool_slides'
  | 'womens_trainers'
  | 'kids_velcro_sneakers'
  | 'traditional_leather_sandals'
  // Beauty (NG0026–NG0040, NG0171–NG0178)
  | 'dropper_serum'
  | 'hydrating_serum'
  | 'pump_cleanser'
  | 'body_cream_jar'
  | 'sunscreen_tube'
  | 'foundation_bottle'
  | 'matte_lipstick'
  | 'womens_perfume'
  | 'mens_cologne'
  | 'hair_clipper'
  | 'shampoo_bottle'
  | 'conditioner_tub'
  | 'body_mist_spray'
  | 'makeup_brush_set'
  | 'sonic_facial_brush'
  | 'supersonic_hair_dryer'
  | 'body_oil_duo'
  | 'atomizer_coffret'
  | 'electric_toothbrush'
  // Phones & Accessories (NG0041–NG0055, NG0131–NG0138)
  | 'smartphone_triple_cam'
  | 'smartphone_dual_cam'
  | 'smartphone_foldable'
  | 'feature_phone_keypad'
  | 'tablet_stylus'
  | 'tablet_folio_keyboard'
  | 'power_bank_brick'
  | 'magsafe_power_bank'
  | 'usb_wall_charger'
  | 'braided_usb_cable'
  | 'phone_ring_holder'
  | 'tempered_glass_protector'
  | 'bluetooth_selfie_stick'
  | 'wireless_charging_pad'
  | 'charging_stand_3in1'
  | 'protective_phone_case'
  // Computers (NG0056–NG0070, NG0139–NG0146)
  | 'laptop_workstation'
  | 'ultrabook_laptop'
  | 'gaming_laptop_rgb'
  | 'wireless_mouse'
  | 'wireless_keyboard'
  | 'mechanical_keyboard'
  | 'portable_ssd'
  | 'external_hdd'
  | 'laptop_backpack'
  | 'usbc_multiport_hub'
  | 'desktop_monitor'
  | 'curved_ultrawide_monitor'
  | 'hd_webcam'
  // Home & Kitchen (NG0071–NG0085, NG0155–NG0162)
  | 'electric_kettle'
  | 'digital_air_fryer'
  | 'cookware_pots_set'
  | 'dinnerware_plates_set'
  | 'countertop_blender'
  | 'microwave_oven'
  | 'four_burner_gas_cooker'
  | 'rice_cooker'
  | 'rechargeable_table_fan'
  | 'pedestal_standing_fan'
  | 'water_dispenser_tower'
  | 'canister_vacuum'
  | 'robot_vacuum_lidar'
  | 'bedside_table_lamp'
  | 'cordless_brass_lamp'
  | 'digital_kitchen_scale'
  | 'airtight_containers_set'
  | 'espresso_machine'
  | 'air_purifier_tower'
  | 'coffee_burr_grinder'
  // Groceries (NG0086–NG0100)
  | 'spaghetti_pasta_pack'
  | 'instant_noodles_multipack'
  | 'milk_powder_tin'
  | 'chocolate_malt_tin'
  | 'rolled_oats_pouch'
  | 'vegetable_oil_bottle'
  | 'granulated_sugar_pack'
  | 'basmati_rice_sack'
  | 'natural_honey_jar'
  | 'tomato_paste_tin'
  | 'peanut_butter_jar'
  | 'breakfast_cereal_box'
  | 'green_tea_box'
  | 'ground_coffee_jar'
  | 'evaporated_milk_6pack'
  // Baby & Kids (NG0101–NG0110)
  | 'baby_diapers_pack'
  | 'toddler_diapers_pack'
  | 'baby_wipes_pouch'
  | 'baby_feeding_bottle'
  | 'baby_bodysuit_3pack'
  | 'kids_school_backpack'
  | 'kids_educational_tablet'
  | 'building_blocks_toy'
  | 'kids_sippy_bottle'
  | 'baby_bath_wash'
  // Sports & Fitness (NG0111–NG0120)
  | 'rolled_yoga_mat'
  | 'adjustable_dumbbells'
  | 'resistance_bands_set'
  | 'soccer_football'
  | 'running_waist_pack'
  | 'gym_water_bottle'
  | 'sports_training_shoes'
  | 'cardio_skipping_rope'
  | 'fitness_smartwatch'
  | 'athletic_sports_jersey'
  // Furniture & Office (NG0121–NG0130)
  | 'ergonomic_mesh_chair'
  | 'study_wood_desk'
  | 'architectural_desk_lamp'
  | 'metal_filing_cabinet'
  | 'five_tier_bookshelf'
  | 'executive_leather_chair'
  | 'computer_workstation_desk'
  | 'office_visitor_chair'
  | 'magnetic_whiteboard'
  | 'desktop_document_organiser'
  // Electronics (NG0147–NG0154)
  | 'studio_headphones_dac'
  | 'gaming_console_vr'
  | 'titanium_chronograph_watch'
  | 'mirrorless_cinema_camera'
  | 'quadcopter_camera_drone'
  | 'anc_wireless_earbuds'
  | 'pro_gamepad_controller'
  | 'dolby_home_speaker';

export interface ProductVisualSpec {
  productId: string;
  tier: ProductVisualResolutionTier;
  /** Only populated when a genuine 1-to-1 photo for this exact productId exists */
  photoUrl?: string;
  archetype: ProductArtworkArchetype;
  primaryHex: string;
  secondaryHex: string;
  accentHex: string;
  modelTag: string;
  captionTag: string;
}

/**
 * Only products where a genuine studio photograph depicts that exact single product without
 * colliding with another product in the catalogue use `photoUrl`.
 * Every other product uses its dedicated `ProductArtworkArchetype` rendered on a bright studio stage
 * so no two unrelated products ever share a repeated photograph.
 */
export const EXACT_SINGLE_PRODUCT_PHOTOS: Record<string, string> = {
  NG0131: '/src/assets/images/cat_phones_tablets_1791498566598.jpg',
  NG0132: '/src/assets/images/prod_slatepad_oled_1791499624902.jpg',
  NG0139: '/src/assets/images/cat_laptops_computing_1791498577841.jpg',
  NG0140: '/src/assets/images/prod_ultrawide_monitor_desk_1791500964042.jpg',
  NG0147: '/src/assets/images/cat_audio_electronics_1791498588056.jpg',
  NG0148: '/src/assets/images/prod_gaming_console_vr_1791500935883.jpg',
  NG0149: '/src/assets/images/prod_chronos_watch_1791499644819.jpg',
  NG0151: '/src/assets/images/prod_camera_drone_4k_1791500945289.jpg',
  NG0155: '/src/assets/images/cat_home_living_1791498599014.jpg',
  NG0156: '/src/assets/images/prod_smart_kitchen_airfryer_1791500954738.jpg',
  NG0158: '/src/assets/images/prod_lumiere_lamp_1791499635009.jpg',
  NG0163: '/src/assets/images/prod_kente_weekender_1791499664136.jpg',
  NG0164: '/src/assets/images/prod_fashion_apparel_tote_1791500974084.jpg',
  NG0165: '/src/assets/images/prod_fashion_chronograph_sunglasses_1791500407106.jpg',
  NG0166: '/src/assets/images/prod_fashion_sneakers_1791500416116.jpg',
  NG0171: '/src/assets/images/prod_botanica_serum_1791499654465.jpg',
  NG0172: '/src/assets/images/prod_beauty_hair_styler_1791500985007.jpg',
  NG0173: '/src/assets/images/prod_beauty_oud_parfum_1791500425093.jpg',
  NG0174: '/src/assets/images/prod_beauty_grooming_kit_1791500433933.jpg',
  NG0001: '/src/assets/images/prod_fashion_senator_agbada_1791674334160.jpg',
  NG0016: '/src/assets/images/prod_footwear_loafers_heels_1791674344235.jpg',
};

/**
 * Translates catalogue colour names into realistic studio illustration swatches
 */
export function resolveColourSwatches(colourName: string): {
  primary: string;
  secondary: string;
  accent: string;
} {
  const c = (colourName || '').toLowerCase();

  if (c.includes('navy')) return { primary: '#1E3A8A', secondary: '#172554', accent: '#D4AF37' };
  if (c.includes('emerald') && c.includes('gold'))
    return { primary: '#065F46', secondary: '#047857', accent: '#D97706' };
  if (c.includes('emerald')) return { primary: '#087F5B', secondary: '#0F172A', accent: '#34D399' };
  if (c.includes('sky blue')) return { primary: '#38BDF8', secondary: '#0284C7', accent: '#E0F2FE' };
  if (c.includes('blue')) return { primary: '#2563EB', secondary: '#1D4ED8', accent: '#60A5FA' };
  if (c.includes('wine') || c.includes('burgundy'))
    return { primary: '#881337', secondary: '#4C0519', accent: '#FDA4AF' };
  if (c.includes('red')) return { primary: '#DC2626', secondary: '#991B1B', accent: '#FCA5A5' };
  if (c.includes('pink')) return { primary: '#EC4899', secondary: '#BE185D', accent: '#FBCFE8' };
  if (c.includes('purple')) return { primary: '#7C3AED', secondary: '#5B21B6', accent: '#C4B5FD' };
  if (c.includes('khaki') || c.includes('oak') || c.includes('tan'))
    return { primary: '#C29B61', secondary: '#8C6239', accent: '#F5E6D3' };
  if (c.includes('walnut') || c.includes('brown'))
    return { primary: '#6B4226', secondary: '#3E2723', accent: '#D7CCC8' };
  if (c.includes('bronze') || c.includes('brass') || c.includes('gold'))
    return { primary: '#B45309', secondary: '#78350F', accent: '#FDE68A' };
  if (c.includes('yellow')) return { primary: '#EAB308', secondary: '#CA8A04', accent: '#FEF08A' };
  if (c.includes('green')) return { primary: '#15803D', secondary: '#166534', accent: '#86EFAC' };
  if (c.includes('cream') || c.includes('natural'))
    return { primary: '#E7E0D6', secondary: '#C7B9A5', accent: '#78716C' };
  if (c.includes('silver') || c.includes('titanium'))
    return { primary: '#94A3B8', secondary: '#475569', accent: '#E2E8F0' };
  if (c.includes('grey')) return { primary: '#64748B', secondary: '#334155', accent: '#CBD5E1' };
  if (c.includes('white') || c.includes('clear'))
    return { primary: '#E2E8F0', secondary: '#94A3B8', accent: '#087F5B' };
  if (c.includes('multicolour'))
    return { primary: '#087F5B', secondary: '#D97706', accent: '#E11D48' };

  // Default Midnight / Black
  return { primary: '#1E293B', secondary: '#0F172A', accent: '#087F5B' };
}

/**
 * Product-ID keyed manifest for all 178 products (NG0001–NG0178).
 * Guarantees that every product resolves to its own specific visual archetype.
 */
export const PRODUCT_ID_ARCHETYPE_MAP: Record<
  string,
  { archetype: ProductArtworkArchetype; modelTag: string; captionTag: string }
> = {
  // 1. FASHION (NG0001–NG0015)
  NG0001: { archetype: 'senator_suit', modelTag: 'SENATOR 2PC', captionTag: 'Tailored Native Set' },
  NG0002: { archetype: 'polo_shirt', modelTag: 'COTTON POLO', captionTag: 'Piqué Smart Polo' },
  NG0003: { archetype: 'ankara_dress', modelTag: 'ANKARA MIDI', captionTag: 'Contemporary Wax Print' },
  NG0004: { archetype: 'office_blouse', modelTag: 'FORMAL BLOUSE', captionTag: 'Tailored Long-Sleeve' },
  NG0005: { archetype: 'chinos_trousers', modelTag: 'SLIM CHINOS', captionTag: 'Stretch Cotton Twill' },
  NG0006: { archetype: 'denim_jeans', modelTag: 'HIGH-WAIST DENIM', captionTag: 'Slim Silhouette Jeans' },
  NG0007: { archetype: 'agbada_robe', modelTag: '3-PIECE AGBADA', captionTag: 'Embroidered Occasion Set' },
  NG0008: { archetype: 'lounge_set', modelTag: '2PC LOUNGE', captionTag: 'Soft Knit Co-ord' },
  NG0009: { archetype: 'hoodie_sweatshirt', modelTag: 'FLEECE HOODIE', captionTag: 'Unisex Pullover' },
  NG0010: { archetype: 'pleated_skirt', modelTag: 'PLEATED MAXI', captionTag: 'Flowing Occasion Skirt' },
  NG0011: { archetype: 'leather_belt', modelTag: 'FULL-GRAIN BELT', captionTag: 'Brushed Metal Buckle' },
  NG0012: { archetype: 'structured_handbag', modelTag: 'MULTI-POCKET BAG', captionTag: 'Structured Top-Handle' },
  NG0013: { archetype: 'formal_shirt', modelTag: 'EXECUTIVE SHIRT', captionTag: 'Button-Down Business' },
  NG0014: { archetype: 'evening_gown', modelTag: 'CHIFFON GOWN', captionTag: 'Floor-Length Evening' },
  NG0015: { archetype: 'denim_jacket', modelTag: 'TRUCKER DENIM', captionTag: 'Classic Layering Jacket' },

  // 2. FOOTWEAR (NG0016–NG0025)
  NG0016: { archetype: 'leather_loafers', modelTag: 'PENNY LOAFER', captionTag: 'Hand-Finished Leather' },
  NG0017: { archetype: 'block_heel_sandals', modelTag: 'BLOCK HEEL', captionTag: 'Ankle-Strap Sandal' },
  NG0018: { archetype: 'running_sneakers', modelTag: 'AIR RUNNER', captionTag: 'Cushioned Sole Trainer' },
  NG0019: { archetype: 'casual_sneakers', modelTag: 'COURT SNEAKER', captionTag: 'Everyday Low-Top' },
  NG0020: { archetype: 'chelsea_boots', modelTag: 'CHELSEA BOOT', captionTag: 'Elastic Gusset Leather' },
  NG0021: { archetype: 'flat_sandals', modelTag: 'METALLIC FLAT', captionTag: 'Everyday Slip-On Sandal' },
  NG0022: { archetype: 'pool_slides', modelTag: 'CONTOUR SLIDES', captionTag: 'Moulded Footbed' },
  NG0023: { archetype: 'womens_trainers', modelTag: 'ACTIVE TRAINER', captionTag: 'Lightweight Mesh' },
  NG0024: { archetype: 'kids_velcro_sneakers', modelTag: 'KIDS VELCRO', captionTag: 'Dual-Strap Sneaker' },
  NG0025: { archetype: 'traditional_leather_sandals', modelTag: 'ARTISAN SANDAL', captionTag: 'Handcrafted Leather' },

  // 3. BEAUTY (NG0026–NG0040)
  NG0026: { archetype: 'dropper_serum', modelTag: 'VITAMIN C 30ML', captionTag: 'Brightening Facial Serum' },
  NG0027: { archetype: 'hydrating_serum', modelTag: 'HYALURONIC B5', captionTag: 'Daily Hydration Serum' },
  NG0028: { archetype: 'pump_cleanser', modelTag: 'FACIAL CLEANSER', captionTag: 'Normal-to-Dry Skin' },
  NG0029: { archetype: 'body_cream_jar', modelTag: 'SHEA BUTTER 400ML', captionTag: 'Rich Moisturising Cream' },
  NG0030: { archetype: 'sunscreen_tube', modelTag: 'SPF 50+ PA++++', captionTag: 'Broad-Spectrum UV Fluid' },
  NG0031: { archetype: 'foundation_bottle', modelTag: 'LIQUID FOUNDATION', captionTag: 'Medium-Full Coverage' },
  NG0032: { archetype: 'matte_lipstick', modelTag: 'VELVET MATTE', captionTag: 'Long-Wear Lip Colour' },
  NG0033: { archetype: 'womens_perfume', modelTag: 'EAU DE PARFUM 100ML', captionTag: 'Floral & Warm Notes' },
  NG0034: { archetype: 'mens_cologne', modelTag: 'HOMME PARFUM 100ML', captionTag: 'Spiced Woody Accord' },
  NG0035: { archetype: 'hair_clipper', modelTag: 'PRO CLIPPER', captionTag: 'Cordless Taper Blade' },
  NG0036: { archetype: 'shampoo_bottle', modelTag: 'BLACK CASTOR SHAMPOO', captionTag: 'Textured Hair Care' },
  NG0037: { archetype: 'conditioner_tub', modelTag: 'LEAVE-IN CREAM', captionTag: 'Curl Conditioning Tub' },
  NG0038: { archetype: 'body_mist_spray', modelTag: 'FRAGRANCE MIST 250ML', captionTag: 'All-Over Body Spray' },
  NG0039: { archetype: 'makeup_brush_set', modelTag: 'PRO BRUSH SET', captionTag: 'Face & Eye Collection' },
  NG0040: { archetype: 'sonic_facial_brush', modelTag: 'SONIC SILICONE', captionTag: 'Rechargeable Cleanser' },

  // 4. PHONES & ACCESSORIES (NG0041–NG0055)
  NG0041: { archetype: 'smartphone_triple_cam', modelTag: 'GALAXY A16 · 128GB', captionTag: '6.7" Super AMOLED' },
  NG0042: { archetype: 'smartphone_dual_cam', modelTag: 'IPHONE 13 · 128GB', captionTag: 'A15 Bionic · Dual Camera' },
  NG0043: { archetype: 'smartphone_triple_cam', modelTag: 'REDMI NOTE 14 · 256GB', captionTag: '108MP AMOLED Display' },
  NG0044: { archetype: 'smartphone_triple_cam', modelTag: 'CAMON 30 · 256GB', captionTag: 'Pro Portrait Camera' },
  NG0045: { archetype: 'smartphone_triple_cam', modelTag: 'NOTE 40 · 256GB', captionTag: 'All-Round FastCharge' },
  NG0046: { archetype: 'power_bank_brick', modelTag: '20,000mAh POWER BANK', captionTag: 'Dual USB Fast Output' },
  NG0047: { archetype: 'usb_wall_charger', modelTag: '20W USB-C PD', captionTag: 'Compact Fast Charger' },
  NG0048: { archetype: 'braided_usb_cable', modelTag: 'USB-C CABLE · 1M', captionTag: 'Fast Charge & Data' },
  NG0049: { archetype: 'phone_ring_holder', modelTag: '360° RING STAND', captionTag: 'Metallic Phone Grip' },
  NG0050: { archetype: 'tempered_glass_protector', modelTag: '9H TEMPERED GLASS', captionTag: 'Scratch-Resistant Shield' },
  NG0051: { archetype: 'magsafe_power_bank', modelTag: 'MAGSAFE BATTERY', captionTag: 'Snap-On Wireless Power' },
  NG0052: { archetype: 'bluetooth_selfie_stick', modelTag: 'TRIPOD SELFIE STICK', captionTag: 'Bluetooth Remote Shutter' },
  NG0053: { archetype: 'wireless_charging_pad', modelTag: '15W QI CHARGER PAD', captionTag: 'Fast Wireless Disc' },
  NG0054: { archetype: 'feature_phone_keypad', modelTag: 'DUAL SIM 4G PHONE', captionTag: 'Long-Life Keypad Phone' },
  NG0055: { archetype: 'protective_phone_case', modelTag: 'IPHONE 15 PRO CASE', captionTag: 'Shock-Absorbing Clear' },

  // 5. COMPUTERS (NG0056–NG0070)
  NG0056: { archetype: 'laptop_workstation', modelTag: 'HP 15 · CORE i5', captionTag: '15.6" FHD · 8GB / SSD' },
  NG0057: { archetype: 'ultrabook_laptop', modelTag: 'IDEAPAD SLIM 3', captionTag: 'Ultra-Slim Productivity' },
  NG0058: { archetype: 'laptop_workstation', modelTag: 'INSPIRON 15', captionTag: '15.6" Business Laptop' },
  NG0059: { archetype: 'ultrabook_laptop', modelTag: 'MACBOOK AIR M2', captionTag: '13.6" Liquid Retina · 256GB' },
  NG0060: { archetype: 'laptop_workstation', modelTag: 'VIVOBOOK 15', captionTag: '15.6" NanoEdge · 8GB' },
  NG0061: { archetype: 'wireless_mouse', modelTag: '2.4GHz WIRELESS MOUSE', captionTag: 'Optical Ergonomic Grip' },
  NG0062: { archetype: 'wireless_keyboard', modelTag: 'FULL-SIZE KEYBOARD', captionTag: 'Cordless Office Layout' },
  NG0063: { archetype: 'portable_ssd', modelTag: '256GB SOLID STATE', captionTag: 'High-Speed Flash Drive' },
  NG0064: { archetype: 'portable_ssd', modelTag: '512GB NVMe SSD', captionTag: 'Pro Storage Module' },
  NG0065: { archetype: 'laptop_backpack', modelTag: '15.6" TECH BACKPACK', captionTag: 'Padded Laptop Compartment' },
  NG0066: { archetype: 'usbc_multiport_hub', modelTag: 'USB-C MULTIPORT HUB', captionTag: '4K HDMI + USB 3.0 + PD' },
  NG0067: { archetype: 'desktop_monitor', modelTag: '24" FULL HD 1080P', captionTag: 'Ultra-Thin Bezel Display' },
  NG0068: { archetype: 'mechanical_keyboard', modelTag: 'RGB MECHANICAL', captionTag: 'Tactile Switch Gaming' },
  NG0069: { archetype: 'hd_webcam', modelTag: '1080P FULL HD WEBCAM', captionTag: 'Auto-Light Correction Mic' },
  NG0070: { archetype: 'external_hdd', modelTag: '1TB EXTERNAL DRIVE', captionTag: 'USB 3.0 Backup Storage' },

  // 6. HOME & KITCHEN (NG0071–NG0085)
  NG0071: { archetype: 'electric_kettle', modelTag: '1.7L CORDLESS KETTLE', captionTag: 'Auto Shut-Off Boil' },
  NG0072: { archetype: 'digital_air_fryer', modelTag: '4.5L RAPID AIR FRYER', captionTag: 'Low-Oil Crisp Basket' },
  NG0073: { archetype: 'cookware_pots_set', modelTag: 'NON-STICK COOKWARE', captionTag: 'Multi-Piece Casserole Set' },
  NG0074: { archetype: 'dinnerware_plates_set', modelTag: '12-PIECE DINNER SET', captionTag: 'Tempered Opal Glassware' },
  NG0075: { archetype: 'countertop_blender', modelTag: '1.5L MULTI-SPEED', captionTag: 'Stainless Blade Blender' },
  NG0076: { archetype: 'microwave_oven', modelTag: '20L SOLO MICROWAVE', captionTag: 'Defrost & Quick Reheat' },
  NG0077: { archetype: 'four_burner_gas_cooker', modelTag: '4-BURNER GAS RANGE', captionTag: 'Standing Cooker + Oven' },
  NG0078: { archetype: 'rice_cooker', modelTag: '1.8L RICE COOKER', captionTag: 'Auto Keep-Warm Steamer' },
  NG0079: { archetype: 'rechargeable_table_fan', modelTag: 'RECHARGEABLE DESK FAN', captionTag: 'Backup Battery Cooling' },
  NG0080: { archetype: 'pedestal_standing_fan', modelTag: '18" STANDING FAN', captionTag: 'Oscillating Height-Adjust' },
  NG0081: { archetype: 'water_dispenser_tower', modelTag: 'HOT & COLD DISPENSER', captionTag: 'Floor-Standing Chiller' },
  NG0082: { archetype: 'canister_vacuum', modelTag: 'CYCLONE VACUUM', captionTag: 'High-Suction Floor Care' },
  NG0083: { archetype: 'bedside_table_lamp', modelTag: 'BEDSIDE READING LAMP', captionTag: 'Warm Fabric Diffuser' },
  NG0084: { archetype: 'digital_kitchen_scale', modelTag: '5KG DIGITAL SCALE', captionTag: '1g Precision LCD Tare' },
  NG0085: { archetype: 'airtight_containers_set', modelTag: 'LOCKNLOCK STORAGE SET', captionTag: 'BPA-Free Clip Containers' },

  // 7. GROCERIES (NG0086–NG0100)
  NG0086: { archetype: 'spaghetti_pasta_pack', modelTag: 'SPAGHETTI · 500G', captionTag: 'Durum Wheat Pasta' },
  NG0087: { archetype: 'instant_noodles_multipack', modelTag: 'CHICKEN NOODLES · 10PK', captionTag: '70g × 10 Multipack' },
  NG0088: { archetype: 'milk_powder_tin', modelTag: 'FULL CREAM MILK · 400G', captionTag: 'Instant Dairy Powder' },
  NG0089: { archetype: 'chocolate_malt_tin', modelTag: 'CHOCOLATE MALT · 400G', captionTag: 'Activ-Go Energy Drink' },
  NG0090: { archetype: 'rolled_oats_pouch', modelTag: 'WHOLE GRAIN OATS · 500G', captionTag: '100% Rolled Porridge Oats' },
  NG0091: { archetype: 'vegetable_oil_bottle', modelTag: 'PURE VEGETABLE OIL · 1L', captionTag: 'Cholesterol-Free Cooking' },
  NG0092: { archetype: 'granulated_sugar_pack', modelTag: 'REFINED SUGAR · 1KG', captionTag: 'Vitamin A Fortified' },
  NG0093: { archetype: 'basmati_rice_sack', modelTag: 'LONG-GRAIN BASMATI · 5KG', captionTag: 'Aged Aromatic Rice' },
  NG0094: { archetype: 'natural_honey_jar', modelTag: 'PURE WILD HONEY · 500ML', captionTag: 'Unfiltered Golden Jar' },
  NG0095: { archetype: 'tomato_paste_tin', modelTag: 'TOMATO PASTE · 400G', captionTag: 'Rich Double-Concentrate' },
  NG0096: { archetype: 'peanut_butter_jar', modelTag: 'CREAMY PEANUT · 400G', captionTag: 'Smooth Roasted Spread' },
  NG0097: { archetype: 'breakfast_cereal_box', modelTag: 'FAMILY CEREAL · 500G', captionTag: 'Whole-Grain Crunch' },
  NG0098: { archetype: 'green_tea_box', modelTag: 'PURE GREEN TEA · 25 BAGS', captionTag: 'Antioxidant Infusion' },
  NG0099: { archetype: 'ground_coffee_jar', modelTag: 'ROAST COFFEE · 200G', captionTag: 'Rich Dark-Roast Granules' },
  NG0100: { archetype: 'evaporated_milk_6pack', modelTag: 'EVAPORATED MILK · 6×170G', captionTag: 'Creamy Tin Multipack' },

  // 8. BABY & KIDS (NG0101–NG0110)
  NG0101: { archetype: 'baby_diapers_pack', modelTag: 'BABY DIAPERS · SIZE 3', captionTag: '12-Hour Dry Protection' },
  NG0102: { archetype: 'toddler_diapers_pack', modelTag: 'ACTIVE DIAPERS · SIZE 5', captionTag: 'Toddler Flex-Fit Pack' },
  NG0103: { archetype: 'baby_wipes_pouch', modelTag: 'GENTLE WIPES · 72 SHEETS', captionTag: 'Hypoallergenic Flip-Top' },
  NG0104: { archetype: 'baby_feeding_bottle', modelTag: 'ANTI-COLIC BOTTLE · 250ML', captionTag: 'Natural Latch Silicone' },
  NG0105: { archetype: 'baby_bodysuit_3pack', modelTag: 'COTTON BODYSUITS · 3PK', captionTag: '100% Soft Combed Cotton' },
  NG0106: { archetype: 'kids_school_backpack', modelTag: 'JUNIOR SCHOOL BAG', captionTag: 'Ergonomic Padded Straps' },
  NG0107: { archetype: 'kids_educational_tablet', modelTag: 'KIDS LEARNING TABLET', captionTag: 'Bumper Case + Parental Control' },
  NG0108: { archetype: 'building_blocks_toy', modelTag: 'CREATIVE BLOCKS SET', captionTag: 'Interlocking STEM Bricks' },
  NG0109: { archetype: 'kids_sippy_bottle', modelTag: 'LEAK-PROOF KIDS BOTTLE', captionTag: 'Flip-Straw School Flask' },
  NG0110: { archetype: 'baby_bath_wash', modelTag: 'TEAR-FREE WASH · 500ML', captionTag: 'Gentle Baby Bath Cleanser' },

  // 9. SPORTS & FITNESS (NG0111–NG0120)
  NG0111: { archetype: 'rolled_yoga_mat', modelTag: 'NON-SLIP YOGA MAT', captionTag: '6mm Cushioned Grip' },
  NG0112: { archetype: 'adjustable_dumbbells', modelTag: 'ADJUSTABLE DUMBBELL SET', captionTag: 'Cast-Iron Weight Plates' },
  NG0113: { archetype: 'resistance_bands_set', modelTag: '5-LEVEL RESISTANCE BANDS', captionTag: 'Latex Home Gym Loop Set' },
  NG0114: { archetype: 'soccer_football', modelTag: 'PRO MATCH BALL · SIZE 5', captionTag: 'Machine-Stitched Panels' },
  NG0115: { archetype: 'running_waist_pack', modelTag: 'RUNNER WAIST BELT', captionTag: 'Zippered Phone & Key Pouch' },
  NG0116: { archetype: 'gym_water_bottle', modelTag: '1.0L HYDRATION BOTTLE', captionTag: 'Chug-Cap Sports Flask' },
  NG0117: { archetype: 'sports_training_shoes', modelTag: 'CROSS-TRAINING SHOE', captionTag: 'High-Traction Gym Sole' },
  NG0118: { archetype: 'cardio_skipping_rope', modelTag: 'SPEED JUMP ROPE', captionTag: 'Ball-Bearing Steel Cable' },
  NG0119: { archetype: 'fitness_smartwatch', modelTag: 'GPS FITNESS WATCH', captionTag: 'Heart-Rate & Sleep Tracker' },
  NG0120: { archetype: 'athletic_sports_jersey', modelTag: 'DRI-FIT TRAINING JERSEY', captionTag: 'Breathable Mesh Knit' },

  // 10. FURNITURE & OFFICE (NG0121–NG0130) — 10 Distinct Visual Archetypes
  NG0121: { archetype: 'ergonomic_mesh_chair', modelTag: 'ERGONOMIC MESH CHAIR', captionTag: 'Lumbar Support + Headrest' },
  NG0122: { archetype: 'study_wood_desk', modelTag: 'OAK STUDY DESK', captionTag: 'Minimalist Writing Table' },
  NG0123: { archetype: 'architectural_desk_lamp', modelTag: 'ARTICULATED DESK LAMP', captionTag: 'Adjustable Task Arm' },
  NG0124: { archetype: 'metal_filing_cabinet', modelTag: '3-DRAWER FILING CABINET', captionTag: 'Lockable Steel Office Storage' },
  NG0125: { archetype: 'five_tier_bookshelf', modelTag: '5-TIER WALNUT BOOKSHELF', captionTag: 'Open Display Shelving Unit' },
  NG0126: { archetype: 'executive_leather_chair', modelTag: 'HIGH-BACK EXECUTIVE CHAIR', captionTag: 'Plush Tufted Cushion' },
  NG0127: { archetype: 'computer_workstation_desk', modelTag: '120CM WORKSTATION DESK', captionTag: 'Cable-Managed PC Frame' },
  NG0128: { archetype: 'office_visitor_chair', modelTag: 'CANTILEVER VISITOR CHAIR', captionTag: 'Reception Sled Base' },
  NG0129: { archetype: 'magnetic_whiteboard', modelTag: '90×120CM WHITEBOARD', captionTag: 'Magnetic Dry-Erase + Tray' },
  NG0130: { archetype: 'desktop_document_organiser', modelTag: '3-TIER DOCUMENT TRAY', captionTag: 'Mesh Desk File Organiser' },

  // 11. SHOWCASE RECORDS (NG0131–NG0178)
  NG0131: { archetype: 'smartphone_triple_cam', modelTag: 'AETHER PRO 15 · 256GB', captionTag: 'Titanium 5G Flagship' },
  NG0132: { archetype: 'tablet_stylus', modelTag: 'SLATEPAD PRO 13 OLED', captionTag: 'Tandem OLED + Stylus' },
  NG0133: { archetype: 'smartphone_foldable', modelTag: 'AETHER FOLD V2 · 512GB', captionTag: 'Dual-Screen 5G Foldable' },
  NG0134: { archetype: 'smartphone_dual_cam', modelTag: 'NOVA CORE 5G · 128GB', captionTag: 'All-Day Battery 5G' },
  NG0135: { archetype: 'tablet_stylus', modelTag: 'SLATEPAD AIR 11 · 256GB', captionTag: 'Cellular Creator Tablet' },
  NG0136: { archetype: 'power_bank_brick', modelTag: '27,000mAh 140W GaN', captionTag: 'Laptop & Phone Power Bank' },
  NG0137: { archetype: 'tablet_folio_keyboard', modelTag: 'MAGNETIC TRACKPAD FOLIO', captionTag: 'Backlit Floating Keyboard' },
  NG0138: { archetype: 'charging_stand_3in1', modelTag: '3-IN-1 QI2 15W STAND', captionTag: 'Magnetic Desktop Charger' },
  NG0139: { archetype: 'laptop_workstation', modelTag: 'STUDIOBOOK 16 · 32GB/1TB', captionTag: 'M-Series Pro Workstation' },
  NG0140: { archetype: 'curved_ultrawide_monitor', modelTag: '34" WQHD 175Hz OLED', captionTag: 'Curved Designer Monitor' },
  NG0141: { archetype: 'ultrabook_laptop', modelTag: 'AIRBOOK 14 · 16GB/512GB', captionTag: 'Featherweight Ultrabook' },
  NG0142: { archetype: 'mechanical_keyboard', modelTag: '75% GASKET MECHANICAL', captionTag: 'Wireless Custom Keycraft' },
  NG0143: { archetype: 'gaming_laptop_rgb', modelTag: 'APEX BLADE 15 · RTX 240Hz', captionTag: 'OLED Gaming & 3D Rig' },
  NG0144: { archetype: 'wireless_mouse', modelTag: 'ERGOMASTER MAGSPEED', captionTag: 'Thumb-Scroll Pro Mouse' },
  NG0145: { archetype: 'usbc_multiport_hub', modelTag: '12-IN-1 THUNDERBOLT 4', captionTag: 'Dual-4K Workstation Dock' },
  NG0146: { archetype: 'portable_ssd', modelTag: '2TB RUGGED NVMe USB4', captionTag: 'IP67 Pro Portable SSD' },
  NG0147: { archetype: 'studio_headphones_dac', modelTag: 'REFERENCE ANC + DAC', captionTag: 'Over-Ear Hi-Fi Bundle' },
  NG0148: { archetype: 'gaming_console_vr', modelTag: '4K 120FPS CONSOLE + VR', captionTag: '1TB Next-Gen System' },
  NG0149: { archetype: 'titanium_chronograph_watch', modelTag: 'CHRONOS APEX SAPPHIRE', captionTag: 'Titanium Smart Chronograph' },
  NG0150: { archetype: 'mirrorless_cinema_camera', modelTag: 'FULL-FRAME 4K/120P', captionTag: 'Cinema Body + 50mm f/1.2' },
  NG0151: { archetype: 'quadcopter_camera_drone', modelTag: 'AEROPRO CARBON 4K/60', captionTag: 'Tri-Obstacle Folding Drone' },
  NG0152: { archetype: 'anc_wireless_earbuds', modelTag: 'PULSE PRO LOSSLESS ANC', captionTag: 'True-Wireless Earbuds' },
  NG0153: { archetype: 'pro_gamepad_controller', modelTag: 'DUALSENSE EDGE PRO', captionTag: 'Emerald LED Wireless Pad' },
  NG0154: { archetype: 'dolby_home_speaker', modelTag: 'SOUNDSTAGE 360 ATMOS', captionTag: 'Spatial Acoustic Speaker' },
  NG0155: { archetype: 'espresso_machine', modelTag: 'DUAL-BOILER PID ESPRESSO', captionTag: 'Barista Steam & Brew' },
  NG0156: { archetype: 'digital_air_fryer', modelTag: 'DUALZONE 10L AIR FRYER', captionTag: 'Touchscreen Roast Oven' },
  NG0157: { archetype: 'countertop_blender', modelTag: '1800W VACUUM BLENDER', captionTag: 'Glass Smoothie & Nut-Milk' },
  NG0158: { archetype: 'bedside_table_lamp', modelTag: 'CAST-BRONZE LINEN LAMP', captionTag: 'Architectural Table Light' },
  NG0159: { archetype: 'air_purifier_tower', modelTag: 'HEPA-14 SMART PURIFIER', captionTag: 'PM2.5 Air Quality Display' },
  NG0160: { archetype: 'coffee_burr_grinder', modelTag: '60-SETTING BURR GRINDER', captionTag: 'Conical Espresso Mill' },
  NG0161: { archetype: 'cordless_brass_lamp', modelTag: 'CORDLESS BRASS LAMP', captionTag: 'Rechargeable Dining Light' },
  NG0162: { archetype: 'robot_vacuum_lidar', modelTag: 'LIDAR ROBOT VACUUM + MOP', captionTag: 'Self-Emptying Dock' },
  NG0163: { archetype: 'weekender_duffle', modelTag: 'FULL-GRAIN WEEKENDER', captionTag: 'Cabin Leather Duffle' },
  NG0164: { archetype: 'structured_handbag', modelTag: 'EMERALD & NOIR TOTE', captionTag: 'Pebbled Leather Luxury Bag' },
  NG0165: { archetype: 'aviator_eyewear_set', modelTag: 'TITANIUM AVIATOR + FOLIO', captionTag: 'Eyewear & Woven Cardholder' },
  NG0166: { archetype: 'casual_sneakers', modelTag: 'ARCHITECTURAL LOW-TOP', captionTag: 'Italian Leather & Suede' },
  NG0167: { archetype: 'bomber_jacket', modelTag: 'MERINO-BLEND BOMBER', captionTag: 'Tailored Minimalist Jacket' },
  NG0168: { archetype: 'silk_scarf', modelTag: '100% MULBERRY SILK SCARF', captionTag: 'Emerald & Gold Twill' },
  NG0169: { archetype: 'leather_briefcase', modelTag: '16" EXECUTIVE BRIEFCASE', captionTag: 'Slim Full-Grain Folio' },
  NG0170: { archetype: 'running_sneakers', modelTag: 'MONOLITH RUNNER', captionTag: 'Matte-Black & Emerald Sole' },
  NG0171: { archetype: 'dropper_serum', modelTag: 'RADIANCE SERUM + CREAM', captionTag: 'Botanical Duo Set' },
  NG0172: { archetype: 'supersonic_hair_dryer', modelTag: 'AEROSILK 4-IN-1 STYLER', captionTag: 'Ionic Supersonic Dryer' },
  NG0173: { archetype: 'womens_perfume', modelTag: 'EXTRAIT DE PARFUM 50ML', captionTag: 'Emeraude Nuit Reserve' },
  NG0174: { archetype: 'hair_clipper', modelTag: '9000 TRIMMER + SONIC', captionTag: 'Precision Grooming System' },
  NG0175: { archetype: 'body_oil_duo', modelTag: 'COLD-PRESSED BODY OIL DUO', captionTag: 'Jasmine & Sandalwood' },
  NG0176: { archetype: 'dropper_serum', modelTag: 'VITAMIN C 20% + FERULIC', captionTag: 'Day Defense Drops' },
  NG0177: { archetype: 'atomizer_coffret', modelTag: '3 × 15ML COFFRET SET', captionTag: 'Discovery Fragrance Trio' },
  NG0178: { archetype: 'electric_toothbrush', modelTag: 'SONICPRO HYDRO-PULSE', captionTag: 'UV Sanitizing Travel Case' },
};

/**
 * Subtype-aware fallback helper (Step 2 & Step 3 in resolution hierarchy)
 */
function inferArchetypeFromSubtype(
  productName: string,
  category: CatalogueCategory
): { archetype: ProductArtworkArchetype; tier: ProductVisualResolutionTier } {
  const lower = productName.toLowerCase();

  if (lower.includes('filing cabinet'))
    return { archetype: 'metal_filing_cabinet', tier: 'subtype_visual' };
  if (lower.includes('bookshelf'))
    return { archetype: 'five_tier_bookshelf', tier: 'subtype_visual' };
  if (lower.includes('whiteboard'))
    return { archetype: 'magnetic_whiteboard', tier: 'subtype_visual' };
  if (lower.includes('organiser') || lower.includes('organizer'))
    return { archetype: 'desktop_document_organiser', tier: 'subtype_visual' };
  if (lower.includes('desk'))
    return { archetype: 'study_wood_desk', tier: 'subtype_visual' };
  if (lower.includes('chair'))
    return { archetype: 'ergonomic_mesh_chair', tier: 'subtype_visual' };
  if (lower.includes('lamp'))
    return { archetype: 'architectural_desk_lamp', tier: 'subtype_visual' };

  switch (category) {
    case 'Fashion':
      return { archetype: 'structured_handbag', tier: 'category_visual' };
    case 'Footwear':
      return { archetype: 'running_sneakers', tier: 'category_visual' };
    case 'Beauty':
      return { archetype: 'dropper_serum', tier: 'category_visual' };
    case 'Phones & Accessories':
      return { archetype: 'smartphone_triple_cam', tier: 'category_visual' };
    case 'Computers':
      return { archetype: 'ultrabook_laptop', tier: 'category_visual' };
    case 'Home & Kitchen':
      return { archetype: 'digital_air_fryer', tier: 'category_visual' };
    case 'Groceries':
      return { archetype: 'natural_honey_jar', tier: 'category_visual' };
    case 'Baby & Kids':
      return { archetype: 'baby_feeding_bottle', tier: 'category_visual' };
    case 'Sports & Fitness':
      return { archetype: 'adjustable_dumbbells', tier: 'category_visual' };
    case 'Furniture & Office':
      return { archetype: 'ergonomic_mesh_chair', tier: 'category_visual' };
    case 'Electronics':
      return { archetype: 'studio_headphones_dac', tier: 'category_visual' };
    default:
      return { archetype: 'smartphone_triple_cam', tier: 'novera_fallback' };
  }
}

/**
 * Structured 4-Step Product Visual Resolution Flow:
 * 1. Exact product-specific studio photograph (21 unique single-product photos)
 * 2. Product-ID keyed bespoke product illustration (157 products with custom SVG silhouette + colour finish)
 * 3. Subtype-specific visual fallback
 * 4. Category-specific / Novera fallback
 */
export function resolveProductVisualSpec(params: {
  productId: string;
  productName: string;
  category: CatalogueCategory;
  colour: string;
  brand: string;
}): ProductVisualSpec {
  const { productId, productName, category, colour, brand } = params;
  const swatches = resolveColourSwatches(colour);
  const exactPhoto = EXACT_SINGLE_PRODUCT_PHOTOS[productId];
  const manifestEntry = PRODUCT_ID_ARCHETYPE_MAP[productId];

  if (exactPhoto && manifestEntry) {
    return {
      productId,
      tier: 'exact_product_photo',
      photoUrl: exactPhoto,
      archetype: manifestEntry.archetype,
      primaryHex: swatches.primary,
      secondaryHex: swatches.secondary,
      accentHex: swatches.accent,
      modelTag: manifestEntry.modelTag,
      captionTag: manifestEntry.captionTag,
    };
  }

  if (manifestEntry) {
    return {
      productId,
      tier: 'product_specific_illustration',
      archetype: manifestEntry.archetype,
      primaryHex: swatches.primary,
      secondaryHex: swatches.secondary,
      accentHex: swatches.accent,
      modelTag: manifestEntry.modelTag,
      captionTag: manifestEntry.captionTag,
    };
  }

  const inferred = inferArchetypeFromSubtype(productName, category);
  return {
    productId,
    tier: inferred.tier,
    archetype: inferred.archetype,
    primaryHex: swatches.primary,
    secondaryHex: swatches.secondary,
    accentHex: swatches.accent,
    modelTag: brand.toUpperCase(),
    captionTag: category,
  };
}
