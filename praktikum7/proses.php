<?php
// Latihan 5: menerima data GET dari form.html
if (isset($_GET['nama']) && $_GET['nama'] !== "") {
    $nama = htmlspecialchars($_GET['nama']);
    echo "Nama Anda adalah " . $nama;
} else {
    echo "Nama belum diisi. <a href='form.html'>Kembali</a>";
}
?>