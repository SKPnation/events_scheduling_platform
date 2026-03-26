import { getAuthState, subscribe } from "../state/store.js";
import { login, logout, switchRole } from "../services/authService.js";
import { roleLabel } from "../utils/formatters.js";

export function renderAuthPanel(root, options = {}) {
  const { onToast, onRoleChange } = options;

  if (!root) return;

  root.innerHTML = `
    <section class="card" id="authCard">
      <div class="hd">
        <div>
          <h2>Login (Prototype)</h2>
          <p>Single web app with RBAC views. In a real system, role checks happen on the server + DB.</p>
        </div>
        <span class="badge ok">RBAC</span>
      </div>

      <div class="bd">
        <div class="stack">
          <div class="field">
            <label for="email">Email</label>
            <input id="email" placeholder="you@school.edu" />
          </div>

          <div class="field">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="••••••••" />
            <div class="hint">Prototype only — no real authentication in this file.</div>
          </div>

          <div class="field">
            <label for="roleSelect">Role</label>
            <select id="roleSelect">
              <option value="admin">System Administrator</option>
              <option value="organizer">Event Organizer</option>
              <option value="attendee">Attendee</option>
            </select>
            <div class="hint">In your DB: <b>User</b> → <b>Role</b> (FK) for normalization.</div>
          </div>

          <button class="btn primary" id="loginBtn" type="button">Login</button>

          <div class="divider"></div>

          <div class="panel">
            <h3>Session</h3>
            <p id="authSessionText">Not logged in.</p>

            <div style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
              <button class="btn small" id="switchRoleBtn" type="button">Switch Role</button>
              <button class="btn danger small" id="logoutBtn" type="button">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const emailInput = root.querySelector("#email");
  const passwordInput = root.querySelector("#password");
  const roleSelect = root.querySelector("#roleSelect");
  const loginBtn = root.querySelector("#loginBtn");
  const switchRoleBtn = root.querySelector("#switchRoleBtn");
  const logoutBtn = root.querySelector("#logoutBtn");
  const authSessionText = root.querySelector("#authSessionText");

  function syncAuthUi() {
    const auth = getAuthState();

    emailInput.value = auth.email || "admin@festival.edu";
    passwordInput.value = "password";
    roleSelect.value = auth.role || "admin";

    authSessionText.textContent = auth.isLoggedIn
      ? `Logged in as ${roleLabel(auth.role)}`
      : "Not logged in.";
  }

  loginBtn.addEventListener("click", () => {
    const result = login({
      email: emailInput.value,
      password: passwordInput.value,
      role: roleSelect.value,
    });

    if (result.ok && typeof onRoleChange === "function") {
      onRoleChange(getAuthState());
    }

    if (typeof onToast === "function") {
      onToast(result.title, result.ok ? `Viewing as ${roleLabel(roleSelect.value)}.` : result.message);
    }

    syncAuthUi();
  });

  switchRoleBtn.addEventListener("click", () => {
    const result = switchRole();
    const auth = getAuthState();

    roleSelect.value = auth.role;
    emailInput.value = auth.email || "admin@festival.edu";

    if (typeof onRoleChange === "function") {
      onRoleChange(auth);
    }

    if (typeof onToast === "function") {
      onToast(result.title, `Now viewing as ${roleLabel(result.role)}.`);
    }

    syncAuthUi();
  });

  logoutBtn.addEventListener("click", () => {
    const result = logout();

    if (typeof onRoleChange === "function") {
      onRoleChange(getAuthState());
    }

    if (typeof onToast === "function") {
      onToast(result.title, result.message);
    }

    syncAuthUi();
  });

  const unsubscribe = subscribe(() => {
    syncAuthUi();
  });

  syncAuthUi();

  return () => {
    unsubscribe();
  };
}