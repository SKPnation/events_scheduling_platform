let hideTimer;

export function initToast(root) {
  if (!root) return;

  root.innerHTML = `
    <div class="toast" id="appToast">
      <h5 id="appToastTitle"></h5>
      <p id="appToastMessage"></p>
    </div>
  `;
}

export function showToast(title, message) {
  const toast = document.getElementById("appToast");
  const titleEl = document.getElementById("appToastTitle");
  const messageEl = document.getElementById("appToastMessage");

  if (!toast || !titleEl || !messageEl) return;

  titleEl.textContent = title ?? "";
  messageEl.textContent = message ?? "";

  toast.classList.add("show");

  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}