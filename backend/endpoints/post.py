from api import app
from components import userLogin, newUser


@app.post("/login/")
async def post_login(user_login: userLogin):
    return {'done'}


@app.post("/create_user/")
async def post_create_user(user_info: newUser):
    pass
