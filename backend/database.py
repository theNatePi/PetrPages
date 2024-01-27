import sqlite3
from pathlib import Path

con = sqlite3.connect('db.db')



def get_all_schools():
    result = con.execute("""SELECT * FROM schools""")
    return result




