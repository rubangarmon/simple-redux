import React, { useEffect } from "react";
import { connect } from "react-redux";

// Bring in the asynchronous fetchPosts action
import { fetchPost } from "../actions/postActions";
import { fetchComments } from "../actions/commentsActions";
import Post from "../components/Post";
import Comment from "../components/Comment";

//Redux state is now in the props of the component
const SinglePostPage = ({
  match, // this is from react-router
  dispatch,
  post,
  comments,
  loading,
  hasErrors,
}) => {
  useEffect(() => {
    const { id } = match.params; // getting id from url react-router
    dispatch(fetchPost(id));
    dispatch(fetchComments(id));
  }, [dispatch, match]);

  // Show loading, error, or success state
  const renderPost = () => {
    if (loading.post) return <p>Loading post...</p>;
    if (hasErrors.post) return <p>Unable to display post.</p>;
    return <Post post={post} />;
  };

  //Show comments
  const renderComments = () => {
    if (loading.comment) return <p>Loading comment...</p>;
    if (hasErrors.comment) return <p>Unable to display comment.</p>;
    return comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ));
  };

  return (
    <section>
      {renderPost()}
      <h2>Comments:</h2>
      {renderComments()}
    </section>
  );
};

//Map Redux state to React component props
const mapStateToProps = (state) => ({
  post: state.post.post,
  comments: state.comments.comments,
  loading: {post: state.post.loading, comments: state.comments.loading},
  hasErrors: {post: state.post.hasErrors, comments: state.comments.hasErrors},
});

// Connect Redux to React
export default connect(mapStateToProps)(SinglePostPage);
