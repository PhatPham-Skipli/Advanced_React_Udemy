import MainPage from '@/app/(main)/page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock(
  '@/components/modules/home/comment/comment-box',
  () =>
    function MockCommentBox() {
      return <div>Comment Box</div>;
    },
);
jest.mock(
  '@/components/modules/home/comment/comment-list',
  () =>
    function MockCommentList() {
      return <div>Comment List</div>;
    },
);
jest.mock(
  '@/components/modules/home/comment/comment-list-class',
  () =>
    function MockCommentListClass() {
      return <div>Comment List</div>;
    },
);

beforeEach(() => {
  render(<MainPage />);
});

describe('Main Page', () => {
  it('renders a heading', () => {
    const heading = screen.getByRole('heading', { name: 'Main' });

    expect(heading).toBeInTheDocument();
  });

  it('renders comment box', () => {
    const commentBox = screen.getByText('Comment Box');

    expect(commentBox).toBeInTheDocument();
  });

  it('renders comment list', () => {
    const commentList = screen.getByText('Comment List');

    expect(commentList).toBeInTheDocument();
  });
});
