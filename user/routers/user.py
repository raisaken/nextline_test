from fastapi import APIRouter

router = APIRouter

@router.get('/')
async def get_all_user():
    return {"user":'all'}