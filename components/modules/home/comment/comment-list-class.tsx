'use client';
import { CommentState } from '@/redux/slices/commentSlice';
import { RootState } from '@/redux/store';
import { Component } from 'react';
import { connect } from 'react-redux';

interface CommentListProps {
  comments: CommentState;
}

class CommentList extends Component<CommentListProps> {
  render() {
    return (
      <div>
        <h1>Comment List</h1>
        <ul>
          {this.props.comments.comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.text}</p>
              <p>
                {comment.author} - {comment.timestamp}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    comments: state.comment,
  };
}

export default connect(mapStateToProps)(CommentList);
