export interface StoredUser {
  id: string;
  email: string;
  hash: string;
  salt: string;
}

// Global in-memory user store for demonstration
declare global {
  var __usersDb: Map<string, StoredUser> | undefined;
}

if (!globalThis.__usersDb) {
  globalThis.__usersDb = new Map<string, StoredUser>();
}

export const usersDb = globalThis.__usersDb;
