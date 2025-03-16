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
      spend_date: 0,
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
        <>
          <div className="w-full md:w-fit">
            <select
              {...register("recurring_frequency", {
                required: "Please select a frequency",
              })}
              className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full ${
                errors.recurring_frequency
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select a frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            {errors.recurring_frequency && (
              <p className="text-red-500 text-sm mt-1">
                {errors.recurring_frequency.message}
              </p>
            )}
          </div>

          <div className="w-full md:w-fit">
            <input
              type="number"
              placeholder="Recurring Date"
              {...register("spend_date", {
                required: "Recurring date is required",
                min: { value: 1, message: "Date must be between 1 and 31" },
                max: { value: 31, message: "Date must be between 1 and 31" },
              })}
              className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full ${
                errors.spend_date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.spend_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.spend_date.message}
              </p>
            )}
          </div>
        </>
      )}

      {expenseType === "one_time" && (
        <div className="w-full md:w-fit">
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full ${
              errors.date ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
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
