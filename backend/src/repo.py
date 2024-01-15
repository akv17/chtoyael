from peewee import (
    SqliteDatabase,
    Model,
    AutoField,
    CharField,
    IntegerField,
    ForeignKeyField,
    DatabaseProxy,
    FloatField
)

DB_PROXY = DatabaseProxy()


class Dish(Model):
    _weight = 0
    
    id = AutoField()
    name = CharField()
    protein = FloatField()
    fat = FloatField()
    carbs = FloatField()
    kcal = FloatField()

    class Meta:
        database = DB_PROXY
    
    def set_weight(self, value):
        self._weight = value
    
    def get_weight(self):
        return self._weight


class Meal(Model):
    id = AutoField()
    name = CharField()
    start_hour = IntegerField()
    start_minute = IntegerField()
    end_hour = IntegerField()
    end_minute = IntegerField()

    class Meta:
        database = DB_PROXY


class Day(Model):
    id = CharField(primary_key=True, unique=True)
    name = CharField()
    
    class Meta:
        database = DB_PROXY


class MealToDay(Model):
    id = AutoField()
    day_id = ForeignKeyField(Day)
    meal_id = ForeignKeyField(Meal)
    
    class Meta:
        database = DB_PROXY


class DishToMeal(Model):
    id = AutoField()
    weight = FloatField()
    dish_id = ForeignKeyField(Dish)
    meal_id = ForeignKeyField(Meal)
        
    class Meta:
        database = DB_PROXY


class Database:
    Dish = Dish
    Meal = Meal
    Day = Day
    MealToDay = MealToDay
    DishToMeal = DishToMeal
    _TABLES = (Dish, Meal, Day, MealToDay, DishToMeal)
    
    def __init__(self, fp=None):
        self.fp = fp or '.storage.db'
        self.db = SqliteDatabase(self.fp)
        self.db.connect()
        DB_PROXY.initialize(self.db)
        self.db.create_tables(self._TABLES)


class _Repository:
    _TABLES = (Dish, Meal, Day, MealToDay, DishToMeal)
    
    def __init__(self, fp=None):
        self.fp = fp or '.storage.db'
        self.db = SqliteDatabase(self.fp)
        self.db.connect()
        DB_PROXY.initialize(self.db)
        self.db.create_tables(self._TABLES)

    def get_dish(self, id):
        try:
            dish = Dish.select().where(Dish.id == id).get()
            return dish
        except Exception as e:
            return None

    def get_dishes(self):
        dishes = list(Dish.select())
        return dishes
    
    def add_dish(self, name, protein, fat, carbs, kcal):
        with self.db.atomic():
            dish = Dish.create(name=name, protein=protein, fat=fat, carbs=carbs, kcal=kcal)
            return dish.id

    def update_dish(self, id, data):
        with self.db.atomic():
            dish = self.get_dish(id)
            if dish is None:
                return None
            for k, v in data.items():
                setattr(dish, k, v)
            dish.save()
    
    def delete_dish(self, id):
        with self.db.atomic():
            dish = self.get_dish(id)
            if dish is None:
                return None
            dish.delete_instance()

    def add_meal(
        self,
        name,
        start_hour,
        start_minute,
        end_hour,
        end_minute,
    ):
        with self.db.atomic():
            meal = Meal.create(
                name=name,
                start_hour=start_hour,
                start_minute=start_minute,
                end_hour=end_hour,
                end_minute=end_minute,
            )
            return meal.id

    def get_meal(self, id):
        try:
            meal = Meal.select().where(Meal.id == id).get()
            return meal
        except Exception as e:
            return None
        
    def update_meal(self, id, data):
        with self.db.atomic():
            meal = self.get_meal(id)
            if meal is None:
                return None
            for k, v in data.items():
                setattr(meal, k, v)
            meal.save()
    
    def delete_meal(self, id):
        with self.db.atomic():
            meal = self.get_meal(id)
            meal.delete_instance()
    
    def update_meal_dishes(self, id, dishes):
        meal_id = id
        with self.db.atomic():
            cur_recs = DishToMeal.select().where(DishToMeal.meal_id == meal_id)
            for rec in cur_recs:
                rec.delete_instance()
            for dish_data in dishes:
                DishToMeal.create(weight=dish_data['weight'], dish_id=dish_data['id'], meal_id=meal_id)

    def get_meal_dishes(self, id):
        meal_id = id
        recs = DishToMeal.select().where(DishToMeal.meal_id == meal_id)
        dishes = []
        for rec in recs:
            dish = Dish.select().where(Dish.id == rec.dish_id).get()
            dish.set_weight(rec.weight)
            dishes.append(dish)
        return dishes
    
    def delete_meal_dishes(self, id):
        self.update_meal_dishes(id=id, dishes=[])
    
    def get_day(self, id): pass
    def add_day_meal(self, id): pass
    def update_day_meal(self, id): pass
    def delete_day_meal(self, id): pass
