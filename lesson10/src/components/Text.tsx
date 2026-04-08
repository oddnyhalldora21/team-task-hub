// TODO: Make this component polymorphic.
// The `as` prop should accept any valid HTML element type (e.g. 'h1', 'p', 'span').
// The remaining props should be inferred from whatever element `as` resolves to —
// for example, if as="a", then `href` should be valid and autocomplete.
// Default `as` to 'p' when not provided.
function Text({ as, children, className, ...props }: any) {
  const Component = as || 'p';

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}

export { Text };
