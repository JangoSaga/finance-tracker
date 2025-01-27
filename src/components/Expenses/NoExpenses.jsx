function NoExpenses() {
  return (
    <div className="flex flex-row gap-4 w-full items-center justify-center p-4 bg-stone-100 rounded-lg h-96">
      <img
        src={"noExpense.png"}
        alt="No Expenses"
        className="w-70 h-70 object-contain grayscale"
      />
      <h1 className="text-2xl font-bold text-center text-stone-500">
        No expenses yet, add your first expense
      </h1>
    </div>
  );
}

export default NoExpenses;
