from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from components import userLogin, newUser

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # Assuming your frontend is running on this port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)