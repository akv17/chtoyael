import os
import unittest

from src.repo import Repository
from src.ctl import Controller, Dish


class TestDishes(unittest.TestCase):
    _DB_PATH = os.path.join('tests', '.storage.db')

    @classmethod
    def setUpClass(cls):
        repo = Repository(cls._DB_PATH)
        cls.ctl = Controller(repo)

    @classmethod
    def tearDownClass(cls):
        os.remove(cls._DB_PATH)

    def test_add(self):
        data = {'name': 'oats', 'protein': 10, 'fat': 20, 'carbs': 30, 'kcal': 40}
        obj = Dish(**data)
        id = self.ctl.add_dish(obj)
        dish = self.ctl.get_dish(id)
        self.assertIsNotNone(dish)
        for k, v in data.items():
            self.assertEqual(v, getattr(dish, k), k)
    
    def test_get_nonexistent(self):
        res = self.ctl.get_dish('_')
        self.assertIsNone(res)

    def test_update(self):
        data = {'name': 'oats', 'protein': 10, 'fat': 20, 'carbs': 30, 'kcal': 40}
        update_data = {'protein': 100}
        obj = Dish(**data)
        id = self.ctl.add_dish(obj)
        dish_before = self.ctl.get_dish(id)
        self.ctl.update_dish(id=id, data=update_data)
        dish_after = self.ctl.get_dish(id)
        self.assertEqual(dish_before.protein, 10)
        self.assertEqual(dish_after.protein, 100)
    
    def test_delete(self):
        data = {'name': 'oats', 'protein': 10, 'fat': 20, 'carbs': 30, 'kcal': 40}
        obj = Dish(**data)
        id = self.ctl.add_dish(obj)
        self.ctl.delete_dish(id)
        dish = self.ctl.get_dish(id)
        self.assertIsNone(dish)
