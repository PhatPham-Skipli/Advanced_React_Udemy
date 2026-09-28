'use client';

import { useGetPostsQuery } from '@/services/postApi';

export default function PostsPage() {
  const { data, isLoading, error } = useGetPostsQuery();
  console.log(data);
  return (
    <div>
      <h1>Posts</h1>
      {isLoading && <p className="text-green-600">Đang tải...</p>}
      {error && <p className="text-red-600">Loi k xac dinh</p>}
      {data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
