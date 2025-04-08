import supabase from "./supabase-client";

export async function getMapsByWorldID(worldID) {
    const {data: mapData, error: mapError} = await supabase.from("Maps").select("*").eq("WorldID", worldID);

    if(mapError) {
        console.log("Failed to retrieve map data: " + mapError);
    } else {
        return mapData;
    }
}

export async function getPinsByMapID(mapID) {
    const {data: pinData, error: pinError} = await supabase.from("Pins").select("*").eq("MapID");
    
    if(pinError) {
        console.log("Failed to retrieve pin data: " + pinError);
    } else {
        return pinData;
    }
}