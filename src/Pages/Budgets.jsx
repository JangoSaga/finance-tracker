import { useState } from "react";
import { useAddBudget } from "../Features/Budgets/useAddBudget";
import { useBudget } from "../Features/Budgets/useBudget";
import { Budget } from "../components/Budget/Budget";
import { useCategories } from "../Features/categories/useCategories";
import Loading from "../components/Loading";

function Budgets() {
  const [newBudget, setNewBudget] = useState({
    description: "",
    amount: 0,
    type: "",
    category_id: 0,
    start_date: null,
    is_repeating: false,
  });
  const { budgets, isLoading: isLoadingBudgets } = useBudget();
  const { addBudget, isLoading } = useAddBudget();
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const handleSubmit = (e) => {
    console.log(newBudget);
    e.preventDefault();
    addBudget(
      { budget: newBudget },
      {
        onSettled: () => {
          setNewBudget({
            description: "",
            amount: 0,
            type: "",
            category_id: 0,
            start_date: null,
            is_repeating: false,
          });
        },
      }
    );
  };
  if (isLoading || isLoadingCategories) return <Loading />;
  if (isLoadingBudgets) return <Loading />;
  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-4 shadow-xl p-4 bg-white rounded-lg w-full flex-wrap"
      >
        <input
          type="text"
          placeholder="Description"
          value={newBudget.description}
          onChange={(e) =>
            setNewBudget({ ...newBudget, description: e.target.value })
          }
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
        />
        <input
          type="number"
          placeholder="Amount"
          value={newBudget.amount}
          onChange={(e) =>
            setNewBudget({ ...newBudget, amount: e.target.valueAsNumber })
          }
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
        />
        <select
          value={newBudget.type}
          onChange={(e) => setNewBudget({ ...newBudget, type: e.target.value })}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
        >
          <option value="">Select a frequency</option>
          <option value="weekly">End of Week</option>
          <option value="biweekly">Every 2 Weeks</option>
          <option value="monthly">End of Month</option>
          <option value="quarterly">End of Quarter</option>
          <option value="yearly">End of Year</option>
        </select>
        <input
          type="date"
          placeholder="Start Date"
          value={newBudget.start_date}
          onChange={(e) =>
            setNewBudget({
              ...newBudget,
              start_date: new Date(e.target.value).toISOString().split("T")[0],
            })
          }
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
        />
        <select
          value={newBudget.category_id}
          onChange={(e) =>
            setNewBudget({
              ...newBudget,
              category_id: Number(e.target.value),
            })
          }
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
        >
          <option value="">Select a category</option>
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))
          ) : (
            <option value="">No categories found</option>
          )}
        </select>
        <div className="flex items-center gap-2 w-full md:w-fit">
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
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full md:w-fit"
        >
          Add Budget
        </button>
        <button
          type="reset"
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full md:w-fit"
        >
          Reset
        </button>
      </form>

      {budgets && budgets.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {budgets.map((budget) => (
            <Budget key={budget.budget_id} budget={budget} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-[60vh] gap-6 p-4">
          <img
            src="budget.png"
            alt="No Budget"
            className="grayscale w-full max-w-[280px] md:max-w-[320px] h-auto object-contain"
          />
          <p className="text-2xl font-bold text-center md:text-left">
            No Budget yet, add your first budget
          </p>
        </div>
      )}
    </div>
  );
}

export default Budgets;
