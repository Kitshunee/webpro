// Menampilkan atau menghapus pesan error pada satu kolom
function setError(idInput, pesan) {
  const input = document.getElementById(idInput);
  const error = document.getElementById(idInput + "Error");

  error.textContent = pesan;

  if (pesan) {
    input.classList.add("input-error");
  } else {
    input.classList.remove("input-error");
  }
}

document.getElementById("formKontak")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // cegah form terkirim otomatis

    // 1. Hapus semua error lama
    setError("nama", "");
    setError("email", "");
    setError("pesan", "");

    // 2. Ambil nilai input (trim = buang spasi di awal/akhir)
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    let valid = true;

    // 3. Periksa tiap kolom
    if (nama === "") {
      setError("nama", "Nama tidak boleh kosong.");
      valid = false;
    }

    // Opsional: validasi format email dengan regex (Kode 1.3.6)
    const pola = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      setError("email", "Email tidak boleh kosong.");
      valid = false;
    } else if (!pola.test(email)) {
      setError("email", "Format email tidak valid.");
      valid = false;
    }

    if (pesan === "") {
      setError("pesan", "Pesan tidak boleh kosong.");
      valid = false;
    }

    // 4. Jika semua benar, tampilkan sukses
    if (valid) {
      alert("Form berhasil dikirim!");
      this.reset();
    }
  });