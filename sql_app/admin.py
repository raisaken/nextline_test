from fastapi import  FastAPI
from sqladmin import  ModelView
from .models import User, Item

app = FastAPI()

class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.email, User.is_active]

class ItemAdmin(ModelView, model=Item):
    column_list = [Item.id, Item.title, Item.description, Item.owner_id]

