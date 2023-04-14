import { Item } from "../Models/Item"

const url = "http://localhost:5000/Api/"

export const getItems = () => api<Item[]>(url + "items")

function api<T>(url: string): Promise<T> {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })

}