import supabase from "../../utils/supabase";
const BUDGETS_TABLE = "Budgets";
export async function getBudgets(userId) {
  const { data, error } = await supabase
    .from(BUDGETS_TABLE)
    .select("*")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return data;
}
export async function addBudget(userId, budget) {
  console.log(budget);
  const { data, error } = await supabase
    .from(BUDGETS_TABLE)
    .insert({ user_id: userId, ...budget })
    .select();
  if (error) throw new Error(error.message);
  return data;
}
export async function updateBudget(userId, budgetId, budget) {
  const { data, error } = await supabase
    .from(BUDGETS_TABLE)
    .update({ ...budget })
    .eq("user_id", userId)
    .eq("budget_id", budgetId)
    .select();
  if (error) throw new Error(error.message);
  return data;
}
export async function deleteBudget(userId, budgetId) {
  const { data, error } = await supabase
    .from(BUDGETS_TABLE)
    .delete()
    .eq("user_id", userId)
    .eq("budget_id", budgetId);
  if (error) throw new Error(error.message);
  return data;
}
