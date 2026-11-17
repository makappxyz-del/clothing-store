'use client';

import Link from 'next/link';
import { ShoppingBag, UserRound } from 'lucide-react';
import { useCart } from './CartProvider';

export default function Header() {
  const { itemCount } = useCart();
  return <><div className="announcement">FREE DELIVERY WITHIN DHAKA ON ORDERS OVER ৳2,500</div><header className="site-header"><Link className="wordmark lebaya-wordmark" href="/" aria-label="Lebaya home"><span className="brand-mark">L</span><span className="brand-name">Lebaya</span></Link><nav className="main-nav" aria-label="Main navigation"><Link href="/#shop">Shop</Link><Link href="/login">Log in</Link><Link href="/signup">Sign up</Link><Link href="/return-and-refund-policy">Returns</Link></nav><div className="header-actions"><Link href="/profile" aria-label="Profile" className="icon-link"><UserRound size={20} /></Link><Link href="/cart" className="cart-link" aria-label={`Shopping bag, ${itemCount} items`}><ShoppingBag size={20} /><span className="cart-count">{itemCount}</span></Link></div></header></>;
}
