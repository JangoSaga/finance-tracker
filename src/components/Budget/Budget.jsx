/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDeleteBudget } from "../../Features/Budgets/useDeleteBudget";
import { useUpdateBudget } from "../../Features/Budgets/useUpdateBudget";
export function Budget({ budget }) {
  const { deleteBudget, isLoading: isDeleting } = useDeleteBudget();
  const { updateBudget, isLoading: isUpdating } = useUpdateBudget();
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);
  const handleDelete = () => {
    deleteBudget({ budgetId: budget.budget_id });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateBudget({ budgetId: budget.budget_id, budget: newBudget });
    setIsEditing(false);
  };
  if (isDeleting) return <p>Deleting...</p>;
  if (isUpdating) return <p>Updating...</p>;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {!isEditing ? (
        <>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">{budget.description}</h3>
              <p className="text-2xl font-bold text-green-500">
                ${budget.amount}
              </p>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>
                  Start Date: {budget.type || "-"} at {budget.start_date || "-"}
                </p>
                <p>Repeating: {budget.is_repeating ? "Yes" : "No"}</p>
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Description"
            value={newBudget.description}
            onChange={(e) =>
              setNewBudget({ ...newBudget, description: e.target.value })
            }
            className="input input-bordered w-full"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newBudget.amount}
            onChange={(e) =>
              setNewBudget({ ...newBudget, amount: e.target.value })
            }
            className="input input-bordered w-full"
          />
          <input
            type="date"
            placeholder="Start Date"
            value={newBudget.start_date}
            onChange={(e) =>
              setNewBudget({ ...newBudget, start_date: e.target.value })
            }
            className="input input-bordered w-full"
          />
          <select
            value={newBudget.type}
            onChange={(e) =>
              setNewBudget({ ...newBudget, type: e.target.value })
            }
            className="select select-bordered w-full"
          >
            <option value="">Select a frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <div className="flex items-center gap-2">
            <label htmlFor="is_repeating" className="cursor-pointer">
              Is Repeating
            </label>
            <input
              type="checkbox"
              id="is_repeating"
              checked={newBudget.is_repeating}
              onChange={(e) =>
                setNewBudget({ ...newBudget, is_repeating: e.target.checked })
              }
              className="checkbox"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
