import supabase from "../../utils/supabase";
const INCOMES_TABLE = "Income Sources";
export async function addIncome(income, userId) {
  const { data, error } = await supabase
    .from(INCOMES_TABLE)
    .insert([{ ...income, user_id: userId }])
    .select();
  if (error) console.log(error);
  return data;
}
export async function getIncomes(userId) {
  const { data, error } = await supabase
    .from(INCOMES_TABLE)
    .select("*")
    .eq("user_id", userId);
  if (error) console.log(error);
  return data;
}
export async function updateIncome(incomeId, income) {
  const { data, error } = await supabase
    .from(INCOMES_TABLE)
    .update(income)
    .eq("income_id", incomeId)
    .select();
  if (error) console.log(error);
  return data;
}
export async function deleteIncome(incomeId) {
  const { data, error } = await supabase
    .from(INCOMES_TABLE)
    .delete()
    .eq("income_id", incomeId)
    .select();
  if (error) console.log(error);
  return data;
}
