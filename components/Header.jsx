'use client';

import Link from 'next/link';
import { ShoppingBag, UserRound } from 'lucide-react';
import { useCart } from './CartProvider';

export default function Header() {
  const { itemCount } = useCart();
  return <><div className="announcement">A LITTLE SOMETHING FOR YOU — FREE SHIPPING OVER $100</div><header className="site-header"><Link className="wordmark lebaya-wordmark" href="/" aria-label="Lebaya home"><span className="brand-mark">L</span><span className="brand-name">Lebaya</span></Link><nav className="main-nav"><a href="/#shop">Shop all</a><a href="/#shop">Dresses</a><a href="/#shop">Traditional</a></nav><div className="header-actions"><Link className="profile-link" href="/profile"><UserRound size={18} /><span>My account</span></Link><Link className="cart-link" href="/cart" aria-label={`Shopping bag, ${itemCount} items`}><ShoppingBag size={19} /><span>Bag</span><span className="cart-count">{itemCount}</span></Link></div></header></>;
}
