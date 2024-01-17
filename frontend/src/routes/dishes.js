import { useLoaderData, redirect } from "react-router-dom"

import styles from "./dishes.module.css"
import Header from "../components/header/main";
import DishesDisplay from "../components/dishes/main"
import BackendService from "../api/service";

const service = new BackendService()


export async function dishesLoader({ request }) {
    const dishes = await service.getDishes()
    return dishes
}


export async function dishesAction({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData.entries())
    const path = request.url.split('/')
    const action = path[path.length - 1]
    if (action === "add") {
        delete data.submit
        delete data.id
        await service.addDish(data)
    }
    else if (action === "edit") {
        if (data.hasOwnProperty("delete")) {
            await service.deleteDish(data.id)
        }
        else {
            delete data.submit
            const id = data.id
            delete data.id
            await service.updateDish(id, data)
        }
    }
    return redirect('/dishes')
}


export function DishesRoute() {
    const dishes = useLoaderData()
    return (
        <div className={styles.container}>
            <Header/>
            <DishesDisplay dishes={dishes}/>
        </div>
    )
}
