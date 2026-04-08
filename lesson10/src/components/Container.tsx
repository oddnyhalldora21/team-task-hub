// TODO: Type this component so that:
// 1. `children` is properly typed as React.ReactNode
// 2. `maxWidth` only accepts specific size tokens: 'sm' | 'md' | 'lg' | 'xl' | 'full'
// 3. `centered` and `padded` are optional booleans
// 4. All remaining native <div> props (className, id, role, aria-*, etc.) are forwarded and type-checked
function Container({ children, maxWidth, centered, padded, className, ...props }: any) {
  const widths: any = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    full: '100%',
  };

  return (
    <div
      className={`${centered ? 'mx-auto' : ''} ${padded ? 'p-4' : ''} ${className || ''}`}
      style={{ maxWidth: widths[maxWidth || 'lg'] }}
      {...props}
    >
      {children}
    </div>
  );
}

export { Container };
