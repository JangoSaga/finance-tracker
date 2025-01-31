/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDeleteIncome } from "../../Features/incomes/useDeleteIncome";
import { useIncomeUpdate } from "../../Features/incomes/useIncomeUpdate";
export function Income({ income }) {
  const [incomeData, setIncomeData] = useState(income);
  const [isEditing, setIsEditing] = useState(false);
  const { deleteIncome, isLoading } = useDeleteIncome();
  const { updateIncome, isLoading: isUpdating } = useIncomeUpdate();
  const handleDeleteIncome = () => {
    deleteIncome(income.income_id);
  };
  const handleUpdateIncome = (e) => {
    e.preventDefault();
    updateIncome({ incomeId: income.income_id, income: incomeData });
    setIsEditing(false);
  };
  console.log(income);
  return (
    <>
      {!isEditing ? (
        <tr className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">{income.source_name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-green-500">
            ${income.amount}
          </td>
          <td className="px-6 py-4 whitespace-nowrap capitalize">
            {income.type === "one_time" ? "One Time" : "Recurring"}{" "}
          </td>
          <td className="px-6 py-4 whitespace-nowrap capitalize">
            {income.recurring_frequency || "-"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {income.type === "one-time" ? income.date : income.receiving_date}
          </td>
          <td className="px-6 py-4 whitespace-nowrap space-x-2 flex flex-row gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteIncome}
              disabled={isLoading}
              className=" bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
            >
              Delete
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td colSpan="6" className="px-6 py-4">
            <form
              onSubmit={handleUpdateIncome}
              className="flex gap-2 items-center"
            >
              <input
                type="text"
                value={incomeData.source_name}
                onChange={(e) =>
                  setIncomeData({ ...incomeData, source_name: e.target.value })
                }
                className="p-2 border rounded"
              />
              <input
                type="number"
                value={incomeData.amount}
                onChange={(e) =>
                  setIncomeData({ ...incomeData, amount: e.target.value })
                }
                className="p-2 border rounded"
              />
              <select
                value={incomeData.type}
                onChange={(e) =>
                  setIncomeData({ ...incomeData, type: e.target.value })
                }
                className="p-2 border rounded"
              >
                <option value="">Choose Income Type</option>
                <option value="recurring">Recurring</option>
                <option value="one_time">One Time</option>
              </select>
              {incomeData.type === "one_time" && (
                <input
                  type="date"
                  value={incomeData.date}
                  onChange={(e) =>
                    setIncomeData({ ...incomeData, date: e.target.value })
                  }
                  className="p-2 border rounded"
                />
              )}
              {incomeData.type === "recurring" && (
                <>
                  <select
                    value={incomeData.recurring_frequency}
                    onChange={(e) =>
                      setIncomeData({
                        ...incomeData,
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
                    value={incomeData.receiving_date}
                    onChange={(e) =>
                      setIncomeData({
                        ...incomeData,
                        receiving_date: e.target.value,
                      })
                    }
                    className="p-2 border rounded"
                  />
                </>
              )}
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
