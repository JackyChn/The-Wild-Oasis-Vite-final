import supabase from "./supabase";
import PropTypes from "prop-types";

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

login.propTypes = {
  email: PropTypes.string,
  pwd: PropTypes.string,
};
