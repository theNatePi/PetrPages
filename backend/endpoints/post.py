from api import app
import json
from components import userLogin, newUser, pageData, newBio, newTags, tagsSearch
from database import get_user, get_email_domain, get_password_from_user, add_new_users, add_page_with_user, set_new_page_with_user, update_bio, update_tags, get_names_with_tags, get_all_users
import requests

url = "https://globalemail.melissadata.net/v4/WEB/GlobalEmail/doGlobalEmail"


def check_email(email):
    params = {
        'id': "gxEnKiQsOnDEki3tgvSky_**nSAcwXpxhQ0PC2lXxuDAZ-**",
        'opt': "VerifyMailBox:Premium,DomainCorrection:off,WhoIs:on",
        'format': "json",
        'email': f"{email}"
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        result_dict = response.json()
        print(result_dict)
        score = int(result_dict["Records"][0]["DeliverabilityConfidenceScore"])
        return score > 20
    else:
        return False



from database import add_music, get_user, get_email_domain, get_password_from_user, add_new_users, add_page_with_user, set_new_page_with_user, update_bio, update_tags, get_names_with_tags
from fastapi import  Depends, UploadFile, File
import base64

@app.post("/login/")
async def post_login(user_login: userLogin):
    if user_login.password == get_password_from_user(user_login.username)[0][0]:
        return {0}
    else:
        return {1}

@app.post("/save_page/")
async def post_data(page_data: pageData):
    add_page_with_user(page_data.username, page_data.page_json)

@app.post("/update_bio/")
async def post_bio(bio_data: newBio):
    update_bio(bio_data.bio, bio_data.username)

@app.post("/update_tags/")
async def post_tags(tags_data: newTags):
    json_tags = json.dumps({"tags": tags_data.tags})
    update_tags(json_tags, tags_data.username)

@app.post("/search_users/")
async def post_search_results(search_tags: tagsSearch):
    results = get_names_with_tags(search_tags.tags)
    results = ','.join(list(results))
    json_result = json.dumps({"username": results})
    return {json_result}

@app.post("/get_all_users/")
async def post_all_users():
    results = get_all_users()
    results = ','.join(list(results))
    json_result = json.dumps({"username": results})
    return {json_result}
    


@app.post("/create_user/")
async def post_create_user(user_info: newUser):
    user_result = get_user(user_info.username)
    domain_result= get_email_domain(int(user_info.school_id))
    if len(user_result) != 0:
        return {0}
    elif not user_info.school_email.__contains__(domain_result[0][0]):
        return {1}
    else:
        if check_email(user_info.school_email):
            add_new_users(user_info.username, user_info.password, user_info.email, user_info.school_email, user_info.school_id)
            set_new_page_with_user(user_info.username, user_info.school_id)
            return {2}
        else:
            return {1}

    # turn it from json to dict
    # verify that username is avail
    #   if not send back 0
    # verify that school email domain == school id domain
    #   if not send back 1
    # all good
    #   send back a 2

@app.post("/add_music/")
async def post_add_music(file_upload: UploadFile):
    data = await file_upload.read()
    add_music(file_upload.filename, data)
    return {"filename": 1}
    
    