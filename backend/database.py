import sqlite3
from pathlib import Path



def get_all_schools():
    con = sqlite3.connect('db.db')
    result = con.execute("""SELECT * FROM schools""")
    result = result.fetchall()
    con.close()
    return result


def add_school():
    con = sqlite3.connect('db.db')
    school_name = input(" SCHOOL NAME: ")
    print("Provide email domain, EX: uci.edu")
    email_domain = input("EMAIL DOMAIN:")
    result = con.execute("""INSERT INTO schools (school_name, email_domain)""", (school_name, email_domain))
    con.close()

