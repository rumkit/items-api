import { Item } from "../Models/Item"

const url = "http://localhost:5000/Api/"

export const getItems = () => apiGet<Item[]>(url + "items");

export const deleteItem = (item: Item) => api(url + `item?id=${item.id}`, { method: "DELETE" } );

function apiGet<T>(url: string): Promise<T> {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }

            return response.json()
        });
}

function api(url: string, params: RequestParams): Promise<string> {
    return fetch(url,params)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
    
                return response.text()
            });
}

interface RequestParams {
    method: string
}