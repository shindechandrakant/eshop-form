export interface Image {
  categorytype: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface Occasion {
  id: string;
  name: string;
}

export interface Store {
  id: string;
  name: string;
}

export interface RedemptionStep {
  position: number;
  title: string;
  description: string;
  image: Image;
}

export interface Condition {
  position: number;
  description: string;
}

export interface Information {
  position: number;
  title: string;
  description: string;
}

export interface TermsAndConditions {
  title: string;
  conditions: Condition[];
}

export interface Instructions {
  title: string;
  conditions: Condition[];
}

export interface MoreInfo {
  title: string;
  description: string;
  information: Information[];
}

export interface Brand {
  id: string;
  name: string;
}

export interface GiftCard {
  _id?: {
    $oid: string;
  };
  name: string;
  images: Image[];
  categories: Category[];
  occasions: Occasion[];
  categoriesImages: Image[];
  description: string;
  whereToRedeem: Store[];
  howToRedeem: RedemptionStep[];
  termsAndConditions: TermsAndConditions;
  instructions: Instructions;
  moreInfo: MoreInfo;
  discount: number;
  oldPrice: {
    type: string;
    value: string;
  };
  B2B: number;
  B2C: number;
  Brand: Brand[];
  cardType: string;
  status: string;
}