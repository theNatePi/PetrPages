import sqlite3
from pathlib import Path

con = sqlite3.connect('db.db')



def get_all_schools():
    result = con.execute("""SELECT * FROM schools""")
    return result.fetchall()

def get_all_tags():
    result = con.execute(""" SELECT * FROM tags""")
    return result.fetchall()

def get_all_users():
    result = con.execute("""SELECT * FROM users""")
    return result.fetchall()

def get_all_pages():
    result = con.execute("""SELECT * FROM pages""")
    return result.fetchall()

def get_pages_with_tags(tag_ids):
    result = con.execute("""SELECT * FROM pages WHERE tags = ? """, (tag_ids))
    return result.fetchall()

def get_users_with_school_email(email_domain):
    result = con.execute("""SELECT username FROM users INNER JOIN schools as s WHERE s.email_domain = ?""", (email_domain,) )
    return result.fetchall()

def communities_with_school_id(school_id):
    result = con.execute("""SELECT page_data FROM communities WHERE school_id = ?""", (school_id, ))
    return result.fetchall()





if __name__ == "__main__":
    print(get_users_with_school_email(("uci.edu")))
    print(communities_with_school_id((1)))



