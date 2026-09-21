const USERS_KEY = "ironpulse_users";
const SESSION_KEY = "ironpulse_session";

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(user) {
  const session = { name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("ironpulse:auth"));
  return session;
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function logOut() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("ironpulse:auth"));
}

export function signUp({ name, email, password }) {
  const users = readUsers();

  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("An account with this email already exists.");
  }

  const user = { name, email, password };
  writeUsers([...users, user]);
  return setSession(user);
}

export function logIn({ email, password }) {
  const users = readUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    throw new Error("Incorrect email or password.");
  }

  return setSession(user);
}
