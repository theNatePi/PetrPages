import sqlite3
from pathlib import Path


def create_users_table(con: sqlite3.Connection):
    con.execute(
        "CREATE TABLE users(username TEXT PRIMARY KEY UNIQUE NOT NULL, password TEXT NOT NULL, email TEXT UNIQUE NOT NULL, school_email TEXT UNIQUE NOT NULL, bio TEXT, school_id INTEGER, FOREIGN KEY (school_id) REFERENCES schools(id))")
    con.commit()

def create_pages_table(con: sqlite3.Connection):
    con.execute(
        "CREATE TABLE pages(id INTEGER PRIMARY KEY UNIQUE NOT NULL, page_data TEXT, username INTEGER, tag_ids TEXT, community_ids TEXT, likes TEXT, school_id INT NOT NULL, FOREIGN KEY (username) REFERENCES users(username))"
    )
    con.commit()

def create_communities_table(con: sqlite3.Connection):
    con.execute(
        "CREATE TABLE communities(id INTEGER UNIQUE PRIMARY KEY NOT NULL, text TEXT NOT NULL, page_ids string, school_id INTEGER, FOREIGN KEY (school_id) REFERENCES schools(id))"
    )
    con.commit()

def create_tags_table(con: sqlite3.Connection):
    con.execute(
        "CREATE TABLE tags(id INTEGER PRIMARY KEY UNIQUE NOT NULL, text TEXT NOT NULL, page_ids TEXT, school_id INTEGER, FOREIGN KEY (school_id) REFERENCES schools(id))"
    )
    con.commit()

def create_schools_table(con: sqlite3.Connection):
    con.execute(
        "CREATE TABLE schools(id INTEGER PRIMARY KEY UNIQUE NOT NULL, name TEXT UNIQUE NOT NULL, email_domain TEXT NOT NULL)"
    )
    con.commit()


def insert_dummy_data(con: sqlite3.Connection):
    con.execute(
        "INSERT INTO schools (name, email_domain) VALUES ('UCI', 'uci.edu')"
    )
    con.execute(
        """
        INSERT INTO users (username, password, email, school_email, bio, school_id)
        VALUES ('petr', 'petrpass', 'petr@gmail.com', 'petr@uci.edu', 'hey, im petr!', 1)
        """
    )
    con.execute(
        """
        INSERT INTO pages (page_data, username, tag_ids, community_ids, likes, school_id)
        VALUES ('{pagejson}', 'petr', '{tagsjson}', '{communitiesjson}', '{likesjson}', 1)
        """
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
    con = sqlite3.connect('db.db')
    create_schools_table(con)
    create_users_table(con)
    create_pages_table(con)
    create_communities_table(con)
    create_tags_table(con)
    insert_dummy_data(con)
