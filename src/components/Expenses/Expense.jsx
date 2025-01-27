import { useState } from "react";
import { useDeleteExpense } from "../../Features/Expenses/useDeleteExpenses";
import { useUpdateExpense } from "../../Features/Expenses/useUpdateExpenses";
import { useCategories } from "../../Features/categories/useCategories";

/* eslint-disable react/prop-types */
export function Expense({ expense }) {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteExpense, isDeleting } = useDeleteExpense();
  const { updateExpense, isUpdating } = useUpdateExpense();
  const [expenseData, setExpenseData] = useState(expense);
  const { categories } = useCategories();
  const handleDeleteExpense = () => {
    deleteExpense({ expenseId: expense.expense_id });
  };

  const handleUpdateExpense = (e) => {
    e.preventDefault();
    updateExpense({
      expenseId: expense.expense_id,
      expense: expenseData,
    });
    setIsEditing(false);
  };

  return (
    <>
      {!isEditing ? (
        <tr className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td>
          <td className="px-6 py-4 whitespace-nowrap text-red-500">
            ${expense.amount}
          </td>
          <td className="px-6 py-4 whitespace-nowrap capitalize">
            {expense.type === "one_time" ? "One Time" : "Recurring"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap capitalize">
            {expense.recurring_frequency || "one time"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {expense.type === "one_time" ? expense.date : expense.spend_date}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {categories?.find(
              (category) => category.category_id === expense.category_id
            )?.category_name || "-"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap space-x-2 flex flex-row gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteExpense}
              disabled={isDeleting}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
            >
              Delete
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td colSpan="7" className="px-6 py-4">
            <form
              onSubmit={handleUpdateExpense}
              className="flex gap-2 items-center"
            >
              <input
                type="text"
                value={expenseData.description}
                onChange={(e) =>
                  setExpenseData({
                    ...expenseData,
                    description: e.target.value,
                  })
                }
                className="p-2 border rounded"
              />
              <input
                type="number"
                value={expenseData.amount}
                onChange={(e) =>
                  setExpenseData({ ...expenseData, amount: e.target.value })
                }
                className="p-2 border rounded"
              />
              <select
                value={expenseData.type}
                onChange={(e) =>
                  setExpenseData({ ...expenseData, type: e.target.value })
                }
                className="p-2 border rounded"
              >
                <option value="">Choose Expense Type</option>
                <option value="recurring">Recurring</option>
                <option value="one_time">One Time</option>
              </select>
              {expenseData.type === "one_time" && (
                <input
                  type="date"
                  value={expenseData.date}
                  onChange={(e) =>
                    setExpenseData({ ...expenseData, date: e.target.value })
                  }
                  className="p-2 border rounded"
                />
              )}
              {expenseData.type === "recurring" && (
                <>
                  <select
                    value={expenseData.recurring_frequency}
                    onChange={(e) =>
                      setExpenseData({
                        ...expenseData,
                        recurring_frequency: e.target.value,
                      })
                    }
                    className="p-2 border rounded"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  <input
                    type="number"
                    value={expenseData.spend_date}
                    onChange={(e) =>
                      setExpenseData({
                        ...expenseData,
                        spend_date: e.target.value,
                      })
                    }
                    className="p-2 border rounded"
                    placeholder="Spend Date"
                  />
                </>
              )}
              <select
                value={expenseData.category_id}
                onChange={(e) =>
                  setExpenseData({
                    ...expenseData,
                    category_id: Number(e.target.value),
                  })
                }
                className="p-2 border rounded"
              >
                {/* Assuming you have categories available */}
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={isUpdating}
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
