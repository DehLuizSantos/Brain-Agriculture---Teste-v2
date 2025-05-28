'use client';

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string; // ou Date, dependendo de como vem do backend
};

import { useState } from 'react';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchUsers = async (page = 1) => {
    const res = await fetch(`/api/users?page=${page}&pageSize=5`);
    const data = await res.json();
    setUsers(data.data);
  };

  const handleCreate = async () => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      fetchUsers();
    }
  };

  return (
    <div>
      <h1>Usuários</h1>
      <div>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleCreate}>Criar Usuário</button>
      </div>

      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>

      <button onClick={() => fetchUsers()}>Carregar Usuários</button>
    </div>
  );
};

export default Home;
