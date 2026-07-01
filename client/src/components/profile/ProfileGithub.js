import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ProfileGithub = ({ username }) => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await axios.get(`/api/profile/github/${username}`);
        setRepos(res.data);
      } catch (err) {
        setRepos([]);
      }
    };

    fetchRepos();
  }, [username]);

  if (!repos.length) {
    return null;
  }

  return (
    <div className="profile-github card bg-light p-2">
      <h2 className="text-primary">
        <i className="fab fa-github"></i> Latest Repos
      </h2>
      {repos.map(repo => (
        <div key={repo.id} className="repo bg-white p-1 my-1">
          <div>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <strong>{repo.name}</strong>
            </a>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li className="badge badge-light">
                Stars: {repo.stargazers_count}
              </li>
              <li className="badge badge-light">
                Watchers: {repo.watchers_count}
              </li>
              <li className="badge badge-light">Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
