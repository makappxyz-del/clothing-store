'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, PackageCheck, MapPin, Clock3, Check } from 'lucide-react';

const ORDERS_KEY = 'lebaya-orders-v1';
const stages = [
  { title: 'Order placed', detail: 'We have received your order.', icon: Check },
  { title: 'Order confirmed', detail: 'Your order is being prepared.', icon: Check },
  { title: 'Packed with care', detail: 'Your Lebaya picks are ready to go.', icon: PackageCheck },
  { title: 'On the way', detail: 'Your parcel is with the delivery partner.', icon: MapPin },
  { title: 'Delivered', detail: 'We hope you love your new look!', icon: Check },
];

function getStage(order) {
  const ageDays = Math.max(0, (Date.now() - new Date(order.createdAt).getTime()) / 86400000);
  if (ageDays >= 5) return 4;
  if (ageDays >= 3) return 3;
  if (ageDays >= 1) return 2;
  if (ageDays >= 0.02) return 1;
  return 0;
}

function dateLabel(date) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(date));
}

export default function ProfilePage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      setOrders(Array.isArray(saved) ? saved : []);
    } catch { setOrders([]); }
    setLoaded(true);
  }, []);

  return <section className="profile-page section-wrap">
    <div className="profile-heading"><div><p className="eyebrow">YOUR LEBAYA</p><h1>My account<span>.</span></h1><p>Order details and delivery updates, all in one place.</p></div><div className="profile-avatar">L</div></div>
    <div className="profile-tabs"><span className="selected">My orders</span><span>Delivery tracking</span><span>Account overview</span></div>
    <div className="profile-section-title"><div><h2>Order history</h2><p>Track the journey of your Lebaya orders.</p></div><PackageCheck size={23} /></div>
    {!loaded ? <p className="profile-empty">Loading your orders…</p> : orders.length === 0 ? <div className="profile-empty"><Clock3 size={27} /><h3>Your order story starts here.</h3><p>When you place an order, its tracking timeline will appear on this page.</p><Link className="button" href="/#shop">Explore the collection <ArrowRight size={16} /></Link></div> : <div className="order-history">{orders.map((order) => {
      const currentStage = getStage(order);
      const deliveryDate = new Date(new Date(order.createdAt).getTime() + 5 * 86400000);
      return <article className="tracked-order" key={order.id}>
        <div className="tracked-order-head"><div><p className="eyebrow">ORDER {order.id}</p><p className="order-date">Placed {dateLabel(order.createdAt)} · {order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p></div><strong>${Number(order.total).toFixed(2)}</strong></div>
        <div className="tracking-banner"><div><span className="tracking-kicker">CURRENT STATUS</span><h3>{stages[currentStage].title}</h3></div><div className="delivery-estimate"><span>ESTIMATED DELIVERY</span><strong>{dateLabel(deliveryDate)}</strong></div></div>
        <div className="tracking-timeline">{stages.map((stage, index) => {
          const Icon = stage.icon;
          return <div className={`tracking-step ${index <= currentStage ? 'complete' : ''} ${index === currentStage ? 'current' : ''}`} key={stage.title}><span className="tracking-dot"><Icon size={14} /></span><div><strong>{stage.title}</strong><p>{index <= currentStage ? stage.detail : index === 4 ? `Estimated ${dateLabel(deliveryDate)}` : stage.detail}</p></div></div>;
        })}</div>
        <div className="order-product-list">{order.items.map((item) => <div key={`${order.id}-${item.key}`}><span>{item.name} · {item.color} · {item.size} × {item.quantity}</span><strong>${(item.price * item.quantity).toFixed(2)}</strong></div>)}</div>
        <p className="tracking-disclaimer">Demo tracking timeline for preview only. Live carrier tracking requires an order and shipping service integration.</p>
      </article>;
    })}</div>}
  </section>;
}
