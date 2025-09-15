import { useState } from "react";
import { useAddIncome } from "../../Features/incomes/useAddIncome";
import { toast } from "react-hot-toast";

function AddIncomeForm() {
  const [income, setIncome] = useState({
    source_name: "",
    amount: "",
    type: "",
    recurring_frequency: "",
    receiving_date: null,
    date: new Date().toISOString().split("T")[0],
  });

  const { addIncome, isLoading } = useAddIncome();

  function handleAddIncome(e) {
    console.log(income);
    e.preventDefault();
    if (
      income.source_name === "" ||
      income.amount === "" ||
      income.type === ""
    ) {
      toast.error("Please fill all fields");
      return;
    }

    addIncome(income, {
      onSettled: () => {
        setIncome({
          source_name: "",
          amount: "",
          type: "",
          recurring_frequency: "",
          receiving_date: null,
          date: new Date().toISOString().split("T")[0],
        });
      },
    });
  }

  return (
    <form
      onSubmit={handleAddIncome}
      className="flex flex-col md:flex-row items-center gap-4 shadow-xl p-4 bg-white rounded-lg w-full flex-wrap"
    >
      <input
        type="text"
        placeholder="Source Name"
        value={income.source_name}
        onChange={(e) => setIncome({ ...income, source_name: e.target.value })}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
      />
      <input
        type="number"
        placeholder="Amount"
        value={income.amount}
        onChange={(e) => setIncome({ ...income, amount: e.target.value })}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
      />
      <select
        value={income.type}
        onChange={(e) => setIncome({ ...income, type: e.target.value })}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
      >
        <option value="">Select Type</option>
        <option value="recurring">Recurring</option>
        <option value="one_time">One Time</option>
      </select>
      {income.type === "recurring" && (
        <select
          value={income.recurring_frequency}
          onChange={(e) =>
            setIncome({ ...income, recurring_frequency: e.target.value })
          }
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
        >
          <option value="">Select a frequency</option>
          <option value="weekly">End of Week</option>
          <option value="biweekly">Every 2 Weeks</option>
          <option value="monthly">End of Month</option>
          <option value="quarterly">End of Quarter</option>
          <option value="yearly">End of Year</option>
        </select>
      )}

      {income.type === "one_time" && (
        <input
          type="date"
          value={
            income.receiving_date
              ? new Date(income.receiving_date).toISOString().split("T")[0]
              : ""
          }
          onChange={(e) =>
            setIncome({
              ...income,
              receiving_date: new Date(e.target.value)
                .toISOString()
                .split("T")[0],
            })
          }
          max={new Date().toISOString().split("T")[0]}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
        />
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full md:w-fit"
        disabled={isLoading}
      >
        Add Income
      </button>

      <button
        type="reset"
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full md:w-fit"
        onClick={() =>
          setIncome({
            source_name: "",
            amount: "",
            type: "",
            recurring_frequency: "",
            receiving_date: null,
            date: new Date().toISOString().split("T")[0],
          })
        }
      >
        Reset
      </button>
    </form>
  );
}

export default AddIncomeForm;
