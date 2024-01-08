import { useLoaderData, redirect } from "react-router-dom"

import styles from "./dishes.module.css"
import Header from "../components/header/main";
import DishesDisplay from "../components/dishes/main"
import { DishesServiceMock } from "../services/dishes";

const service = new DishesServiceMock()


export async function dishesLoader({ request }) {
    const url = new URL(request.url)
    const query = url.searchParams.get("query")
    const items = await service.get(query)
    return items
}


export async function dishesAction({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData.entries())
    const path = request.url.split('/')
    const action = path[path.length - 1]
    if (action === "add") {
        service.add(data)
    }
    else if (action === "edit") {
        if (data.hasOwnProperty("delete")) {
            service.delete(data.id)
        }
        else {
            service.update(data)
        }
    }
    return redirect('/dishes')
}


export function DishesRoute() {
    const items = useLoaderData()
    return (
        <div className={styles.container}>
            <Header/>
            <DishesDisplay items={items}/>
        </div>
    )
}
