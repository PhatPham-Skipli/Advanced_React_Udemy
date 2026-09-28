import Header from '@/components/modules/layout/header';
import { renderWithProviders } from '@/libs/test.utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Header Component', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  describe('when user is unauthenticated', () => {
    beforeEach(() => {
      renderWithProviders(<Header />, {
        preloadedState: {
          auth: {
            token: null,
            isAuthenticated: false,
            errorMessage: null,
            user: null,
          },
        },
      });
    });

    it('renders navigation links', () => {
      expect(screen.getByText('Redux Auth')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Protected Feature')).toBeInTheDocument();
    });

    it('renders Sign In and Sign Up buttons', () => {
      expect(
        screen.getByRole('button', { name: /sign in/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /sign up/i }),
      ).toBeInTheDocument();
    });

    it('does not render Sign Out button', () => {
      expect(
        screen.queryByRole('button', { name: /sign out/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe('when user is authenticated', () => {
    const mockEmail = 'john@example.com';

    beforeEach(() => {
      renderWithProviders(<Header />, {
        preloadedState: {
          auth: {
            token: 'valid-jwt-token',
            isAuthenticated: true,
            errorMessage: null,
            user: { email: mockEmail },
          },
        },
      });
    });

    it('renders user email greeting', () => {
      expect(screen.getByText(mockEmail)).toBeInTheDocument();
    });

    it('renders Sign Out button instead of Sign In / Sign Up', () => {
      expect(
        screen.getByRole('button', { name: /sign out/i }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /sign in/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /sign up/i }),
      ).not.toBeInTheDocument();
    });

    it('dispatches logout and redirects to home when Sign Out is clicked', async () => {
      const user = userEvent.setup();
      const signOutButton = screen.getByRole('button', { name: /sign out/i });

      await user.click(signOutButton);

      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});
