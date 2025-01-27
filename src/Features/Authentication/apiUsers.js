import supabase, { supabaseUrl } from "../../utils/supabase";
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  }
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}
export async function signUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: fullName,
        profile_picture: "",
        account_created: new Date(),
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function updateUser({ password, fullName, avatar }) {
  let updatedData;
  if (password) updatedData = { password };
  if (fullName) updatedData = { data: { full_name: fullName } };
  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const fileName = `${Date.now()}-${avatar[0].name}`;
  const filePath = `${data.user.id}/${fileName}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(filePath, avatar[0]);

  if (storageError) throw new Error(storageError.message);

  const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${filePath}`;
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        ...data.user.user_metadata,
        profile_picture: avatarUrl,
      },
    });

  if (updateError) throw new Error(updateError.message);
  return updatedUser;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
