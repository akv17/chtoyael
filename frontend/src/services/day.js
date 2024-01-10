import { DAYS } from "./const";
import { Day } from "./data";


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
