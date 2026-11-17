'use client';

import { useMemo, useState } from 'react';
import { Search, ArrowDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../lib/products';

export default function HomePage() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const shownProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesQuery = `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  return (
    <>
      <section className="hero">
        <img className="hero-image" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=85" alt="Friends exploring the city in everyday style" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">THE EVERYDAY EDIT — VOL. 01</p>
          <h1>Good things<br />to wear, <em>often.</em></h1>
          <p className="hero-copy">Considered pieces, made for your real life.<br />Easy to wear. Better to keep.</p>
          <a className="button button-light" href="#shop">Explore the collection <ArrowDown size={16} /></a>
        </div>
        <span className="hero-note">A little more you, every day.</span>
      </section>

      <section className="intro-strip">
        <p>Less, but better.</p><span>Thoughtful staples. Lower impact. Made to last.</span><a href="#shop">MEET YOUR NEW FAVORITES ↗</a>
      </section>

      <section className="shop-section section-wrap" id="shop">
        <div className="section-heading">
          <div><p className="eyebrow">THE SPRING COLLECTION</p><h2>Wear it your way.</h2></div>
          <p className="section-subtitle">Versatile by nature, personal by design.<br />Find the pieces you'll reach for again.</p>
        </div>
        <div className="shop-tools">
          <div className="category-list" aria-label="Filter by category">
            {categories.map((item) => <button key={item} className={`category-button ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find your favorite" aria-label="Search products" /></label>
        </div>
        {shownProducts.length ? <div className="product-grid">{shownProducts.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <p className="empty-results">No pieces found. Try another search.</p>}
      </section>

      <section className="manifesto">
        <div className="manifesto-image"><img src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85" alt="Thoughtfully made neutral clothing" /></div>
        <div className="manifesto-copy"><p className="eyebrow">A BETTER KIND OF BASIC</p><h2>Style that feels<br />like <em>you.</em></h2><p>We believe getting dressed should be the easy part. So we make thoughtful, versatile clothing with good materials, considered details, and room to make it your own.</p><a className="text-link" href="#shop">Find your everyday ↗</a></div>
      </section>
      <section className="newsletter"><p className="eyebrow">A NOTE FROM THREADS</p><h2>Good things, occasionally.</h2><p>New arrivals, thoughtful reads, and 10% off your first order.</p><NewsletterForm /></section>
    </>
  );
}

function NewsletterForm() {
  const [done, setDone] = useState(false);
  return <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setDone(true); }}><input type="email" required placeholder="Your email address" aria-label="Email address" /><button type="submit">{done ? 'YOU’RE ON THE LIST ✓' : 'COUNT ME IN ↗'}</button></form>;
}
