import SignInPage from '@/app/signin/page';
import { renderWithProviders } from '@/libs/test.utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('SignIn Page', () => {
  beforeEach(() => {
    mockPush.mockClear();
    jest.restoreAllMocks();
  });

  it('renders form inputs and submit button', () => {
    renderWithProviders(<SignInPage />);

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^sign in$/i })).toBeInTheDocument();
  });

  it('shows error message when login fails', async () => {
    const user = userEvent.setup();

    // Mock fetch failure response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid login credentials' }),
    } as Response);

    renderWithProviders(<SignInPage />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /^sign in$/i });

    await user.type(emailInput, 'wrong@example.com');
    await user.type(passwordInput, 'wrongpass');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid login credentials');
    });
  });

  it('redirects to /feature when login succeeds', async () => {
    const user = userEvent.setup();

    // Mock fetch success response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'fake-jwt-token',
        user: { email: 'success@example.com' },
      }),
    } as Response);

    renderWithProviders(<SignInPage />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /^sign in$/i });

    await user.type(emailInput, 'success@example.com');
    await user.type(passwordInput, 'correctpass');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/feature');
    });
  });
});
