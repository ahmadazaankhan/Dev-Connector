import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Education = ({ education, deleteEducation, showActions }) => (
  <div className="credential-item">
    <div className="credential-header">
      <div>
        <h3>{education.school}</h3>
        <p className="text-primary">
          {education.degree} · {education.fieldofstudy}
        </p>
      </div>
      {showActions && (
        <button
          type="button"
          onClick={() => deleteEducation(education._id)}
          className="btn btn-danger btn-sm"
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
    <p>
      <Moment format="MMM YYYY">{education.from}</Moment> -{' '}
      {education.to ? (
        <Moment format="MMM YYYY">{education.to}</Moment>
      ) : (
        'Present'
      )}
    </p>
    {education.description && <p>{education.description}</p>}
  </div>
);

Education.propTypes = {
  education: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func,
  showActions: PropTypes.bool
};

export default Education;
