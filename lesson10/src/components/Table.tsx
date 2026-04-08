// TODO: Make this component generic over the row data type.
// `columns` should be an array where each column's `key` is constrained to `keyof T`,
// `header` is a string, and the optional `render` function receives the cell value
// (typed as T[K]) and the full row (typed as T).
// `data` should be T[].
// This ensures that typos in column keys are caught at compile time.
function Table({ data, columns, className }: any) {
  return (
    <table className={`w-full border-collapse ${className || ''}`}>
      <thead>
        <tr>
          {columns.map((col: any) => (
            <th key={col.key} className="border-b p-2 text-left font-semibold">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any, index: number) => (
          <tr key={row.id ?? index}>
            {columns.map((col: any) => (
              <td key={col.key} className="border-b p-2">
                {col.render
                  ? col.render(row[col.key], row)
                  : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export { Table };
