export interface Country {
  name: string;
  ISOCode: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface GiftCardCompany {
  id: string;
  name: string;
}

export interface RedemptionStep {
  stepText: string;
  imgUrl: string;
}

export interface StoreLocation {
  name: string;
  address: string;
}

export interface VoucherOption {
  denominationCurrency: string;
  denomination: number;
  customerPrice: number;
  discountPercentage?: number;
  discountValue?: number;
}

export interface Occasion {
  id: string;
  name: string;
}

export interface GiftCard {
  _id?: {
    $oid: string;
  };
  country: Country[];
  category: Category[];
  giftCardCompany: GiftCardCompany;
  companyDescription: string;
  redemptionOption: string;
  voucherDescription: string;
  thumbnailImage: string;
  images: string[];
  howToRedeem: RedemptionStep[];
  termsAndConditions: string[];
  usageInstructions: string[];
  storeLocator: StoreLocation[];
  watchVideo: string[];
  voucherOptions: VoucherOption[];
  occasions: Occasion[];
  isFeatured: boolean;
}