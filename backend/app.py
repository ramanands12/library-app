from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB_NAME = "library.db"

def get_db():
    return sqlite3.connect(DB_NAME)

# Health check
@app.route("/")
def home():
    return jsonify({"status": "Backend running"})


# Get all books
@app.route("/books", methods=["GET"])
def get_books():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, author FROM books")
    rows = cursor.fetchall()
    conn.close()

    books = []
    for row in rows:
        books.append({
            "id": row[0],
            "title": row[1],
            "author": row[2]
        })

    return jsonify(books)


# Add a new book
@app.route("/books", methods=["POST"])
def add_book():
    data = request.get_json()

    title = data.get("title")
    author = data.get("author")

    if not title or not author:
        return jsonify({"error": "Title and Author required"}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO books (title, author) VALUES (?, ?)",
        (title, author)
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "Book added successfully"}), 201


if __name__ == "__main__":
    
    app.run(host="0.0.0.0", port=8000, debug=True)
