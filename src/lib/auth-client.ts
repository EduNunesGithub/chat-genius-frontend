type AuthError = { message: string };
type AuthResult = { data: null; error: AuthError | null };

type Session = {
  session: null;
  user: null;
};

function useSession(): { data: Session } {
  return { data: { session: null, user: null } };
}

async function noop(_params?: unknown): Promise<AuthResult> {
  return { data: null, error: null };
}

export const authClient = {
  admin: {
    banUser: noop,
    createUser: noop,
    listUsers: async () => ({
      data: { total: 0, users: [] as unknown[] },
      error: null,
    }),
    revokeUserSessions: noop,
    setRole: noop,
    unbanUser: noop,
  },
  signIn: {
    email: async (_params?: unknown): Promise<AuthResult> => ({
      data: null,
      error: null,
    }),
  },
  signOut: async () => {},
  useSession,
};
