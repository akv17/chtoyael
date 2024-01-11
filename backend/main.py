from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel

from db import Database, Dish

app = FastAPI()
db = Database()


@app.get('/')
async def root():
    return 'chtoyael'


@app.get('/api/dishes/get')
async def get_dishes(query: str = ''):
    rv = db.select_all(Dish)
    return rv


class AddDishBody(BaseModel):
    name: str
    protein: float
    fat: float
    carbs: float
    kcal: float


@app.post('/api/dishes/add')
async def add_dish(data: AddDishBody):
    obj = Dish(**data.model_dump())
    db.insert(obj)


class UpdateDishBody(BaseModel):
    id: int
    name: Optional[str]
    protein: Optional[float]
    fat: Optional[float]
    carbs: Optional[float]
    kcal: Optional[float]


@app.post('/api/dishes/update')
async def update_dish(data: UpdateDishBody):
    data = data.model_dump()
    id_ = data.pop('id')
    db.update(table=Dish, id_=id_, data=data)


class DeleteDishBody(BaseModel):
    id: int


@app.post('/api/dishes/delete')
async def delete_dish(data: DeleteDishBody):
    data = data.model_dump()
    id_ = data.pop('id')
    db.delete(table=Dish, id_=id_)
