'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser } from '../lib/auth';

export default function AuthForm({ mode }) {
  const isSignup = mode === 'signup';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (isSignup) await registerUser({ name, email, password });
      else await loginUser({ email, password });
      const params = new URLSearchParams(window.location.search);
      const next = params.get('next');
      router.push(next && next.startsWith('/') && !next.startsWith('//') ? next : '/profile');
      router.refresh();
    } catch (submitError) {
      setError(submitError.message || 'We could not complete your request. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section-wrap" style={{ maxWidth: 620, paddingTop: 72, paddingBottom: 88 }}>
      <p className="eyebrow">YOUR LEBAYA ACCOUNT</p>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{isSignup ? 'Create your account.' : 'Welcome back.'}</h1>
      <p>{isSignup ? 'Sign up to save your details and place an order.' : 'Log in to continue to checkout and manage your orders.'}</p>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16, marginTop: 28 }}>
        {isSignup && <label style={{ display: 'grid', gap: 7 }}>Full name<input autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} /></label>}
        <label style={{ display: 'grid', gap: 7 }}>Email address<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label style={{ display: 'grid', gap: 7 }}>Password<input type="password" autoComplete={isSignup ? 'new-password' : 'current-password'} minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} /><small>Use at least 8 characters.</small></label>
        {error && <p role="alert" style={{ color: '#a12b24' }}>{error}</p>}
        <button className="button" type="submit" disabled={busy}>{busy ? 'Please wait…' : isSignup ? 'Create account' : 'Log in'}</button>
      </form>
      <p style={{ marginTop: 22 }}>{isSignup ? 'Already have an account?' : 'New to Lebaya?'}{' '}<Link className="text-link" href={isSignup ? '/login' : '/signup'}>{isSignup ? 'Log in' : 'Create an account'}</Link></p>
      <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 28 }}>This starter stores demo account data in this browser only. Connect a secure authentication service before using it for real customer accounts.</p>
    </section>
  );
}
