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
            <a className="wordmark lebaya-wordmark" href="/"><span className="brand-mark">L</span><span className="brand-name">Lebaya</span></a>
            <p>Wear your story.</p>
            <span>© 2026 Lebaya. All rights reserved.</span>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
