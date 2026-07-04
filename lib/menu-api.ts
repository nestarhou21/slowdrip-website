import type { MenuItem } from '@/types/menu';
import { menuItems as fallbackMenu } from './menu-data';

const POS_API_URL = process.env.POS_API_URL ?? 'http://localhost:8000/api';

interface PublicMenuProduct {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  type: string;
  category: string;
  base_price: number;
  variants: { size: string; price: number }[];
}

// Local images for the original drinks, used when a POS product has no photo
const fallbackImages = new Map(fallbackMenu.map((i) => [i.name.toLowerCase(), i.image]));

const fmt = (n: number) => `$${n.toFixed(2)}`;

/**
 * Loads the menu from the POS backend (products marked "Show on Website"
 * in the admin portal). Falls back to the static menu if the POS is
 * unreachable so the website never shows an empty menu.
 */
export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const res = await fetch(`${POS_API_URL}/public/menu`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Menu fetch failed with status ${res.status}`);

    const json = await res.json();
    const products: PublicMenuProduct[] = json.data ?? [];
    if (products.length === 0) throw new Error('POS returned an empty menu');

    return products.map((p) => {
      const sizeM = p.variants.find((v) => v.size.toUpperCase().startsWith('M'));
      const sizeL = p.variants.find((v) => v.size.toUpperCase().startsWith('L'));
      return {
        id: Number(p.id),
        name: p.name,
        priceM: fmt(sizeM?.price ?? p.base_price),
        priceL: sizeL ? fmt(sizeL.price) : undefined,
        image: p.image_url ?? fallbackImages.get(p.name.toLowerCase()) ?? '',
        description: p.description ?? '',
        category: p.category,
      };
    });
  } catch (err) {
    console.error('Could not load menu from POS, using static fallback:', err);
    return fallbackMenu;
  }
}
