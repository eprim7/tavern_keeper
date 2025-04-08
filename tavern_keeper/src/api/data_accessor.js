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