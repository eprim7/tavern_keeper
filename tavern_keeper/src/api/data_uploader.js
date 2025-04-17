import supabase from "./supabase-client";

export async function updateUsername(email, username) {
    const {data, error} = await supabase.from("User").update({userName: username}).eq("email", email);

    if(error) {
        console.log("Failed to update username.");
        return false;
    } else {
        return true;
    }
}

export async function updateUserDescription(email, description) {
    const {data, error} = await supabase.from("User").update({description: description}).eq("description", description);

    if(error) {
        console.log("Failed to update the user's description");
        return false;
    } else {
        return true;
    }
}