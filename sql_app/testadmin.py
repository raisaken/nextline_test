from sqladmin import Admin, ModelView
from sqladmin.authentication import AuthenticationBackend
from sqlalchemy import create_engine
from starlette.applications import Starlette
from starlette.requests import Request
from .models import SuperUser
from sqladmin import BaseView, expose

# Base = declarative_base()
engine = create_engine(
    "sqlite:///example.db",
    connect_args={"check_same_thread": False},
)

class CustomAdmin(BaseView):
    name = "Custom Page"
    icon = "fa-solid fa-chart-line"

    @expose("/custom", methods=["GET"])
    def test_page(self, request: Request):
        print(request)
        return self.templates.TemplateResponse(
            "custom.html",
            context={"request": request},
        )

class MyBackend(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username, password = form["username"], form["password"]
        print(username,'username')
        request.session.update({"token": "..."})
        return True

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        token = request.session.get("token")

        if not token:
            return False

        # Check the token
        return True



app = Starlette()
authentication_backend = MyBackend(secret_key="...")
admin = Admin(app=app, engine=engine, authentication_backend=authentication_backend)


class UserAdmin(ModelView, model=SuperUser):
    def is_visible(self, request: Request) -> bool:
        return True

    def is_accessible(self, request: Request) -> bool:
        return True


# admin.add_view(UserAdmin)
