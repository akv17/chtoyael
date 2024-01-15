from datetime import datetime, timedelta
from typing import Optional, List, Union

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from src.repo import Database

app = FastAPI()
db = Database()


@app.get('/')
async def root():
    return 'chtoyael'


class Dish(BaseModel):
    id: int
    name: str
    protein: Union[float, str]
    fat: Union[float, str]
    carbs: Union[float, str]
    kcal: Union[float, str]


class GetDishesResponse(BaseModel):
    dishes: List[Dish]


@app.get('/api/dishes/get', response_model=GetDishesResponse)
async def get_dishes(query: str = ''):
    dishes = [
        Dish(
            id=d.id,
            name=d.name,
            protein=d.protein,
            fat=d.fat,
            carbs=d.carbs,
            kcal=d.kcal,
        )
        for d in  db.Dish.select()
    ]
    rv = GetDishesResponse(dishes=dishes)
    return rv


class AddDishBody(BaseModel):
    name: str
    protein: float
    fat: float
    carbs: float
    kcal: float


@app.post('/api/dishes/add')
async def add_dish(data: AddDishBody):
    db.Dish.create(**data.model_dump())


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
    id = data.pop('id')
    dish = db.Dish.select().where(db.Dish.id == id).get()
    if dish is None:
        raise HTTPException(status_code=400, detail=f'dish not found')
    for k, v in data.items():
        setattr(dish, k, v)
    dish.save()


class DeleteDishBody(BaseModel):
    id: int


@app.post('/api/dishes/delete')
async def delete_dish(data: DeleteDishBody):
    data = data.model_dump()
    id = data.pop('id')
    dish = db.Dish.select().where(db.Dish.id == id).get()
    if dish is None:
        raise HTTPException(status_code=400, detail=f'dish not found')
    dish.delete_instance()


@app.get('/api/day/todayId')
def get_today_id():
    ts = datetime.now()
    day = str(ts.day) if ts.day >= 10 else f'0{ts.day}'
    month = str(ts.month) if ts.month >= 10 else f'0{ts.month}'
    year = str(ts.year)
    id_ = f'{day}-{month}-{year}'
    return id_


@app.get('/api/day/get')
def get_day(id: str):
    pass


class DayMealDish(BaseModel):
    id: int
    weight: float


class AddDayMealBody(BaseModel):
    day_id: str
    name: str
    start_hour: int
    start_minute: int
    end_hour: int
    end_minute: int
    dishes: List[DayMealDish]


@app.post('/api/meal/add')
def add_day_meal(data):
    dishes = db.select_batch(Dish, data.dishes)
    meal = Meal(
        name=data.name,
    )


@app.post('/api/meal/update')
def update_date_meal(data): pass


@app.post('/api/meal/delete')
def delete_day_meal(data): pass
