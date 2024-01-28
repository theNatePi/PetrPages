from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from components import userLogin, newUser

app = FastAPI()

# Configure CORS
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)