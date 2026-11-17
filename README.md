# Lebaya — fashion for every story

A responsive women’s fashion storefront built with Next.js App Router and JavaScript. Browse dresses, western and traditional styles, shoes, sunglasses, and accessories.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- Lebaya brand identity and responsive storefront
- Search and category filters across the collection
- Product detail pages with size selection
- Shopping bag stored in local storage, with quantity controls and removal
- Profile dashboard with demo order history and a delivery-status timeline
- Demo checkout confirmation (no payment processing)

## Delivery tracking note

Orders and their simulated tracking timeline are stored in the browser's local storage. This preview is not connected to a shipping carrier, backend, or authenticated user account. Real multi-device order history and live delivery tracking require a secure order API, customer authentication, and a shipping-carrier integration.

## Production build

```bash
npm run build
npm start
```

Product photos are loaded from Unsplash. Connect a secure payment provider and order-management backend before accepting real orders; never collect payment card data directly in the client.
