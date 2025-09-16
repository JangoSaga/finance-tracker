import { useAddSavings } from "../Features/Savings/useAddSavings";
import { useSavings } from "../Features/Savings/useSavings";
import Saving from "../components/Savings/Saving";
import Loading from "../components/Loading";
import Table from "../components/Table/Table";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Savings() {
  const {
    register,
    handleSubmit: handleFormSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      amount: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      period: "",
    },
  });
  const { savings, isLoading, error } = useSavings();
  const { addSavings, isLoading: isAddingSavings } = useAddSavings();

  const onSubmit = (data) => {
    if (data?.amount > 0 && data?.description != "" && data?.period != "") {
      addSavings(data, {
        onSettled: () => {
          reset({
            amount: "",
            date: new Date().toISOString().split("T")[0],
            description: "",
            period: "",
          });
        },
      });
    } else {
      toast.error("Empty credentials");
      reset();
    }
  };

  const tableHeaders = ["Description", "Amount", "Period", "Date", "Actions"];

  if (isLoading || isAddingSavings) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleFormSubmit(onSubmit)}
        className="flex flex-col md:flex-row items-center gap-4 shadow-xl p-4 bg-white rounded-lg w-full flex-wrap"
      >
        <input
          type="text"
          placeholder="Description"
          {...register("description")}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
        />
        <input
          type="number"
          placeholder="Amount"
          {...register("amount")}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
        />
        <input
          type="date"
          placeholder="Date"
          {...register("date")}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
        />
        <select
          {...register("period")}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-fit"
        >
          <option value="">Select a period</option>
          <option value="For a month">For a month</option>
          <option value="For a year">For a year</option>
          <option value="For a week">For a week</option>
          <option value="For a day">For a day</option>
        </select>
        <button
          type="submit"
          disabled={isAddingSavings || isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full md:w-fit disabled:opacity-50"
        >
          {isAddingSavings ? "Adding..." : "Add Savings"}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full md:w-fit"
        >
          Reset
        </button>
      </form>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {savings && savings.length > 0 ? (
        <Table headers={tableHeaders}>
          {savings.map((saving) => (
            <Saving key={saving.savings_id} savings={saving} />
          ))}
        </Table>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-[60vh] gap-6 p-4">
          <img
            src="saving.png"
            alt="No Saving"
            className="grayscale w-full max-w-[280px] md:max-w-[320px] h-auto object-contain"
          />
          <p className="text-2xl font-bold text-center md:text-left">
            No savings yet, add your first saving{" "}
          </p>
        </div>
      )}
    </div>
  );
}

export default Savings;
