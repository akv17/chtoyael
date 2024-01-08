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
        this.data = data
    }

    getName() {
        return this.data.timestamp.dayName
    }

    getDateString() {
        return `${this.data.timestamp.day}.${this.data.timestamp.month}.${this.data.timestamp.year}`
    }

    getNumMeals() {
        return this.data.meals.length
    }

    getParamTotal(name) {
        let accum = 0
        for (const meal of this.data.meals) {
            for (const item of meal.items) {
                // accum += item.getAttribute(name)
                accum += item[name]
            }
        }
        return accum
    }

    getWeightTotal() {
        let accum = 0
        for (const meal of this.data.meals) {
            for (const item of meal.items.filter(it => it.name !== "Вода")) {
                accum += item.weight
            }
        }
        return accum
    }

    getWaterTotal() {
        let accum = 0
        for (const meal of this.data.meals) {
            for (const item of meal.items.filter(it => it.name === "Вода")) {
                accum += item.weight
            }
        }
        return accum
    }
}


const DAYS = [
    {
        "id": "05-01-2024",
        "timestamp": {
            "dayName": "Ср",
            "day": 5,
            "month": 1,
            "year": 2024,
        },
        "meals": [
            {
                "name": "Завтрак",
                "start": {
                    "hour": "12",
                    "minute": "0",
                },
                "end": {
                    "hour": "12",
                    "minute": "30",
                },
                "items": [
                    {
                        "id": "",
                        "protein": 5.0,
                        "fat": 8.0,
                        "carbs": 10.0,
                        "kcal": 10.0,
                        "weight": 100
                    },
                    {
                        "id": "",
                        "protein": 5.0,
                        "fat": 8.0,
                        "carbs": 10.0,
                        "kcal": 10.0,
                        "weight": 50
                    },
                ]
            }
        ]
    },
    {
        "id": "04-01-2024",
        "timestamp": {
            "dayName": "Вт",
            "day": 4,
            "month": 1,
            "year": 2024,
        },
        "meals": [
            {
                "name": "Завтрак",
                "start": {
                    "hour": "11",
                    "minute": "0",
                },
                "end": {
                    "hour": "11",
                    "minute": "30",
                },
                "items": [
                    {
                        "id": "",
                        "protein": 5.0,
                        "fat": 8.0,
                        "carbs": 10.0,
                        "kcal": 10.0,
                        "weight": 100
                    },
                    {
                        "id": "",
                        "protein": 5.0,
                        "fat": 8.0,
                        "carbs": 10.0,
                        "kcal": 10.0,
                        "weight": 50
                    },
                ]
            }
        ]
    },
    {
        "id": "03-01-2024",
        "timestamp": {
            "dayName": "Пн",
            "day": 3,
            "month": 1,
            "year": 2024,
        },
        "meals": [
            {
                "name": "Завтрак",
                "start": {
                    "hour": "10",
                    "minute": "0",
                },
                "end": {
                    "hour": "10",
                    "minute": "30",
                },
                "items": [
                    {
                        "id": "",
                        "protein": 5.0,
                        "fat": 8.0,
                        "carbs": 10.0,
                        "kcal": 10.0,
                        "weight": 100
                    },
                    {
                        "id": "",
                        "protein": 5.0,
                        "fat": 8.0,
                        "carbs": 10.0,
                        "kcal": 10.0,
                        "weight": 50
                    },
                ]
            }
        ]
    },
]