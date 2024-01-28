from pydantic import BaseModel

class userLogin(BaseModel):
    username: str
    password: str

class pageData(BaseModel):
    username: str
    page_json: str

class newTags(BaseModel):
    username: str
    tags: str

class newUser(BaseModel):
    username: str
    email: str
    school_email: str
    password: str
    school_id: int

class newBio(BaseModel):
    username: str
    bio: str


class school(BaseModel):
    school_id: int
    name: str
    email: str
