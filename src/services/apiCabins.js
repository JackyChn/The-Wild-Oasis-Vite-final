import supabase, { supabaseUrl } from "./supabase";

export default async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error(`${error.message}, Cabins could not be loaded`);
  }

  return cabins;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl); // boolean
  // https://cfhtzhgqirdokoimzrtg.supabase.co/storage/v1/object/public/cabin-images/cabin-004.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create/edit cabin
  let query = supabase.from("cabins");

  // no id, then it is a create(insert) request
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // has id, it is an edit(update) request
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  // send the request
  const { data: cabinData, error: insertCabinError } = await query
    .select()
    .single();

  if (insertCabinError) throw new Error("New cabin cannot be inserted!");

  // 2. no error, then upload the image
  const { error: uploadImageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. delete the cabin if there's an error uploading image
  if (uploadImageError)
    await supabase.from("cabins").delete().eq("id", cabinData.id);

  return cabinData;
}

export async function deleteCabinById(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error(
      "Cabin image cannot be uploaded and cabin was not inserted"
    );
  }
  return data;
}
