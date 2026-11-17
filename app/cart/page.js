'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../components/CartProvider';
import { imageUrl } from '../../lib/products';
import { formatPrice } from '../../lib/currency';
import { getCurrentUser } from '../../lib/auth';

const ORDERS_KEY = 'lebaya-orders-v1';

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
    setAuthReady(true);
  }, []);

  function placeDemoOrder(event) {
    event.preventDefault();
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login?next=%2Fcart');
      return;
    }
    const id = `LB-${Date.now().toString().slice(-8)}`;
    const order = { id, email: currentUser.email, createdAt: new Date().toISOString(), items: items.map((item) => ({ ...item })), total: subtotal };
    try {
      const saved = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...(Array.isArray(saved) ? saved : [])]));
    } catch {
      localStorage.setItem(ORDERS_KEY, JSON.stringify([order]));
    }
    setOrderNumber(id);
    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced) return <section className="confirmation section-wrap"><CheckCircle2 size={48} /><p className="eyebrow">ORDER CONFIRMED</p><h1>Thanks for choosing Lebaya.</h1><p>Demo order <strong>{orderNumber}</strong> has been saved. Your total was {formatPrice(subtotal)}.</p><Link className="button" href="/#shop">Continue shopping</Link></section>;

  return (
    <section className="cart-page section-wrap">
      <p className="eyebrow">YOUR PICKS</p><h1>Your bag<span>.</span></h1>
      {items.length === 0 ? <div className="empty-cart"><p>Your bag is taking a little break.</p><Link className="button" href="/#shop">Explore the collection <ArrowRight size={16} /></Link></div> : (
        <div className="cart-layout">
          <div className="cart-items">{items.map((item) => (
            <article className="cart-item" key={item.key}>
              <img src={imageUrl(item.image)} alt={item.name} />
              <div className="cart-item-info"><h2>{item.name}</h2><p>Size: {item.size}</p><p>{formatPrice(item.price)}</p><div className="quantity-control"><button type="button" aria-label="Decrease quantity" onClick={() => updateQuantity(item.key, item.quantity - 1)}><Minus size={15} /></button><span>{item.quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => updateQuantity(item.key, item.quantity + 1)}><Plus size={15} /></button></div></div>
              <div className="cart-item-end"><strong>{formatPrice(item.price * item.quantity)}</strong><button type="button" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.key)}><Trash2 size={17} /></button></div>
            </article>
          ))}</div>
          <aside className="cart-summary"><h2>Order summary</h2><p>Subtotal <strong>{formatPrice(subtotal)}</strong></p><p>Delivery <span>Calculated at checkout</span></p>
            {!authReady ? <p>Checking your account…</p> : user ? <form onSubmit={placeDemoOrder}><p>Ordering as <strong>{user.email}</strong></p><button className="button" type="submit">Place demo order <ArrowRight size={16} /></button></form> : <div><p>Please log in or create an account before placing your order.</p><Link className="button" href="/login?next=%2Fcart">Log in to order <ArrowRight size={16} /></Link><p style={{ marginTop: 14 }}>New here? <Link className="text-link" href="/signup?next=%2Fcart">Create an account</Link></p></div>}
            <small>All prices are shown in Bangladeshi taka (BDT).</small>
          </aside>
        </div>
      )}
    </section>
  );
}
