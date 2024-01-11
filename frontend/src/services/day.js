import { DAYS } from "./const";
import { Day } from "./data";


export default class DayServiceMock {

    constructor() {
        this.days = [...DAYS]
    }
    
    async getDay(id) {
        const map = new Map(this.days.map(d => [d.id, d]))
        let day = map.get(id)
        day = day !== undefined ? new Day(day) : null
        return day
    }

    async getToday() {
        return new Day(this.days[0])
    }
}
