/* ==========================================================
   Hazel Bites - core.js
   Kumpulan variabel dan fungsi yang dipakai semua halaman.

   Materi yang dipakai:
   - Variabel      : const / let
   - Tipe data     : number, string, boolean, object, array
   - Object        : HARGA_UKURAN, KERANJANG_AWAL
   - Array         : daftar item keranjang, daftar default
   - Array of Object: KERANJANG_AWAL
   - Control flow  : if, for
   - HTML DOM      : querySelector, querySelectorAll, textContent, classList
   ========================================================== */

/* ---------- Object: harga berdasarkan ukuran ---------- */
const HARGA_UKURAN = {
  "350 Gram": 125000,
  "500 Gram": 175000,
  "750 Gram": 225000
};

/* ---------- Array of Object: isi keranjang contoh ---------- */
const KERANJANG_AWAL = [
  { slug: "kue-nastar-original", name: "Kue Kacang", size: "350 Gram", qty: 1, price: 125000, checked: true },
  { slug: "cookies-cokelat", name: "Cookies Cokelat", size: "350 Gram", qty: 1, price: 125000, checked: true },
  { slug: "kue-kacang-cokelat", name: "Kue Kacang Cokelat", size: "500 Gram", qty: 1, price: 175000, checked: true },
  { slug: "kurma-kacang", name: "Kurma Kacang", size: "750 Gram", qty: 1, price: 225000, checked: true }
];

/* ---------- Fungsi bantu DOM ---------- */
function ambilElemen(selector) {
  return document.querySelector(selector);
}

function ambilSemuaElemen(selector) {
  return document.querySelectorAll(selector);
}

/* ---------- Format angka menjadi rupiah ---------- */
function formatRupiah(angka) {
  let nilai = Number(angka);

  if (isNaN(nilai)) {
    nilai = 0;
  }

  if (nilai < 0) {
    nilai = 0;
  }

  return "Rp " + nilai.toLocaleString("id-ID");
}

/* ---------- Mengubah teks agar aman dimasukkan ke HTML ---------- */
function escapeHtml(teks) {
  let hasil = "" + teks;
  hasil = hasil.split("&").join("&amp;");
  hasil = hasil.split("<").join("&lt;");
  hasil = hasil.split(">").join("&gt;");
  hasil = hasil.split('"').join("&quot;");
  hasil = hasil.split("'").join("&#39;");
  return hasil;
}

/* ---------- Toast (notifikasi kecil di bawah) ---------- */
let timerToast = null;

function tampilkanToast(pesan) {
  const toast = ambilElemen("[data-toast]");
  if (toast === null) {
    return;
  }

  toast.textContent = pesan;
  toast.classList.add("show");

  if (timerToast !== null) {
    clearTimeout(timerToast);
  }

  timerToast = setTimeout(function () {
    toast.classList.remove("show");
  }, 2200);
}

/* ---------- Keranjang disimpan di localStorage ---------- */
function ambilKeranjang() {
  let data = localStorage.getItem("hb_cart");
  if (data === null) {
    return null;
  }
  return JSON.parse(data);
}

function simpanKeranjang(keranjang) {
  localStorage.setItem("hb_cart", JSON.stringify(keranjang));
}

function hitungJumlahKeranjang() {
  const keranjang = ambilKeranjang();
  if (keranjang === null) {
    return 0;
  }

  let jumlah = 0;
  for (let i = 0; i < keranjang.length; i++) {
    jumlah = jumlah + keranjang[i].qty;
  }
  return jumlah;
}

function perbaruiJumlahKeranjang() {
  const badge = ambilElemen("[data-cart-count]");
  if (badge === null) {
    return;
  }

  let jumlah = hitungJumlahKeranjang();
  if (jumlah > 99) {
    badge.textContent = "99+";
  } else {
    badge.textContent = "" + jumlah;
  }

  if (jumlah === 0) {
    badge.hidden = true;
  } else {
    badge.hidden = false;
  }
}

/* ---------- Menyalin object (pengganti Object.assign) ---------- */
function salinObject(objectAsal) {
  let hasil = {};
  for (let kunci in objectAsal) {
    if (objectAsal.hasOwnProperty(kunci)) {
      hasil[kunci] = objectAsal[kunci];
    }
  }
  return hasil;
}

/* ---------- Data user ---------- */
function ambilDataUser() {
  let data = localStorage.getItem("hb_user");
  if (data === null) {
    return null;
  }
  return JSON.parse(data);
}

function simpanDataUser(user) {
  localStorage.setItem("hb_user", JSON.stringify(user));
}

function sinkronkanAvatarNavbar() {
  const avatar = ambilElemen("[data-avatar]");
  if (avatar === null) {
    return;
  }

  const gambar = avatar.querySelector("img");
  if (gambar === null) {
    return;
  }

  const user = ambilDataUser();
  if (user !== null && user.avatar) {
    gambar.src = user.avatar;
  }
}

/* ---------- Mengambil parameter dari URL (?p=...&qty=...) ---------- */
function ambilParameterURL(nama) {
  let query = window.location.search;
  if (query.length < 2) {
    return "";
  }

  query = query.substring(1);
  const daftar = query.split("&");

  for (let i = 0; i < daftar.length; i++) {
    const pasangan = daftar[i].split("=");
    if (pasangan[0] === nama) {
      let nilai = pasangan[1];
      if (typeof nilai === "undefined") {
        nilai = "";
      }
      return decodeURIComponent(nilai);
    }
  }

  return "";
}

/* ---------- Mengubah "350 Gram" menjadi "350g" ---------- */
function ubahKeGram(ukuran) {
  if (!ukuran) {
    return "300g";
  }

  let hasil = ukuran.split(" ").join("");
  const kecil = hasil.toLowerCase();
  const posisi = kecil.indexOf("gram");

  if (posisi !== -1) {
    hasil = hasil.substring(0, posisi) + "g";
  }

  return hasil;
}

/* ---------- Dijalankan saat file dimuat ---------- */
perbaruiJumlahKeranjang();
sinkronkanAvatarNavbar();
