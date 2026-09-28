import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define Post interface
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Posts' as const,
                id,
              })),
              { type: 'Posts' as const, id: 'LIST' }, // Tag representing the whole list
            ]
          : [{ type: 'Posts' as const, id: 'LIST' }],
    }),

    updatePost: builder.mutation<Post, { id: number; data: Post }>({
      query: ({ id, data }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: () => [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
});

export const { useGetPostsQuery, useUpdatePostMutation } = postApi;
