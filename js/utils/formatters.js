export function roleLabel(role) {
  switch (role) {
    case "admin":
      return "Admin";
    case "organizer":
      return "Organizer";
    case "attendee":
      return "Attendee";
    default:
      return "User";
  }
}

export function titleCase(value = "") {
  return value
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export function safeText(value, fallback = "—") {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  return text.length ? text : fallback;
}

export function normalizeEmail(value = "") {
  return String(value).trim().toLowerCase();
}