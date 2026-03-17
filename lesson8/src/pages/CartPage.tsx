import { Cart } from '@/features/cart';
import { useAppStore } from '@/store/AppStore';

export function CartPage() {
  const { items, updateQuantity, removeItem } = useAppStore();
  return (
    <Cart
      items={items}
      onQuantityChange={updateQuantity}
      onRemove={removeItem}
    />
  );
}