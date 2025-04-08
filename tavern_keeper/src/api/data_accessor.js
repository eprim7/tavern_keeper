import supabase from "./supabase-client";

export async function getCharactersByWorldID(worldID) {
    const {data: characterData, error: error} = await supabase.from("Characters").select("*").eq("WorldID", worldID);

    if(error) {
        console.log("Failed to retrieve character data: " + error);
    } else {
        return characterData;
    }
}

export async function getEventsByWorldID(worldID) {
    const {data: eventData, error: error} = await supabase.from("Events").select("*").eq("WorldID", worldID);

    if(error) {
        console.log("Failed to retrieve Event data: " + error);
    } else {
        return eventData;
    }
}