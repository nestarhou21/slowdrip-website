export const PRIZES = [
  { emoji: '🥤', label: 'Free Drink', full: 'Free SlowDrip Drink', weight: 2, bg: '#1A4B75', text: '#FFFFFF' },
  { emoji: '💸', label: '50% OFF', full: '50% OFF Any Drink', weight: 8, bg: '#FAF6EC', text: '#1A4B75' },
  { emoji: '🎁', label: 'Buy 1 Get 1', full: 'Buy 1 Get 1 Free', weight: 10, bg: '#D97D54', text: '#FFFFFF' },
  { emoji: '🍋', label: 'Free Topping', full: 'Free Topping or Add-on', weight: 20, bg: '#2E6591', text: '#FFFFFF' },
  { emoji: '💰', label: '20% OFF', full: '20% OFF Your Next Order', weight: 25, bg: '#EFE9DB', text: '#1A4B75' },
  { emoji: '🎉', label: '10% OFF', full: '10% OFF Any Purchase', weight: 15, bg: '#153D5F', text: '#FFFFFF' },
];

export const WHEEL_GRADIENT = `conic-gradient(${PRIZES.map(
  (p, i) => `${p.bg} ${(i * 360) / PRIZES.length}deg ${((i + 1) * 360) / PRIZES.length}deg`,
).join(', ')})`;
