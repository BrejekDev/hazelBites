document.addEventListener('DOMContentLoaded', () => {
  let discount = 0;

  const updateTotals = () => {
    let subtotal = 0;
    const cards = document.querySelectorAll('.cart-card');
    cards.forEach(card => {
      const price = parseInt(card.dataset.price, 10);
      const qty = parseInt(card.querySelector('.qty-number').textContent, 10);
      subtotal += price * qty;
    });

    const total = Math.max(0, subtotal - discount);

    document.getElementById('subtotalVal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('discountVal').textContent = `Rp -${discount.toLocaleString('id-ID')}`;
    document.getElementById('totalVal').textContent = `Rp ${total.toLocaleString('id-ID')}`;
  };

  document.querySelectorAll('.cart-card').forEach(card => {
    const qtySpan = card.querySelector('.qty-number');
    const minusBtn = card.querySelector('.btn-qty.minus');
    const plusBtn = card.querySelector('.btn-qty.plus');
    const removeBtn = card.querySelector('.btn-remove');

    minusBtn.addEventListener('click', () => {
      let q = parseInt(qtySpan.textContent, 10);
      if (q > 1) {
        qtySpan.textContent = q - 1;
        updateTotals();
      }
    });

    plusBtn.addEventListener('click', () => {
      let q = parseInt(qtySpan.textContent, 10);
      qtySpan.textContent = q + 1;
      updateTotals();
    });

    removeBtn.addEventListener('click', () => {
      card.remove();
      updateTotals();
    });
  });

  const btnApplyVoucher = document.getElementById('btnApplyVoucher');
  const voucherCode = document.getElementById('voucherCode');

  btnApplyVoucher.addEventListener('click', () => {
    const code = voucherCode.value.trim().toUpperCase();
    if (code === 'DISKON20') {
      discount = 20000;
      alert('Voucher berhasil digunakan! Potongan Rp 20.000');
    } else if (code) {
      alert('Kode voucher tidak valid!');
      discount = 0;
    }
    updateTotals();
  });
});
