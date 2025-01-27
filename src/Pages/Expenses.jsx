import { useState, useMemo } from "react";
import { useExpenses } from "../Features/expenses/useExpenses";
import { Expense } from "../components/Expenses/Expense";
import Loading from "../components/Loading";
import Table from "../components/Table/Table";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import NoExpenses from "../components/Expenses/NoExpenses";
import ExpenseFilters from "../components/Expenses/ExpenseFilters";

function Expenses() {
  const { expenses, isLoading } = useExpenses();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const tableHeaders = [
    "Description",
    "Amount",
    "Type",
    "Frequency",
    "Date",
    "Category",
    "Actions",
  ];

  const filteredAndSortedExpenses = useMemo(() => {
    if (!expenses) return [];

    return expenses
      .filter((expense) => {
        const matchesSearch = expense.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchesType =
          filterType === "all" ||
          (filterType === "recurring" && expense.recurring_frequency !== "") ||
          (filterType === "one-time" && expense.recurring_frequency === "");

        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
          case "amount":
            comparison = a.amount - b.amount;
            break;
          case "category":
            comparison = a.category_name.localeCompare(b.category_name);
            break;
          case "date":
          default:
            comparison = new Date(a.date) - new Date(b.date);
            break;
        }

        return sortOrder === "asc" ? comparison : -comparison;
      });
  }, [expenses, searchTerm, filterType, sortBy, sortOrder]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <ExpenseForm />

      {expenses?.length > 0 ? (
        <div className="flex gap-4 md:flex-row flex-col">
          <div className="w-full md:w-1/3">
            <ExpenseFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterType={filterType}
              setFilterType={setFilterType}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>
          <div className="w-full md:w-2/3">
            <Table headers={tableHeaders}>
              {filteredAndSortedExpenses.map((expense) => (
                <Expense key={expense.expense_id} expense={expense} />
              ))}
            </Table>
          </div>
        </div>
      ) : (
        <NoExpenses />
      )}
    </div>
  );
}

export default Expenses;
