import supabase from "./supabase";

export default async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error(`${error.message}, Cabins could not be loaded`);
  }

  return cabins;
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();

  if (error) {
    throw new Error("Cabin cannot be inserted");
  }
  return data;
}

export async function deleteCabinById(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabin cannot be deleted");
  }
  return data;
}
