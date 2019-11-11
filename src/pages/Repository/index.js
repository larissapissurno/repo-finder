import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { FaChevronRight, FaChevronLeft, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import Button from '../../components/Button';
import { Loading, Owner, IssueList, ListFooter } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: Proptypes.shape({
      params: Proptypes.shape({
        repository: Proptypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    issueState: 'all',
    issuePage: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const { issueState, issuePage } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      this.getIssues({ issueState, issuePage }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  async getIssues(filter = {}) {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const { issueState, issuePage } = this.state;

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter.issueState || issueState,
        per_page: 5,
        page: filter.issuePage || issuePage,
      },
    });

    return issues;
  }

  handleSelectChange = async e => {
    this.setState({ issueState: e.target.value, loading: true });

    const filter = {
      issueState: e.target.value,
    };
    const issues = await this.getIssues(filter);

    this.setState({
      issues: issues.data,
      loading: false,
    });
  };

  handlePageChange = async page => {
    this.setState({ issuePage: page, loading: true });

    const issues = await this.getIssues({ issuePage: page });

    this.setState({ issues: issues.data, loading: false });
  };

  render() {
    const { repository, issues, loading, issueState, issuePage } = this.state;
    const issueFilterOptions = [
      {
        name: 'Todas as issues',
        value: 'all',
      },
      {
        name: 'Issues em aberto',
        value: 'open',
      },
      {
        name: 'Issues fechadas',
        value: 'closed',
      },
    ];

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>

          <select
            name="issueFilter"
            id="issueFilter"
            value={issueState}
            onChange={this.handleSelectChange}
          >
            {issueFilterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Owner>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <ListFooter>
          <Button
            loading={loading ? 1 : 0}
            onClick={() => this.handlePageChange(issuePage - 1)}
          >
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaChevronLeft color="#fff" size={14} />
            )}
            Página anterior
          </Button>
          <Button
            loading={loading ? 1 : 0}
            onClick={() => this.handlePageChange(issuePage + 1)}
          >
            Próxima página
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaChevronRight color="#fff" size={14} />
            )}
          </Button>
        </ListFooter>
      </Container>
    );
  }
}
