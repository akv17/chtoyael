export class Dish {
    constructor(data) {
        this._data = data
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
        return this._data.weight
    }
}
