functions:

- Item
  - create
  - update
  - modify
  - get


- Meal
  - create
  - update
  - modify
  - get
  - addItem
  - deleteItem
  - updateItem

- Day
  - getCurrent
  - getPreviousDays


Model

    createDay
    ...


Storage1

    get
    create
    update
    delete
    link(what, where)
    unlink(what, where)


data:
    - Item:
        - name
        - image
        - protein
        - fat
        - carbon
        - kcal

    - Meal:
        - itemsj
        - weight
        - start
        - end

    - Day:
        - mealsj


