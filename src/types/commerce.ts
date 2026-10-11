export type CountryCode = 'NG' | 'GH' | 'ZA' | 'KE' | 'TZ' | 'BJ';

export type CurrencyCode = 'NGN' | 'GHS' | 'ZAR' | 'KES' | 'TZS' | 'XOF';

export interface CountryMarket {
  code: CountryCode;
  name: string;
  currency: CurrencyCode;
  symbol: string;
  regionLabel: string;
  hubCity: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export type CatalogueCategory =
  | 'Fashion'
  | 'Footwear'
  | 'Beauty'
  | 'Phones & Accessories'
  | 'Computers'
  | 'Home & Kitchen'
  | 'Groceries'
  | 'Baby & Kids'
  | 'Sports & Fitness'
  | 'Furniture & Office'
  | 'Electronics';

export interface NoveraProduct {
  /** Stable identifier: NG0001 through NG0178 */
  id: string;
  product_id: string;
  name: string;
  product_name: string;
  category: CatalogueCategory;
  brand: string;
  price: number;
  price_ngn: string;
  currency: CurrencyCode;
  stock_quantity: number;
  availability: 'In Stock' | 'Low Stock' | 'Not confirmed' | string;
  colour: string;
  warranty: string;
  delivery_available: string;
  description: string;
  /** Optional verified studio image path; undefined uses high-definition category visual presentation */
  imageUrl?: string;
  /** True for NG0131–NG0178 additional website showcase records with unconfirmed availability */
  isUnconfirmedShowcaseRecord: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: NoveraProduct;
  quantity: number;
}

export interface ChatProductCard {
  id?: string;
  name: string;
  brand?: string;
  price?: number | string;
  currency?: string;
  category?: string;
  description?: string;
  imageUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  products?: ChatProductCard[];
  isError?: boolean;
  originalPrompt?: string;
}

export interface NoveraAIResponse {
  ok: boolean;
  reply: string;
  products?: ChatProductCard[];
  error?: string;
  statusCode?: number;
}
