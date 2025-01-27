function NoIncomesMessage() {
  return (
    <div className="flex flex-row gap-4 w-full items-center justify-center p-4 bg-stone-100 rounded-lg h-96">
      <img
        src={"poor.png"}
        alt="No Income"
        className="w-70 h-70 object-contain grayscale"
      />
      <h1 className="text-2xl font-bold text-center text-stone-500">
        No incomes yet, add your first income
      </h1>
    </div>
  );
}

export default NoIncomesMessage;
