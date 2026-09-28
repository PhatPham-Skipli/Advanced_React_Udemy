import authReducer, {
  AuthState,
  clearAuthError,
  logOut,
  setAuthError,
  setCredentials,
} from '@/redux/slices/authSlice';

describe('authSlice reducer', () => {
  const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
    errorMessage: null,
    user: null,
  };

  it('should return initial state when passed an empty action', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('handles setCredentials correctly (AUTH_USER pattern)', () => {
    const action = setCredentials({
      token: 'jwt-mock-token-xyz',
      user: { email: 'test@example.com' },
    });

    const newState = authReducer(initialState, action);

    expect(newState.isAuthenticated).toBe(true);
    expect(newState.token).toBe('jwt-mock-token-xyz');
    expect(newState.user?.email).toBe('test@example.com');
    expect(newState.errorMessage).toBeNull();
  });

  it('handles logOut correctly (UNAUTH_USER pattern)', () => {
    const loggedInState: AuthState = {
      token: 'jwt-mock-token-xyz',
      isAuthenticated: true,
      errorMessage: null,
      user: { email: 'test@example.com' },
    };

    const newState = authReducer(loggedInState, logOut());

    expect(newState.isAuthenticated).toBe(false);
    expect(newState.token).toBeNull();
    expect(newState.user).toBeNull();
  });

  it('handles setAuthError and clearAuthError (AUTH_ERROR pattern)', () => {
    const errorState = authReducer(
      initialState,
      setAuthError('Invalid credentials'),
    );
    expect(errorState.errorMessage).toBe('Invalid credentials');

    const clearedState = authReducer(errorState, clearAuthError());
    expect(clearedState.errorMessage).toBeNull();
  });
});
