from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

SQL_DB_URL="sqlite:///./user.db"

engine = create_engine(SQL_DB_URL, connect_args={"check_same_thread":False})

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()

def get_db():
    db= SessionLocal()
    try:
        yield db
    finally:
        db.close()