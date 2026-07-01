import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    addPost({ text });
    setText('');
  };

  return (
    <form className="dashboard-post-form form" onSubmit={onSubmit}>
      <textarea
        name="text"
        placeholder="Share something with the developer community..."
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      <input type="submit" className="btn btn-primary" value="Post" />
    </form>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
