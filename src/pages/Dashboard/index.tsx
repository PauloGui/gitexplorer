import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/image/logo.svg';

import { Title, Form, Repositores, Error } from './styles';

interface Repository {
  // eslint-disable-next-line camelcase
  full_name: string;
  description: string;
  owner: {
    login: string;
    // eslint-disable-next-line camelcase
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRespository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autor/repositorio');
      return;
    }
    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch {
      setInputError('Erro ao buscar o repositorio');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Explore o github" />
      <Title>Explore repositórios no GitHub.</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRespository}>
        <input
          value={newRepo}
          onChange={(e): void => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Explorar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositores>
        {repositories.map(repository => (
          <a key={repository.full_name} href="teste">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositores>
    </>
  );
};

export default Dashboard;
