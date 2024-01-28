import sqlite3
import json
from pathlib import Path


def create_users_table():
    with sqlite3.connect("db.db") as con:
        con.execute(
            "CREATE TABLE users(username TEXT PRIMARY KEY UNIQUE NOT NULL, password TEXT NOT NULL, email TEXT UNIQUE NOT NULL, school_email TEXT UNIQUE NOT NULL, school_id INTEGER, FOREIGN KEY (school_id) REFERENCES schools(id))")
        con.commit()

def create_pages_table():
    with sqlite3.connect("db.db") as con:
        con.execute(
            "CREATE TABLE pages(id INTEGER PRIMARY KEY UNIQUE NOT NULL, page_data TEXT, username TEXT UNIQUE NOT NULL, bio TEXT, tag_ids TEXT, community_ids TEXT, likes TEXT, school_id INTEGER NOT NULL, FOREIGN KEY (username) REFERENCES users(username))"
        )
        con.commit()

def create_communities_table():
    with sqlite3.connect("db.db") as con:
        con.execute(
            "CREATE TABLE communities(id INTEGER UNIQUE PRIMARY KEY NOT NULL, text TEXT NOT NULL, page_ids string, school_id INTEGER, FOREIGN KEY (school_id) REFERENCES schools(id))"
        )
        con.commit()

def create_tags_table():
    with sqlite3.connect("db.db") as con:
        con.execute(
            "CREATE TABLE tags(id INTEGER PRIMARY KEY UNIQUE NOT NULL, text TEXT NOT NULL, page_ids TEXT, school_id INTEGER, FOREIGN KEY (school_id) REFERENCES schools(id))"
        )
        con.commit()

def create_schools_table():
    with sqlite3.connect("db.db") as con:
        con.execute(
            "CREATE TABLE schools(id INTEGER PRIMARY KEY UNIQUE NOT NULL, name TEXT UNIQUE NOT NULL, email_domain TEXT NOT NULL)"
        )
        con.commit()


def insert_dummy_data():
    tags_json = json.dumps({'tags': 'Fortnite, League of Legends'})
    with sqlite3.connect("db.db") as con:
        con.execute(
            "INSERT INTO schools (name, email_domain) VALUES ('UCI', 'uci.edu')"
        )
        con.execute(
            """
            INSERT INTO users (username, password, email, school_email, school_id)
            VALUES ('petr', 'petrpass', 'petr@gmail.com', 'petr@uci.edu', 1)
            """
        )
        con.execute(
            """
            INSERT INTO pages (page_data, username, bio, tag_ids, community_ids, likes, school_id)
            VALUES ('{pagejson}', 'petr', 'hey, im petr!', ? , '{communitiesjson}', '{likesjson}', 1) 
            """ , (tags_json, )
        )
        con.execute(
            """
            INSERT INTO communities (text, page_ids, school_id)
            VALUES ('valorantcommunity', '{pageidjson}', 1)
            """
        )
        con.execute(
            """
            INSERT INTO tags (text, page_ids, school_id)
            VALUES ('valoranttag', '{pageidjson}', 1)
            """
        )
        con.commit()


if __name__ == '__main__':
    create_schools_table()
    create_users_table()
    create_pages_table()
    create_communities_table()
    create_tags_table()
    insert_dummy_data()
