import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const EditProfile = ({ createProfile, getCurrentProfile, profile: { profile, loading } }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    status: '',
    company: '',
    website: '',
    location: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    youtube: '',
    linkedin: '',
    instagram: ''
  });
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  useEffect(() => {
    if (!loading && !profile) {
      navigate('/create-profile');
    }
  }, [loading, profile, navigate]);

  useEffect(() => {
    if (profile && !initialized) {
      setFormData({
        status: profile.status || '',
        company: profile.company || '',
        website: profile.website || '',
        location: profile.location || '',
        skills: profile.skills?.join(', ') || '',
        githubusername: profile.githubusername || '',
        bio: profile.bio || '',
        twitter: profile.social?.twitter || '',
        facebook: profile.social?.facebook || '',
        youtube: profile.social?.youtube || '',
        linkedin: profile.social?.linkedin || '',
        instagram: profile.social?.instagram || ''
      });
      setInitialized(true);
    }
  }, [profile, initialized]);

  const {
    status,
    company,
    website,
    location,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    youtube,
    linkedin,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, navigate, true);
  };

  if (loading || !initialized) {
    return <Spinner />;
  }

  return (
    <section className="container">
      <Fragment>
        <h1 className="large text-primary">Edit Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user-edit"></i> Update your developer profile
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <select name="status" value={status} onChange={onChange} required>
              <option value="">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Company" name="company" value={company} onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={onChange} />
          </div>
          <div className="form-group">
            <textarea placeholder="Bio" name="bio" value={bio} onChange={onChange} />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange} />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange} />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x"></i>
            <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={onChange} />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange} />
          </div>
          <input type="submit" className="btn btn-primary my-1" value="Save Changes" />
        </form>
        <Link to="/dashboard" className="btn btn-light my-1">
          Go Back
        </Link>
      </Fragment>
    </section>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(state => ({ profile: state.profile }), {
  createProfile,
  getCurrentProfile
})(EditProfile);
