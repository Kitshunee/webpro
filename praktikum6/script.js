const form = document.getElementById("form");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
const MAX_USERNAME = 10;
const MIN_AGE = 1;
const MAX_AGE = 100;

// Aturan validasi per field: mengembalikan pesan error, atau "" jika valid.
const rules = {
  name(value) {
    if (value === "") return "Nama harus diisi.";
    return "";
  },
  email(value) {
    if (value !== "" && !EMAIL_REGEX.test(value)) return "Email tidak valid.";
    return "";
  },
  username(value) {
    if (value === "") return "Username harus diisi.";
    if (value.length > MAX_USERNAME) return `Username tidak boleh lebih dari ${MAX_USERNAME} karakter.`;
    if (!USERNAME_REGEX.test(value)) return "Username hanya boleh berisi huruf, angka, dan garis bawah.";
    return "";
  },
  age(value) {
    if (value === "") return "Umur harus diisi.";
    if (!/^\d+$/.test(value)) return "Umur harus berupa angka bulat.";
    const n = Number(value);
    if (n < MIN_AGE || n > MAX_AGE) return `Umur harus antara ${MIN_AGE} dan ${MAX_AGE}.`;
    return "";
  }
};

function showError(field, message) {
  const input = document.getElementById(field);
  document.getElementById(field + "-error").textContent = message;
  input.classList.toggle("invalid", message !== "");
  input.setAttribute("aria-invalid", message !== "" ? "true" : "false");
}

function validateField(field) {
  const value = document.getElementById(field).value.trim();
  const message = rules[field](value);
  showError(field, message);
  return message === "";
}

function validateForm() {
  // Jalankan semua validasi agar semua error tampil sekaligus.
  const results = Object.keys(rules).map(validateField);
  const valid = results.every(Boolean);
  if (!valid) {
    const firstInvalid = form.querySelector(".invalid");
    if (firstInvalid) firstInvalid.focus();
  }
  return valid;
}

// Validasi saat pengguna meninggalkan kolom dipasang lewat atribut onblur di index.html.

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const success = document.getElementById("success");
  success.textContent = "";

  if (validateForm()) {
    success.textContent = "Form berhasil disubmit!";
    // Kirim data ke server di sini (fetch/XHR), lalu validasi ulang di sisi server.
  }
});