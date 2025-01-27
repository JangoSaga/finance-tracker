import { useState } from "react";
import { useDeleteSavings } from "../../Features/Savings/useDeleteSavings";
import { useUpdateSavings } from "../../Features/Savings/useUpdateSavings";

/* eslint-disable react/prop-types */
export function Saving({ savings }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newSavings, setNewSavings] = useState(savings);
  const { deleteSavings, isLoading: isDeletingSavings } = useDeleteSavings();
  const { updateSavings, isLoading: isUpdatingSavings } = useUpdateSavings();

  const handleDelete = () => {
    deleteSavings(savings.savings_id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSavings({ savingsId: savings.savings_id, savings: newSavings });
    setIsEditing(false);
  };
  console.log(savings);
  return (
    <>
      {!isEditing ? (
        <tr className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">{savings.description}</td>
          <td className="px-6 py-4 whitespace-nowrap text-green-500">
            ${savings.amount}
          </td>
          <td className="px-6 py-4 whitespace-nowrap capitalize">
            {savings.period}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {new Date(savings.date).toLocaleDateString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap space-x-2 flex flex-row gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeletingSavings}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
            >
              Delete
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td colSpan="5" className="px-6 py-4">
            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
              <input
                type="text"
                value={newSavings.description}
                onChange={(e) =>
                  setNewSavings({ ...newSavings, description: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                value={newSavings.amount}
                onChange={(e) =>
                  setNewSavings({ ...newSavings, amount: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="date"
                value={newSavings.date}
                onChange={(e) =>
                  setNewSavings({ ...newSavings, date: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={newSavings.period}
                onChange={(e) =>
                  setNewSavings({ ...newSavings, period: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a period</option>
                <option value="For a month">For a month</option>
                <option value="For a year">For a year</option>
                <option value="For a week">For a week</option>
                <option value="For a day">For a day</option>
              </select>
              <button
                type="submit"
                disabled={isUpdatingSavings}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </form>
          </td>
        </tr>
      )}
    </>
  );
}

export default Saving;
