import CommentBox from '@/components/modules/home/comment/comment-box';
import { renderWithProviders } from '@/libs/test.utils';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CommentBox Component', () => {
  beforeEach(() => {
    renderWithProviders(<CommentBox />, {});
  });

  it('renders a textarea and a submit button', () => {
    const textarea = screen.getByPlaceholderText('Enter your comment');
    const button = screen.getByRole('button', { name: /submit/i });

    expect(textarea).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  describe('when typing and submitting comment', () => {
    const sampleComment = 'This is a test comment';

    it('updates textarea value when user types', async () => {
      const user = userEvent.setup();
      const textarea = screen.getByPlaceholderText('Enter your comment');

      // Simulate user typing into textarea
      await user.type(textarea, sampleComment);

      expect(textarea).toHaveValue(sampleComment);
    });

    it('clears textarea after form submission', async () => {
      const user = userEvent.setup();
      const textarea = screen.getByPlaceholderText('Enter your comment');
      const submitButton = screen.getByRole('button', { name: /submit/i });

      // Step 1: User types comment
      await user.type(textarea, sampleComment);
      expect(textarea).toHaveValue(sampleComment);

      // Step 2: User clicks submit button
      await user.click(submitButton);

      // Step 3: Textarea should be emptied
      expect(textarea).toHaveValue('');
    });
  });
});
