import supabase from "../../utils/supabase";
const EXPENSES_TABLE = "Expenses";
export async function getExpenses(userId) {
  const { data, error } = await supabase
    .from(EXPENSES_TABLE)
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  return data;
}
export async function addExpense(userId, expense) {
  const { data, error } = await supabase
    .from(EXPENSES_TABLE)
    .insert({ ...expense, user_id: userId })
    .select();
  if (error) throw error;
  return data;
}
export async function deleteExpense(userId, expenseId) {
  const { error } = await supabase
    .from(EXPENSES_TABLE)
    .delete()
    .eq("user_id", userId)
    .eq("expense_id", expenseId);
  if (error) throw error;
}
export async function updateExpense(userId, expenseId, expense) {
  //   console.log(expense);
  const { data, error } = await supabase
    .from(EXPENSES_TABLE)
    .update({ ...expense, user_id: userId })
    .eq("expense_id", expenseId)
    .select();
  if (error) throw error;
  return data;
}
