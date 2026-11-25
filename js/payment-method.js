document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Bank selection
  const bankItems = document.querySelectorAll('.bank-item');
  const vaNumberDisplay = document.getElementById('vaNumberDisplay');
  const bankPrefixes = {
    BCA: '8808 1234 5678 9012',
    Mandiri: '8900 9876 5432 1098',
    BNI: '8810 5544 3322 1100',
    BRI: '8801 7788 9900 1122'
  };

  bankItems.forEach(item => {
    const radio = item.querySelector('input[type="radio"]');
    radio.addEventListener('change', () => {
      bankItems.forEach(b => b.classList.remove('active'));
      item.classList.add('active');
      vaNumberDisplay.textContent = bankPrefixes[radio.value] || '8808 xxxx xxxx xxxx';
    });
  });

  // Copy VA
  const btnCopyVA = document.getElementById('btnCopyVA');
  btnCopyVA.addEventListener('click', () => {
    const num = vaNumberDisplay.textContent.replace(/\s+/g, '');
    navigator.clipboard.writeText(num).then(() => {
      btnCopyVA.textContent = 'Tersalin!';
      setTimeout(() => {
        btnCopyVA.textContent = 'Salin';
      }, 2000);
    });
  });

  // Countdown timer simulation
  let seconds = 24 * 3600 - 48; // ~23:59:12
  const timerElem = document.getElementById('timerCountdown');
  setInterval(() => {
    if (seconds > 0) {
      seconds--;
      const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      timerElem.textContent = `${h}:${m}:${s}`;
    }
  }, 1000);
});
