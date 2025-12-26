import { useEffect, useState } from "react";
import { getBooks, addBook } from "./services/api";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getBooks()
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Backend not reachable");
        setLoading(false);
      });
  }, []);

  const handleAddBook = () => {
    if (!title || !author) return;

    addBook({ title, author })
      .then(() => {
        setBooks([...books, { title, author }]);
        setTitle("");
        setAuthor("");
      })
      .catch(() => setError("Failed to add book"));
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>📚 Library App</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <button onClick={handleAddBook}>Add Book</button>

      <ul>
        {books.map((book, idx) => (
          <li key={idx}>
            {book.title} — {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
