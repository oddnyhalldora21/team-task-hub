// TODO: Make this component generic over the item type.
// When a consumer writes <DataList items={users} renderItem={(user) => ...} />,
// the `user` parameter in renderItem should be inferred as the User type — not `any`.
// `keyExtractor` should also receive the correctly typed item.
function DataList({ items, renderItem, keyExtractor, className }: any) {
  return (
    <ul className={className}>
      {items.map((item: any, index: number) => (
        <li key={keyExtractor ? keyExtractor(item) : index}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

export { DataList };
