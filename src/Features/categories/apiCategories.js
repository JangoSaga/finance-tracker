import supabase from "../../utils/supabase";
const CATEGORIES_TABLE = "Categories";
export async function getCategories({ userId }) {
  const { data, error } = await supabase
    .from(CATEGORIES_TABLE)
    .select("*")
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function createCategory({ userId, category }) {
  console.log(category);
  const { data, error } = await supabase
    .from(CATEGORIES_TABLE)
    .insert({
      user_id: userId,
      ...category,
    })
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function deleteCategory({ userId, categoryId }) {
  console.log(categoryId);
  const { data, error } = await supabase
    .from(CATEGORIES_TABLE)
    .delete()
    .eq("user_id", userId)
    .eq("category_id", categoryId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function updateCategory({ userId, categoryId, category }) {
  console.log(category);
  const { data, error } = await supabase
    .from(CATEGORIES_TABLE)
    .update(category)
    .eq("category_id", categoryId)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
