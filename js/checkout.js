document.addEventListener('DOMContentLoaded', () => {
  const subtotal = 260000;
  let shippingCost = 15000;

  const courierCosts = {
    reguler: 15000,
    instant: 25000,
    pickup: 0,
    cod: 18000
  };

  const courierOptions = document.querySelectorAll('.courier-option');
  const shippingText = document.getElementById('shippingText');
  const totalText = document.getElementById('totalText');

  const updateTotal = () => {
    shippingText.textContent = `Rp ${shippingCost.toLocaleString('id-ID')}`;
    const grandTotal = subtotal + shippingCost;
    totalText.textContent = `Rp ${grandTotal.toLocaleString('id-ID')}`;
  };

  courierOptions.forEach(opt => {
    const radio = opt.querySelector('input[type="radio"]');
    radio.addEventListener('change', () => {
      courierOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      shippingCost = courierCosts[radio.value] || 0;
      updateTotal();
    });
  });

  const btnChangeAddr = document.querySelector('.btn-change-addr');
  btnChangeAddr.addEventListener('click', () => {
    const newAddr = prompt('Masukkan alamat baru:');
    if (newAddr) {
      document.querySelector('.address-box p').textContent = newAddr;
    }
  });
});
