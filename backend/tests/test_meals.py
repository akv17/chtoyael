import os
import unittest

from src.repo import Repository
from src.ctl import Controller, Meal, DishInMeal


class TestMeals(unittest.TestCase):
    _DB_PATH = os.path.join('tests', '.storage.db')

    @classmethod
    def setUpClass(cls):
        repo = Repository(cls._DB_PATH)
        cls.ctl = Controller(repo)
        # dishes = [
        #     {'name': 'oats', 'protein': 10, 'fat': 20, 'carbs': 30, 'kcal': 40},
        #     {'name': 'beef', 'protein': 100, 'fat': 200, 'carbs': 300, 'kcal': 400},
        # ]
        # for dish in dishes:
        #     cls.ctl.add_dish(**dish)
        # cls.dishes = cls.ctl.get_dishes()

    @classmethod
    def tearDownClass(cls):
        os.remove(cls._DB_PATH)
    
    def test_add(self):
        data = {
            'name': 'breakfast',
            'start_hour': 10,
            'start_minute': 0,
            'end_hour': 10,
            'end_minute': 30,
            'dishes': [],
        }
        obj = Meal(**data)
        id = self.ctl.add_meal(obj)
        meal = self.ctl.get_meal(id)
        self.assertIsNotNone(meal)
        self.assertEqual(meal.name, data['name'])
    
    def test_update(self):
        data = {
            'name': 'breakfast',
            'start_hour': 10,
            'start_minute': 0,
            'end_hour': 10,
            'end_minute': 30,
            'dishes': [],
        }
        obj = Meal(**data)
        id = self.ctl.add_meal(obj)
        meal_before = self.ctl.get_meal(id)
        update = obj.model_copy()
        update.name = 'lunch'
        self.ctl.update_meal(update)
        meal_after = self.ctl.get_meal(id)
        self.assertEqual(meal_before.name, 'breakfast')
        self.assertEqual(meal_after.name, 'lunch')

    def test_delete(self):
        data = {
            'day_id': None,
            'name': 'breakfast',
            'start_hour': 10,
            'start_minute': 0,
            'end_hour': 10,
            'end_minute': 30,
        }
        id = self.ctl.add_meal(**data)
        self.ctl.delete_meal(id)
        meal = self.ctl.get_meal(id)
        self.assertIsNone(meal)

    def _test_update_meal_dishes(self):
        dishes_data = [{'id': self.dishes[0].id, 'weight': 100}, {'id': self.dishes[1].id, 'weight': 200}]
        data = {
            'day_id': None,
            'name': 'breakfast',
            'start_hour': 10,
            'start_minute': 0,
            'end_hour': 10,
            'end_minute': 30,
        }
        id = self.ctl.add_meal(**data)
        self.ctl.update_meal_dishes(id=id, dishes=dishes_data)
        dishes = self.ctl.get_meal_dishes(id)
        self.assertEqual(len(dishes), len(dishes_data))
        for dish, dish_data in zip(dishes, dishes_data):
            self.assertEqual(dish.id, dish_data['id'])
            self.assertEqual(dish.get_weight(), dish_data['weight'])

    def test_delete_meal_dishes(self):
        dishes_data = [{'id': self.dishes[0].id, 'weight': 100}, {'id': self.dishes[1].id, 'weight': 200}]
        data = {
            'day_id': None,
            'name': 'breakfast',
            'start_hour': 10,
            'start_minute': 0,
            'end_hour': 10,
            'end_minute': 30,
        }
        id = self.ctl.add_meal(**data)
        self.ctl.update_meal_dishes(id=id, dishes=dishes_data)
        dishes_before = self.ctl.get_meal_dishes(id)
        self.ctl.delete_meal_dishes(id)
        dishes_after = self.ctl.get_meal_dishes(id)
        self.assertEqual(len(dishes_before), len(dishes_data))
        self.assertEqual(len(dishes_after), 0)

    def test_get_meal_dishes_empty(self):
        data = {
            'day_id': None,
            'name': 'breakfast',
            'start_hour': 10,
            'start_minute': 0,
            'end_hour': 10,
            'end_minute': 30,
        }
        id = self.ctl.add_meal(**data)
        dishes = self.ctl.get_meal_dishes(id)
        self.assertEqual(len(dishes), 0)
