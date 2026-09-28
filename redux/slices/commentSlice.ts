import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: number;
}

export interface CommentState {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: [],
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<string>) => {
      state.comments.push({
        id: Date.now().toString(),
        text: action.payload,
        author: 'Anonymous',
        timestamp: Date.now(),
      });
    },
  },
});

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;
export const selectComment = (state: RootState) => state.comment;
