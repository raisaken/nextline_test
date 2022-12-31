from fastapi import FastAPI, Depends
from . import schemas,models
from .database import engine
from sqlalchemy.orm import Session
app = FastAPI()

models.Base.metadata.create_all(bind=engine)

def get_db():
    db=Session()
    try:
        yield db
    finally:
        db.close()



@app.post('/user')
async def create(request: schemas.User, db:Session= Depends(get_db)):
    new_user= models.User(name=request.name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.get('/user')
def all(db:Session=Depends(get_db)):
    users=db.query(models.User).all()
    return users
