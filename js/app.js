import { renderTopbar } from "./components/topbar.js";
import { renderSidePanel } from "./components/sidePanel.js";
import { renderDashboardPage } from "./pages/dashboardPage.js";
import { subscribe } from "./state/store.js";
import { initToast, showToast } from "./utils/toast.js";

const roots = {
  topbar: document.getElementById("topbarRoot"),
  leftPanel: document.getElementById("leftPanelRoot"),
  mainPanel: document.getElementById("mainPanelRoot"),
  toast: document.getElementById("toastRoot"),
};

function renderCurrentPage() {
  const state = getState();

  switch (state.ui.tab) {
    case "dashboard":
    default:
      renderDashboardPage(roots.mainPanel);
      break;
  }
}

function renderApp() {
  renderTopbar(roots.topbar);
  renderCurrentPage();
}

function bootstrapApp() {
  initToast(roots.toast);

  renderSidePanel(roots.leftPanel, {
    onToast: showToast,
  });

  renderApp();

  subscribe(() => {
    renderApp();
  });
}

bootstrapApp();