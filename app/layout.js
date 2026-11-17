import './globals.css';
import { CartProvider } from '../components/CartProvider';
import Header from '../components/Header';

export const metadata = {
  title: 'THREADS — Everyday, elevated',
  description: 'Thoughtful essentials and timeless clothing for every day.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <footer className="site-footer">
            <a className="wordmark" href="/">THREADS<span>.</span></a>
            <p>Made for the moments in between.</p>
            <span>© 2026 THREADS. All rights reserved.</span>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
