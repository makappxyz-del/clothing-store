'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Plus } from 'lucide-react';
import { products, imageUrl } from '../../../lib/products';
import { useCart } from '../../../components/CartProvider';

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const [size, setSize] = useState('M');
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  if (!product) return <div className="not-found"><h1>We couldn't find that piece.</h1><Link className="text-link" href="/#shop">Back to the collection ↗</Link></div>;
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  return <div className="product-detail section-wrap"><Link href="/#shop" className="back-link"><ArrowLeft size={16} /> Back to the collection</Link><div className="detail-grid"><div className="detail-image"><img src={imageUrl(product.image, 1400)} alt={product.name} /></div><div className="detail-copy"><p className="eyebrow">{product.category.toUpperCase()} — {product.color.toUpperCase()}</p><h1>{product.name}</h1><p className="detail-price">${product.price}.00</p><p className="detail-description">{product.description}</p><div className="size-heading"><span>Choose your size</span><button type="button" className="size-guide">Size guide</button></div><div className="size-options">{sizes.map((item) => <button key={item} className={size === item ? 'selected' : ''} onClick={() => setSize(item)}>{item}</button>)}</div><button className="button add-button" onClick={() => { addItem(product, size); setAdded(true); window.setTimeout(() => setAdded(false), 1800); }}>{added ? <><Check size={17} /> Added to your bag</> : <>Add to bag — ${product.price} <Plus size={17} /></>}</button><div className="detail-perks"><p>✓ Free shipping on orders over $100</p><p>✓ Easy returns within 30 days</p><p>✓ Thoughtfully made, always</p></div><div className="product-note"><span>THE THREADS PROMISE</span><p>Pieces you’ll love wearing, made with materials that are kinder to the planet.</p></div></div></div></div>;
}
