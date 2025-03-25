import supabase from "./supabase-client";

export async function getData() {
    const {data, error} = supabase.from("ProfilePicture").select("*").eq("id", 0);

    if(error) {
        console.log("Everything Broke!!!");
    } else {
        return data;
    }
}