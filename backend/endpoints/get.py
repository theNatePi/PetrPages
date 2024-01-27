from components import school
from database import get_all_schools
from api import app
import json


@app.get("/schools/")
def get_schools():
    result = get_all_schools()
    return_json = {}
    for school in result:
        return_json[int(school[0])] = school[1]
    
    return_json = json.dumps(return_json)
    print(return_json)
    return {return_json}

