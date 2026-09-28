'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectComment } from '@/redux/slices/commentSlice';

export default function CommentList() {
  const { comments } = useAppSelector(selectComment);
  return (
    <div>
      <h1>Comment List</h1>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex flex-col rounded-md p-4 border border-gray-700"
        >
          <p className="text-lg font-semibold">{comment.text}</p>
          <p className="text-sm text-gray-500">
            {comment.author} - {new Date(comment.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
