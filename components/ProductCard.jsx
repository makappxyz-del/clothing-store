'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { imageUrl } from '../lib/products';

export default function ProductCard({ product }) {
  return <article className="product-card"><Link className="product-image-wrap" href={`/products/${product.slug}`}><img src={imageUrl(product.image)} alt={product.name} loading="lazy" />{product.label && <span className="product-label">{product.label}</span>}<span className="quick-view">View piece <ArrowUpRight size={15} /></span></Link><div className="product-info"><div><Link href={`/products/${product.slug}`} className="product-name">{product.name}</Link><p>{product.color}</p></div><span className="product-price">${product.price}</span></div></article>;
}
