const listeners = new Set();

const state = {
  auth: {
    isLoggedIn: false,
    email: "admin@festival.edu",
    role: "admin",
  },
  ui: {
    tab: "dashboard",
    statusFilter: "all",
  },
};

export function getState() {
  return structuredClone(state);
}

export function getAuthState() {
  return structuredClone(state.auth);
}

export function getUiState() {
  return structuredClone(state.ui);
}

export function setState(updater) {
  const next =
    typeof updater === "function"
      ? updater(structuredClone(state))
      : updater;

  if (!next || typeof next !== "object") return;

  if (next.auth) {
    state.auth = { ...state.auth, ...next.auth };
  }

  if (next.ui) {
    state.ui = { ...state.ui, ...next.ui };
  }

  emitChange();
}

export function setAuthState(patch) {
  state.auth = { ...state.auth, ...patch };
  emitChange();
}

export function setUiState(patch) {
  state.ui = { ...state.ui, ...patch };
  emitChange();
}

export function subscribe(listener) {
  if (typeof listener !== "function") return () => {};
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function emitChange() {
  const snapshot = getState();
  listeners.forEach((listener) => listener(snapshot));
}