import { useState } from "react";
import { useAddIncome } from "../../Features/incomes/useAddIncome";
import { toast } from "react-hot-toast";

function AddIncomeForm() {
  const [income, setIncome] = useState({
    source_name: "",
    amount: "",
    type: "",
    recurring_frequency: "",
    receiving_date: 0,
    date: new Date().toISOString().split("T")[0],
  });

  const { addIncome, isLoading } = useAddIncome();

  function handleAddIncome(e) {
    e.preventDefault();
    if (
      income.source_name === "" ||
      income.amount === "" ||
      income.type === ""
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (
      income.type === "recurring" &&
      (!income.recurring_frequency || !income.receiving_date)
    ) {
      toast.error("Please fill all recurring income fields");
      return;
    }

    addIncome(income, {
      onSettled: () => {
        setIncome({
          source_name: "",
          amount: "",
          type: "",
          recurring_frequency: "",
          receiving_date: 0,
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
        <>
          <select
            value={income.recurring_frequency}
            onChange={(e) =>
              setIncome({ ...income, recurring_frequency: e.target.value })
            }
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
          >
            <option value="">Select Frequency</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <input
            type="number"
            min="1"
            max={income.recurring_frequency === "monthly" ? "31" : "365"}
            placeholder="Receiving Day"
            value={income.receiving_date}
            onChange={(e) =>
              setIncome({ ...income, receiving_date: e.target.value })
            }
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
          />
        </>
      )}
      {income.type === "one_time" && (
        <input
          type="date"
          value={income.date}
          onChange={(e) => setIncome({ ...income, date: e.target.value })}
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
            receiving_date: 0,
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
