export const categories = ['All', 'Tops', 'Bottoms', 'Layers', 'Accessories'];

export const products = [
  { slug: 'everyday-tee', name: 'The Everyday Tee', category: 'Tops', price: 38, color: 'Chalk', label: 'BESTSELLER', image: 'photo-1521572163474-6864f9cf17ab', description: 'The perfect tee, figured out. Soft organic cotton, a relaxed shape, and the kind of fit that just works.' },
  { slug: 'weekend-shirt', name: 'Weekend Shirt', category: 'Tops', price: 74, color: 'Soft Blue', label: 'NEW', image: 'photo-1598033129183-c4f50c736f10', description: 'An easy, airy button-up in crisp cotton poplin. Wear it open, tucked in, or thrown over everything.' },
  { slug: 'relaxed-trouser', name: 'Relaxed Trouser', category: 'Bottoms', price: 96, color: 'Oat', label: '', image: 'photo-1506629905607-d9c297d73129', description: 'A refined, relaxed-fit trouser with a comfortable elasticated back and pockets that actually fit things.' },
  { slug: 'everyday-knit', name: 'Everyday Knit', category: 'Layers', price: 118, color: 'Sage', label: 'LOW IMPACT', image: 'photo-1576566588028-4147f3842f27', description: 'A lightweight layer for cooler mornings. Knitted from responsible cotton with a soft, lived-in feel.' },
  { slug: 'utility-jacket', name: 'Utility Jacket', category: 'Layers', price: 148, color: 'Moss', label: '', image: 'photo-1551028719-00167b16eac5', description: 'A go-anywhere layer with a clean shape, useful pockets, and durable organic cotton canvas.' },
  { slug: 'easy-short', name: 'Easy Short', category: 'Bottoms', price: 64, color: 'Sand', label: '', image: 'photo-1591195853828-11db59a44f6b', description: 'Your warm-weather uniform. A breathable cotton-linen blend with an easy drawstring waist.' },
  { slug: 'everywhere-tote', name: 'Everywhere Tote', category: 'Accessories', price: 32, color: 'Natural', label: '', image: 'photo-1590874103328-eac38a683ce7', description: 'Room for the little extras. A sturdy everyday carryall made from recycled cotton canvas.' },
  { slug: 'ribbed-tank', name: 'Ribbed Tank', category: 'Tops', price: 42, color: 'Terracotta', label: 'JUST IN', image: 'photo-1503342217505-b0a15ec3261c', description: 'A fitted-but-not-too-fitted ribbed tank made with a touch of stretch. A warm-weather essential.' },
];

export function imageUrl(image, width = 900) {
  return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=${width}&q=85`;
}
