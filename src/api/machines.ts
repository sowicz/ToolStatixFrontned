import type { Machine } from "../types/Machine";

const API = 'http://localhost:8000';


export async function getMachines(): Promise<Machine[]>{
    const response = await fetch(`${API}/machines`);
    return response.json();
}



export async function createMachine(name: string):Promise<void> {
    await fetch(`${API}/machines`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name}),
    });
}