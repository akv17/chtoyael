from typing import List

from sqlalchemy import create_engine, select, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, Session, relationship, raiseload, joinedload


class Base(DeclarativeBase):
    pass


class Dish(Base):
    __tablename__ = 'dishes'
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    protein: Mapped[float]
    fat: Mapped[float]
    carbs: Mapped[float]
    kcal: Mapped[float]
    meals: Mapped[List['MealToDishes']] = relationship(cascade='all, delete-orphan')

    def __repr__(self):
        return f'Dish(id={self.id}, name={self.name})'


class MealToDishes(Base):
    __tablename__ = 'meal_to_dishes'
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    weight: Mapped[float]
    meal_id: Mapped[int] = mapped_column(ForeignKey('meals.id'))
    dish_id: Mapped[int] = mapped_column(ForeignKey('dishes.id'))


class Meal(Base):
    __tablename__ = 'meals'
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    day_id: Mapped[int] = mapped_column(ForeignKey('days.id'))
    day: Mapped['Day'] = relationship(back_populates='meals')
    name: Mapped[str]
    start_hour: Mapped[int]
    start_minute: Mapped[int]
    end_hour: Mapped[int]
    end_minute: Mapped[int]
    dishes: Mapped[List['MealToDishes']] = relationship(cascade='all, delete-orphan')

    def __repr__(self):
        return f'Meal(id={self.id} name={self.name})'


class Day(Base):
    __tablename__ = 'days'
    id: Mapped[str] = mapped_column(primary_key=True, unique=True)
    meals: Mapped[List['Meal']] = relationship(back_populates='day', cascade='all, delete-orphan')

    def __repr__(self):
        return f'Day(id={self.id})'


class Database:

    def __init__(self):
        self.engine = create_engine("sqlite:///data.db", echo=False)
        Base.metadata.create_all(self.engine)

    def select_batch(self, table, ids, joined=False):
        with Session(self.engine) as session:
            opts = [joinedload('*')] if joined else []
            rv = session.query(table).options(opts).where(table.id.in_(ids)).all()
            return rv

    def select_one(self, table, id_, joined=False):
        with Session(self.engine) as session:
            opts = [joinedload('*')] if joined else []
            rv = session.query(table).options(opts).where(table.id == id_).first()
            return rv

    def select_all(self, table, joined=False):
        with Session(self.engine) as session:
            opts = [joinedload('*')] if joined else []
            rv = session.query(table).options(opts).all()
            return rv

    def insert(self, obj):
        with Session(self.engine) as session:
            session.add(obj)
            session.commit()
    
    def update(self, table, id_, data):
        with Session(self.engine) as session:
            session.query(table).filter(table.id == id_).update(data)
            session.commit()

    def delete(self, table, id_):
        with Session(self.engine) as session:
            session.query(table).filter(table.id == id_).delete()
            session.commit()
