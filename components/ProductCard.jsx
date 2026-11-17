'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { imageUrl } from '../lib/products';
import { formatPrice } from '../lib/currency';

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link className="product-image-wrap" href={`/products/${product.slug}`}>
        <img src={imageUrl(product.image)} alt={product.name} loading="lazy" />
        {product.label && <span className="product-label">{product.label}</span>}
      </Link>
      <div className="product-card-info">
        <div><p className="product-category">{product.category}</p><h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3><p className="product-color">{product.color}</p></div>
        <span className="product-price">{formatPrice(product.price)}</span>
      </div>
      <Link className="product-card-link" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}><ArrowUpRight size={17} /></Link>
    </article>
  );
}
