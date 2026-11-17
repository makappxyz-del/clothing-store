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
    const matchesQuery = `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  return (
    <>
      <section className="hero">
        <img className="hero-image" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=85" alt="Friends exploring the city in fashion" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">LEBAYA — STYLE FOR EVERY STORY</p>
          <h1>Find your<br /><em>kind of beautiful.</em></h1>
          <p className="hero-copy">Dresses, tradition, and everyday favorites.<br />Pieces to make every moment yours.</p>
          <a className="button button-light" href="#shop">Explore the collection <ArrowDown size={16} /></a>
        </div>
        <span className="hero-note">A little more you, every day.</span>
      </section>

      <section className="intro-strip">
        <p>Wear your story.</p><span>Western ease. Traditional grace. Your own signature.</span><a href="#shop">FIND YOUR NEW FAVORITES ↗</a>
      </section>

      <section className="shop-section section-wrap" id="shop">
        <div className="section-heading">
          <div><p className="eyebrow">THE LEBAYA COLLECTION</p><h2>For every side of you.</h2></div>
          <p className="section-subtitle">From everyday dresses to occasion-ready details.<br />Find something that feels like you.</p>
        </div>
        <div className="shop-tools">
          <div className="category-list" aria-label="Filter by category">
            {categories.map((item) => <button key={item} className={`category-button ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" aria-label="Search products" /></label>
        </div>
        {shownProducts.length ? <div className="product-grid">{shownProducts.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <p className="empty-results">No pieces found. Try another search.</p>}
      </section>

      <section className="manifesto">
        <div className="manifesto-image"><img src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85" alt="A considered look from Lebaya" /></div>
        <div className="manifesto-copy"><p className="eyebrow">MADE FOR YOUR MOMENTS</p><h2>Style that feels<br />like <em>you.</em></h2><p>Lebaya brings together the pieces you love to wear and the details that make them yours. Discover modern western looks, traditional favorites, and finishing touches for every occasion.</p><a className="text-link" href="#shop">Find your Lebaya look ↗</a></div>
      </section>
      <section className="newsletter"><p className="eyebrow">A NOTE FROM LEBAYA</p><h2>Good things, occasionally.</h2><p>New arrivals, styling notes, and a little something for your first order.</p><NewsletterForm /></section>
    </>
  );
}

function NewsletterForm() {
  const [done, setDone] = useState(false);
  return <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setDone(true); }}><input type="email" required placeholder="Your email address" aria-label="Email address" /><button type="submit">{done ? 'YOU’RE ON THE LIST ✓' : 'COUNT ME IN ↗'}</button></form>;
}
