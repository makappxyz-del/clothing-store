'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from './CartProvider';

export default function Header() {
  const { itemCount } = useCart();
  return <><div className="announcement">A LITTLE SOMETHING FOR YOU — FREE SHIPPING OVER $100</div><header className="site-header"><Link className="wordmark" href="/">THREADS<span>.</span></Link><nav className="main-nav"><a href="/#shop">Shop all</a><a href="/#shop">New arrivals</a><a href="/#shop">Our story</a></nav><Link className="cart-link" href="/cart" aria-label={`Shopping bag, ${itemCount} items`}><ShoppingBag size={19} /><span>Bag</span><span className="cart-count">{itemCount}</span></Link></header></>;
}
