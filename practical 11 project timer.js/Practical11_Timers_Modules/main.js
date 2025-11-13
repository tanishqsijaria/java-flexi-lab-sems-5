// main.js - application bootstrap
import { startCountdown, startPeriodicHighlight } from './timer.js';
import { handleViewportChange, addDynamicSessions, addNewSession } from './ui.js';
import { formatTime, logEvent } from './helper.js';

window.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('countdown');
  if (!display) return;

  // Start a 5-minute countdown (300s)
  startCountdown(300, display);
  // highlight active session immediately and every 60 seconds
  startPeriodicHighlight(60);

  // wire UI helpers
  
  handleViewportChange();
  addDynamicSessions();
  addNewSession();

  logEvent('App initialized');
});
