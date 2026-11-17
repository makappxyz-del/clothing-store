const USERS_KEY = 'lebaya-users-v1';
const SESSION_KEY = 'lebaya-session-v1';
const PBKDF2_ITERATIONS = 120000;

function readUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

function bytesToHex(bytes) {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function passwordHash(password, salt) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' }, key, 256);
  return bytesToHex(bits);
}

export async function registerUser({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = readUsers();
  if (users.some((user) => user.email === normalizedEmail)) throw new Error('An account with this email already exists. Please log in.');
  const salt = bytesToHex(crypto.getRandomValues(new Uint8Array(16)));
  const user = { name: name.trim(), email: normalizedEmail, salt, passwordHash: await passwordHash(password, salt) };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  const session = { name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function loginUser({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = readUsers().find((item) => item.email === normalizedEmail);
  if (!user || (await passwordHash(password, user.salt)) !== user.passwordHash) throw new Error('Email or password is incorrect.');
  const session = { name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getCurrentUser() {
  try {
    const user = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    return user && typeof user.email === 'string' ? user : null;
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}
