import supabase from "./supabase-client";

export async function getData() {
    const {data, error} = await supabase.from("ProfilePicture").select("*");

    if (error) {
        console.log("Everything Broke!" + error);
    } else {
        return data;
    }
}

