import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Contributions({ year, login }) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const from = `${year}-01-01T00:00:00Z`;
    const to = `${year}-12-31T23:59:59Z`;

    axios.post(
      'https://api.github.com/graphql',
      {
        query: `
          query($login: String!) {
            user(login: $login) {
              repositories(first: 100, orderBy: {field: CREATED_AT, direction: DESC}, privacy: PUBLIC) {
                nodes {
                  name
                  description
                  url
                  createdAt
                }
              }
            }
          }
        `,
        variables: { login }
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
        }
      }
    ).then(res => {
      const allRepos = res.data.data.user.repositories.nodes;
      const filtered = allRepos.filter(repo => {
        const createdAt = new Date(repo.createdAt);
        return createdAt >= new Date(from) && createdAt <= new Date(to);
      });

      setRepos(filtered);
    });
  }, [year, login]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">Repositories Created in {year}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {repos.map(repo => (
          <a key={repo.url} href={repo.url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-[#1f2937] rounded hover:bg-[#374151] transition">
            <h3 className="text-lg font-semibold">{repo.name}</h3>
            <p className="text-sm text-gray-400">{repo.description || 'No description'}</p>
          </a>
        ))}
        {repos.length === 0 && <p className="text-gray-500">No repositories created in {year}.</p>}
      </div>
    </div>
  );
}

export default Contributions;
