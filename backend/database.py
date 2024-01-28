import sqlite3
import json

def get_all_schools():
    with sqlite3.connect("db.db") as con:
        result = con.execute("""SELECT * FROM schools""")
    return result.fetchall()

def get_all_tags():
    with sqlite3.connect("db.db") as con:
        result = con.execute("""SELECT * FROM tags""")
    return result.fetchall()

def get_all_users():
    with sqlite3.connect("db.db") as con:
        result = con.execute("""SELECT * FROM users""")
    return result.fetchall()

def get_user(username):
    with sqlite3.connect("db.db") as con:
        result = con.execute("""SELECT username FROM users WHERE username = ?""", (username, ))
    return result.fetchall()

def get_password_from_user(username):
    with sqlite3.connect("db.db") as con:
        result = con.execute(""" SELECT password FROM users WHERE username = ?""", (username, ))
    return result.fetchall()

def get_email_domain(school_id):
    with sqlite3.connect("db.db") as con:
        result = con.execute("""SELECT email_domain FROM schools WHERE id = ?""", (school_id, ))
    return result.fetchall()

def get_all_pages():
    with sqlite3.connect("db.db") as con:
        result = con.execute("""SELECT * FROM pages""")
    return result.fetchall()

def get_pages_with_tags(tag_text):
    with sqlite3.connect("db.db") as con:
        result = con.execute("""SELECT * FROM tags WHERE text = ?""", (tag_text,))
    return result.fetchall()

def get_users_with_school_email(email_domain):
    with sqlite3.connect("db.db") as con:
        result = con.execute("""SELECT username FROM users INNER JOIN schools as s WHERE s.email_domain = ?""", (email_domain,) )
    return result.fetchall()

def communities_with_school_id(school_id):
    with sqlite3.connect("db.db") as con:
        result = con.execute("""SELECT text FROM communities WHERE school_id = ?""", (school_id, ))
    return result.fetchall()

def get_school_from_user(username:str):
    with sqlite3.connect("db.db") as con:
        result = con.execute("""SELECT school_id FROM users WHERE username= ?""", (username, ))
    return result.fetchall()

def get_data_from_user(username:str):
    with sqlite3.connect("db.db") as con:
        result = con.execute("""
        SELECT bio, tag_ids, page_data, community_ids, likes FROM pages 
        WHERE username = ?""", (username, ))
        return result.fetchall()



def add_school():
    with sqlite3.connect("db.db") as con:
        school_name = input(" SCHOOL NAME: ")
        print("Provide email domain, EX: uci.edu")
        email_domain = input("EMAIL DOMAIN:")
        result = con.execute("""INSERT INTO schools (school_name, email_domain)""", (school_name, email_domain))
    con.close()

def add_new_users(username, password, email, school_email, school_id):
    with sqlite3.connect("db.db") as con:
        result = con.execute("""INSERT INTO users (username, password, email, school_email, school_id)
          VALUES(?, ?, ?, ?, ?)""", (username, password, email, school_email, school_id))
        
def set_new_page_with_user(username, school_id):
    tags = json.dumps({'tags': ''})
    with sqlite3.connect("db.db") as con:
        result = con.execute("""INSERT INTO pages (page_data, username, bio, tag_ids, community_ids, likes, school_id) VALUES ('', ?,'', ?, '', '', ?)""", 
                             (username, tags, school_id))
    
def add_page_with_user(username, page_data):
    with sqlite3.connect("db.db") as con:
        result = con.execute("""UPDATE pages SET page_data = ? WHERE username = ? """, (page_data, username))

def load_page_with_user(username):
    with sqlite3.connect("db.db") as con:
        result = con.execute("""SELECT page_data FROM pages WHERE username=?""", (username, ))
    return result.fetchall()

def update_bio(bio, username):
    with sqlite3.connect("db.db") as con:
        result = con.execute("""UPDATE pages SET bio= ? WHERE username = ?""", (bio, username))

def update_tags(tags, username):
    with sqlite3.connect("db.db") as con:
        result = con.execute("""UPDATE pages SET tag_ids = ? WHERE username = ?""", (tags, username))

def get_names_with_tags(tags):
    final_result = set()
    with sqlite3.connect("db.db") as con:
        for tags in tags.split(','):
            json_tag = json.dumps({'tags':tags})
            result = con.execute("""SELECT username FROM pages WHERE tag_ids LIKE ?""", (json_tag, ))
            for i in result.fetchall():
                final_result.add(i[0])
    return final_result


def delete_rows():
    with sqlite3.connect("db.db") as con:
        result = con.execute("""DELETE FROM users WHERE username = 'Bowen' """)
        result = con.execute("""DELETE FROM pages WHERE username = 'Bowen'""")
        result = con.execute("""DELETE FROM users WHERE username = 'Kyle' """)
        result = con.execute("""DELETE FROM pages WHERE username = 'Kyle'""")
        result = con.execute("""DELETE FROM users WHERE username = 'Nick' """)

if __name__ == "__main__":
    print(get_names_with_tags("League of Legends,Fortnite,Valorant"))

