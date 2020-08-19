import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const repo = await api.post(`/repositories`, {
      title: `React - ${Date.now()}`,
      url: 'https://github.com/facebook/react',
      techs: ['react', 'javascript', 'frontend', 'declarative', 'ui', 'library']
    })

    setRepositories([
      ...repositories,
      repo.data
    ])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const repoIndex = repositories.findIndex(r => r.id === id)
    if (repoIndex < 0) return

    setRepositories(repositories.filter(r => r.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id} data-url={repository.url}>
            <b>{repository.title}<small>{repository.url}</small></b>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
