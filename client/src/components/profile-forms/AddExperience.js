import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const { title, company, location, from, to, current, description } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    addExperience(formData, navigate);
  };

  return (
    <section className="container">
      <Fragment>
        <h1 className="large text-primary">Add Experience</h1>
        <p className="lead">
          <i className="fas fa-briefcase"></i> Add relevant work experience
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" value={from} onChange={onChange} required />
          </div>
          <div className="form-group">
            <p>
              <input type="checkbox" name="current" checked={current} onChange={onChange} /> Current Job
            </p>
          </div>
          {!current && (
            <div className="form-group">
              <h4>To Date</h4>
              <input type="date" name="to" value={to} onChange={onChange} />
            </div>
          )}
          <div className="form-group">
            <textarea placeholder="Job Description" name="description" value={description} onChange={onChange} />
          </div>
          <input type="submit" className="btn btn-primary my-1" value="Add Experience" />
        </form>
        <Link to="/dashboard" className="btn btn-light my-1">
          Go Back
        </Link>
      </Fragment>
    </section>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(AddExperience);
