/**
 * Ceremonies & Interactions Module
 * Handles Akshadhai shower, floating blessing particles, and dynamic action links.
 */
const blessingsList = ['🌸', '🪷', '✨', '💐', '🎉', '💍', '💛', '🌺', '🌾'];

export function createBlessingParticles(originX, originY, count = 20) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'blessing-float';
    el.innerText = blessingsList[Math.floor(Math.random() * blessingsList.length)];
    
    const offsetX = (Math.random() - 0.5) * 180;
    const offsetY = (Math.random() - 0.5) * 60;
    
    el.style.left = (originX + offsetX) + 'px';
    el.style.top = (originY + offsetY) + 'px';
    
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2800);
  }
}

export function initCeremoniesModule(config, onChime) {
  const plateBtn = document.getElementById('akshadhaiPlate');
  if (plateBtn) {
    plateBtn.addEventListener('click', (e) => {
      const x = e.clientX || window.innerWidth / 2;
      const y = e.clientY || window.innerHeight / 2;
      createBlessingParticles(x, y, 25);
      if (typeof onChime === 'function') onChime();
    });
  }

  // Bind WhatsApp RSVP link
  const rsvpLink = document.getElementById('rsvpLink');
  if (rsvpLink && config.social?.whatsappMessage) {
    rsvpLink.href = `https://wa.me/?text=${encodeURIComponent(config.social.whatsappMessage)}`;
  }

  // Bind Maps Link
  const mapsLink = document.getElementById('mapsLink');
  if (mapsLink && config.venue?.mapsUrl) {
    mapsLink.href = config.venue.mapsUrl;
  }

  // Bind Calendar Link
  const calLink = document.getElementById('calendarLink');
  if (calLink && config.social) {
    const { calendarTitle, calendarDates, calendarDetails } = config.social;
    const loc = config.venue?.name || '';
    calLink.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarTitle)}&dates=${calendarDates}&details=${encodeURIComponent(calendarDetails)}&location=${encodeURIComponent(loc)}`;
  }
}
