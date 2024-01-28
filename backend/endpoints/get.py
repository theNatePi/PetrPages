from components import school
from database import get_all_schools, get_all_pages, get_school_from_user, get_data_from_user, get_pages_with_tags, load_page_with_user
from api import app
import json
import requests


#url = "https://globalemail.melissadata.net/v4/WEB/GlobalEmail/doGlobalEmail"



# # Make a GET request using the requests library
# response = requests.get(url, params=params)

# def check_email(email):
#     params = {
#         'id': "gxEnKiQsOnDEki3tgvSky_**nSAcwXpxhQ0PC2lXxuDAZ-**",
#         'opt': "VerifyMailBox:Premium,DomainCorrection:off,WhoIs:on",
#         'format': "json",
#         'email': f"{email}"
#     }
#     response = requests.get(url, params=params)
#     if response.status_code == 200:
#         result = response.json()
#         result_dict = json.loads(result)
#         score = int(result_dict["Records"]["DeliverabilityConfidenceScore"])
#         return score > 30
#     else:
#         return False

@app.get("/schools/")
def get_schools():
    result = get_all_schools()
    return_data = []
    for school in result:
        school_data = {
            "id": school[0],
            "name": school[1],
            "email_domain": school[2]
        }
        return_data.append(school_data)
    json_response = json.dumps(return_data)
    return {json_response}


# @app.get("/pages/")
# def get_pages():
#     result = get_all_pages()
#     print(result)


@app.get("/pages/")
def get_pages(tag_name: str, school_id: int):
    result = get_pages_with_tags(tag_name, school_id)
    response = []
    for page in result:
        response.append({
            "id": page[0],
            "pages": page[1],
            "school_id": page[2]
        })
    response = json.dumps(response)
    return {response}

@app.get("/load_page/")
def load_page(username: str):
    result = load_page_with_user(username)
    
    return {result[0]}

@app.get("/get_page/")
def get_page(username:str):
    result = get_data_from_user(username)
    return_data = []
    for page in result:
        page_data = {
            "name" : username,
            "bio" : page[0], 
            "tags" : page[1],
            "page content": page[2],
            "community ids": page[3],
            "likes": page[4]
            }
        return_data.append(page_data)
    json_response = json.dumps(return_data)
    return {json_response}

@app.get("/page/")
def get_user_page(username:str, school_id:int):
    # verify usernmae is in current school id
    username_school_id = get_school_from_user(username)[0][0]
    if (username_school_id != school_id):
        return {"404 NOT FOUND"}
    else:
        result = get_data_from_user(username)
        return_data = []
        for page in result:
            page_data = {
                "name" : username,
                "bio" : page[0], 
                "tags" : page[1],
                "page content": page[2],
                "community ids": page[3],
                "likes": page[4]

            }
            return_data.append(page_data)
        json_response = json.dumps(return_data)
        return {json_response}
    # bio, tags, page content, communities, likes



