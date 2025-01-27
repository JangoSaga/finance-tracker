/* eslint-disable react/prop-types */

function Table({ headers, children, className = "" }) {
  return (
    <div
      className={`overflow-x-auto shadow-xl p-4 bg-white rounded-lg w-full ${className}`}
    >
      <table className="min-w-full bg-white overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
}

export default Table;
