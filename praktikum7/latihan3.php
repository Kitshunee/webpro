<?php
// Latihan 3: variabel, penjumlahan dua bilangan
$nama = "Andi";
$umur = 25;
$a = 10;
$b = 5;
$hasil = $a + $b;
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Latihan 3</title>
</head>
<body>
    <h2>Data Diri dan Penjumlahan</h2>
    <?php
    echo "Nama: " . $nama . "<br>";
    echo "Umur: " . $umur . " tahun<br>";
    echo "Hasil $a + $b = " . $hasil . "<br>";
    ?>
</body>
</html>