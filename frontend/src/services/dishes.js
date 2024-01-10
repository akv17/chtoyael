import { DISHES } from "./const"
import { Dish } from "./data"


export default class DishesServiceMock {
    
    constructor() {
        this._dishes = [...DISHES]
    }
    
    async get(query=null) {
        await delay(100)
        const res = query === null ? this._dishes : this._dishes.filter(it => it.name.toLowerCase().startsWith(query.toLowerCase()))
        const dishes = res.map(d => {return new Dish(d)}) 
        return dishes
    }

    add(data) {
        this._dishes.push(data)
    }

    update(data) {
        const id = data.id
        for (let i = 0; i < this._dishes.length; i++) {
            if (this._dishes[i].id === id) {
                this._dishes[i] = data
                break
            } 
        }
    }

    delete(id) {
        this._dishes = [...this._dishes].filter(it => it.id !== id)
    }
}


async function delay(amount) {
    return new Promise((resolve) => {
        setTimeout(resolve, amount)
    })
}