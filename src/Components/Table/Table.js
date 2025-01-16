import LoaderWrapper from '../LoaderWrapper/LoaderWrapper';
import { useCallback, useMemo } from 'react';
import Loader from '../Loader/Loader';

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

export const Table = ({
  cols,
  data,
  paginate,
  loading = false,
  renderActions = undefined,
  filters = undefined,
}) => {
  const loaderElement = useCallback(() => {
    const colSpan = renderActions ? cols.length + 1 : cols.length;

    return (
      <tr>
        <td colSpan={colSpan} className="h-full h-[300px]">
          <Loader />
        </td>
      </tr>
    );
  }, [cols]);

  return (
    <>
      <div className="w-full min-h-[400px] w-fit max-h-[500px] overflow-scroll">
        <table className="w-full border-collapse border border-gray-200 ">
          <thead className="h-fit">
            <tr className="bg-gray-100">
              {cols.map(({ label, key }) => (
                <th
                  key={`table-th-${key}`}
                  className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium"
                >
                  {label}
                </th>
              ))}
              {renderActions !== undefined && (
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">
                  Actions:
                </th>
              )}
            </tr>
            {filters !== undefined && (
              <tr className="bg-gray-100">
                {filters.map((input, index) => (
                  <th
                    key={`filter-${index}`}
                    className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium"
                  >
                    {input}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            <LoaderWrapper loading={loading} LoaderElement={loaderElement}>
              {data.map((row, index) => (
                <tr key={`tr-${index}`} className="hover:bg-gray-50 h-fit">
                  {cols.map((col) => (
                    <td
                      key={`td-${col.key}`}
                      className="border border-gray-200 px-4 py-2 text-gray-800 whitespace-nowrap w-full"
                    >
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
            </LoaderWrapper>
          </tbody>
        </table>
      </div>
      <div className="mt-5">{paginate}</div>
    </>
  );
};

export default Table;
