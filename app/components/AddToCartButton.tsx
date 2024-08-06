import React, { useEffect, useRef } from 'react';

interface AddToCartButtonProps {
  productId: string;
  storeId: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  storeId,
}) => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!storeId || !productId) {
      console.error('Store ID or Product ID is missing');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=singleproduct_v2`;
    script.async = true;
    script.onload = () => {
      if (typeof window.xProduct === 'function') {
        window.xProduct();
      }
    };
    document.body.appendChild(script);
    scriptRef.current = script;

    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, [storeId, productId]);

  return (
    <div
      className={`ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-${productId}`}
      itemType="http://schema.org/Product"
      data-single-product-id={productId}
    >
      <div
        className="ecsp-title"
        itemProp="name"
        style={{ display: 'none' }}
        content="Product Name"
      ></div>
      <div customProp="addtobag"></div>
    </div>
  );
};

export default AddToCartButton;
