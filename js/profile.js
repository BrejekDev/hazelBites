/* ==========================================================
   Hazel Bites - profile.js
   Fitur halaman edit-profile.html:
   - memuat data profil
   - ganti foto profil
   - simpan nama, email, nomor telepon
   - logout

   Materi: variabel, tipe data, object, control flow,
   HTML DOM.
   ========================================================== */

const halamanProfil = ambilElemen("[data-profile-page]");

if (halamanProfil !== null) {
  const inputNamaProfil = document.getElementById("prof-name");
  const inputEmailProfil = document.getElementById("prof-email");
  const inputTeleponProfil = document.getElementById("prof-phone");
  const inputFotoProfil = ambilElemen("[data-photo-input]");
  const tombolGantiFoto = ambilElemen("[data-change-photo]");
  const gambarProfil = ambilElemen("[data-profile-img]");
  const ikonProfilKosong = halamanProfil.querySelector(".profile-placeholder-icon");

  /* ---------- Muat data user ---------- */
  const userProfil = ambilDataUser();

  if (userProfil !== null) {
    if (inputNamaProfil !== null && userProfil.name) {
      inputNamaProfil.value = userProfil.name;
    }

    if (inputEmailProfil !== null && userProfil.email) {
      inputEmailProfil.value = userProfil.email;
    }

    if (inputTeleponProfil !== null && userProfil.phone) {
      inputTeleponProfil.value = userProfil.phone;
    }

    if (userProfil.avatar && gambarProfil !== null) {
      gambarProfil.src = userProfil.avatar;
      gambarProfil.hidden = false;

      if (ikonProfilKosong !== null) {
        ikonProfilKosong.style.display = "none";
      }
    }
  }

  /* ---------- Ganti foto profil ---------- */
  if (tombolGantiFoto !== null && inputFotoProfil !== null) {
    tombolGantiFoto.addEventListener("click", function () {
      inputFotoProfil.click();
    });

    inputFotoProfil.addEventListener("change", function () {
      let file = null;

      if (inputFotoProfil.files && inputFotoProfil.files[0]) {
        file = inputFotoProfil.files[0];
      }

      if (file === null) {
        return;
      }

      const pembaca = new FileReader();

      pembaca.onload = function (event) {
        if (gambarProfil !== null) {
          gambarProfil.src = event.target.result;
          gambarProfil.hidden = false;
        }

        if (ikonProfilKosong !== null) {
          ikonProfilKosong.style.display = "none";
        }

        tampilkanToast("Foto profil dipilih");
      };

      pembaca.readAsDataURL(file);
    });
  }

  /* ---------- Simpan profil ---------- */
  const formProfil = ambilElemen("[data-profile-form]");

  if (formProfil !== null) {
    formProfil.addEventListener("submit", function (event) {
      event.preventDefault();

      let namaBaru = "";
      let emailBaru = "";
      let teleponBaru = "";

      if (inputNamaProfil !== null) {
        namaBaru = inputNamaProfil.value.trim();
      }
      if (inputEmailProfil !== null) {
        emailBaru = inputEmailProfil.value.trim();
      }
      if (inputTeleponProfil !== null) {
        teleponBaru = inputTeleponProfil.value.trim();
      }

      let dataBaru = ambilDataUser();
      if (dataBaru === null) {
        dataBaru = {};
      }

      dataBaru.name = namaBaru;
      dataBaru.email = emailBaru;
      dataBaru.phone = teleponBaru;

      if (gambarProfil !== null && gambarProfil.hidden === false && gambarProfil.src) {
        dataBaru.avatar = gambarProfil.src;
      }

      simpanDataUser(dataBaru);
      sinkronkanAvatarNavbar();
      tampilkanToast("Profil berhasil disimpan");
    });
  }

  /* ---------- Logout ---------- */
  const tombolLogout = ambilElemen("[data-logout]");

  if (tombolLogout !== null) {
    tombolLogout.addEventListener("click", function () {
      sessionStorage.removeItem("hb_login");
      localStorage.removeItem("hb_login");
      document.cookie = "hb_login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      window.name = "";

      tampilkanToast("Berhasil keluar dari akun...");
      setTimeout(function () {
        window.location.href = "index.html";
      }, 800);
    });
  }
}
