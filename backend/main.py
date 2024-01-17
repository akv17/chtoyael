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


def _create_day_id_from_datetime(ts):
    day = str(ts.day) if ts.day >= 10 else f'0{ts.day}'
    month = str(ts.month) if ts.month >= 10 else f'0{ts.month}'
    year = str(ts.year)
    id_ = f'{day}-{month}-{year}'
    return id_

def _create_datetime_from_day_id(id):
    day, month, year = id.split('-')
    day = int(day.lstrip('0').strip())
    month = int(month.lstrip('0').strip())
    year = int(year.strip())
    ts = datetime(day=day, month=month, year=year)
    return ts


@app.get('/api/days/todayId')
def get_today_id():
    ts = datetime.now()
    id_ = _create_day_id_from_datetime(ts)
    return id_


class DayTimestamp(BaseModel):
    day_name: str
    day: int
    month: int
    year: int


class Day(BaseModel):
    id: str
    timestamp: DayTimestamp


@app.get('/api/days/get', response_model=Day)
async def get_day(id: str):
    day = _get_or_create_day(id)
    ts = DayTimestamp(
        day_name=day.name,
        day=day.get_day_string(),
        month=day.get_month_string(),
        year=day.get_year_string(),
    )
    day = Day(id=day.id, timestamp=ts)
    return day


class GetDaysResponse(BaseModel):
    days: List[Day]


@app.get('/api/days/getBatch', response_model=GetDaysResponse)
async def get_day(num: int):
    now = datetime.now()
    timestamps = [now]
    for i in range(num - 1):
        cur_ts = now - timedelta(days=i+1)
        timestamps.append(cur_ts)
    ids = [_create_day_id_from_datetime(t) for t in timestamps]
    days = []
    for id in ids:
        day = _get_or_create_day(id)
        ts = DayTimestamp(
            day_name=day.name,
            day=day.get_day_string(),
            month=day.get_month_string(),
            year=day.get_year_string(),
        )
        day = Day(id=day.id, timestamp=ts)
        days.append(day)
    rv = GetDaysResponse(days=days)
    return rv


class DayMealDish(BaseModel):
    id: int
    weight: float


class DayMeal(BaseModel):
    id: int
    name: str
    start_hour: int
    start_minute: int
    end_hour: int
    end_minute: int
    dishes: List[DayMealDish]


class GetDayMealsResponse(BaseModel):
    meals: List[DayMeal]


@app.get('/api/days/getMeals', response_model=GetDayMealsResponse)
async def get_day_meals(id: str):
    meals_ids = [rec.meal_id for rec in db.MealToDay.select().where(db.MealToDay.day_id == id)]
    meals = db.Meal.select().where(db.Meal.id.in_(meals_ids))
    meals_out = []
    for meal in meals:
        dishes = db.DishToMeal.select().where(db.DishToMeal.meal_id == meal.id)
        dishes = [DayMealDish(id=d.dish_id.id, weight=d.weight)  for d in dishes]
        meal = DayMeal(
            id=meal.id,
            name=meal.name,
            start_hour=meal.start_hour,
            start_minute=meal.start_minute,
            end_hour=meal.end_hour,
            end_minute=meal.end_minute,
            dishes=dishes,
        )
        meals_out.append(meal)
    rv = GetDayMealsResponse(meals=meals_out)
    return rv


def _get_or_create_day(id):
    try:
        day = db.Day.select().where(db.Day.id == id).get()
    except Exception as e:
        ts = _create_datetime_from_day_id(id)
        name = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][ts.weekday()]
        day = db.Day.create(id=id, name=name)
    return day


class DishInMeal(BaseModel):
    id: int
    weight: float


class AddMealBody(BaseModel):
    day_id: str
    name: str
    start_hour: int
    start_minute: int
    end_hour: int
    end_minute: int
    dishes: List[DishInMeal]


@app.post('/api/meals/add')
async def add_meal(data: AddMealBody):
    meal = db.Meal.create(
        name=data.name,
        start_hour=data.start_hour,
        start_minute=data.start_minute,
        end_hour=data.end_hour,
        end_minute=data.end_minute,
    )
    db.MealToDay.create(day_id=data.day_id, meal_id=meal.id)
    for dish in data.dishes:
        db.DishToMeal.create(dish_id=dish.id, meal_id=meal.id, weight=dish.weight)


class UpdateMealBody(BaseModel):
    id: int
    name: str
    start_hour: int
    start_minute: int
    end_hour: int
    end_minute: int
    dishes: List[DishInMeal]


@app.post('/api/meals/update')
async def update_meal(data: UpdateMealBody):
    meal = db.Meal.select().where(db.Meal.id == data.id).get()
    meal.name = data.name
    meal.start_hour = data.start_hour
    meal.start_minute = data.start_minute
    meal.end_hour = data.end_hour
    meal.end_minute = data.end_minute
    meal.save()
    dish_recs = db.DishToMeal.select().where(db.DishToMeal.meal_id == data.id)
    for rec in dish_recs:
        rec.delete_instance()
    for dish in data.dishes:
        db.DishToMeal.create(dish_id=dish.id, meal_id=data.id, weight=dish.weight)


class DeleteMealBody(BaseModel):
    id: int


@app.post('/api/meals/delete')
async def delete_meal(data: DeleteMealBody):
    id = data.id
    meal = db.Meal.select().where(db.Meal.id == id).get()
    meal.delete_instance()
    dish_recs = db.DishToMeal.select().where(db.DishToMeal.meal_id == id)
    for rec in dish_recs:
        rec.delete_instance()
    day_recs = db.MealToDay.select().where(db.MealToDay.meal_id == id)
    for rec in day_recs:
        rec.delete_instance()
