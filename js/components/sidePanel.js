import { renderAuthPanel } from "./authPanel.js";
import { getState, setUiState, subscribe } from "../state/store.js";

export function renderSidePanel(root, options = {}) {
  const { onToast } = options;
  if (!root) return;

  root.innerHTML = `
    <div class="stack" id="sidePanelWrap">
      <div id="authPanelMount"></div>

      <section class="card">
        <div class="hd">
          <div>
            <h2>Navigation</h2>
            <p>Choose a page to display in the main panel.</p>
          </div>
        </div>

        <div class="bd">
          <div class="tabs" id="sideNavTabs">
            <button class="tab" data-tab="dashboard" type="button">Dashboard</button>
            <button class="tab" data-tab="events" type="button">Events</button>
            <button class="tab" data-tab="attendees" type="button">Attendees</button>
            <button class="tab" data-tab="reports" type="button">Reports</button>
            <button class="tab" data-tab="resources" type="button">Resources</button>
            <button class="tab" data-tab="schedule" type="button">Schedule</button>
          </div>
        </div>
      </section>
    </div>
  `;

  const authMount = root.querySelector("#authPanelMount");
  const tabsWrap = root.querySelector("#sideNavTabs");

  renderAuthPanel(authMount, {
    onToast,
    onRoleChange: () => {},
  });

  function syncTabs() {
    const state = getState();
    const activeTab = state.ui.tab;

    tabsWrap.querySelectorAll(".tab").forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === activeTab);
    });
  }

  tabsWrap.addEventListener("click", (event) => {
    const button = event.target.closest(".tab");
    if (!button) return;

    setUiState({ tab: button.dataset.tab });

    if (typeof onToast === "function") {
      onToast("Navigation updated", `Opened ${button.dataset.tab}.`);
    }
  });

  const unsubscribe = subscribe(() => {
    syncTabs();
  });

  syncTabs();

  return () => {
    unsubscribe();
  };
}