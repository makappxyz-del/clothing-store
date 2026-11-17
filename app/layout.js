import './globals.css';
import { CartProvider } from '../components/CartProvider';
import Header from '../components/Header';

export const metadata = {
  title: 'Lebaya — Style for every story',
  description: 'Discover women’s dresses, western and traditional fashion, shoes, sunglasses, and accessories at Lebaya.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <footer className="site-footer">
            <div className="footer-brand">
              <a className="wordmark lebaya-wordmark" href="/"><span className="brand-mark">L</span><span className="brand-name">Lebaya</span></a>
              <p>Wear your story.</p>
            </div>
            <div className="footer-contact">
              <p>House-762, Road-23, Block F, Bashundhara, Dhaka</p>
              <p><a href="tel:+8801411031465">01411031465</a></p>
              <p><a href="mailto:suppor@labeya.store">suppor@labeya.store</a></p>
            </div>
            <nav className="footer-links" aria-label="Store policies">
              <a href="/return-and-refund-policy">Return &amp; Refund Policy</a>
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms-and-conditions">Terms &amp; Conditions</a>
            </nav>
            <span className="footer-copyright">© 2026 Lebaya. All rights reserved.</span>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
