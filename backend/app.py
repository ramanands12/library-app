from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # allows requests from React frontend

DB_NAME = "library.db"

# Connect to SQLite DB
def get_db():
    return sqlite3.connect(DB_NAME)

# Get all books
@app.route("/books", methods=["GET"])
def get_books():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, author FROM books")
    books = cursor.fetchall()
    conn.close()
    return jsonify([{"id": row[0], "title": row[1], "author": row[2]} for row in books])

# Add a new book
@app.route("/books", methods=["POST"])
def add_book():
    data = request.json
    title = data["title"]
    author = data["author"]

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO books (title, author) VALUES (?, ?)", (title, author))
    conn.commit()
    conn.close()
    return jsonify({"message": "Book added"}), 201

if __name__ == "__main__":
    app.run(debug=True)
