import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Experience = ({ experience, deleteExperience, showActions }) => (
  <div className="credential-item">
    <div className="credential-header">
      <div>
        <h3>{experience.title}</h3>
        <p className="text-primary">{experience.company}</p>
      </div>
      {showActions && (
        <button
          type="button"
          onClick={() => deleteExperience(experience._id)}
          className="btn btn-danger btn-sm"
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
    <p>
      <Moment format="MMM YYYY">{experience.from}</Moment> -{' '}
      {experience.to ? (
        <Moment format="MMM YYYY">{experience.to}</Moment>
      ) : (
        'Present'
      )}
    </p>
    {experience.location && <p>{experience.location}</p>}
    {experience.description && <p>{experience.description}</p>}
  </div>
);

Experience.propTypes = {
  experience: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func,
  showActions: PropTypes.bool
};

export default Experience;
