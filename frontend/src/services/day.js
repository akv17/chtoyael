import { DAYS } from "./data";


export default class DayServiceMock {

    constructor() {
        this.days = [...DAYS]
    }
    
    async getDay(id) {

    }

    async getToday() {
        return new Day(this.days[0])
    }
}


class Day {
    constructor(data) {
        this._data = data
    }

    getName() {
        return this._data.timestamp.dayName
    }

    getDateString() {
        return `${this._data.timestamp.day}.${this._data.timestamp.month}.${this._data.timestamp.year}`
    }

    getMeals() {
        return this._data.meals.map(m => {return new Meal(m)})
    }

    getParamTotal(name) {
        let accum = 0
        for (const meal of this._data.meals) {
            for (const item of meal.items) {
                accum += item[name]
            }
        }
        return accum
    }

    getWeightTotal() {
        let accum = 0
        for (const meal of this._data.meals) {
            for (const item of meal.items.filter(it => it.name !== "Вода")) {
                accum += item.weight
            }
        }
        return accum
    }

    getWaterTotal() {
        let accum = 0
        for (const meal of this._data.meals) {
            for (const item of meal.items.filter(it => it.name === "Вода")) {
                accum += item.weight
            }
        }
        return accum
    }
}


class Meal {
    
    constructor(data) {
        this._data = data

    }

    getName() {
        return this._data.name
    }

    getTimeStartString() {
        return `${this._data.start.hour}:${this._data.start.minute}`
    }

    getTimeEndString() {
        return `${this._data.end.hour}:${this._data.end.minute}`
    }

    getParamTotal(name) {
        let accum = 0
        for (const item of this._data.items) {
            accum += item[name]
        }
        return accum
    }

    getWeightTotal() {
        let accum = 0
        for (const item of this._data.items.filter(it => it.name !== "Вода")) {
            accum += item.weight
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

    getDishes() {
        return this._data.items.map(it => {return new Dish(it)})
    }
}


class Dish {
    constructor(data) {
        this._data = data
    }

    getName() {
        return this._data.name
    }

    getImage() {
        return null
    }

    getWeight() {
        return this._data.weight
    }
}