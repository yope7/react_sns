import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {

    fetch('http://localhost:8080/api/posts')

      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newPost }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts([data, ...posts]);
        setNewPost('');
      })
      .catch((error) => console.error('Error creating post:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <nav className="App-nav">
        <button>Home</button>
        <button>Posts</button>
        <button>About</button>
      </nav>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write a new post..."
          />
          <button type="submit">Post</button>
        </form>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.content}</li>
          ))}
        </ul>
      </main>
      <section className="App-surface-pages">
        <h2>Surface Pages</h2>
        <p>Content for surface pages goes here.</p>
      </section>
    </div>
  );
}

export default App;
