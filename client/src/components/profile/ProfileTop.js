import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileTop = ({ profile, authUserId }) => {
  const {
    user: { name, avatar },
    status,
    company,
    location,
    website,
    social,
    githubusername
  } = profile;

  const isOwnProfile = authUserId && String(profile.user._id) === String(authUserId);

  return (
    <div className="profile-top bg-primary p-2 card">
      <img className="round-img my-1" src={avatar} alt={name} />
      <h1 className="text-light">{name}</h1>
      <p className="text-light">{status}</p>
      {company && (
        <p className="text-light">
          <i className="fas fa-building"></i> {company}
        </p>
      )}
      {location && (
        <p className="text-light">
          <i className="fas fa-map-marker-alt"></i> {location}
        </p>
      )}
      {website && (
        <p>
          <a className="text-light" href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe"></i> {website}
          </a>
        </p>
      )}
      {githubusername && (
        <p>
          <a
            className="text-light"
            href={`https://github.com/${githubusername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i> {githubusername}
          </a>
        </p>
      )}
      <div className="icons my-1">
        {social?.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        )}
        {social?.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
        )}
        {social?.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x"></i>
          </a>
        )}
        {social?.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        )}
        {social?.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
      {isOwnProfile && (
        <Fragment>
          <Link to="/edit-profile" className="btn btn-light my-1">
            <i className="fas fa-user-edit"></i> Edit Profile
          </Link>
          <Link to="/add-experience" className="btn btn-light my-1">
            <i className="fas fa-briefcase"></i> Add Experience
          </Link>
          <Link to="/add-education" className="btn btn-light my-1">
            <i className="fas fa-graduation-cap"></i> Add Education
          </Link>
        </Fragment>
      )}
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
  authUserId: PropTypes.string
};

export default ProfileTop;
