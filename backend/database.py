
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
        final_result = set()
        result = con.execute("""SELECT username FROM users""")
        for name in result.fetchall():
            final_result.add(name[0])
    return final_result

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
    page_data =json.dumps(default_page)
    with sqlite3.connect("db.db") as con:
        result = con.execute("""INSERT INTO pages (page_data, username, bio, tag_ids, community_ids, likes, school_id) VALUES (?, ?,'', ?, '', '', ?)""", 
                             (page_data, username, tags, school_id))
    
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
            tags = '%' + tags + '%'
            #json_tag = json.dumps({'tatags})
            result = con.execute("""SELECT username FROM pages WHERE tag_ids LIKE ?""", (tags, ))
            #print(result.fetchall())
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

default_page = {
  "time": 1706427406946,
  "blocks": [
      {
          "id": "UDxZPHInku",
          "type": "header",
          "data": {
              "text": "Welcome",
              "level": 1
          }
      },
      {
          "id": "SC1DCdAfX-",
          "type": "header",
          "data": {
              "text": "to your home on the internet!",
              "level": 4
          }
      },
      {
          "id": "X8eCxOi0OU",
          "type": "image",
          "data": {
              "url": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FoF46gZeO37KmY%2Fgiphy.gif&f=1&nofb=1&ipt=85ff568093670a86a7b78453e8dca49846913f225119dd9f539a7905bfde5af4&ipo=images.jpg",
              "caption": "heyo~ - petr",
              "withBorder": True,
              "withBackground": True,
              "stretched": True
          }
      },
      {
          "id": "yhp9wECeTy",
          "type": "header",
          "data": {
              "text": "You can add:",
              "level": 2
          }
      },
      {
          "id": "emXPVMr8g_",
          "type": "header",
          "data": {
              "text": "lists",
              "level": 4
          }
      },
      {
          "id": "UiIwGQ3OVd",
          "type": "list",
          "data": {
              "style": "unordered",
              "items": [
                  "one",
                  "two",
                  "three"
              ]
          }
      },
      {
          "id": "BdPXJ_AYdC",
          "type": "header",
          "data": {
              "text": "headers and text",
              "level": 4
          }
      },
      {
          "id": "q1aMOGB5jy",
          "type": "paragraph",
          "data": {
              "text": "Rem eos velit excepturi nostrum voluptatibus libero. Enim veniam alias delectus. Consequatur exercitationem omnis ut."
          }
      },
      {
          "id": "dIgJCU_wOD",
          "type": "paragraph",
          "data": {
              "text": "Amet qui pariatur a. Id est reiciendis consequatur aut libero. Aut est veniam labore et quis sit quia sunt. Velit quia qui id veritatis quia sint dolorum cumque. Temporibus officia ea ex laborum et in iure. Qui velit earum at tempore deserunt."
          }
      },
      {
          "id": "zEvsGUITRW",
          "type": "header",
          "data": {
              "text": "and code blocks",
              "level": 4
          }
      },
      {
          "id": "Ap7DJ8DAwb",
          "type": "raw",
          "data": {
              "html": "AntEater by Win Kang\n\n    Z   z                            //////////////_               the\n           Z   O         __\\\\\\\\@   //^^        _-    \\///////    sleeping\n    Z    z   o   _____((_     \\-/ ____/ /   {   { \\\\       }     ant\n           o    0__________\\\\\\---//____/----//__|-^\\\\\\\\\\\\\\\\     eater"
          }
      }
  ],
  "version": "2.29.0"
}
if __name__ == "__main__":
    print(get_all_users())

