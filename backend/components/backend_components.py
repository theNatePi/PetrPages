from pydantic import BaseModel

class userLogin(BaseModel):
    username: str
    password: str

class newUser(BaseModel):
    username: str
    email: str
    school_email: str
    password: str
    school_id: int

class school(BaseModel):
    school_id: int
    name: str
    email: str
