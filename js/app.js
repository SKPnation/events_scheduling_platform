import { renderTopbar } from './components/Topbar.js';
import { renderLeftPanel } from './components/LeftPanel.js';
import { renderMainPanel } from './components/MainPanel.js';
import { initToast } from './components/Toast.js';
import { initializeAppState } from './state/store.js';
import { loadDashboard } from './views/DashboardView.js';

function bootstrapApp() {
  const roots = {
    topbar: document.getElementById('topbarRoot'),
    leftPanel: document.getElementById('leftPanelRoot'),
    mainPanel: document.getElementById('mainPanelRoot'),
    toast: document.getElementById('toastRoot'),
  };

  initializeAppState();

  renderTopbar(roots.topbar);
  renderLeftPanel(roots.leftPanel);
  renderMainPanel(roots.mainPanel);
  initToast(roots.toast);

  loadDashboard(roots.mainPanel);
}

document.addEventListener('DOMContentLoaded', bootstrapApp);