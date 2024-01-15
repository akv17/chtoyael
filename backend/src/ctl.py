from typing import List, Optional

from pydantic import BaseModel
from playhouse.shortcuts import model_to_dict


class Dish(BaseModel):
    id: Optional[int] = None
    name: str
    protein: float
    fat: float
    carbs: float
    kcal: float
    weight: Optional[float] = 0.0


class DishInMeal(BaseModel):
    id: int
    weight: float


class Meal(BaseModel):
    id: Optional[int] = None
    day_id: Optional[int] = None
    name: str
    start_hour: int
    start_minute: int
    end_hour: int
    end_minute: int
    dishes: Optional[List[DishInMeal]]


class MealInDay(BaseModel):
    id: int


class Day(BaseModel):
    id: str
    name: str
    meals: List[MealInDay]


class Controller:

    def __init__(self, repo):
        self.repo = repo

    def add_dish(self, obj: Dish):
        id = self.repo.add_dish(name=obj.name, protein=obj.protein, fat=obj.fat, carbs=obj.carbs, kcal=obj.kcal)
        return id
    
    def get_dish(self, id):
        dish = self.repo.get_dish(id)
        if dish is not None:
            dish = Dish(id=dish.id, name=dish.name, protein=dish.protein, fat=dish.fat, carbs=dish.carbs, kcal=dish.kcal)
        else:
            dish = None
        return dish
    
    def update_dish(self, id, data):
        self.repo.update_dish(id=id, data=data)
    
    def delete_dish(self, id):
        self.repo.delete_dish(id)

    def add_meal(self, meal: Meal): 
        id = self.repo.add_meal(
            name=meal.name,
            start_hour=meal.start_hour,
            start_minute=meal.start_minute,
            end_hour=meal.end_hour,
            end_minute=meal.end_minute,
        )
        dishes = [{'id': d.id, 'weight': d.weight} for d in meal.dishes]
        self.repo.update_meal_dishes(id=id, dishes=dishes)
        return id

    def get_meal(self, id):
        meal = self.repo.get_meal(id)
        dishes = self.repo.get_meal_dishes(id)
        meal = model_to_dict(meal)
        meal = Meal(**meal, dishes=dishes)
        return meal

    def update_meal(self, meal: Meal):
        update_data = {
            'name': meal.name,
            'start_hour': meal.start_hour,
            'start_minute': meal.start_minute,
            'end_hour': meal.end_hour,
            'end_minute': meal.end_minute,
        }
        self.repo.update_meal(id=meal.id, data=update_data)
        update_dishes = [{'id': d.id, 'weight': d.weight} for d in meal.dishes]
        self.repo.update_meal_dishes(id=meal.id, dishes=update_dishes)

    def delete_meal(self, meal: Meal):
        self.repo.delete_meal(meal.id)
        self.repo.update_meal_dishes(id=meal.id, dishes=[])

    def get_day(): pass
