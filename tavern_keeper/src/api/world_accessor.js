import supabase from "./supabase-client";

export async function getPlayerWorlds(email) {
    const {data: userID, error: userError} = await supabase.from("User").select("id").eq("email", email).single();

    if(userError) {
        console.log("Failed to retrieve user information. ", userError.message);
        console.log("email from database", email)
        console.log("id ", userID)
        return;
    }
    const {data: worlds, error: worldError} = await supabase.from("Worlds").select("*").eq("userID", userID.id);
    
    if(worldError) {
        console.log("Failed to retrieve world data.");
    } else {
        return worlds;
    }
    
}

export async function getPublicWorlds() {
    const {data, error} = await supabase.from("Worlds").select("*").eq("isPublic", true);

    if(error) {
        console.log("Failed to retrieve public worlds.")
    } else {
        return data;
    }
}