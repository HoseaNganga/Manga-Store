export interface ProductCard {
  id: string;
  title: string;
  coverUrl: string;
  price: number;
  stock: number;
  rating?: number;
}

export interface StockBadgeInfo {
  label: string;
  severity: 'success' | 'danger' | 'info' | 'warn' | 'secondary' | 'contrast'; // This is the key!
  class: string;
}
