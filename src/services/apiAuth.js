import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

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
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  // 1. update password or fullName
  let updateUser;
  if (password) updateUser = { password }; // has password, then it is a change password request
  if (fullName) updateUser = { data: { fullName } }; // has full name, no password then it is a update user data request
  const { data: updatedUserNoAvatar, error: noAvatarUpdateError } =
    await supabase.auth.updateUser(updateUser);
  if (noAvatarUpdateError) throw new Error(noAvatarUpdateError.message);
  if (!avatar) return updatedUserNoAvatar; // no avatar to deal with

  // 2. has avatar file, upload the avatar image to storage
  const fileName = `avatar-${updatedUserNoAvatar.user.id}-${Math.random()}`;
  const { error: uploadAvatarError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (uploadAvatarError) throw new Error(uploadAvatarError.message);

  // 3. update avatar in the user again
  const { data: updatedUserWithAvatar, error: avatarUpdateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (avatarUpdateError) throw new Error(avatarUpdateError.message);
  return { updatedUserWithAvatar };
}
