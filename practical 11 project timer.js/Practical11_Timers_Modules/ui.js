// ui.js - viewport handling and dynamic session UI
import { logEvent } from './helper.js';

export function handleViewportChange() {
  const setBg = () => {
    const w = window.innerWidth;
    if (w < 600) {
      document.body.style.backgroundColor = '#f0f8ff';
    } else {
      document.body.style.backgroundColor = 'white';
    }
  };
  // run once and add listener
  
  setBg();
  window.addEventListener('resize', setBg);
}

export function addDynamicSessions() {
  const container = document.getElementById('sessions');
  if (!container) return;
  // event delegation: clicking a session shows alert with details
  
  container.addEventListener('click', (e) => {
    const session = e.target.closest('.session');
    if (!session) return;
    const title = session.querySelector('.title')?.textContent || 'Session';
    const time = session.dataset.time || 'Unknown';
    alert(`Session: ${title} at ${time}`);
    logEvent(`Clicked session ${title} @ ${time}`);
  });
}

export function addNewSession() {
  const btn = document.getElementById('addSession');
  const container = document.getElementById('sessions');
  if (!btn || !container) return;

  btn.addEventListener('click', () => {
    const now = new Date();
    // next slot: add 1 hour beyond last session or next full hour
    const sessions = Array.from(container.querySelectorAll('.session'));
    let nextHour = now.getHours() + 1;
    if (sessions.length) {
      const last = sessions[sessions.length - 1].dataset.time; // HH:MM
      const parts = last.split(':').map(Number);
      nextHour = parts[0] + 1;
    }
    nextHour = nextHour % 24;
    const timeStr = `${String(nextHour).padStart(2, '0')}:00`;
    const div = document.createElement('div');
    div.className = 'session';
    div.dataset.time = timeStr;
    div.innerHTML = `<span class="title">New Class</span><span class="time">${timeStr}</span>`;
    container.appendChild(div);
    logEvent(`Added new session at ${timeStr}`);
  });
}
