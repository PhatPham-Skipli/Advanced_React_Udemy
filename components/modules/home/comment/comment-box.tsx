'use client';
import { useAppDispatch } from '@/redux/hooks';
import { addComment } from '@/redux/slices/commentSlice';
import { SubmitEvent, useState } from 'react';

export default function CommentBox() {
  const [comment, setComment] = useState('');
  const dispatch = useAppDispatch();
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;
    dispatch(addComment(comment));
    setComment('');
  };

  return (
    <div className="flex w-fit flex-col rounded-md p-4 border border-gray-700 gap-2">
      <h1 className="font-semibold">Comment Box</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="p-2 rounded-md border border-gray-700"
        />
        <button
          type="submit"
          className="px-2 rounded-md p-1 bg-gray-700 text-white cursor-pointer block"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
