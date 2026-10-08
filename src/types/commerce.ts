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

export interface NoveraProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  currency: CurrencyCode;
  imageUrl: string;
  description: string;
  stockStatus?: string;
  specifications?: ProductSpecification[];
  isSampleRecord: boolean;
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

export interface CatalogueResponse {
  ok: boolean;
  source: 'google_sheets_live' | 'sample_showcase_fallback';
  lastCheckedAt: string;
  notice: string;
  products: NoveraProduct[];
}
