from user.database import Base
from sqlalchemy import Column, INTEGER, String

class User(Base):
    __tablename__='user'

    id = Column(INTEGER, primary_key=True, index=True)
    name= Column(String)
    password= Column(String)
    email= Column(String)
    phone= Column(String)