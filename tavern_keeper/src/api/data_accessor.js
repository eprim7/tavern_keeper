import supabase from "./supabase-client";

const dataOptionsMap = new Map();

export class dataOptions {
    static CHARACTERS = Symbol("CHARACTERS");
    static EVENTS = Symbol("EVENTS");
    static MAPS = Symbol("MAPS");
    static PINS = Symbol("PINS");
}

dataOptionsMap.set(dataOptions.CHARACTERS, {table: "Characters", filter: "WorldID"});
dataOptionsMap.set(dataOptions.EVENTS, {table: "Events", filter: "WorldID"});
dataOptionsMap.set(dataOptions.MAPS, {table: "Maps", filter: "WorldID"});
dataOptionsMap.set(dataOptions.PINS, {table: "Pins", filter: "MapID"});

export async function getData(option, filterValue) {
    const tmp = dataOptionsMap.get(option);
    if(!tmp) {console.log("enum not working!");}
    const {data, error} = await supabase.from(tmp.table).select("*").eq(tmp.filter, filterValue);

    if(error) {
        console.log("failed to retrieve data: " + error);
    } else {
        return data;
    }
}

export async function getCurrentUserData() {
    
    if(localStorage.getItem("isLoggedIn") === "false") {
        return null;
    }

    const {data, error} = await supabase.from("User").select("*").eq("email", localStorage.getItem("email")).single();
    //const {data, error} = await supabase.from("Users").select("*").eq("email", "Ben@Yahoo.com").single();

    if(error) {
        console.log("Failed to retrieve user's data: " + error.message);
        return null;
    } else {
        return data;
    }
}

export async function swapLike(isLiked, worldID, userID) {

    console.log(`isLiked: ${isLiked}  worldID: ${worldID}  userID: ${userID}`);

    const {data: arrayData, error: arrayError} = await supabase
    .from("Worlds")
    .select("likes_arr")
    .eq("id", worldID)
    .single();

    console.log(`here 1: ${typeof arrayData.likes_arr}`);
    console.log(`Before: ${arrayData.likes_arr}  After: ${arrayData.likes_arr.concat(userID)}`);

    if(arrayError) {
        console.log("failed to pull data for world: " + arrayError.message);
        return false;
    }

    console.log("here 2");

    let updatedArr = null;


    if(isLiked) {
        updatedArr = arrayData.likes_arr.concat(userID);
    } else {
        if(arrayData.likes_arr.includes(userID)) {
            console.log(`index: ${arrayData.likes_arr.indexOf(userID)}`);
            updatedArr = arrayData.likes_arr.toSpliced(arrayData.likes_arr.indexOf(userID), 1);
            console.log(`updatedArr: ${updatedArr}`);
        } else {
            return;
        }
    }

    const {error: updateError} = await supabase
    .from("Worlds")
    .update({likes_arr: updatedArr})
    .eq("id", worldID);

    if(updateError) {
        console.log("Failed to change like: " + updateError.message);
        return false;
    }

    console.log("here 3");

    return true;
}