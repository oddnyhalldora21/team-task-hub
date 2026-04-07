// TODO: Type this component so that:
// 1. `variant` only accepts 'primary' | 'secondary' | 'danger'
// 2. `size` only accepts 'sm' | 'md' | 'lg'
// 3. All native <button> props (onClick, disabled, type, aria-*, etc.) are accepted and type-checked
// 4. Make it polymorphic: `as="a"` should give you anchor props (href, target, etc.)
//    and `as="button"` (default) should give you button props
function Button({ variant, size, as, children, className, ...props }: any) {
  const Component = as || 'button';

  const variantStyles: any = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  const sizeStyles: any = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <Component
      className={`rounded font-medium ${variantStyles[variant || 'primary']} ${sizeStyles[size || 'md']} ${className || ''}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Button };
