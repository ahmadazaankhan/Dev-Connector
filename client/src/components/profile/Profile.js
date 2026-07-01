import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getProfileById,
  clearCurrentProfile,
  deleteExperience,
  deleteEducation
} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import Experience from './Experience';
import Education from './Education';
import ProfileGithub from './ProfileGithub';

const Profile = ({
  getProfileById,
  clearCurrentProfile,
  deleteExperience,
  deleteEducation,
  profile: { profile, loading, error },
  auth: { isAuthenticated, user }
}) => {
  const { profile_id } = useParams();

  useEffect(() => {
    getProfileById(profile_id);
    return () => clearCurrentProfile();
  }, [getProfileById, clearCurrentProfile, profile_id]);

  if (loading) {
    return <Spinner />;
  }

  if (!profile) {
    return (
      <section className="container">
        <p className="lead">{error.msg || 'Profile not found'}</p>
        <Link to="/profiles" className="btn btn-primary">
          Back To Developers
        </Link>
      </section>
    );
  }

  const isOwnProfile =
    isAuthenticated &&
    user &&
    String(profile.user._id) === String(user._id || user.id);

  return (
    <section className="container">
      <Link to="/profiles" className="btn btn-light my-1">
        <i className="fas fa-arrow-left"></i> Back To Developers
      </Link>
      <div className="profile-grid">
        <ProfileTop profile={profile} authUserId={user?._id || user?.id} />
        <ProfileAbout profile={profile} />
        <div className="profile-exp card bg-light p-2">
          <h2 className="text-primary">
            <i className="fas fa-briefcase"></i> Experience
          </h2>
          {profile.experience.length > 0 ? (
            profile.experience.map(exp => (
              <Experience
                key={exp._id}
                experience={exp}
                deleteExperience={deleteExperience}
                showActions={isOwnProfile}
              />
            ))
          ) : (
            <p>No experience added yet.</p>
          )}
        </div>
        <div className="profile-edu card bg-light p-2">
          <h2 className="text-primary">
            <i className="fas fa-graduation-cap"></i> Education
          </h2>
          {profile.education.length > 0 ? (
            profile.education.map(edu => (
              <Education
                key={edu._id}
                education={edu}
                deleteEducation={deleteEducation}
                showActions={isOwnProfile}
              />
            ))
          ) : (
            <p>No education added yet.</p>
          )}
        </div>
        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
      </div>
    </section>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getProfileById,
  clearCurrentProfile,
  deleteExperience,
  deleteEducation
})(Profile);
