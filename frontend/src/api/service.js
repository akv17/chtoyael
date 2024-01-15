import { Dish } from "./data"


export default class BackendService {

    async getDishes(query=null) {
        const url = query !== null ? `/api/dishes/get?query=${query}` : '/api/dishes/get'
        const rv = await fetch(url)
        const data = await rv.json()
        console.log(data)
        const dishes = data.dishes.map(d => {return new Dish(d)})
        return dishes
    }

    async addDish(data) {
        data.protein = data.protein || "0"
        data.fat = data.fat || "0"
        data.carbs = data.carbs || "0"
        data.kcal = data.kcal || "0"
        const url = '/api/dishes/add' 
        const rv = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    async updateDish(id, data) {
        const url = '/api/dishes/update' 
        const body = {id: id, ...data}
        const rv = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    async deleteDish(id) {
        const url = '/api/dishes/delete' 
        const body = {id: id}
        const rv = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }
}
