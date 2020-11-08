import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/image/logo.svg';

import { Title, Form, Repositores } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Explore o github" />
      <Title>Explore repositórios no GitHub.</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Explorar</button>
      </Form>

      <Repositores>
        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/18484968?s=460&u=34bd09cf09ce881107031c526e541caf1bca01c9&v=4"
            alt="Avatar"
          />
          <div>
            <strong>titulo do repositorio</strong>
            <p>texto</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositores>
    </>
  );
};

export default Dashboard;
