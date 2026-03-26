import { getAuthState, subscribe } from "../state/store.js";
import { roleLabel } from "../utils/formatters.js";

export function renderTopbar(root) {
  if (!root) return;

  function render() {
    const auth = getAuthState();

    root.innerHTML = `
      <div class="topbar">
        <div class="topbar-inner">
          
          <div class="brand">
            <div class="logo"></div>
            <div>
              <h1>Festival Management System</h1>
              <p>
                ${
                  auth.isLoggedIn
                    ? `Logged in as ${roleLabel(auth.role)}`
                    : "Prototype dashboard"
                }
              </p>
            </div>
          </div>

          <div class="top-actions">
            ${
              auth.isLoggedIn
                ? `
                <span class="pill">
                  Role: <b>${roleLabel(auth.role)}</b>
                </span>
              `
                : `
                <span class="pill">
                  Not logged in
                </span>
              `
            }
          </div>

        </div>
      </div>
    `;
  }

  // Initial render
  render();

  // Auto re-render when state changes
  const unsubscribe = subscribe(() => {
    render();
  });

  // Optional cleanup (if you ever unmount)
  return () => {
    unsubscribe();
  };
}