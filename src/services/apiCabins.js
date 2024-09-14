import supabase, { supabaseUrl } from "./supabase";

export default async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error(`${error.message}, Cabins could not be loaded`);
  }

  return cabins;
}

export async function createCabin(newCabin) {
  // https://cfhtzhgqirdokoimzrtg.supabase.co/storage/v1/object/public/cabin-images/cabin-004.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    // removes any / characters in the image name to prevent issues with file paths
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1. create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    throw new Error("Cabin cannot be inserted");
  }

  // 2. no error, then upload the image
  const { error: storageError } = await supabase.storage
    .from("cabin-images") // bucket name
    .upload(imageName, newCabin.image);
  // 3. delete the cabin if there's an error uploading image
  if (storageError) await supabase.from("cabins").delete().eq("id", data.id);

  return data;
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
