const ITEMS = [
    {
        "id": "a31dwr32",
        "name": "Гречка",
        "protein": 8.0,
        "fat": 5.0,
        "carbs": 10.0,
        "kcal": 100.0,
    },
    {
        "id": "dsf323ez",
        "name": "Говядина",
        "protein": 20.0,
        "fat": 10.0,
        "carbs": 5.0,
        "kcal": 80.0,
    },
]


export class DishesServiceMock {
    
    constructor() {
        this.items = ITEMS
    }
    
    async get(query=null) {
        await delay(500)
        const result = query === null ? this.items : this.items.filter(it => it.name.toLowerCase().startsWith(query.toLowerCase()))
        return result
    }

    add(data) {
        this.items.push(data)
    }

    update(data) {
        const id = data.id
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items[i] = data
                break
            } 
        }
    }

    delete(id) {
        this.items = [...this.items].filter(it => it.id !== id)
    }
}


async function delay(amount) {
    return new Promise((resolve) => {
        setTimeout(resolve, amount)
    })
}