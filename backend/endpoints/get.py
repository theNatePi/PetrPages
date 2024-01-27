from components import school
from database import get_all_schools
from api import app


@app.get("/schools/")
def get_schools():
    result = get_all_schools()
    print(result)

