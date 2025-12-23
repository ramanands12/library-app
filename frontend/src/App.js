import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Fetch books from backend
  useEffect(() => {
    fetch("http://localhost:8000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  // Add new book
  const addBook = () => {
    if (!title || !author) {
      alert("Both fields are required");
      return;
    }

    fetch("http://localhost:8000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author }),
    })
      .then((res) => res.json())
      .then(() => {
        setBooks([...books, { title, author }]);
        setTitle("");
        setAuthor("");
      });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>📚 Library App</h2>

      <input
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <button onClick={addBook} style={{ marginLeft: "10px" }}>
        Add Book
      </button>

      <hr />

      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <b>{book.title}</b> — {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
