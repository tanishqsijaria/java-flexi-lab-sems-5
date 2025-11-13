// timer.js - countdown and session highlighting
import { formatTime, logEvent } from './helper.js';

let countdownInterval = null;
let highlightInterval = null;

export function startCountdown(duration, display) {
  // clear existing if any
  if (countdownInterval) clearInterval(countdownInterval);
  let remaining = duration;
  display.textContent = formatTime(remaining);

  countdownInterval = setInterval(() => {
    remaining -= 1;
    if (remaining < 0) {
      clearInterval(countdownInterval);
      display.textContent = 'Session Started!';
      logEvent('Countdown reached zero');
      return;
    }

    display.textContent = formatTime(remaining);

    // if less than 60 seconds show warning style
    if (remaining < 60) {
      display.classList.add('countdown-warning');
    } else {
      display.classList.remove('countdown-warning');
    }
  }, 1000);

  logEvent(`Started countdown for ${duration} seconds`);
  return () => clearInterval(countdownInterval); // return stop function
}

function parseTimeStringToMinutes(timeStr) {
  // expects HH:MM or H:MM
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

export function highlightActiveSession() {
  // Determine 'current' based on current hour:minute and highlight session whose data-time <= now < next
  const sessions = Array.from(document.querySelectorAll('.session'));
  if (!sessions.length) return;
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  let activeIndex = -1;
  for (let i = 0; i < sessions.length; i++) {
    const t = sessions[i].dataset.time; // HH:MM
    const sessionMinutes = parseTimeStringToMinutes(t);
    // simple rule: active if sessionMinutes <= nowMinutes < sessionMinutes + 60 (1-hour slot)
    if (nowMinutes >= sessionMinutes && nowMinutes < sessionMinutes + 60) {
      activeIndex = i;
      break;
    }
  }

  sessions.forEach((el, idx) => {
    if (idx === activeIndex) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // log which session is active
  if (activeIndex >= 0) {
    logEvent(`Active session: ${sessions[activeIndex].dataset.time} (${sessions[activeIndex].querySelector('.title')?.textContent || ''})`);
  }
}

export function startPeriodicHighlight(intervalSeconds = 60) {
  // clear existing
  if (highlightInterval) clearInterval(highlightInterval);
  highlightActiveSession();
  highlightInterval = setInterval(highlightActiveSession, intervalSeconds * 1000);
  return () => clearInterval(highlightInterval);
}
