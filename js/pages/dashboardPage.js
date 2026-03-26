import { getAuthState } from "../state/store.js";

export function renderDashboardPage(root) {
  if (!root) return;

  const auth = getAuthState();

  root.innerHTML = `
    <div class="stack">
      <section class="card">
        <div class="hd">
          <div>
            <h2>Dashboard</h2>
            <p>This area changes based on the logged-in role.</p>
          </div>
          <span class="badge ok">${auth.role}</span>
        </div>

        <div class="bd">
          <div class="kpi">
            <div class="box">
              <h3>Total Events</h3>
              <div class="num">24</div>
              <div class="sub">Visible to ${auth.role}</div>
            </div>

            <div class="box">
              <h3>Active Users</h3>
              <div class="num">138</div>
              <div class="sub">Current platform activity</div>
            </div>

            <div class="box">
              <h3>Pending Approvals</h3>
              <div class="num">9</div>
              <div class="sub">Requires action</div>
            </div>

            <div class="box">
              <h3>Revenue</h3>
              <div class="num">$12.4k</div>
              <div class="sub">This month</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}