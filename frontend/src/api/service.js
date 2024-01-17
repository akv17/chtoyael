import { Dish, Day, Meal } from "./data"


export default class BackendService {

    async getDishes() {
        const url = '/api/dishes/get'
        const rv = await fetch(url)
        const data = await rv.json()
        const dishes = data.dishes
        return dishes
    }

    async addDish(data) {
        data.protein = data.protein || "0"
        data.fat = data.fat || "0"
        data.carbs = data.carbs || "0"
        data.kcal = data.kcal || "0"
        const url = '/api/dishes/add' 
        await fetch(url, {
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
        await fetch(url, {
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
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    async getTodayId() {
        const url = '/api/days/todayId'
        const rv = await fetch(url)
        const id = await rv.json()
        return id
    }

    async getDay(id) {
        const url = `/api/days/get?id=${id}`
        const rv = await fetch(url)
        const data = await rv.json()
        return data
    }

    async getDays(num=1) {
        const url = `/api/days/getBatch?num=${num}`
        const rv = await fetch(url)
        const data = await rv.json()
        const days = data.days
        return days
    }

    async getDayMeals(dayId) {
        const url = `/api/days/getMeals?id=${dayId}`
        const rv = await fetch(url)
        const data = await rv.json()
        const meals = data.meals
        return meals
    }

    async addMeal(dayId, data) {
        
        function formatTime(value) {
            return parseInt(value)
        }
        
        const body = {
            day_id: dayId,
            name: data.name,
            start_hour: formatTime(data.startHour),
            start_minute: formatTime(data.startMinute),
            end_hour: formatTime(data.endHour),
            end_minute: formatTime(data.endMinute),
            dishes: JSON.parse(data.dishes)
        }
        const url = '/api/meals/add'
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    async updateMeal(id, data) {
        
        function formatTime(value) {
            return parseInt(value)
        }
        
        const dishes =  JSON.parse(data.dishes).map(d => {return {id: d.id, weight: d.weight}})
        const body = {
            id: id,
            name: data.name,
            start_hour: formatTime(data.startHour),
            start_minute: formatTime(data.startMinute),
            end_hour: formatTime(data.endHour),
            end_minute: formatTime(data.endMinute),
            dishes: dishes
        }
        const url = '/api/meals/update'
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    async deleteMeal(id) {
        const url = "/api/meals/delete"
        const body = {id: id}
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }
}
