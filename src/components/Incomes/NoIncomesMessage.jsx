function NoIncomesMessage() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-[60vh] gap-6 p-4">
      <img
        src="poor.png"
        alt="No income"
        className="grayscale w-full max-w-[280px] md:max-w-[320px] h-auto object-contain"
      />
      <p className="text-2xl font-bold text-center md:text-left">
        No incomes yet, add your first income
      </p>
    </div>
  );
}

export default NoIncomesMessage;
