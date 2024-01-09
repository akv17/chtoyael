import { DAYS } from "./data"


export class FeedServiceMock {
    
    constructor() {
        this.days = DAYS
    }

    async getDays(num = 2) {
        await delay(500)
        const rv = this.days.map(d => createDay(d))
        return rv
    }
}


async function delay(amount) {
    return new Promise((resolve) => {
        setTimeout(resolve, amount)
    })
}


function createDay(data) {
    return new Day(data)
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

    getNumMeals() {
        return this._data.meals.length
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
