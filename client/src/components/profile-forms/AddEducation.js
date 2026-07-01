import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    addEducation(formData, navigate);
  };

  return (
    <section className="container">
      <Fragment>
        <h1 className="large text-primary">Add Education</h1>
        <p className="lead">
          <i className="fas fa-graduation-cap"></i> Add your education history
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" placeholder="* School" name="school" value={school} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="* Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={onChange} required />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" value={from} onChange={onChange} required />
          </div>
          <div className="form-group">
            <p>
              <input type="checkbox" name="current" checked={current} onChange={onChange} /> Current School
            </p>
          </div>
          {!current && (
            <div className="form-group">
              <h4>To Date</h4>
              <input type="date" name="to" value={to} onChange={onChange} />
            </div>
          )}
          <div className="form-group">
            <textarea placeholder="Program Description" name="description" value={description} onChange={onChange} />
          </div>
          <input type="submit" className="btn btn-primary my-1" value="Add Education" />
        </form>
        <Link to="/dashboard" className="btn btn-light my-1">
          Go Back
        </Link>
      </Fragment>
    </section>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(AddEducation);
