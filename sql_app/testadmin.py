from sqladmin import Admin, ModelView
from sqladmin.authentication import AuthenticationBackend
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from starlette.applications import Starlette
from starlette.requests import Request


# Base = declarative_base()
engine = create_engine(
    "sqlite:///example.db",
    connect_args={"check_same_thread": False},
)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)


# Base.metadata.create_all(engine)


class MyBackend(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
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


admin.add_view(UserAdmin)
