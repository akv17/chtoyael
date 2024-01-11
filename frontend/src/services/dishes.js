class Dish {
    constructor(data) {
        this._data = data
    }

    getId() {
        return this._data.id
    }

    getName() {
        return this._data.name
    }

    getProtein() {
        return this._data.protein
    }

    getFat() {
        return this._data.fat
    }

    getCarbs() {
        return this._data.carbs
    }

    getKcal() {
        return this._data.kcal
    }

}


export default class DishesService {
    
    async get(query=null) {
        const rv = await fetch(`/api/dishes/get?query=${query}`)
        const data = await rv.json()
        const dishes = data.map(d => {return new Dish(d)})
        return dishes
    }

    async add(data) {
        for (const prop of ["protein", "fat", "carbs", "kcal"]) {
            data[prop] = data[prop].length ? parseFloat(data[prop]) : 0.0
        }
        fetch("/api/dishes/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (!response.ok) {
                throw new Error("API error")
            }
        })
    }

    async update(data) {
        fetch("/api/dishes/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (!response.ok) {
                throw new Error("API error")
            }
        })
    }

    async delete(id) {
        const data = {id: parseInt(id)}
        console.log('DEL', data)
        fetch("/api/dishes/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (!response.ok) {
                throw new Error("API error")
            }
        })
    }
}
