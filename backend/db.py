from sqlalchemy import create_engine, select
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, Session


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

    def __repr__(self):
        return f'Dish(id={self.id}, name={self.name})'


class Meal: pass


class Day: pass


class Database:

    def __init__(self):
        self.engine = create_engine("sqlite:///data.db", echo=True)
        Base.metadata.create_all(self.engine)
    
    def select_all(self, table):
        session = Session(self.engine)
        stmt = select(table)
        res = list(session.scalars(stmt))
        return res

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
