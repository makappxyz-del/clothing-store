'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Plus } from 'lucide-react';
import { products, imageUrl } from '../../../lib/products';
import { formatPrice } from '../../../lib/currency';
import { useCart } from '../../../components/CartProvider';

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const [size, setSize] = useState('M');
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  if (!product) return <div className="not-found"><h1>We couldn't find that piece.</h1><Link className="text-link" href="/#shop">Back to the collection ↗</Link></div>;

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  return (
    <div className="product-detail section-wrap">
      <Link href="/#shop" className="back-link"><ArrowLeft size={16} /> Back to the collection</Link>
      <div className="detail-grid">
        <div className="detail-image"><img src={imageUrl(product.image, 1200)} alt={product.name} /></div>
        <div className="detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p>{product.description}</p>
          <p>Color: {product.color}</p>
          <div className="size-picker"><p>Select a size</p>{sizes.map((item) => <button type="button" key={item} className={size === item ? 'active' : ''} onClick={() => setSize(item)}>{item}</button>)}</div>
          <button className="button" type="button" onClick={() => { addItem(product, size); setAdded(true); }}>{added ? <><Check size={17} /> Added to bag</> : <><Plus size={17} /> Add to bag</>}</button>
          <p className="detail-note">Complimentary delivery on qualifying Dhaka orders. Prices are in Bangladeshi taka.</p>
        </div>
      </div>
    </div>
  );
}
