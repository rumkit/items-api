import { Item } from "../Models/Item"

const baseUrl = "http://localhost:5000/Api/"

export const itemsApi = {
    getItems : () => apiGet<Item[]>(baseUrl + "items"),
    deleteItem : (item: Item) => api(baseUrl + `item?id=${item.id}`, { method: "DELETE" } ),
    createItem : (subItemsCount: number) => api(baseUrl + `item?subItemsCount=${subItemsCount}`, { method: "POST" } )
}


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