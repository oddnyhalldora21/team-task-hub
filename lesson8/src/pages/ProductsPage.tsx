import { Products } from '@/features/products';
import { useAppStore } from '@/store/AppStore';

export function ProductsPage() {
  const { products, addToCart } = useAppStore();
  return <Products products={products} onAddToCart={addToCart} />;
}