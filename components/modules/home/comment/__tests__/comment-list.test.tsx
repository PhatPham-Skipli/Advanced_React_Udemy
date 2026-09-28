import CommentList from '@/components/modules/home/comment/comment-list';
import { renderWithProviders } from '@/libs/test.utils';
import { Comment } from '@/redux/slices/commentSlice';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

describe('CommentList Component', () => {
  const mockComments: Comment[] = [
    {
      id: '1',
      text: 'First Comment',
      author: 'User 1',
      timestamp: 1711612800000,
    },
    {
      id: '2',
      text: 'Second Comment',
      author: 'User 2',
      timestamp: 1711612800000,
    },
  ];

  beforeEach(() => {
    renderWithProviders(<CommentList />, {
      preloadedState: {
        comment: {
          comments: mockComments,
        },
      },
    });
  });

  it('renders the comment list heading', () => {
    const heading = screen.getByRole('heading', {
      level: 1,
      name: /comment list/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders the text for each comment from redux store', () => {
    expect(screen.getByText('First Comment')).toBeInTheDocument();
    expect(screen.getByText('Second Comment')).toBeInTheDocument();
  });

  it('renders the author for each comment', () => {
    expect(screen.getByText(/User 1/)).toBeInTheDocument();
    expect(screen.getByText(/User 2/)).toBeInTheDocument();
  });
});

