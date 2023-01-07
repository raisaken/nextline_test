from fastapi import  FastAPI
from sqladmin import  ModelView
from .models import User, Item
from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from starlette.applications import Starlette
from sqladmin import Admin
from .database import engine

app = FastAPI()

class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.email, User.is_active]

class ItemAdmin(ModelView, model=Item):
    column_list = [Item.id, Item.title, Item.description, Item.owner_id]

class MyBackend(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username, password = form["username"], form["password"]
        request.session.update({"token": "..."})
        return True

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        return "token" in request.session

app = Starlette()
authentication_backend = MyBackend(secret_key="...")
admin = Admin(app=app, engine=engine, authentication_backend=authentication_backend)


class UserAdmin(ModelView, model=User):
    def is_visible(self, request: Request) -> bool:
        return True

    def is_accessible(self, request: Request) -> bool:
        return True
