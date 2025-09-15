import { useForm } from "react-hook-form";
import { useAddExpense } from "../../Features/Expenses/useAddExpenses";
import { useCategories } from "../../Features/categories/useCategories";
import Loading from "../Loading";

function ExpenseForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      amount: 0,
      type: "",
      recurring_frequency: "",
      spend_date: null,
      date: new Date().toISOString().split("T")[0],
      category_id: 0,
    },
  });

  const { addExpense, isAdding } = useAddExpense();
  const { categories, isLoading: isLoadingCategories } = useCategories();

  const expenseType = watch("type");

  const onSubmit = (data) => {
    addExpense(
      { expense: data },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  };

  if (isLoadingCategories || isAdding) return <Loading />;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row items-center gap-4 shadow-xl p-4 bg-white rounded-lg w-full flex-wrap"
    >
      <div className="w-full md:w-fit">
        <input
          type="text"
          placeholder="Description"
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 3,
              message: "Description must be at least 3 characters",
            },
          })}
          className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="w-full md:w-fit">
        <input
          type="number"
          placeholder="Amount"
          {...register("amount", {
            required: "Amount is required",
            min: { value: 0, message: "Amount must be positive" },
          })}
          className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full ${
            errors.amount ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      <div className="w-full md:w-fit">
        <select
          {...register("type", { required: "Please select a type" })}
          className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full ${
            errors.type ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select a type</option>
          <option value="recurring">Recurring</option>
          <option value="one_time">One-Time</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      {expenseType === "recurring" && (
        <div className="w-full md:w-fit">
          <select
            {...register("recurring_frequency", {
              required: "Please select a frequency",
            })}
            className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full ${
              errors.recurring_frequency ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a frequency</option>
            <option value="weekly">End of Week</option>
            <option value="biweekly">Every 2 Weeks</option>
            <option value="monthly">End of Month</option>
            <option value="quarterly">End of Quarter</option>
            <option value="yearly">End of Year</option>
          </select>
          {errors.recurring_frequency && (
            <p className="text-red-500 text-sm mt-1">
              {errors.recurring_frequency.message}
            </p>
          )}
        </div>
      )}

      {expenseType === "one_time" && (
        <div className="w-full md:w-fit">
          <input
            type="date"
            {...register("spend_date", {
              required: "Date is required",
              valueAsDate: true,
              validate: (value) => {
                if (!value) return "Please select a date";
                const date = new Date(value);
                return date <= new Date() || "Date cannot be in the future";
              },
            })}
            className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full ${
              errors.spend_date ? "border-red-500" : "border-gray-300"
            }`}
            max={new Date().toISOString().split("T")[0]}
          />
          {errors.spend_date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.spend_date.message}
            </p>
          )}
        </div>
      )}

      <div className="w-full md:w-fit">
        <select
          placeholder="Select a category"
          {...register("category_id", {
            required: "Please select a category",
            validate: (value) =>
              (value !== "0" && value !== "") || "Please select a category",
          })}
          className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full ${
            errors.category_id ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select a category</option>
          {categories?.length > 0 ? (
            categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.emoji} - {category.category_name}
              </option>
            ))
          ) : (
            <option value="">No categories found</option>
          )}
        </select>
        {errors.category_id && (
          <p className="text-red-500 text-sm mt-1">
            {errors.category_id.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full md:w-fit"
      >
        Add Expense
      </button>

      <button
        type="button"
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full md:w-fit"
        onClick={() => reset()}
      >
        Reset
      </button>
    </form>
  );
}

export default ExpenseForm;
