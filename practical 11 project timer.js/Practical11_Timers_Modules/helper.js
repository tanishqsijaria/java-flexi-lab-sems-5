// helper.js - formatting and logging utilities

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export function logEvent(msg) {
  const ts = new Date().toLocaleString();
  console.log(`[${ts}] ${msg}`);
}
