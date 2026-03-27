type Session = {
  session: null;
  user: null;
};

function useSession(): { data: Session } {
  return { data: { session: null, user: null } };
}

async function noop(): Promise<{ data: null; error: null }> {
  return { data: null, error: null };
}

export const authClient = {
  admin: {
    banUser: noop,
    createUser: noop,
    listUsers: async () => ({ data: { total: 0, users: [] }, error: null }),
    revokeUserSessions: noop,
    setRole: noop,
    unbanUser: noop,
  },
  signIn: {
    email: async () => ({ data: null, error: null }),
  },
  signOut: async () => {},
  useSession,
};
