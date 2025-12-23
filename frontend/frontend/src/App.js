import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Fetch all books from backend
  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  // Add a new book
  const addBook = () => {
    if (!title || !author) return alert("Both fields are required");

    fetch("http://localhost:5000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author })
    })
      .then(res => res.json())
      .then(() => {
        setBooks([...books, { title, author }]);
        setTitle("");
        setAuthor("");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Library App</h2>

      <input
        placeholder="Book Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        placeholder="Author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={addBook}>Add Book</button>

      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <strong>{book.title}</strong> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
