import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import Container from '../../components/Container';
import Button from '../../components/Button';
import { Form, List, Input } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    newRepoIsValid: true,
    repositories: [],
    loading: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({
        repositories: JSON.parse(repositories),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, newRepoIsValid: true });
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const { newRepo, repositories } = this.state;
      const repoExists = repositories.find(repo => repo.name === newRepo);

      if (!newRepo) {
        this.setState({ newRepoIsValid: false });
        toast.warn('Informe o repositório');
        return;
      }

      if (repoExists) throw new Error('Repositório duplicado');

      this.setState({ loading: true });

      const { data } = await api.get(`/repos/${newRepo}`);

      const repo = {
        name: data.full_name,
      };

      this.setState({
        repositories: [...repositories, repo],
        newRepo: '',
        loading: false,
        newRepoIsValid: true,
      });
    } catch (error) {
      this.setState({ loading: false, newRepoIsValid: false });

      if (!error.request && error.message) {
        toast.error(error.message);
        return;
      }

      if (error.request.status === 404) {
        toast.error('Repositório não encontrado.');
        return;
      }

      toast.error(
        'Ops! Houve um problema, por favor tente novamente mais tarde.'
      );
    }
  };

  render() {
    const { newRepo, loading, repositories, newRepoIsValid } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            valid={newRepoIsValid}
            onChange={this.handleInputChange}
          />

          <Button loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </Button>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
