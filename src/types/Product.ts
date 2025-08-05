export interface Category {
  id: string;
  name: string;
  parentId: string | null;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Color {
  id: string;
  value: string;
  count: string;
}

export interface Size {
  id: string;
  value: string;
  count: number;
}

export interface ThumbnailImage {
  id: string;
  string: string;
  caption: string;
  height: number;
  width: number;
}

export interface Delivery {
  type: string;
  value: string;
  description: string;
  deliveryInDays: string;
}

export interface ProductDetails {
  description: string[];
  specifications: string[];
  features: string[];
  includedInDelivery: string[];
  notes: string[];
}

export interface Supplier {
  id: string;
  name: string;
  address: string;
  contact: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  address: string;
  contact: string;
}

export interface Pricing {
  b2b: number;
  b2c: number;
  taxes: number;
  deliveryCharges: number;
  cashback: number;
}

export interface Product {
  title: string;
  shortTitle: string;
  itemNumber: number;
  description: string;
  category: Category[];
  brand: Brand;
  colours: Color[];
  thumbnailImages: ThumbnailImage;
  delivery: Delivery;
  productDetails: ProductDetails;
  supplier: Supplier;
  manufacturer: Manufacturer;
  returnPolicy: string[];
  pricing: Pricing;
  sizes: Size[];
}
