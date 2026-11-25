/**
 * Envelope Module
 * 3D Unsealing lifecycle, wax seal interactions, and card reveal orchestration.
 */
let isEnvelopeOpened = false;

export function initEnvelopeModule(onOpenCallback) {
  const envelopeBox = document.getElementById('envelopeBox');
  const tapHint = document.getElementById('tapHint');

  const triggerOpen = () => {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    if (envelopeBox) envelopeBox.classList.add('is-opening');

    if (typeof onOpenCallback === 'function') {
      onOpenCallback();
    }

    setTimeout(() => {
      const envelopeScreen = document.getElementById('envelopeScreen');
      const invitationContent = document.getElementById('invitationContent');
      const wrapper = document.getElementById('mobileWrapper');

      if (envelopeScreen) envelopeScreen.classList.add('opened');
      if (invitationContent) invitationContent.classList.add('active');
      if (wrapper) wrapper.classList.remove('envelope-locked');
    }, 700);
  };

  if (envelopeBox) envelopeBox.addEventListener('click', triggerOpen);
  if (tapHint) tapHint.addEventListener('click', triggerOpen);
}
