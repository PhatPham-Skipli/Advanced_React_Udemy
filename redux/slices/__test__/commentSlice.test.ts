import commentReducer, {
  addComment,
  CommentState,
} from '@/redux/slices/commentSlice';

describe('commentSlice reducer', () => {
  it('should handle initial state', () => {
    const initialState: CommentState = {
      comments: [],
    };

    const action = addComment('New Comment');

    const newState = commentReducer(initialState, action);

    expect(newState.comments).toHaveLength(1);
    expect(newState.comments[0]).toEqual(
      expect.objectContaining({
        text: 'New Comment',
        author: 'Anonymous',
        timestamp: expect.any(Number),
        id: expect.any(String),
      }),
    );
  });
});

describe('saveComment action', () => {
  let action: ReturnType<typeof addComment>;

  beforeEach(() => {
    action = addComment('New Comment');
  });

  it('has the correct type', () => {
    expect(action.type).toEqual('comments/addComment');
  });

  it('payload has the correct value', () => {
    expect(action.payload).toEqual('New Comment');
  });
});
