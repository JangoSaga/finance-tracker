import supabase from "../../utils/supabase";

const SAVINGS_TABLE = "Savings";
export async function getSavings(userId) {
  const { data, error } = await supabase
    .from(SAVINGS_TABLE)
    .select("*")
    .eq("user_id", userId);
  if (error) console.log(error);
  return data;
}
export async function addSavings(savings, userId) {
  console.log(savings);
  const { data, error } = await supabase
    .from(SAVINGS_TABLE)
    .insert({ ...savings, user_id: userId })
    .select();
  if (error) console.log(error);
  return data;
}
export async function updateSavings(savingsId, savings, userId) {
  const { data, error } = await supabase
    .from(SAVINGS_TABLE)
    .update({ ...savings, user_id: userId })
    .eq("savings_id", savingsId)
    .select();
  if (error) console.log(error);
  return data;
}
export async function deleteSavings(savingsId, userId) {
  const { data, error } = await supabase
    .from(SAVINGS_TABLE)
    .delete()
    .eq("savings_id", savingsId)
    .eq("user_id", userId)
    .select();
  if (error) console.log(error);
  return data;
}
