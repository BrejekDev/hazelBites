document.addEventListener('DOMContentLoaded', () => {
  let quantity = 1;
  let basePrice = 95000;

  const displayPrice = document.getElementById('displayPrice');
  const qtyValue = document.getElementById('qtyValue');
  const btnMinus = document.getElementById('btnMinus');
  const btnPlus = document.getElementById('btnPlus');
  const weightButtons = document.querySelectorAll('.btn-weight');
  const btnAddToCart = document.getElementById('btnAddToCart');

  const updatePrice = () => {
    const total = basePrice * quantity;
    displayPrice.textContent = `Rp ${total.toLocaleString('id-ID')}`;
  };

  weightButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      weightButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      basePrice = parseInt(btn.dataset.price, 10);
      updatePrice();
    });
  });

  btnMinus.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      qtyValue.textContent = quantity;
      updatePrice();
    }
  });

  btnPlus.addEventListener('click', () => {
    quantity++;
    qtyValue.textContent = quantity;
    updatePrice();
  });

  btnAddToCart.addEventListener('click', () => {
    alert(`Berhasil menambahkan ${quantity} item ke keranjang!`);
  });
});
