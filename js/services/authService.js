import { getAuthState, setAuthState, setUiState } from "../state/store.js";
import { normalizeEmail } from "../utils/formatters.js";

const ALLOWED_ROLES = ["admin", "organizer", "attendee"];

export function login({ email, password, role }) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return {
      ok: false,
      title: "Login failed",
      message: "Email is required.",
    };
  }

  if (!password) {
    return {
      ok: false,
      title: "Login failed",
      message: "Password is required.",
    };
  }

  if (!ALLOWED_ROLES.includes(role)) {
    return {
      ok: false,
      title: "Login failed",
      message: "Please select a valid role.",
    };
  }

  setAuthState({
    isLoggedIn: true,
    email: normalizedEmail,
    role,
  });

  setUiState({
    tab: "dashboard",
  });

  return {
    ok: true,
    title: "Logged in",
    message: `Viewing as ${role}.`,
  };
}

export function logout() {
  setAuthState({
    isLoggedIn: false,
    email: "",
    role: "admin",
  });

  setUiState({
    tab: "dashboard",
  });

  return {
    ok: true,
    title: "Logged out",
    message: "You have been logged out of the prototype.",
  };
}

export function switchRole() {
  const { role, email, isLoggedIn } = getAuthState();
  const roles = ["admin", "organizer", "attendee"];
  const currentIndex = roles.indexOf(role);
  const nextRole = roles[(currentIndex + 1) % roles.length];

  setAuthState({
    isLoggedIn,
    email,
    role: nextRole,
  });

  setUiState({
    tab: "dashboard",
  });

  return {
    ok: true,
    title: "Role switched",
    role: nextRole,
    message: `Now viewing as ${nextRole}.`,
  };
}