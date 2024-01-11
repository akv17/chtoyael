import { useLoaderData, redirect } from "react-router-dom"

import styles from "./dishes.module.css"
import Header from "../components/header/main";
import DishesDisplay from "../components/dishes/main"
import DishesService from "../services/dishes";

const service = new DishesService()


export async function dishesLoader({ request }) {
    const url = new URL(request.url)
    const query = url.searchParams.get("query")
    const dishes = await service.get(query)
    return dishes
}


export async function dishesAction({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData.entries())
    const path = request.url.split('/')
    const action = path[path.length - 1]
    if (action === "add") {
        await service.add(data)
    }
    else if (action === "edit") {
        if (data.hasOwnProperty("delete")) {
            await service.delete(data.id)
        }
        else {
            delete data.submit
            await service.update(data)
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
