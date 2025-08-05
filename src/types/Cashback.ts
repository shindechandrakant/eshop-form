export interface Country {
  name: string;
  ISOCode: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
}

export interface ContactDetails {
  customerServiceNumber: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  tiktok: string;
  pinterest: string;
}

export interface Coupon {
  thumbnailImage: string;
  title: string;
  description: string;
  code: string;
  redirectUrl: string;
}

export interface Deal {
  thumbnailImage: string;
  title: string;
  description: string;
  redirectUrl: string;
  previousCashbackPercentage: number;
  currentCashbackPercentage: number;
}

export interface CashbackRate {
  id: number;
  cashbackPercentage: number;
  categoryName: string;
}

export interface PricingDetails {
  maxCashbackPercentage: number;
  cashbackRates: CashbackRate[];
  previousCashbackPercentage: {
    $numberDecimal: string;
  };
}

export interface Rating {
  totalRatings: number;
  outOfRating: number;
  ratingCount: number;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface StoreLocation {
  name: string;
  address: string;
}

export interface TimelineItem {
  hours: number;
  title: string;
  shortTxt: string;
  longTxt: string;
}

export interface Cashback {
  country: Country[];
  category: Category;
  brand: Brand;
  contactDetails: ContactDetails;
  thumbnailImage: string;
  images: string[];
  cashbackOption: string;
  isFeatured: boolean;
  coupons: Coupon[];
  deals: Deal[];
  pricingDetails: PricingDetails;
  brandRedirectURL: string;
  rating: Rating;
  faqs: FAQ[];
  termsAndConditions: string[];
  storeLocator: StoreLocation[];
  watchVideo: string;
  timeline: TimelineItem[];
}
