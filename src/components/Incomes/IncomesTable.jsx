/* eslint-disable react/prop-types */
import Table from "../Table/Table";
import { Income } from "./Income";

function IncomesTable({ incomes }) {
  const tableHeaders = [
    "Source",
    "Amount",
    "Type",
    "Frequency",
    "Date",
    "Actions",
  ];

  return incomes.length > 0 ? (
    <Table headers={tableHeaders}>
      {incomes.map((income) => (
        <Income key={income.income_id} income={income} />
      ))}
    </Table>
  ) : (
    <p>No Results</p>
  );
}

export default IncomesTable;
