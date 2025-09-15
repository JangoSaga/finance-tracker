import { useState } from "react";
import { useIncomes } from "../Features/incomes/useIncomes";
import Loading from "../components/Loading";
import AddIncomeForm from "../components/Incomes/AddIncomeForm";
import NoIncomesMessage from "../components/Incomes/NoIncomesMessage";
import IncomeFilters from "../components/Incomes/IncomeFilters";
import { Income } from "../components/Incomes/Income";
import Table from "../components/Table/Table";

function Incomes() {
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { incomes, isLoading } = useIncomes();

  const filteredAndSortedIncomes = incomes
    ?.filter((income) => {
      if (filterType === "all") return true;
      return income.type === filterType;
    })
    ?.filter((income) =>
      income.source_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "desc"
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      }
      if (sortBy === "amount") {
        return sortOrder === "desc" ? b.amount - a.amount : a.amount - b.amount;
      }
      return 0;
    });

  if (isLoading) return <Loading />;
  const tableHeaders = [
    "Source",
    "Amount",
    "Type",
    "Category",
    "Date",
    "Actions",
  ];
  return (
    <div className="flex flex-col gap-4">
      <AddIncomeForm />

      {incomes.length > 0 ? (
        <div className="flex gap-4 md:flex-col flex-row">
          <div className="w-full">
            <IncomeFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterType={filterType}
              setFilterType={setFilterType}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              searchPlaceholder="Search by source name..."
            />
          </div>
          <div className="w-full">
            <Table headers={tableHeaders}>
              {filteredAndSortedIncomes.map((income) => (
                <Income key={income.income_id} income={income} />
              ))}
            </Table>
          </div>
        </div>
      ) : (
        <NoIncomesMessage />
      )}
    </div>
  );
}

export default Incomes;
