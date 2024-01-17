export class Dish {
    constructor(data, weight=null) {
        this._data = data
        this._weight = weight
    }

    getId() {
        return this._data.id
    }

    getName() {
        return this._data.name
    }

    getImage() {
        return null
    }

    getStat(name) {
        return this._data[name]
    }

    getWeight() {
        return this._weight
    }
}


export class Day {
    constructor(data) {
        this._data = data
    }

    getId() {
        return this._data.id
    }

    getName() {
        return this._data.timestamp.day_name
    }

    getDateString() {
        return `${this._data.timestamp.day}.${this._data.timestamp.month}.${this._data.timestamp.year}`
    }
}


export class Meal {
    
    constructor(data, dishes) {
        this._data = data
        this._dishes = dishes
    }

    getName() {
        return this._data.name
    }

    getTimeStartString() {
        return `${this._data.start_hour}:${this._data.start_minute}`
    }

    getTimeEndString() {
        return `${this._data.end_hour}:${this._data.end_minute}`
    }

    getDishes() {
        return this._dishes
    }

    getStatTotal(name) {
        let accum = 0
        for (const dish of this._dishes) {
            accum += dish.getStat(name)
        }
        return accum
    }

    getWeightTotal() {
        let accum = 0
        for (const dish of this._dishes.filter(d => d.name !== "Вода")) {
            accum += dish.getWeight() || 0
        }
        return accum
    }

    getWaterTotal() {
        let accum = 0
        for (const item of this._data.items.filter(it => it.name === "Вода")) {
            accum += item.weight
        }
        return accum
    }
}