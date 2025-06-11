import React from 'react';
import { ProductDetails } from '../types/Product';
import { SimpleStringArrayForm } from './SimpleStringArrayForm';

interface ProductDetailsFormProps {
  productDetails: ProductDetails;
  onChange: (productDetails: ProductDetails) => void;
}

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({ productDetails, onChange }) => {
  return (
    <div className="space-y-8">
      <SimpleStringArrayForm
        items={productDetails.description}
        onChange={(description) => onChange({ ...productDetails, description })}
        title="Product Description"
        singular="Description Point"
      />

      <SimpleStringArrayForm
        items={productDetails.specifications}
        onChange={(specifications) => onChange({ ...productDetails, specifications })}
        title="Specifications"
        singular="Specification"
      />

      <SimpleStringArrayForm
        items={productDetails.features}
        onChange={(features) => onChange({ ...productDetails, features })}
        title="Features"
        singular="Feature"
      />

      <SimpleStringArrayForm
        items={productDetails.includedInDelivery}
        onChange={(includedInDelivery) => onChange({ ...productDetails, includedInDelivery })}
        title="Included in Delivery"
        singular="Item"
      />

      <SimpleStringArrayForm
        items={productDetails.notes}
        onChange={(notes) => onChange({ ...productDetails, notes })}
        title="Additional Notes"
        singular="Note"
      />
    </div>
  );
};