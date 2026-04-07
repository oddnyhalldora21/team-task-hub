import { useState } from 'react';

// TODO: Type this render-props component so that:
// 1. `children` is NOT ReactNode — it must be a function (render prop)
// 2. The function receives a typed object: { isOpen: boolean; toggle: () => void; open: () => void; close: () => void }
// 3. The function must return a valid ReactNode
// 4. `initialOpen` is an optional boolean
// If a consumer passes a plain JSX element as children (not a function), TypeScript should error.
function Toggle({ children, initialOpen }: any) {
  const [isOpen, setIsOpen] = useState(initialOpen ?? false);

  const toggle = () => setIsOpen((prev: any) => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return children({ isOpen, toggle, open, close });
}

export { Toggle };
