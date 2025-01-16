function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

export const Table = ({ cols, data, paginate, renderActions = undefined }) => {
  return (
    <>
      <div className="w-full min-h-[400px] w-fit max-h-[500px] overflow-scroll">
        <table className="border-collapse border border-gray-200 ">
          <thead className="h-fit">
            <tr className="bg-gray-100">
              {cols.map(({ label }) => (
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">
                  {label}
                </th>
              ))}
              {renderActions !== undefined && (
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">
                  Actions:
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr className="hover:bg-gray-50 h-fit">
                {cols.map((col) => (
                  <td className="border border-gray-200 px-4 py-2 text-gray-800 whitespace-nowrap w-full">
                    {col.renderer
                      ? col.renderer(getNestedValue(row, col.key))
                      : getNestedValue(row, col.key)}
                  </td>
                ))}
                {renderActions !== undefined && (
                  <td className="border border-gray-200 px-4 py-2 text-gray-800">
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5">{paginate}</div>
    </>
  );
};

export default Table;
