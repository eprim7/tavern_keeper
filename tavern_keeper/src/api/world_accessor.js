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

export async function getPublicWorlds(genre = undefined, search = undefined) {

    let query = supabase.from("Worlds").select("*").eq("isPublic", true);

    if(genre) {
        query.eq("genre", genre);
    }

    if(search) {
        query.ilike("title", '%'+search+'%');
    }

    const {data, error} = await query;

    if(error) {
        console.log("Failed to retrieve public worlds.")
    } else {
        return data;
    }
}

export async function getUserByUserID(userID) {
    const {data, error} = await supabase.from("User").select("*").eq("id", userID).single();

    if(error) {
        console.log("Failed to retrieve user data.");
    } else {
        return data;
    }
}

export async function getWorldDataByID(id) {
    const {data, error} = await supabase.from("Worlds").select("*").eq("id", id).single();

    if(error || !data) {
        console.log("Failed to retrieve world data.");
    } else {
        return data;
    }
}