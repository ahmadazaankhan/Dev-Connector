import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <section className="container">
      <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Browse and connect with developers
          </p>
          <div className="profiles">
            {profiles.map(profile => (
              <div key={profile._id} className="profile">
                <img src={profile.user.avatar} alt="" className="round-img" />
                <div>
                  <h2>{profile.user.name}</h2>
                  <p>{profile.status}</p>
                  <p>{profile.location && <span>{profile.location}</span>}</p>
                  <Link to={`/profile/${profile._id}`} className="btn btn-primary">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Fragment>
      )}
      </Fragment>
    </section>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
