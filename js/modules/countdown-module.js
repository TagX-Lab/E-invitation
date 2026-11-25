/**
 * Countdown Module
 * Computes live ticking days, hours, minutes, and seconds.
 */
export function initCountdown(targetDateStr) {
  const weddingDate = new Date(targetDateStr).getTime();
  const dEl = document.getElementById('d-val');
  const hEl = document.getElementById('h-val');
  const mEl = document.getElementById('m-val');
  const sEl = document.getElementById('s-val');

  if (!dEl || !hEl || !mEl || !sEl) return;

  function update() {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      dEl.innerText = String(days).padStart(2, '0');
      hEl.innerText = String(hours).padStart(2, '0');
      mEl.innerText = String(minutes).padStart(2, '0');
      sEl.innerText = String(seconds).padStart(2, '0');
    } else {
      dEl.innerText = '00';
      hEl.innerText = '00';
      mEl.innerText = '00';
      sEl.innerText = '00';
    }
  }

  setInterval(update, 1000);
  update();
}
