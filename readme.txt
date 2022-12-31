#creating virtual env
python3 -m venv env

#activating virtual env
source env/bin/activate

#start server
uvicorn main:app --reload

pip freeze > requirements.txt

#note:
Pydantic:
All the data validation is performed under the hood by Pydantic, so you get all the benefits from it. And you know you are in good hands.

sqlalchemy: orm

