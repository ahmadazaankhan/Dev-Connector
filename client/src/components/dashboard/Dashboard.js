import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { getCurrentProfile } from '../../actions/profile';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostForm from '../posts/PostForm';

const getCompletion = profile => {
  if (!profile) return 0;

  const fields = [
    profile.status,
    profile.company,
    profile.location,
    profile.bio,
    profile.skills?.length,
    profile.experience?.length,
    profile.education?.length
  ];

  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
};

const Dashboard = ({
  getCurrentProfile,
  getPosts,
  auth: { user },
  profile: { profile, loading },
  post: { posts, loading: postsLoading }
}) => {
  useEffect(() => {
    getCurrentProfile();
    getPosts();
  }, [getCurrentProfile, getPosts]);

  if (loading) {
    return <Spinner />;
  }

  const completion = getCompletion(profile);
  const recentPosts = posts.slice(0, 5);

  return (
    <section className="dashboard">
      <div className="dashboard-hero card">
        <div className="dashboard-hero-content">
          <img
            className="dashboard-avatar"
            src={user?.avatar}
            alt={user?.name}
          />
          <div>
            <p className="dashboard-eyebrow">Developer Dashboard</p>
            <h1>Welcome back, {user?.name}</h1>
            <p className="dashboard-subtitle">
              {profile
                ? `${profile.status}${profile.company ? ` at ${profile.company}` : ''}`
                : 'Complete your profile to stand out to other developers.'}
            </p>
          </div>
        </div>
        {profile && (
          <div className="dashboard-completion">
            <span>Profile completion</span>
            <strong>{completion}%</strong>
            <div className="dashboard-progress">
              <div
                className="dashboard-progress-bar"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat card">
          <i className="fas fa-code"></i>
          <div>
            <strong>{profile?.skills?.length || 0}</strong>
            <span>Skills</span>
          </div>
        </div>
        <div className="dashboard-stat card">
          <i className="fas fa-briefcase"></i>
          <div>
            <strong>{profile?.experience?.length || 0}</strong>
            <span>Experience</span>
          </div>
        </div>
        <div className="dashboard-stat card">
          <i className="fas fa-graduation-cap"></i>
          <div>
            <strong>{profile?.education?.length || 0}</strong>
            <span>Education</span>
          </div>
        </div>
        <div className="dashboard-stat card">
          <i className="fas fa-comments"></i>
          <div>
            <strong>{posts.length}</strong>
            <span>Posts</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-main">
          {profile ? (
            <div className="dashboard-panel card">
              <div className="dashboard-panel-header">
                <h2>Your Profile</h2>
                <Link to={`/profile/${profile._id}`} className="btn btn-light btn-sm">
                  View Public Profile
                </Link>
              </div>
              <div className="dashboard-profile-summary">
                <div>
                  <p className="text-primary">{profile.status}</p>
                  {profile.location && <p>{profile.location}</p>}
                  {profile.bio && <p className="dashboard-bio">{profile.bio}</p>}
                </div>
                <div className="dashboard-skill-tags">
                  {profile.skills?.slice(0, 6).map((skill, index) => (
                    <span key={index} className="dashboard-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="dashboard-panel card dashboard-empty">
              <i className="fas fa-user-circle"></i>
              <h2>Create your developer profile</h2>
              <p>
                Add your skills, experience, and social links so other developers
                can discover and connect with you.
              </p>
              <Link to="/create-profile" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          )}

          <div className="dashboard-panel card">
            <div className="dashboard-panel-header">
              <h2>Community Feed</h2>
            </div>
            <PostForm />
            {postsLoading ? (
              <Spinner />
            ) : recentPosts.length > 0 ? (
              <div className="dashboard-posts">
                {recentPosts.map(post => (
                  <div key={post._id} className="dashboard-post-item">
                    <img src={post.avatar} alt={post.name} className="round-img" />
                    <div>
                      <h4>{post.name}</h4>
                      <p>{post.text}</p>
                      <small className="text-muted">
                        <Moment fromNow>{post.date}</Moment>
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="dashboard-muted">No posts yet. Be the first to share something.</p>
            )}
          </div>
        </div>

        <aside className="dashboard-sidebar">
          <div className="dashboard-panel card">
            <h2>Quick Actions</h2>
            <div className="dashboard-actions">
              {profile ? (
                <>
                  <Link to="/edit-profile" className="dashboard-action">
                    <i className="fas fa-user-edit"></i>
                    <span>Edit Profile</span>
                  </Link>
                  <Link to="/add-experience" className="dashboard-action">
                    <i className="fas fa-briefcase"></i>
                    <span>Add Experience</span>
                  </Link>
                  <Link to="/add-education" className="dashboard-action">
                    <i className="fas fa-graduation-cap"></i>
                    <span>Add Education</span>
                  </Link>
                  <Link to={`/profile/${profile._id}`} className="dashboard-action">
                    <i className="fas fa-eye"></i>
                    <span>View Profile</span>
                  </Link>
                </>
              ) : (
                <Link to="/create-profile" className="dashboard-action">
                  <i className="fas fa-plus-circle"></i>
                  <span>Create Profile</span>
                </Link>
              )}
              <Link to="/profiles" className="dashboard-action">
                <i className="fas fa-users"></i>
                <span>Browse Developers</span>
              </Link>
            </div>
          </div>

          {profile && (
            <div className="dashboard-panel card">
              <h2>Profile Checklist</h2>
              <ul className="dashboard-checklist">
                <li className={profile.status ? 'done' : ''}>Add professional status</li>
                <li className={profile.skills?.length ? 'done' : ''}>List your skills</li>
                <li className={profile.bio ? 'done' : ''}>Write a short bio</li>
                <li className={profile.experience?.length ? 'done' : ''}>Add work experience</li>
                <li className={profile.education?.length ? 'done' : ''}>Add education</li>
                <li className={profile.githubusername ? 'done' : ''}>Connect GitHub</li>
              </ul>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post
});

export default connect(mapStateToProps, { getCurrentProfile, getPosts })(Dashboard);
