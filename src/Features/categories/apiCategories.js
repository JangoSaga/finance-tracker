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
  const { data: existingCategory, error: fetchError } = await supabase
    .from(CATEGORIES_TABLE)
    .select("*")
    .eq("user_id", userId)
    .ilike("category_name", category.category_name)
    .maybeSingle();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  if (existingCategory) {
    throw new Error("A category with this name already exists");
  }
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
