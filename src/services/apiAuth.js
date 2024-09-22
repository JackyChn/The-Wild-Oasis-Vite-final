import supabase from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  // check if can get the session
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // indeed has session, then refetch the user again in secure
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}
